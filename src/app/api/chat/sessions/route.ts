import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { clerkId }
    });

    if (!user) {
      console.log("[Sessions API] User not found, creating new user for clerkId:", clerkId);
      user = await prisma.user.create({
        data: {
          clerkId,
          email: `${clerkId}@temp.com`, // Temporary email
          legalKnowledge: 'NONE', // Default value
        }
      });
    }

    // Fetch all sessions for this user
    const sessions = await prisma.session.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        case: {
          select: {
            title: true,
            description: true,
          }
        }
      }
    });

    // Format the response
    const result = sessions.map((session) => {
      // Extract first user message for title if case doesn't exist
      const messages = (session.messages as any[]) || [];
      const firstUserMessage = messages.find(m => m.sender === 'user');
      
      return {
        sessionId: session.sessionId,
        title: session.case?.title || firstUserMessage?.content?.substring(0, 50) + '...' || 'New Conversation',
        description: session.case?.description || `${session.messageCount} messages`,
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 },
    );
  }
}
