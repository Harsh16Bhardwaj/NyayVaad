import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const cases = await prisma.case.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        session: {
          select: { sessionId: true }
        }
      }
    });
    const Cases = [
      {
        title: "Land Dispute with Neighbor",
        description: "Discussed property boundaries and legal recourse.",
        sessionId: "session_12345",
      },
      {
        title: "Employment Contract Review",
        description: "Analyzed clauses and potential risks.",
        sessionId: "session_67890",
      },
      {
        title: "Startup IP Protection",
        description: "Explored patent and copyright options.",
        sessionId: "session_24680",
      },
    ];
    // Flatten sessionId
    const result = cases.map((c: any) => ({
      caseId: c.id,
      title: c.title,
      description: c.description,
      sessionId: c.session?.sessionId || null
    }));
    return NextResponse.json(Cases);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}
