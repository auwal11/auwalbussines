"use client"

import { useState } from "react"
import { Send, CheckCircle, Mail, Github, ExternalLink } from "lucide-react"
import { toast } from "sonner"

const inquiryTypes = [
  "Bug Bounty Collaboration",
  "Audit Engagement",
  "General Inquiry",
]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to send message")

      setIsSuccess(true)
      toast.success("Message sent! I'll get back to you soon.")
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit = formData.name && formData.email && formData.message

  if (isSuccess) {
    return (
      <section id="contact" className="relative py-20 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="glass-card p-12 rounded-2xl text-center animate-fade-up">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00d4aa]/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-[#00d4aa]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#f0f4ff] mb-4">
              Message Sent!
            </h2>
            <p className="text-[#8b9bc8]">Thank you for reaching out. I&apos;ll get back to you soon.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-[#8b9bc8] max-w-2xl mx-auto">
            Open to security collaborations, audit engagements, and bug bounty partnerships
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info & Social Links */}
          <div className="animate-fade-up delay-100">
            <div className="space-y-6">
              {/* Email */}
              <a
                href="mailto:alhajiauwalalhaji@gmail.com"
                className="group flex items-center gap-4 p-4 rounded-xl bg-[rgba(15,25,50,0.85)] border border-[rgba(0,212,170,0.2)] hover:border-[rgba(0,212,170,0.4)] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#00d4aa]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-mono text-[#8b9bc8] uppercase">Email</div>
                  <div className="text-[#f0f4ff] group-hover:text-[#00d4aa] transition-colors truncate">
                    alhajiauwalalhaji@gmail.com
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[#8b9bc8]" />
              </a>

              {/* Social Links */}
              <div className="space-y-3 pt-4">
                <p className="text-xs font-mono text-[#8b9bc8] uppercase tracking-wider">Social Links</p>
                <a
                  href="https://github.com/auwaldeve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-all"
                >
                  <Github className="h-4 w-4 text-[#7c3aed]" />
                  <span className="text-sm text-[#f0f4ff] group-hover:text-[#7c3aed] transition-colors">
                    github.com/auwaldeve
                  </span>
                </a>
                <a
                  href="https://hackerone.com/auwaldeve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-all"
                >
                  <ExternalLink className="h-4 w-4 text-[#7c3aed]" />
                  <span className="text-sm text-[#f0f4ff] group-hover:text-[#7c3aed] transition-colors">
                    HackerOne: @auwaldeve
                  </span>
                </a>
                <a
                  href="https://hackenproof.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-all"
                >
                  <ExternalLink className="h-4 w-4 text-[#7c3aed]" />
                  <span className="text-sm text-[#f0f4ff] group-hover:text-[#7c3aed] transition-colors">
                    HackenProof
                  </span>
                </a>
                <a
                  href="https://cantina.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 p-3 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 hover:border-[#7c3aed]/40 transition-all"
                >
                  <ExternalLink className="h-4 w-4 text-[#7c3aed]" />
                  <span className="text-sm text-[#f0f4ff] group-hover:text-[#7c3aed] transition-colors">
                    Cantina: Auwalbussines
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="animate-fade-up delay-200 space-y-6">
            <div>
              <label className="block text-sm font-mono text-[#8b9bc8] mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-neural w-full px-4 py-3 bg-[rgba(15,25,50,0.85)] border border-[rgba(0,212,170,0.2)] rounded-lg text-[#f0f4ff] focus:border-[#00d4aa]/50 focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-[#8b9bc8] mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-neural w-full px-4 py-3 bg-[rgba(15,25,50,0.85)] border border-[rgba(0,212,170,0.2)] rounded-lg text-[#f0f4ff] focus:border-[#00d4aa]/50 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-[#8b9bc8] mb-2">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="input-neural w-full px-4 py-3 bg-[rgba(15,25,50,0.85)] border border-[rgba(0,212,170,0.2)] rounded-lg text-[#f0f4ff] focus:border-[#00d4aa]/50 focus:outline-none transition-colors"
              >
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono text-[#8b9bc8] mb-2">Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-neural w-full px-4 py-3 bg-[rgba(15,25,50,0.85)] border border-[rgba(0,212,170,0.2)] rounded-lg text-[#f0f4ff] focus:border-[#00d4aa]/50 focus:outline-none transition-colors min-h-[120px] resize-none"
                placeholder="Tell me about your project or inquiry..."
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="btn-primary w-full py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
