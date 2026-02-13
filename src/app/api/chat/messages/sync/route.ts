import { NextRequest, NextResponse } from 'next/server';
import prisma  from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessionId, messages } = await req.json();

    if (!sessionId || !messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    console.log(`[API] Syncing ${messages.length} messages for session ${sessionId}`);

    // Verify session belongs to user
    const session = await prisma.session.findUnique({
      where: { sessionId },
      select: { userId: true },
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    if (session.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Store messages as JSON in the session
    await prisma.session.update({
      where: { sessionId },
      data: {
        messages: messages, // Store as JSON
        messageCount: messages.length,
        updatedAt: new Date(),
      },
    });

    console.log(`[Sync Messages] Successfully synced ${messages.length} messages for session ${sessionId}`);

    return NextResponse.json({ 
      success: true, 
      sessionId,
      messageCount: messages.length 
    });
  } catch (error) {
    console.error('[API] Error syncing messages:', error);
    return NextResponse.json(
      { error: 'Failed to sync messages', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
