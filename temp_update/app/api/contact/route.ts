import { NextResponse } from "next/server"
import { z } from "zod"

export const runtime = "nodejs"

const TO_EMAIL = "awntechdigitalservices@gmail.com"

// Resend's shared sandbox sender — works without verifying a domain.
// Once you verify your own domain on resend.com, swap this for `noreply@yourdomain.com`.
const FROM_EMAIL = "AUWAL Portfolio <onboarding@resend.dev>"

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(120),
  email: z.string().trim().email("Please enter a valid email").max(200),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10, "Message is too short").max(5000),
  // honeypot — bots fill this, humans don't
  website: z.string().optional(),
})

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.log("[v0] RESEND_API_KEY is not configured")
      return NextResponse.json(
        { error: "Email service is not configured. Please try again later." },
        { status: 500 },
      )
    }

    const body = await request.json().catch(() => null)
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]
      return NextResponse.json(
        { error: firstIssue?.message ?? "Invalid form submission" },
        { status: 400 },
      )
    }

    // Honeypot triggered — pretend success but don't actually send.
    if (parsed.data.website && parsed.data.website.length > 0) {
      console.log("[v0] Honeypot triggered, dropping submission")
      return NextResponse.json({ ok: true })
    }

    const { name, email, subject, message } = parsed.data

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject)
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>")

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; background: #09090b; color: #e4e4e7; padding: 32px; border-radius: 12px;">
        <div style="border-left: 3px solid #fbbf24; padding-left: 16px; margin-bottom: 24px;">
          <p style="font-family: monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #fbbf24; margin: 0;">// New Inquiry</p>
          <h1 style="font-size: 22px; color: #fafafa; margin: 6px 0 0 0;">${safeSubject}</h1>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; color: #71717a; font-family: monospace; font-size: 12px; width: 90px; vertical-align: top;">FROM</td>
            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #71717a; font-family: monospace; font-size: 12px; vertical-align: top;">EMAIL</td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #fbbf24; text-decoration: none;">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #71717a; font-family: monospace; font-size: 12px; vertical-align: top;">SUBJECT</td>
            <td style="padding: 8px 0; color: #fafafa; font-size: 14px;">${safeSubject}</td>
          </tr>
        </table>

        <div style="background: #18181b; border: 1px solid #27272a; border-radius: 8px; padding: 20px; line-height: 1.6; color: #d4d4d8; font-size: 14px;">
          ${safeMessage}
        </div>

        <p style="margin-top: 24px; font-family: monospace; font-size: 11px; color: #52525b; letter-spacing: 0.15em; text-transform: uppercase;">
          Sent from auwal.dev contact form
        </p>
      </div>
    `

    const text = [
      `New inquiry — ${subject}`,
      "",
      `From:    ${name}`,
      `Email:   ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
      "",
      "—",
      "Sent from auwal.dev contact form",
    ].join("\n")

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject} — ${name}`,
        html,
        text,
      }),
    })

    if (!res.ok) {
      const errBody = await res.text().catch(() => "")
      console.log("[v0] Resend API error:", res.status, errBody)

      // Try to extract a helpful, human-readable message from Resend
      let detail = ""
      try {
        const parsed = JSON.parse(errBody) as { message?: string; name?: string }
        detail = parsed.message || parsed.name || ""
      } catch {
        detail = errBody.slice(0, 240)
      }

      // Common Resend testing-mode error: only the account owner's email can receive.
      const isTestingModeBlock =
        /can only send testing emails|verify a domain|to your own email/i.test(detail)

      const friendly = isTestingModeBlock
        ? "Email sender is in testing mode. Verify a domain on resend.com or sign up to Resend with awntechdigitalservices@gmail.com."
        : detail
          ? `Resend: ${detail}`
          : "Could not deliver your message. Please try again or email me directly."

      return NextResponse.json({ error: friendly }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.log("[v0] /api/contact unexpected error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
