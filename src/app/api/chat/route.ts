import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from '@/generated/prisma';
import { LangflowAPI } from "@/lib/langflow";

const prisma = new PrismaClient();

export const runtime = 'nodejs'; // Use Node.js runtime
export const dynamic = 'force-dynamic'; // Disable caching
export const maxDuration = 120; // Set max duration to 120 seconds

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      console.error("[Chat] Authentication failed: No user ID");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || !sessionId) {
      console.error("[Chat] Invalid request body:", { message, sessionId });
      return NextResponse.json(
        { error: "Message and sessionId are required" },
        { status: 400 }
      );
    }

    console.log("[Chat] Processing request:", {
      userId,
      sessionId,
      messageLength: message.length
    });

    // Create a new ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const langflowResponse = await LangflowAPI.chat({
            input_value: message,
            output_type: "chat",
            input_type: "chat",
            session_id: sessionId,
          });

          if (!langflowResponse) {
            controller.error("Empty response from AI service");
            return;
          }

          // Parse the response
          let parsedResponse;
          try {
            parsedResponse = typeof langflowResponse === 'string' 
              ? JSON.parse(langflowResponse.replace(/```json\n|\n```/g, '').trim())
              : langflowResponse;

            console.log("[Chat] Successfully parsed response:", {
              hasAiResponse: !!parsedResponse.ai_next_response,
              hasLaws: !!parsedResponse.laws_related?.length
            });

            // Send the response through the stream
            controller.enqueue(new TextEncoder().encode(JSON.stringify(parsedResponse)));
            controller.close();
          } catch (parseError) {
            console.error("[Chat] Failed to parse response:", {
              error: parseError,
              rawResponse: langflowResponse
            });
            controller.error("Invalid response format from AI service");
          }
        } catch (error) {
          console.error("[Chat] Stream error:", error);
          controller.error(error);
        }
      }
    });

    // Return the stream with appropriate headers
    return new Response(stream, {
      headers: {
        'Content-Type': 'application/json',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });

  } catch (error) {
    console.error("[Chat] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}