"use client"

import { useEffect, useState } from "react"
import { MessageSquareText } from "lucide-react"

export function FloatingCTA() {
  const [show, setShow] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 600
      // Hide when contact section is in view to avoid overlap with form
      const contact = document.getElementById("contact")
      let inContact = false
      if (contact) {
        const rect = contact.getBoundingClientRect()
        inContact = rect.top < window.innerHeight * 0.6 && rect.bottom > 0
      }
      setShow(scrolled)
      setHidden(inContact)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const visible = show && !hidden

  return (
    <a
      href="#contact"
      aria-label="Open contact form"
      className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-[#0F0E1A]/90 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-300 hover:border-amber-400/60 hover:bg-[#0F0E1A] hover:text-amber-200 hover:shadow-[0_8px_40px_-6px_rgba(251,191,36,0.4)] sm:bottom-6 sm:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping" />
        <span className="relative h-2 w-2 rounded-full bg-amber-400" />
      </span>
      <MessageSquareText className="h-3.5 w-3.5" />
      Hire me
    </a>
  )
}
