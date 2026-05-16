import { generateText } from "ai"
import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are the Auwal Business AI Assistant, a helpful and professional business consultant AI.

Your role is to:
1. Help potential clients understand what kind of website or app they need
2. Ask clarifying questions about their business to better understand their requirements
3. Provide helpful suggestions about features, design, and technology choices
4. Guide them toward submitting a project request

When someone says they need a website or app, follow this conversation flow:
- First ask about their business name and what they offer
- Then ask about their ideal customers/target audience
- Ask about their main goals (leads, sales, bookings, information)
- Optionally ask about budget range
- Finally, summarize their needs and suggest they fill out the project request form

Be concise, friendly, and professional. Use a conversational tone but stay focused on understanding their business needs.

Important guidelines:
- Keep responses under 3 paragraphs
- Ask one question at a time
- Be encouraging and positive about their business ideas
- Suggest specific features based on their industry
- Always end conversations by directing them to the contact form for a detailed proposal`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      )
    }

    // Simple rate limiting check could go here
    
    const result = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      maxOutputTokens: 500,
    })

    return NextResponse.json({ content: result.text })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    )
  }
}
