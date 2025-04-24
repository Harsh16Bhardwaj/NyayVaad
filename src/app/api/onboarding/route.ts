import { NextResponse } from "next/server";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { getAuth } from '@clerk/nextjs/server';


export async function POST(req: Request) {
  try {
    const { user, isSignedIn } = useUser();
    if (!isSignedIn) {
      return new NextResponse("Unauthorized", { status: 401 });
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

    const { data, error } = await supabase
      .from("users")
      .upsert({
        name: null, 
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
      console.error("Supabase error:", error);
      return new NextResponse("Database error", { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Onboarding error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
