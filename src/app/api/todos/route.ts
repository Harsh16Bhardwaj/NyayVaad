import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        case: true
      }
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { title, description, deadline, status, caseId } = await request.json();

    // If no caseId is provided, create a mock case for testing
    let caseToUse = caseId;
    if (!caseId) {
      const mockCase = await prisma.case.create({
        data: {
          title: 'Mock Case for Testing',
          description: 'This is a mock case created for testing purposes',
          userId: 'mock-user-id', // You'll need to replace this with a real user ID
          status: 'OPEN',
          evidence: false,
          agreement: false,
          timeline: [],
          involvedLaws: {
            create: [] // Create an empty array of EnhancedLaw
          }
        }
      });
      caseToUse = mockCase.id;
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        dueAt: new Date(deadline),
        status: status || 'PENDING',
        case: {
          connect: {
            id: caseToUse
          }
        }
      },
      include: {
        case: true
      }
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
} 