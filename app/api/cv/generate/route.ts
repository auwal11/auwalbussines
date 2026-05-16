import { generateText, Output } from "ai"
import { NextResponse } from "next/server"
import { z } from "zod"

const CVSchema = z.object({
  name: z.string(),
  title: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  website: z.string(),
  summary: z.string().describe("A powerful 2-3 sentence professional summary"),
  experience: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      period: z.string(),
      achievements: z
        .array(z.string())
        .describe("3-5 bullet points with quantified achievements using action verbs"),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      school: z.string(),
      year: z.string(),
    })
  ),
  skills: z.array(z.string()).describe("Technical skills as individual items"),
  certifications: z.array(z.string()),
  atsScore: z
    .number()
    .describe("ATS compatibility score from 0-100 based on keyword optimization"),
})

export async function POST(req: Request) {
  try {
    const { name, title, email, phone, location, website, style, rawBio } =
      await req.json()

    if (!name || !rawBio) {
      return NextResponse.json(
        { error: "Name and bio data are required" },
        { status: 400 }
      )
    }

    const styleGuides: Record<string, string> = {
      modern:
        "Clean, minimalist layout with clear sections. Focus on metrics and results.",
      executive:
        "Formal, authoritative tone. Emphasize leadership and strategic achievements.",
      tech: "Technical depth with specific technologies. Include system scale and performance metrics.",
      creative:
        "Dynamic language with innovation focus. Highlight unique projects and creative solutions.",
    }

    const result = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: `You are an expert CV writer and career consultant. Your job is to transform raw bio data into a polished, ATS-optimized professional CV.

Style Guide: ${styleGuides[style] || styleGuides.modern}

Guidelines:
- Use powerful action verbs: Built, Delivered, Led, Scaled, Engineered, Architected, Spearheaded, Implemented, Optimized, Transformed
- Add quantified achievements (numbers, percentages, metrics) wherever possible
- Include industry-relevant keywords for ATS optimization
- Write a compelling professional summary (2-3 sentences)
- Structure experience with 3-5 bullet points per role
- Extract and organize skills logically
- Calculate an ATS score (0-100) based on keyword density, formatting, and content quality

If certain fields are empty in the input, generate reasonable placeholders based on the bio data, or leave them as empty strings if not inferrable.`,
      prompt: `Create a professional CV from this data:

Name: ${name}
Title: ${title || "Professional"}
Email: ${email || ""}
Phone: ${phone || ""}
Location: ${location || ""}
Website: ${website || ""}

Raw Bio Data:
${rawBio}

Generate a complete, ATS-optimized CV structure.`,
      output: Output.object({
        schema: CVSchema,
      }),
      maxOutputTokens: 2000,
    })

    const cv = result.object

    return NextResponse.json({
      cv: {
        name: cv.name,
        title: cv.title,
        email: cv.email,
        phone: cv.phone,
        location: cv.location,
        website: cv.website,
        summary: cv.summary,
        experience: cv.experience,
        education: cv.education,
        skills: cv.skills,
        certifications: cv.certifications,
      },
      atsScore: cv.atsScore,
    })
  } catch (error) {
    console.error("[v0] CV generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate CV" },
      { status: 500 }
    )
  }
}
