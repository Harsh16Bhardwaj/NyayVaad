import { NextResponse } from 'next/server';
import { extractSections } from './extractSections';

const LANGFLOW_API_URL = 'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/2c978a87-7226-43c1-bccd-ca6082257444';
const LANGFLOW_TOKEN = process.env.FETCHING_DOCS_LANGFLOW_TOKEN;
const INDIAN_KANOON_API_KEY = process.env.KANOON_API_KEY;

export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    console.log("1️⃣ Backend - Received description:", description);
    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    const payload = {
      input_value: description,
      output_type: "chat",
      input_type: "chat",
      session_id: "user_1"
    };
    console.log("2️⃣ Backend - Sending document fetching payload to Langflow:", payload);

    const langflowRes = await fetch(LANGFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LANGFLOW_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!langflowRes.ok) {
      console.error("3️⃣ Backend - Langflow API error:", langflowRes.status, langflowRes.statusText);
      throw new Error('Langflow API call failed');
    }

    const langflowData = await langflowRes.json();
    const langflowMessage = langflowData.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
    console.log("4️⃣ Backend - Langflow raw output:", langflowMessage);

    let parsedResponse;
    try {
      const cleanJson = langflowMessage.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
    } catch (error) {
      console.error("5️⃣ Backend - Error parsing Langflow response:", error);
      throw new Error('Failed to parse Langflow response');
    }

    const caseOneLiner = parsedResponse.query_keywords?.[0] ?? '';
    console.log("6️⃣ Backend - Extracted keyword/query:", caseOneLiner);

    const searchQuery = encodeURIComponent(caseOneLiner);
    const kanoonURL = `https://api.indiankanoon.org/search/?formInput=${searchQuery}&pagenum=0`;
    console.log("7️⃣ Backend - Final Kanoon URL:", kanoonURL);

    const kanoonRes = await fetch(kanoonURL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${INDIAN_KANOON_API_KEY}`
      }
    });

    if (!kanoonRes.ok) {
      console.error(" Backend - Indian Kanoon API error:", kanoonRes.status, kanoonRes.statusText);
      throw new Error('Indian Kanoon API call failed');
    }

    const kanoonData = await kanoonRes.json();
    const docs = kanoonData?.docs.slice(0, 2) ?? [];
    const extractedDocs = docs.map((doc: any) => ({
      title: doc.title,
      headline: doc.headline,
      docId: doc.tid
    }));
    console.log("8️⃣ Backend - Extracted Docs (not returned to frontend):", extractedDocs.title);

    const kanoonDoc = async (docID: string) => {
        const response = await fetch(`https://api.indiankanoon.org/doc/${docID}/`, {
            method: 'POST',
            headers: {
              'Authorization': `Token ${process.env.KANOON_API_KEY}`,
              'Accept': 'text/html',
            },
          });
          const html = await response.text();
          const sections = extractSections(html);

    }

    return NextResponse.json({ success: true }); // Placeholder response

  } catch (error) {
    console.error("🔥 Backend - Error in fetch-docs route:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
