"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const typewriterPhrases = [
  "Building Smart Websites...",
  "Developing AI-Powered Apps...",
  "Scaling Your Digital Presence...",
  "Automating Business Operations...",
  "Transforming Ideas Into Revenue...",
]

export function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const phrase = typewriterPhrases[currentPhrase]
    const typeSpeed = isDeleting ? 30 : 60
    const pauseTime = isDeleting ? 500 : 2000

    if (!isDeleting && displayText === phrase) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setCurrentPhrase((prev) => (prev + 1) % typewriterPhrases.length)
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : phrase.slice(0, prev.length + 1)
      )
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhrase])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div aria-hidden className="absolute inset-0 bg-dot-grid opacity-60" />
      <div aria-hidden className="absolute inset-0 bg-grid-mask" />
      
      {/* Ambient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[600px] w-[600px] rounded-full bg-[#00d4aa]/[0.08] blur-[120px] animate-orb-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[500px] w-[500px] rounded-full bg-[#7c3aed]/[0.06] blur-[100px] animate-orb-float-slow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/3 bottom-0 h-[400px] w-[400px] rounded-full bg-[#00d4aa]/[0.05] blur-[80px] animate-orb-float delay-500"
      />

      {/* Scan beam */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[50%] bg-gradient-to-b from-transparent via-[#00d4aa]/[0.04] to-transparent blur-2xl animate-scan-beam" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/10 px-4 py-2 text-sm font-medium text-[#00d4aa] backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          <span>Powered by AI</span>
          <span className="h-2 w-2 rounded-full bg-[#00d4aa] animate-pulse-dot" />
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-up delay-100 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="text-gradient">Auwal</span>{" "}
          <span className="text-[#f0f4ff]">Business</span>
        </h1>

        {/* Typewriter subheadline */}
        <div className="animate-fade-up delay-200 h-12 sm:h-14 mb-8 flex items-center justify-center">
          <p className="font-mono text-lg sm:text-xl md:text-2xl text-[#8b9bc8]">
            <span className="text-[#00d4aa]">{displayText}</span>
            <span className="typing-caret" />
          </p>
        </div>

        {/* Description */}
        <p className="animate-fade-up delay-300 mx-auto max-w-2xl text-base sm:text-lg text-[#8b9bc8] mb-10 leading-relaxed">
          We build intelligent websites, powerful dashboards, and AI-driven systems
          tailored for businesses ready to compete in the modern economy.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#contact"
            className="group btn-primary inline-flex items-center gap-2 px-8 py-4 text-base font-semibold"
          >
            <span>Start Your Project</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <button
            onClick={() => {
              const event = new CustomEvent("openAIChat")
              window.dispatchEvent(event)
            }}
            className="btn-ghost inline-flex items-center gap-2 px-8 py-4 text-base font-medium"
          >
            <Sparkles className="h-5 w-5" />
            <span>Talk to AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent"
      />
    </section>
  )
}
