import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();
// const LANGFLOW_API_URL = 'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/c9b26fed-99bd-4301-969f-3ff28a0a606e';
const LANGFLOW_API_URL = 'https://api.langflow.astra.datastax.com/lf/f829f83f-e4c3-4742-89d5-9ddee4394fb0/api/v1/run/2c2058b5-dace-4a5c-b1f4-e5ee9fd8c3d3?stream=false';
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

    const { message, sessionId, analysis, nextField } = await request.json();
    console.log('Backend - Received chat request:', { message, sessionId });

    if (!message || !sessionId) {
      console.error('Backend - Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields', response: 'Please provide both message and sessionId.' },
        { status: 400 }
      );
    }

    // Send request to Langflow
    const payload = {
      input_value: message,
      output_type: 'chat',
      input_type: 'chat',
      session_id: sessionId,
    };
    // const payload = {
    //   input_value: message,
    //   output_type: 'chat',
    //   input_type: 'chat',
    //   nextField: nextField,
    //   analysis: false,
    //   session_id: sessionId,
    // };

    console.log('Backend - Sending request to Langflow:', payload);

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

      // Destructure all possible fields from the response
      const {
        description,
        opponent,
        timeline,
        evidence,
        agreement,
        ai_next_response
      } = parsedResponse;

      // Return structured response with all available fields
      return NextResponse.json({
        description: description || null,
        opponent: opponent || null,
        timeline: timeline || null,
        evidence: evidence || null,
        agreement: agreement || null,
        ai_next_response: ai_next_response || null,
      });
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

    // Commented out case creation for now
    /*
    const caseRecord = await prisma.case.create({
      data: {
        id: `case_${Date.now()}`,
        title: 'New Case',
        description: message,
        status: 'OPEN',
        userId: userId,
      },
    });
    */  

    // return NextResponse.json({
    //   response: parsedResponse.response,
    //   updatedField: parsedResponse.updated_field || null,
    //   updatedValue: parsedResponse.updated_value || null,
    // });
  } catch (error) {
    console.error('Backend - Error in chat handler:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        response: 'Sorry, there was an error processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}