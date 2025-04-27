import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import type { NextRequest } from "next/server";
import { getAuth } from '@clerk/nextjs/server';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();
const LANGFLOW_API_URL = process.env.LANGFLOW_API_URL || '';
const LANGFLOW_TOKEN = process.env.LANGFLOW_TOKEN || '';

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.error('Onboarding API - Unauthorized: No userId found');
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // Find or create user in Prisma
    let user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      console.error('Backend - User not found for clerkId:', userId);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse request body
    const { caseData } = await req.json();
    if (!caseData) {
      console.error('Backend - Missing caseData in request');
      return NextResponse.json(
        { error: 'Missing case data' },
        { status: 400 }
      );
    }

    const {
      title,
      opponent,
      timeline,
      evidence,
      agreement,
      involvedLaws,
      extractedDocs,
      sessionId = 'default-session', // Optional sessionId for Langflow
    } = caseData;

    // Validate required fields
    if (!title || !timeline || evidence === undefined || agreement === undefined || !involvedLaws) {
      console.error('Backend - Missing required case fields');
      return NextResponse.json(
        { error: 'Missing required case fields' },
        { status: 400 }
      );
    }

    // Prepare Langflow payload
    const payload = {
      input_value: JSON.stringify(caseData),
      output_type: 'chat',
      input_type: 'chat',
      nextField: 'finalAnalysis',
      analysis: true,
      session_id: sessionId,
    };

    console.log('Backend - Sending request to Langflow:', payload);

    // Call Langflow API
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

    // Parse Langflow response
    let parsedResponse;
    try {
      const cleanJson = langflowMessage.replace(/```json\n|\n```/g, '').trim();
      parsedResponse = JSON.parse(cleanJson);
      console.log('Backend - Parsed Langflow response:', parsedResponse);
    } catch (error) {
      console.error('Backend - Error parsing Langflow response:', error);
      return NextResponse.json(
        { error: 'Invalid Langflow response' },
        { status: 500 }
      );
    }

    // Extract caseFinalAnalysis and todos
    const { caseFinalAnalysis, todos } = parsedResponse;
    if (!caseFinalAnalysis || !todos) {
      console.error('Backend - Missing caseFinalAnalysis or todos in Langflow response');
      return NextResponse.json(
        { error: 'Incomplete Langflow response' },
        { status: 500 }
      );
    }

    // Create Case
    const caseRecord = await prisma.case.create({
      data: {
        userId: user.id,
        title,
        description: caseFinalAnalysis.userCaseSummary,
        status: 'OPEN',
        opponent,
        timeline,
        evidence,
        agreement,
        involvedLaws: {
          create: involvedLaws.map((law: string) => ({
            law,
            description: law, // Simplified; adjust if description is separate
          })),
        },
        extractedDocs: extractedDocs
          ? {
              create: extractedDocs.map((doc: { docId: string; title: string; rawContent: string; aiSummary: string }) => ({
                docId: doc.docId,
                title: doc.title,
                rawContent: doc.rawContent,
                aiSummary: doc.aiSummary,
              })),
            }
          : undefined,
        finalAnalysis: JSON.stringify(parsedResponse),
      },
    });

    console.log('Backend - Created case:', caseRecord.id);

    // Create Todos
    const tenDaysFromNow = addDays(new Date(), 10);
    await prisma.todo.createMany({
      data: todos.map((todo: { title: string; description: string }) => ({
        title: todo.title,
        description: todo.description,
        dueAt: tenDaysFromNow,
        status: 'PENDING',
        caseId: caseRecord.id,
      })),
    });

    console.log('Backend - Created todos for case:', caseRecord.id);

    // Return Langflow response to frontend
    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('Backend - Error in conclude endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to process conclusion' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}