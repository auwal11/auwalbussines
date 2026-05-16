"use client"

import { useState } from "react"
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Phone, MapPin } from "lucide-react"
import { toast } from "sonner"

const businessTypes = [
  "E-Commerce / Online Store",
  "Professional Services",
  "Restaurant / Food Business",
  "Healthcare / Medical",
  "Education / Training",
  "Real Estate",
  "Technology / SaaS",
  "Other",
]

const projectNeeds = [
  "Business Website",
  "Mobile App",
  "Admin Dashboard",
  "AI Integration",
  "E-Commerce Platform",
  "Custom Solution",
]

const budgetRanges = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
  "Not sure yet",
]

export function Contact() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    description: "",
    needs: [] as string[],
    budget: "",
    timeline: "",
  })

  const handleNeedToggle = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      needs: prev.needs.includes(need)
        ? prev.needs.filter((n) => n !== need)
        : [...prev.needs, need],
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/client-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit")
      }

      setIsSuccess(true)
      toast.success("Request submitted! We'll be in touch soon.")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = formData.name && formData.email
  const canProceedStep2 = formData.businessName && formData.businessType
  const canSubmit = formData.needs.length > 0

  if (isSuccess) {
    return (
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <div className="glass-card p-12 rounded-3xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00ffb4]/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-[#00ffb4]" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#e8f0fe] mb-4">
              Request Submitted!
            </h2>
            <p className="text-[#6b7c99] mb-8">
              Thank you for your interest. We&apos;ll review your project details and get back to you within 24 hours.
            </p>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3"
            >
              <Phone className="h-5 w-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#00ffb4]/[0.04] blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - Info */}
          <div>
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#00ffb4]/20 bg-[#00ffb4]/5 px-4 py-1.5 text-xs font-mono text-[#00ffb4] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ffb4]" />
              GET STARTED
            </div>
            <h2 className="animate-fade-up delay-100 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#e8f0fe] mb-6">
              Start Your Project
            </h2>
            <p className="animate-fade-up delay-200 text-[#6b7c99] text-lg mb-8 leading-relaxed">
              Tell us about your business and project needs. Our AI will generate a customized proposal, and we&apos;ll reach out to discuss the details.
            </p>

            {/* Contact info */}
            <div className="animate-fade-up delay-300 space-y-4">
              <a
                href="mailto:awntechdigitalservices@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0a1628]/50 border border-[#ffffff08] hover:border-[#00ffb4]/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-[#00ffb4]" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#6b7c99] uppercase">Email</div>
                  <div className="text-[#e8f0fe] group-hover:text-[#00ffb4] transition-colors">
                    awntechdigitalservices@gmail.com
                  </div>
                </div>
              </a>
              <a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#0a1628]/50 border border-[#ffffff08] hover:border-[#00ffb4]/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-[#00ffb4]" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#6b7c99] uppercase">WhatsApp</div>
                  <div className="text-[#e8f0fe] group-hover:text-[#00ffb4] transition-colors">
                    +234 801 234 5678
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0a1628]/50 border border-[#ffffff08]">
                <div className="w-12 h-12 rounded-xl bg-[#7b2fff]/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-[#7b2fff]" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[#6b7c99] uppercase">Location</div>
                  <div className="text-[#e8f0fe]">Nigeria (Remote Worldwide)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="animate-fade-up delay-400">
            <div className="glass-card rounded-3xl p-6 sm:p-8">
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex-1 flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono transition-colors ${
                        step >= s
                          ? "bg-[#00ffb4] text-[#020409]"
                          : "bg-[#ffffff08] text-[#6b7c99]"
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div
                        className={`flex-1 h-0.5 transition-colors ${
                          step > s ? "bg-[#00ffb4]" : "bg-[#ffffff08]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: About You */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-semibold text-[#e8f0fe]">
                    About You
                  </h3>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="input-neural w-full px-4 py-3"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="input-neural w-full px-4 py-3"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className="input-neural w-full px-4 py-3"
                      placeholder="+234 ..."
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canProceedStep1}
                    className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: About Your Business */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-semibold text-[#e8f0fe]">
                    About Your Business
                  </h3>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData((p) => ({ ...p, businessName: e.target.value }))}
                      className="input-neural w-full px-4 py-3"
                      placeholder="Your business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                      Business Type *
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData((p) => ({ ...p, businessType: e.target.value }))}
                      className="input-neural w-full px-4 py-3"
                    >
                      <option value="">Select type...</option>
                      {businessTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                      Tell us about your business
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                      className="input-neural w-full px-4 py-3 min-h-[100px] resize-none"
                      placeholder="What does your business do? Who are your customers?"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="btn-ghost flex-1 py-3"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Project Details */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-display text-xl font-semibold text-[#e8f0fe]">
                    Project Details
                  </h3>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-3">
                      What do you need? *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {projectNeeds.map((need) => (
                        <button
                          key={need}
                          type="button"
                          onClick={() => handleNeedToggle(need)}
                          className={`px-3 py-2 rounded-lg text-sm text-left transition-all ${
                            formData.needs.includes(need)
                              ? "bg-[#00ffb4] text-[#020409] font-medium"
                              : "bg-[#ffffff05] text-[#6b7c99] border border-[#ffffff08] hover:border-[#00ffb4]/30"
                          }`}
                        >
                          {need}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
                      className="input-neural w-full px-4 py-3"
                    >
                      <option value="">Select budget...</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                      Timeline
                    </label>
                    <input
                      type="text"
                      value={formData.timeline}
                      onChange={(e) => setFormData((p) => ({ ...p, timeline: e.target.value }))}
                      className="input-neural w-full px-4 py-3"
                      placeholder="e.g., 2 weeks, 1 month, ASAP"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="btn-ghost flex-1 py-3"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!canSubmit || isSubmitting}
                      className="btn-primary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Submit Request
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
