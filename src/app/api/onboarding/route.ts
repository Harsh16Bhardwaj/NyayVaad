import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      name,
      language,
      profession,
      legalKnowledge,
      involvements,
      jailTimeYears,
      warningSeverity,
      pendingCaseType,
      fines,
    } = body;

    if (!name || !profession || !legalKnowledge) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Using upsert here because we want to update if user exists, create if not
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        name: name || 'John Doe',
        profession: profession || 'Cannot Disclose',
        legalKnowledge:legalKnowledge || 'Basic',
        jailTimeYears: jailTimeYears || null,
        warningSeverity: warningSeverity || null,
        pendingCaseType: pendingCaseType || null,
        legalInvolvements: involvements,
        fines: fines || null,
        updatedAt: new Date(),
      },
      create: {
        clerkId: userId,
        name,
        profession,
        legalKnowledge,
        jailTimeYears: jailTimeYears || null,
        warningSeverity: warningSeverity || null,
        pendingCaseType: pendingCaseType || null,
        language,
        legalInvolvements: involvements,
        fines: fines || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Onboarding error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
