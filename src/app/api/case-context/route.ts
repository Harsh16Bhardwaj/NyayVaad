import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import prisma from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST - Create or update case context for a session
export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId, description, opponent, timeline, evidence, agreement } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { clerkId }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find session
    const session = await prisma.session.findUnique({
      where: { sessionId },
      include: { case: true }
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // Check if case already exists for this session
    if (session.caseId && session.case) {
      // Update existing case
      const updatedCase = await prisma.case.update({
        where: { id: session.caseId },
        data: {
          description: description || session.case.description,
          opponent: opponent || session.case.opponent,
          timeline: timeline || session.case.timeline,
          evidence: evidence !== undefined ? evidence : session.case.evidence,
          agreement: agreement !== undefined ? agreement : session.case.agreement,
          updatedAt: new Date()
        }
      });

      return NextResponse.json({
        message: "Case context updated successfully",
        case: updatedCase
      });
    } else {
      // Create new case
      const newCase = await prisma.case.create({
        data: {
          userId: user.id,
          title: description?.substring(0, 50) + '...' || 'New Case',
          description: description || '',
          opponent: opponent || null,
          timeline: timeline || [],
          evidence: evidence !== undefined ? evidence : false,
          agreement: agreement !== undefined ? agreement : false,
          status: 'OPEN',
        }
      });

      // Link case to session
      await prisma.session.update({
        where: { sessionId },
        data: { caseId: newCase.id }
      });

      return NextResponse.json({
        message: "Case context created successfully",
        case: newCase
      });
    }

  } catch (error) {
    console.error("[CaseContext] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH - Partially update case context (only changed fields)
export async function PATCH(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId, ...updates } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Find session with case
    const session = await prisma.session.findUnique({
      where: { sessionId },
      include: { case: true }
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (!session.caseId || !session.case) {
      return NextResponse.json({ error: "No case found for this session" }, { status: 404 });
    }

    // Build update object with only provided fields
    const updateData: any = { updatedAt: new Date() };
    
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.opponent !== undefined) updateData.opponent = updates.opponent;
    if (updates.timeline !== undefined) updateData.timeline = updates.timeline;
    if (updates.evidence !== undefined) updateData.evidence = updates.evidence;
    if (updates.agreement !== undefined) updateData.agreement = updates.agreement;
    if (updates.title !== undefined) updateData.title = updates.title;

    // Update only the provided fields
    const updatedCase = await prisma.case.update({
      where: { id: session.caseId },
      data: updateData
    });

    return NextResponse.json({
      message: "Case context updated successfully",
      case: updatedCase
    });

  } catch (error) {
    console.error("[CaseContext] PATCH Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET - Retrieve case context for a session
export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Find session with case
    const session = await prisma.session.findUnique({
      where: { sessionId },
      include: {
        case: {
          select: {
            id: true,
            description: true,
            opponent: true,
            timeline: true,
            evidence: true,
            agreement: true,
            title: true,
            status: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    if (!session.case) {
      return NextResponse.json({ case: null });
    }

    return NextResponse.json({ case: session.case });

  } catch (error) {
    console.error("[CaseContext] GET Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
