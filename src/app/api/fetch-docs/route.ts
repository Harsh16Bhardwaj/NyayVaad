import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
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

    if (!description || !caseId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const caseRecord = await prisma.case.findUnique({ where: { id: caseId, userId: userId || undefined } });
    if (!caseRecord) {
      return NextResponse.json({ error: 'Unauthorized or invalid case ID' }, { status: 404 });
    }

    // STEP 1: Langflow Keyword Extraction
    const langflowRes = await fetch(LANGFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LANGFLOW_TOKEN}`,
      },
      body: JSON.stringify({ input_value: description, output_type: 'chat', input_type: 'chat', session_id: 'user_1' })
    });

    if (!langflowRes.ok) throw new Error('Langflow keyword extraction failed');

    const langflowData = await langflowRes.json();
    const rawLangflow = langflowData?.outputs?.[0]?.outputs?.[0]?.results?.message?.text;

    let queryKeyword = '';
    try {
      const parsed = JSON.parse(rawLangflow.replace(/```json\n?|\n```/g, '').trim());
      queryKeyword = parsed.query_keywords?.[0] || '';
    } catch {
      throw new Error('Failed to parse keyword response');
    }

    if (!queryKeyword) throw new Error('No keyword extracted');

    // STEP 2: Indian Kanoon Search
    const kanoonSearchRes = await fetch(`https://api.indiankanoon.org/search/?formInput=${encodeURIComponent(queryKeyword)}&pagenum=0`, {
      method: 'POST',
      headers: { 'Authorization': `Token ${INDIAN_KANOON_API_KEY}` },
    });

    if (!kanoonSearchRes.ok) throw new Error('Kanoon search failed');

    const kanoonSearchData = await kanoonSearchRes.json();
    const docs = kanoonSearchData?.docs?.slice(0, 2) || [];

    const results = [];

    for (const { tid: docId, title, headline } of docs) {
      const existing = await prisma.extractedDoc.findUnique({ where: { docId }, select: { docId, title } });
      if (existing) {
        results.push(existing);
        continue;
      }

      const docRes = await fetch(`https://api.indiankanoon.org/doc/${docId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${INDIAN_KANOON_API_KEY}`,
          'Accept': 'text/html',
        }
      });
      if (!docRes.ok) continue;

      const rawContent = await docRes.text();
      const sections = extractSections(rawContent);

      // STEP 3: Summary via Langflow
      const summaryRes = await fetch(FINAL_RESPONSE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${FINAL_RESPONSE_TOKEN}`,
        },
        body: JSON.stringify({
          input_value: JSON.stringify({ docId, sections, description }),
          output_type: 'chat',
          input_type: 'chat',
          session_id: 'user_1'
        })
      });
      if (!summaryRes.ok) continue;

      const summaryData = await summaryRes.json();
      let summaryParsed;
      try {
        summaryParsed = JSON.parse(summaryData.outputs?.[0]?.outputs?.[0]?.results?.message?.text.replace(/```json\n?|\n```/g, '').trim());
      } catch {
        continue;
      }

      const saved = await prisma.extractedDoc.upsert({
        where: { docId },
        update: {
          title: summaryParsed.title,
          rawContent,
          aiSummary: summaryParsed.aiSummary,
          caseId,
        },
        create: {
          docId,
          title: summaryParsed.title,
          rawContent,
          aiSummary: summaryParsed.aiSummary,
          caseId,
        }
      });
      results.push(saved);
    }

    if (results.length === 0) {
      return NextResponse.json({ success: false, message: 'No documents processed' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${results.length} document(s)`,
      documents: results,
    });

  } catch (err: any) {
    console.error("[🔥 Error] fetch-docs:", err.message);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
