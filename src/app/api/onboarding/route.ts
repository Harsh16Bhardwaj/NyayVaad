import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.error('Onboarding API - Unauthorized: No userId found');
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log('Onboarding API - Processing request for userId:', userId);
    const body = await req.json();
    console.log('Onboarding API - Request body:', body);

    const {
      name,
      profession,
      legalKnowledge,
      jailTimeYears,
      warningSeverity,
      pendingCaseType,
    } = body;

    if (!name || !profession || !legalKnowledge) {
      console.error('Onboarding API - Missing required fields:', {
        name: !!name,
        profession: !!profession,
        legalKnowledge: !!legalKnowledge,
      });
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (existingUser) {
      console.error('Onboarding API - User already exists:', userId);
      return new NextResponse("User already exists", { status: 409 }); // 409 Conflict
    }

    // Get user from Clerk
    const clerkUser = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    if (!clerkUser?.email_addresses?.[0]?.email_address) {
      console.error('Onboarding API - No email found in Clerk for user:', userId);
      return new NextResponse("User email not found", { status: 400 });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        clerkId: userId,
        email: clerkUser.email_addresses[0].email_address,
        name,
        profession,
        legalKnowledge,
        jailTimeYears: jailTimeYears || null,
        warningSeverity: warningSeverity || null,
        pendingCaseType: pendingCaseType || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    console.log('Onboarding API - Created new user:', newUser);
    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Onboarding API - Error details:", {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error
    });
    return new NextResponse("Internal error", { status: 500 });
  }
}
