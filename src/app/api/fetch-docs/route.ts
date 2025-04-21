import { NextResponse } from 'next/server';

const LANGFLOW_API_URL = 'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/2c978a87-7226-43c1-bccd-ca6082257444';
const LANGFLOW_TOKEN = process.env.FETCHING_DOCS_LANGFLOW_TOKEN;

export async function POST(request: Request) {
  try {
    const { description } = await request.json();
    console.log("Backend - Received description:", description);
    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const payload = {
        input_value: description, // what user entered
        output_type: "chat",      // assuming you're using a ChatOutput component
        input_type: "chat",       // assuming input type is plain text/chat
        session_id: "user_1"      // you can generate or pass this dynamically
      };
      
    console.log("Backend - Sending document fetching payload to Langflow:", payload);

    const response = await fetch(LANGFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LANGFLOW_TOKEN}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Backend - Langflow API error:", response.status, response.statusText);
      throw new Error('Langflow API call failed');
    }

    const data = await response.json();
    const langflowMessage = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
    let parsedResponse;
    try {
      const cleanJson = langflowMessage.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
    } catch (error) {
      console.error("Backend - Error parsing Langflow response:", error);
      throw new Error('Failed to parse Langflow response');
    }

    console.log("Backend - Parsed response:", parsedResponse);

    return NextResponse.json({ 
      success: true,
      data: parsedResponse
    });
  } catch (error) {
    console.error("Backend - Error in fetch-docs route:", error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 