import { NextResponse } from 'next/server';
import type { CaseData } from '@/types/case';

const LANGFLOW_API_URL =
  'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/c9b26fed-99bd-4301-969f-3ff28a0a606e';
const LANGFLOW_TOKEN = process.env.LANGFLOW_TOKEN;

export async function POST(request: Request) {
  try {
    const { message, nextField, sessionId } = await request.json();
    console.log("Backend - Received request:", { message, nextField, sessionId });

    const payload = {
      input_value: message,
      output_type: 'chat',
      input_type: 'chat',
      session_id: sessionId || 'default_session',
      next_field: nextField
    };

    console.log("Backend - Sending payload to Langflow:", payload);

    const response = await fetch(LANGFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LANGFLOW_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Backend - Langflow API error:", response.status, response.statusText);
      throw new Error('Langflow API call failed');
    }

    const data = await response.json();
    console.log("Backend - Full Langflow JSON response:\n", JSON.stringify(data, null, 2));

    const langflowMessage = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
    
    // Parse the JSON string from the message
    let parsedResponse;
    try {
      // Remove the markdown code block syntax if present
      const cleanJson = langflowMessage.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
    } catch (error) {
      console.error("Backend - Error parsing Langflow response:", error);
      throw new Error('Failed to parse Langflow response');
    }

    console.log("Backend - Parsed response:", parsedResponse);

    const responseData = {
      response: parsedResponse.response,
      updatedField: parsedResponse.updated_field,
      updatedValue: parsedResponse.updated_value,
      nextField: parsedResponse.next_field
    };

    console.log("Backend - Sending response to frontend:", responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Backend - Error in POST handler:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      response: "I'm sorry, there was an error processing your request. Please try again."
    }, { status: 500 });
  }
}
