import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const cases = await prisma.case.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
        session: {
          select: { sessionId: true },
        },
      },
    });

    // Flatten sessionId and filter out cases without sessions
    const result = cases
      .filter((c: any) => c.session?.sessionId)
      .map((c: any) => ({
        title: c.title,
        description: c.description,
        sessionId: c.session.sessionId,
      }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching chat sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 },
    );
  }
}
