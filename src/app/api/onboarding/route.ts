import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const {
      language,
      profession,
      legalKnowledge,
      involvements,
      jailTimeYears,
      warningSeverity,
      pendingCaseType,
      fines,
    } = body;

    // Validate required fields
    if (!language || !profession || !legalKnowledge) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Insert user data into Supabase
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: userId, // You might want to get the actual email from Clerk
        name: null, // You can add this later
        profession,
        legal_knowledge: legalKnowledge,
        jail_time_years: jailTimeYears || null,
        warning_severity: warningSeverity || null,
        pending_case_type: pendingCaseType || null,
        language,
        legal_involvements: involvements,
        fines: fines || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return new NextResponse('Database error', { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('Onboarding error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 