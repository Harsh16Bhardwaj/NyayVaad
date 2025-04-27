import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';

const LANGFLOW_API_URL = 'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/c9b26fed-99bd-4301-969f-3ff28a0a606e';
const LANGFLOW_TOKEN = process.env.LANGFLOW_TOKEN;

export async function POST(request: NextRequest) {
  try {
    if (!LANGFLOW_TOKEN) {
      console.error('Backend - Langflow token not configured');
      throw new Error('Server configuration error');
    }

    const { userId } = getAuth(request);
    if (!userId) {
      console.error('Backend - Unauthorized request');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { caseData } = await request.json();
    console.log('Backend - Received analysis request:', { caseData });

    if (!caseData) {
      console.error('Backend - Missing case data');
      return NextResponse.json(
        { error: 'Missing case data', response: 'Please provide case data for analysis.' },
        { status: 400 }
      );
    }

    // Send request to Langflow for analysis
    const payload = {
      input_value: 'Analyze case',
      output_type: 'chat',
      input_type: 'chat',
      session_id: `analysis_${Date.now()}`,
      analysis: true,
      case_data: caseData,
    };

    console.log('Backend - Sending analysis request to Langflow:', payload);

    const response = await fetch(LANGFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LANGFLOW_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Backend - Langflow API error:', { status: response.status, statusText: response.statusText });
      throw new Error('Langflow API call failed');
    }

    const data = await response.json();
    const langflowMessage = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
    console.log('Backend - Raw Langflow response:', langflowMessage);

    if (!langflowMessage) {
      console.error('Backend - Empty Langflow response');
      throw new Error('Empty Langflow response');
    }

    let parsedResponse;
    try {
      const cleanJson = langflowMessage.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
      console.log('Backend - Parsed Langflow response:', parsedResponse);

      if (!parsedResponse.case_summary || !parsedResponse.laws_involved || !parsedResponse.todos) {
        console.error('Backend - Incomplete analysis response:', parsedResponse);
        throw new Error('Incomplete Langflow analysis response');
      }
    } catch (error) {
      console.error('Backend - Error parsing Langflow response:', error);
      return NextResponse.json(
        {
          error: 'Invalid Langflow response',
          response: 'There was an issue processing the AI response. Please try again.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      response: parsedResponse.response || langflowMessage,
      updatedField: parsedResponse.updated_field || null,
      updatedValue: parsedResponse.updated_value || null,
      caseSummary: parsedResponse.case_summary,
      lawsInvolved: parsedResponse.laws_involved,
      todos: parsedResponse.todos,
    });
  } catch (error) {
    console.error('Backend - Error in analysis handler:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        response: 'Sorry, there was an error analyzing your case. Please try again.',
      },
      { status: 500 }
    );
  }
}
