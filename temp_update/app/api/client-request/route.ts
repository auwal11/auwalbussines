import { createClient } from "@/lib/supabase/server"
import { generateText } from "ai"
import { NextResponse } from "next/server"
import { z } from "zod"

const requestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  businessName: z.string().min(1, "Business name is required"),
  businessType: z.string().min(1, "Business type is required"),
  description: z.string().optional(),
  needs: z.array(z.string()).min(1, "At least one project need is required"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
})

const PROPOSAL_PROMPT = `You are a professional business consultant. Based on the client information provided, generate a brief project proposal summary in JSON format.

Return ONLY valid JSON with this structure:
{
  "summary": "2-3 sentence executive summary",
  "recommendedPages": ["list of 4-6 recommended pages/screens"],
  "keyFeatures": ["list of 5-8 key features to implement"],
  "designNotes": "Brief design direction suggestion",
  "techStack": ["list of 3-5 technologies"],
  "estimatedTimeline": "rough timeline estimate",
  "nextSteps": ["2-3 immediate next steps"]
}`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Validate input
    const parsed = requestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Generate AI proposal
    let aiProposal = null
    try {
      const result = await generateText({
        model: "anthropic/claude-sonnet-4-20250514",
        system: PROPOSAL_PROMPT,
        messages: [
          {
            role: "user",
            content: `Client: ${data.name}
Business: ${data.businessName}
Type: ${data.businessType}
Description: ${data.description || "Not provided"}
Needs: ${data.needs.join(", ")}
Budget: ${data.budget || "Not specified"}
Timeline: ${data.timeline || "Not specified"}`,
          },
        ],
        maxOutputTokens: 1000,
      })

      // Parse the JSON response
      const jsonMatch = result.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        aiProposal = JSON.parse(jsonMatch[0])
      }
    } catch (aiError) {
      console.error("[v0] AI proposal generation failed:", aiError)
      // Continue without AI proposal
    }

    // Save to Supabase
    const supabase = await createClient()
    
    const { error: dbError } = await supabase.from("client_requests").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      business_name: data.businessName,
      business_type: data.businessType,
      description: data.description || null,
      needs: data.needs,
      budget_range: data.budget || null,
      timeline: data.timeline || null,
      ai_proposal: aiProposal,
      status: "new",
    })

    if (dbError) {
      console.error("[v0] Database error:", dbError)
      return NextResponse.json(
        { error: "Failed to save your request. Please try again." },
        { status: 500 }
      )
    }

    // Also send email notification (using existing contact API pattern)
    try {
      const RESEND_API_KEY = process.env.RESEND_API_KEY
      if (RESEND_API_KEY) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Auwal Business <onboarding@resend.dev>",
            to: "awntechdigitalservices@gmail.com",
            reply_to: data.email,
            subject: `New Project Request: ${data.businessName}`,
            html: `
              <h2>New Project Request</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone || "Not provided"}</p>
              <p><strong>Business:</strong> ${data.businessName}</p>
              <p><strong>Type:</strong> ${data.businessType}</p>
              <p><strong>Description:</strong> ${data.description || "Not provided"}</p>
              <p><strong>Needs:</strong> ${data.needs.join(", ")}</p>
              <p><strong>Budget:</strong> ${data.budget || "Not specified"}</p>
              <p><strong>Timeline:</strong> ${data.timeline || "Not specified"}</p>
              ${aiProposal ? `<h3>AI Proposal Summary</h3><pre>${JSON.stringify(aiProposal, null, 2)}</pre>` : ""}
            `,
          }),
        })
      }
    } catch {
      // Email is optional, don't fail the request
    }

    return NextResponse.json({ 
      ok: true,
      proposal: aiProposal 
    })
  } catch (error) {
    console.error("[v0] Client request error:", error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
