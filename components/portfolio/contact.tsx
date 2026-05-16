"use client"

import { ChevronDown, Github, Loader2, Mail, Send, Shield, ShieldCheck, Swords } from "lucide-react"
import { useState, type FormEvent } from "react"
import { toast } from "sonner"
import { Reveal } from "./reveal"

const SUBJECTS = [
  "Bug Bounty Collaboration",
  "Audit Engagement",
  "General Inquiry",
] as const

const SOCIALS = [
  {
    icon: Mail,
    label: "Email",
    handle: "awntechdigitalservices@gmail.com",
    href: "mailto:awntechdigitalservices@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    handle: "github.com/auwntech-audit",
    href: "https://github.com/auwntech-audit",
  },
  {
    icon: Shield,
    label: "HackerOne",
    handle: "@auwaldeve",
    href: "https://hackerone.com/auwaldeve",
  },
  {
    icon: ShieldCheck,
    label: "HackenProof",
    handle: "@auwal",
    href: "https://hackenproof.com",
  },
  {
    icon: Swords,
    label: "Code4rena",
    handle: "@auwal",
    href: "https://code4rena.com",
  },
] as const

export function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submitting) return

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? ""), // honeypot
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}))

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Failed to send message")
      }

      toast.success("Message sent", {
        description: "Thanks — I'll get back to you within 24 hours.",
      })
      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 4000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong"
      toast.error("Could not send message", {
        description: msg,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
            / 04 — Contact
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Let&apos;s connect.
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-[#94A3B8]">
            Open to security collaborations, audit engagements, and bug bounty partnerships.
            Messages are delivered straight to my inbox.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative overflow-hidden rounded-2xl border border-[rgba(0,229,255,0.1)]/80 bg-[#1E293B]/40 p-6 sm:p-8"
            >
              {/* Subtle top accent line */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
              />

              {/* Honeypot — visually hidden from users, visible to bots */}
              <div aria-hidden className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                    disabled={submitting}
                    className="mt-2 block w-full rounded-md border border-[rgba(0,229,255,0.15)] bg-[#1E293B]/70 px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:opacity-60"
                    placeholder="Satoshi N."
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    disabled={submitting}
                    className="mt-2 block w-full rounded-md border border-[rgba(0,229,255,0.15)] bg-[#1E293B]/70 px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:opacity-60"
                    placeholder="you@protocol.xyz"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]"
                >
                  Subject
                </label>
                <div className="relative mt-2">
                  <select
                    id="subject"
                    name="subject"
                    defaultValue={SUBJECTS[0]}
                    disabled={submitting}
                    className="block w-full appearance-none rounded-md border border-[rgba(0,229,255,0.15)] bg-[#1E293B]/70 px-3 py-2 pr-9 text-sm text-[#F8FAFC] focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:opacity-60"
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} className="bg-[#1E293B]">
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[#94A3B8]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  disabled={submitting}
                  className="mt-2 block w-full rounded-md border border-[rgba(0,229,255,0.15)] bg-[#1E293B]/70 px-3 py-2 text-sm text-[#F8FAFC] placeholder:text-[#64748B] focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:opacity-60"
                  placeholder="Briefly describe your protocol or engagement scope..."
                />
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <p
                  role="status"
                  aria-live="polite"
                  className={`font-mono text-[11px] ${
                    sent ? "text-[#00E5FF]" : "text-[#64748B]"
                  }`}
                >
                  {sent ? "// transmission received" : "// encrypted in transit"}
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-md bg-[#00E5FF] px-5 py-2.5 font-mono text-sm font-semibold text-zinc-950 transition hover:bg-[rgba(0,229,255,0.08)]-300 hover:shadow-[0_0_28px_-4px_rgba(251,191,36,0.6)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal className="lg:col-span-2" delayMs={120}>
            <ul className="grid h-full grid-cols-1 gap-3">
              {SOCIALS.map(({ icon: Icon, label, handle, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                    className="group flex items-center gap-3 rounded-xl border border-[rgba(0,229,255,0.1)]/80 bg-[#1E293B]/40 p-4 transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-[#1E293B]/70"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[rgba(0,229,255,0.1)] bg-[#0F172A] text-[#CBD5E1] transition group-hover:border-amber-400/40 group-hover:text-[#00E5FF]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                        {label}
                      </p>
                      <p className="truncate text-sm text-[#CBD5E1] group-hover:text-[#00E5FF]">
                        {handle}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
