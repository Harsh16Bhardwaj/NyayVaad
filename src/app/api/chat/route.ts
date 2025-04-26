import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { CaseData } from '@/types/case';
import { PrismaClient } from '@/generated/prisma';
import { getAuth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();
const LANGFLOW_API_URL = process.env.LANGFLOW_API_URL || 'https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/c9b26fed-99bd-4301-969f-3ff28a0a606e';
const LANGFLOW_TOKEN = process.env.LANGFLOW_TOKEN;

type FieldConfig = {
  [key: string]: {
    validator: (value: string) => boolean;
    errorMessage: string;
    prompt?: string;
  };
};

const FIELD_CONFIG: FieldConfig = {
  description: {
    validator: (value: string) => value.trim().length > 10,
    errorMessage: 'Description must be at least 10 characters long.',
    prompt: 'Please provide a detailed description of your case.',
  },
  opponent: {
    validator: (value: string) => value.trim().length > 2,
    errorMessage: 'Opponent name must be at least 3 characters long.',
    prompt: 'Please provide the name of your opponent.',
  },
  timeline: {
    validator: (value: string) => value.trim().length > 0,
    errorMessage: 'Timeline must include at least one event.',
    prompt: 'Please provide a timeline of events.',
  },
  evidence: {
    validator: (value: string) => ['yes', 'no', 'true', 'false'].includes(value.toLowerCase()),
    errorMessage: 'Please answer Yes or No.',
    prompt: 'Do you have any evidence? (Yes/No)',
  },
  agreement: {
    validator: (value: string) => ['yes', 'no', 'true', 'false'].includes(value.toLowerCase()),
    errorMessage: 'Please answer Yes or No.',
    prompt: 'Is there any agreement between parties? (Yes/No)',
  },
};

export async function POST(request: NextRequest) {
  try {
    if (!LANGFLOW_TOKEN) {
      console.error('Langflow token not configured');
      return NextResponse.json(
        { error: 'Server configuration error', response: 'Service is currently unavailable.' },
        { status: 500 }
      );
    }

    const { userId } = getAuth(request);
    if (!userId) {
      console.error('Unauthorized request');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { message, nextField, sessionId, caseData } = await request.json();
    console.log('Received request:', { message, nextField, sessionId, caseData });

    if (!message || !sessionId) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields', response: 'Please provide all required fields.' },
        { status: 400 }
      );
    }

    // Check if description is locked
    if (nextField === 'description') {
      const existingCase = await prisma.case.findFirst({
        where: { 
          userId,
          description: { not: '' }
        },
      });
      if (existingCase) {
        return NextResponse.json({
          response: 'The case description is locked and cannot be changed.',
          descriptionLocked: true,
        });
      }
    }

    // Validate input if updating a field
    let updatedField = null;
    let updatedValue = null;
    if (nextField && nextField !== 'analysis' && FIELD_CONFIG[nextField]) {
      if (!FIELD_CONFIG[nextField].validator(message)) {
        return NextResponse.json({
          response: FIELD_CONFIG[nextField].errorMessage,
          updatedField: null,
          updatedValue: null,
          nextField,
        });
      }
      updatedField = nextField;
      updatedValue = nextField === 'timeline' ? [message] : nextField === 'evidence' || nextField === 'agreement' ? message.toLowerCase() === 'yes' || message.toLowerCase() === 'true' : message;
    }

    // Prepare Langflow payload
    const payload = {
      input_value: message,
      output_type: 'chat',
      input_type: 'chat',
      session_id: sessionId,
      next_field: nextField || null,
      case_data: nextField === 'analysis' ? caseData : undefined,
    };

    console.log('Sending Langflow payload:', payload);

    const response = await fetch("https://api.langflow.astra.datastax.com/lf/043396b0-e82a-4e0f-aca3-ad6828b04b34/api/v1/run/c9b26fed-99bd-4301-969f-3ff28a0a606e", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LANGFLOW_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Langflow API error:', { status: response.status, statusText: response.statusText });
      throw new Error('Langflow API call failed');
    }

    const data = await response.json();
    const langflowMessage = data.outputs?.[0]?.outputs?.[0]?.results?.message?.text;
    console.log('Raw Langflow response:', langflowMessage);

    if (!langflowMessage) {
      console.error('Empty Langflow response');
      throw new Error('Empty Langflow response');
    }

    let parsedResponse;
    try {
      const cleanJson = langflowMessage.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
      console.log('Parsed Langflow response:', parsedResponse);

      if (!parsedResponse.response) {
        console.error('Missing response field in Langflow response');
        throw new Error('Missing response field in Langflow response');
      }
    } catch (error) {
      console.error('Error parsing Langflow response:', error);
      return NextResponse.json(
        {
          error: 'Invalid Langflow response',
          response: 'There was an issue processing the AI response. Please try again.',
        },
        { status: 500 }
      );
    }

    // Handle analysis request
    if (nextField === 'analysis') {
      if (!parsedResponse.case_summary || !parsedResponse.laws_involved || !parsedResponse.todos) {
        console.error('Incomplete analysis response:', parsedResponse);
        throw new Error('Incomplete Langflow analysis response');
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true },
      });
      if (!user) {
        console.error('User not found:', { userId });
        throw new Error('User not found');
      }

      const userName = user.name || 'John Doe';
      const opponentName = caseData.opponent || 'Unknown';
      const caseTitle = `${userName} vs ${opponentName}`;

      const caseRecord = await prisma.case.create({
        data: {
          id: `case_${Date.now()}`,
          title: caseTitle,
          description: caseData.description || '',
          status: 'OPEN',
          opponent: caseData.opponent || null,
          timeline: caseData.timeline || [],
          evidence: caseData.evidence || false,
          agreement: caseData.agreement || false,
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

      console.log('Case record created:', caseRecord);

      return NextResponse.json({
        response: `
**Case Summary**: ${parsedResponse.case_summary}
**Relevant Laws**:
${parsedResponse.laws_involved.length > 0
          ? parsedResponse.laws_involved.map((law: any) => `- **${law.name}**: ${law.description}`).join('\n')
          : 'No laws identified.'}
**Action Plan (TODOs)**:
${parsedResponse.todos.length > 0
          ? parsedResponse.todos.map((todo: any) => `- **${todo.title}**: ${todo.description}`).join('\n')
          : 'No action items provided.'}
        `,
        updatedField: null,
        updatedValue: null,
        nextField: null,
        isFinalAnalysis: true,
      });
    }

    // Return field update response
    return NextResponse.json({
      response: parsedResponse.response || FIELD_CONFIG[nextField]?.prompt || 'Please provide the next piece of information.',
      updatedField,
      updatedValue,
      nextField: parsedResponse.next_field || null,
      isFinalAnalysis: false,
    });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        response: 'Sorry, there was an error processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}