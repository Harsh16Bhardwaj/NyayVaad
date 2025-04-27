import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { extractSections } from './extractSections';

const prisma = new PrismaClient();

const LANGFLOW_API_URL = 'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/2c978a87-7226-43c1-bccd-ca6082257444';
const FINAL_RESPONSE_URL = 'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/d3c72969-4e3e-464c-afbe-484d3243af21';
const LANGFLOW_TOKEN = process.env.FETCHING_DOCS_LANGFLOW_TOKEN;
const FINAL_RESPONSE_TOKEN = process.env.FINAL_RESPONSE_LANGFLOW_TOKEN;
const INDIAN_KANOON_API_KEY = process.env.KANOON_API_KEY;

export async function POST(request: Request) {
  try {
    const { description, userId, caseId } = await request.json();
    console.log("[1] Backend - Received:", { description, userId, caseId });

    // Validate inputs
    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }
    if (!caseId) {
      return NextResponse.json({ error: 'Case ID is required' }, { status: 400 });
    }

    // Verify case exists and belongs to user
    const caseRecord = await prisma.case.findUnique({
      where: { id: caseId, userId: userId || undefined },
    });
    if (!caseRecord) {
      return NextResponse.json({ error: 'Case not found or unauthorized' }, { status: 404 });
    }

    // Step 1: Fetch initial Langflow response for keywords
    const payload = {
      input_value: description,
      output_type: "chat",
      input_type: "chat",
      session_id: "user_1",
    };
    console.log("[2] Backend - Sending document fetching payload to Langflow:", payload);

    const langflowRes = await fetch(LANGFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LANGFLOW_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!langflowRes.ok) {
      console.error("[3] Backend - Langflow API error:", langflowRes.status, langflowRes.statusText);
      throw new Error('Langflow API call failed');
    }

    const langflowData = await langflowRes.json();
    const langflowMessage = langflowData.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
    console.log("[4] Backend - Langflow raw output:", langflowMessage);

    let parsedResponse;
    try {
      const cleanJson = langflowMessage.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
    } catch (error) {
      console.error("[5] Backend - Error parsing Langflow response:", error);
      throw new Error('Failed to parse Langflow response');
    }

    const caseOneLiner = parsedResponse.query_keywords?.[0] ?? '';
    console.log("[6] Backend - Extracted keyword/query:", caseOneLiner);

    // Step 2: Search Indian Kanoon API
    const searchQuery = encodeURIComponent(caseOneLiner);
    const kanoonURL = `https://api.indiankanoon.org/search/?formInput=${searchQuery}&pagenum=0`;
    console.log("[7] Backend - Final Kanoon URL:", kanoonURL);

    const kanoonRes = await fetch(kanoonURL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${INDIAN_KANOON_API_KEY}`,
      },
    });

    if (!kanoonRes.ok) {
      console.error("[8] Backend - Indian Kanoon API error:", kanoonRes.status, kanoonRes.statusText);
      throw new Error('Indian Kanoon API call failed');
    }

    const kanoonData = await kanoonRes.json();
    const docs = kanoonData?.docs.slice(0, 2) ?? [];
    const extractedDocs = docs.map((doc: any) => ({
      title: doc.title,
      headline: doc.headline,
      docId: doc.tid,
    }));
    console.log("[9] Backend - Extracted Docs:", extractedDocs);

    // Step 3: Process each document independently
    const processedDocs = [];
    for (const doc of extractedDocs) {
      const { docId, title } = doc;
      console.log("[10] Backend - Processing document ID:", docId);

      const existingDoc = await prisma.extractedDoc.findUnique({
        where: { docId },
        select: { docId, title },
      });
      if (existingDoc) {
        console.log("[11] Backend - Document already exists in database, skipping processing:", docId);
        processedDocs.push({
          docId: existingDoc.docId,
          title: existingDoc.title,
          aiSummary: existingDoc.aiSummary,
        });
        continue; // Skip to next document
      }

      // Fetch document content from Indian Kanoon
      const kanoonDocRes = await fetch(`https://api.indiankanoon.org/doc/${docId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${INDIAN_KANOON_API_KEY}`,
          'Accept': 'text/html',
        },
      });

      if (!kanoonDocRes.ok) {
        console.error("[12] Backend - Indian Kanoon document fetch error:", kanoonDocRes.status, kanoonDocRes.statusText);
        continue; // Skip to next document
      }

      const rawContent = await kanoonDocRes.text();
      const sections = extractSections(rawContent);
      console.log("[13] Backend - Extracted Sections:", sections);

      // Step 4: Generate HTML summary using final Langflow API
      if (!FINAL_RESPONSE_TOKEN) {
        throw new Error('Final response token is not set');
      }

      const finalPayload = {
        input_value: JSON.stringify({ docId, sections, description }),
        output_type: "chat",
        input_type: "chat",
        session_id: "user_1",
      };
      console.log("[14] Backend - Sending summary payload to Langflow:", finalPayload);

      const finalLangflowRes = await fetch(FINAL_RESPONSE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${FINAL_RESPONSE_TOKEN}`,
        },
        body: JSON.stringify(finalPayload),
      });

      if (!finalLangflowRes.ok) {
        console.error("[15] Backend - Final Langflow API error:", finalLangflowRes.status, finalLangflowRes.statusText);
        continue; // Skip to next document
      }

      const finalLangflowData = await finalLangflowRes.json();
      const finalMessage = finalLangflowData.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
      console.log("[16] Backend - Final Langflow raw output:", finalMessage);

      let summaryResponse;
      try {
        const cleanSummaryJson = finalMessage.replace(/```json\n|\n```/g, '').trim();
        summaryResponse = JSON.parse(cleanSummaryJson);
      } catch (error) {
        console.error("[17] Backend - Error parsing final Langflow response:", error);
        continue; // Skip to next document
      }

      const { docId: summaryDocId, title: summaryTitle, aiSummary } = summaryResponse;
      console.log("[18] Backend - Parsed summary:", { summaryDocId, summaryTitle });

      // Step 5: Save to Prisma database
      try {
        const savedDoc = await prisma.extractedDoc.upsert({
          where: { docId: summaryDocId },
          update: {
            title: summaryTitle,
            rawContent,
            aiSummary,
            caseId,
          },
          create: {
            docId: summaryDocId,
            title: summaryTitle,
            rawContent,
            aiSummary,
            caseId,
          },
        });
        console.log("[19] Backend - Saved document to database:", savedDoc);
        processedDocs.push({ docId: summaryDocId, title: summaryTitle, aiSummary });
      } catch (prismaError) {
        console.error("[20] Backend - Prisma save error:", prismaError);
        continue; // Skip to next document
      }
    }

    // Step 6: Return response
    if (processedDocs.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No documents were successfully processed', docIds: [] },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed or retrieved ${processedDocs.length} document(s)`,
      docIds: processedDocs.map(doc => doc.docId),
      documents: processedDocs,
    });

  } catch (error) {
    console.error("[🔥] Backend - Error in fetch-docs route:", error);
    return NextResponse.json(
      { error: 'Internal server error', docIds: [] },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}