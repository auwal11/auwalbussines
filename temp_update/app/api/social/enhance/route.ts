import { streamText } from "ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { content } = await req.json()

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const result = await streamText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: `You are a social media content expert. Your job is to enhance rough drafts into engaging, professional social media posts.

Guidelines:
- Keep the core message intact
- Add relevant emojis (2-4 max, tastefully placed)
- Include 3-5 relevant hashtags at the end
- Make it conversational and engaging
- Optimize for engagement (questions, calls to action)
- Keep it under 280 characters when possible for Twitter compatibility
- Do NOT use generic phrases like "game-changer" or "exciting news"
- Be authentic and professional

Return ONLY the enhanced content, nothing else.`,
      prompt: `Enhance this social media post:\n\n${content}`,
      maxOutputTokens: 500,
    })

    // Get the full text
    let enhanced = ""
    for await (const chunk of result.textStream) {
      enhanced += chunk
    }

    return NextResponse.json({ enhanced })
  } catch (error) {
    console.error("[v0] Social enhance error:", error)
    return NextResponse.json(
      { error: "Failed to enhance content" },
      { status: 500 }
    )
  }
}
