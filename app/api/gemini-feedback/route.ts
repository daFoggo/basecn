import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { code, exerciseStatement, userId, sessionId } = await req.json();

    if (!code || !exerciseStatement) {
      return new Response(
        JSON.stringify({
          error: "Missing code or exercise statement",
          timestamp: new Date().toISOString(),
        }),
        { status: 400 }
      );
    }

    const prompt = `You are a patient programming tutor helping a student solve a coding exercise step by step.

EXERCISE:
${exerciseStatement}

STUDENT'S CURRENT CODE:
${code}

INSTRUCTIONS:
- Act as a supportive mentor, not a solution provider
- Review the current progress and identify what's working well
- If there are errors, explain them gently and suggest ONE small fix at a time
- If the approach is wrong, guide them to realize it through questions
- Only give hints for the immediate next step, never the complete solution
- Use encouraging language and acknowledge their effort
- If code is correct, congratulate and suggest improvements or ask about their thought process
- Keep responses concise but detailed enough to be helpful
- Use Vietnamese language for the response

RESPONSE FORMAT:
- Respond in Vietnamese
- Start with acknowledging their current progress
- Point out what's working correctly
- Identify the main issue (if any) they should focus on next
- Provide ONE specific, actionable hint or question
- End with encouragement

Remember: Your goal is to help them learn, not to solve the problem for them.`;

    const result = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 500,
    });

    const response = {
        feedback: result.text,
        metadata: {
          messageId: `msg_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 11)}`,
          timestamp: new Date().toISOString(),
          sender: "ai_tutor",
          type: "feedback",
          sessionId: sessionId || `session_${Date.now()}`,
          userId: userId || "anonymous",
          model: "gemini-2.0-flash-exp",
          tokenUsage: {
            promptTokens: result.usage?.promptTokens || 0,
            completionTokens: result.usage?.completionTokens || 0,
            totalTokens: result.usage?.totalTokens || 0,
          },
        },
        suggestions: {
          nextAction: "review_and_implement",
        },
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);

    const errorResponse = {
      success: false,
      error: {
        message: "Unable to generate feedback",
        code: "AI_GENERATION_ERROR",
        timestamp: new Date().toISOString(),
        details:
          process.env.NODE_ENV === "development"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
