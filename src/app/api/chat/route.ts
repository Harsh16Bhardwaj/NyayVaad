import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { CaseData } from '@/types/case';
import { PrismaClient } from '@prisma/client';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();
const LANGFLOW_API_URL =
  'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/c9b26fed-99bd-4301-969f-3ff28a0a606e';
const LANGFLOW_TOKEN = process.env.LANGFLOW_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { message, nextField, sessionId, caseData } = await request.json();
    console.log('Backend - Received request:', { message, nextField, sessionId, caseData });

    const payload = {
      input_value: message,
      output_type: 'chat',
      input_type: 'chat',
      session_id: sessionId || 'default_session',
      next_field: nextField,
      case_data: nextField === 'output' ? caseData : undefined,
    };

    console.log('Backend - Sending payload to Langflow:', payload);

    const response = await fetch(LANGFLOW_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LANGFLOW_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Backend - Langflow API error:', response.status, response.statusText);
      throw new Error('Langflow API call failed');
    }

    const data = await response.json();
    console.log('Backend - Full Langflow JSON response:\n', JSON.stringify(data, null, 2));

    const langflowMessage = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;

    let parsedResponse;
    try {
      const cleanJson = langflowMessage.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
    } catch (error) {
      console.error('Backend - Error parsing Langflow response:', error);
      throw new Error('Failed to parse Langflow response');
    }

    console.log('Backend - Parsed response:', parsedResponse);

    let responseData;
    if (nextField === 'output') {
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        select: { firstName: true, lastName: true }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const userName = `${user.firstName} ${user.lastName}`.trim();
      const opponentName = caseData.opponent || 'Unknown Opponent';
      const caseTitle = `${userName} vs ${opponentName}`;

      try {
        const caseRecord = await prisma.case.create({
          data: {
            title: caseTitle,
            description: caseData.description || '',
            status: 'OPEN',
            opponent: caseData.opponent || null,
            timeline: caseData.timeline_location ? [caseData.timeline_location] : [],
            evidence: caseData.evidence || false,
            agreement: caseData.agreements_pre_steps || false,
            impact: caseData.impact_intent || null,
            intent: caseData.impact_intent || null,
            involvedLaws: parsedResponse.laws_involved.map((law: any) => law.name),
            finalAnalysis: parsedResponse.case_summary,
            userId: userId,
            todos: {
              create: parsedResponse.todos.map((todo: any) => ({
                title: todo.title,
                description: todo.description,
                status: 'PENDING',
              })),
            },
          },
        });
        console.log('Backend - Case stored in database:', caseRecord);
      } catch (error) {
        console.error('Backend - Error storing case in database:', error);
        throw new Error('Failed to store case in database');
      }

      responseData = {
        outputData: {
          case_summary: parsedResponse.case_summary,
          laws_involved: parsedResponse.laws_involved,
          todos: parsedResponse.todos,
        },
        updatedField: parsedResponse.updated_field,
        updatedValue: parsedResponse.updated_value,
        nextField: parsedResponse.next_field,
      };
    } else {
      responseData = {
        response: parsedResponse.response,
        updatedField: parsedResponse.updated_field,
        updatedValue: parsedResponse.updated_value,
        nextField: parsedResponse.next_field,
      };
    }

    console.log('Backend - Sending response to frontend:', responseData);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Backend - Error in POST handler:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        response: "I'm sorry, there was an error processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}