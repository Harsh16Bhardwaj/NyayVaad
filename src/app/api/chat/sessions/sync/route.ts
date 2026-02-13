import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sessions } = await req.json();

    if (!sessions || !Array.isArray(sessions)) {
      return NextResponse.json({ error: 'Invalid sessions data' }, { status: 400 });
    }

    // Find or create user in database
    let user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      console.log('[Sync Sessions] User not found, creating new user');
      user = await prisma.user.create({
        data: {
          clerkId,
          email: `${clerkId}@temp.com`,
          legalKnowledge: 'NONE',
        }
      });
    }

    console.log(`[Sync Sessions] Syncing ${sessions.length} sessions for user ${user.id}`);

    // Upsert sessions to database - only sync messageCount
    // Note: title and description are derived from case data, not stored in session
    const syncedSessions = await Promise.all(
      sessions.map(async (session: any) => {
        return await prisma.session.upsert({
          where: {
            sessionId: session.sessionId,
          },
          update: {
            updatedAt: new Date(),
          },
          create: {
            sessionId: session.sessionId,
            userId: user.id,
            createdAt: session.createdAt ? new Date(session.createdAt) : new Date(),
          },
        });
      })
    );

    console.log(`[API] Successfully synced ${syncedSessions.length} sessions`);

    return NextResponse.json({ 
      success: true, 
      syncedCount: syncedSessions.length,
      sessions: syncedSessions 
    });
  } catch (error) {
    console.error('[API] Error syncing sessions:', error);
    return NextResponse.json(
      { error: 'Failed to sync sessions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
