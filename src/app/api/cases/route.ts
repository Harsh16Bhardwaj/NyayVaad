import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';
import { CaseData } from '@/types/case';

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const cases = await prisma.case.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(cases as CaseData[]);
  } catch (error) {
    console.error('Error fetching cases:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 