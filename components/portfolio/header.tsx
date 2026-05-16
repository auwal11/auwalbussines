"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#engagements", label: "Engagements" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        scrolled 
          ? "bg-[#0F172A]/80 border-[rgba(0,229,255,0.1)]" 
          : "bg-[#0F172A]/40 border-[rgba(0,229,255,0.05)]"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm font-bold tracking-[0.15em] text-[#F8FAFC]"
          aria-label="AUWAL home"
        >
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.6)]" />
          <span>AUWAL</span>
          <span aria-hidden className="ml-0.5 inline-block h-3.5 w-[2px] bg-[#00E5FF] animate-blink" />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 font-mono text-[12px] font-medium">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1.5 text-[#94A3B8] hover:text-[#00E5FF] transition-colors duration-200"
                >
                  <span className="text-[#64748B] group-hover:text-[#00E5FF]/70 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[#00E5FF] opacity-75 animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-[#00E5FF]" />
          </span>
          <span className="font-mono text-xs text-[#CBD5E1]">Available for engagements</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#94A3B8] hover:bg-[#1E293B]/60 hover:text-[#00E5FF] transition-colors md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[rgba(0,229,255,0.1)] bg-[#0F172A]/95 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-3 font-mono text-sm">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-[#CBD5E1] hover:bg-[#1E293B]/60 hover:text-[#00E5FF] transition-colors"
                >
                  <span className="text-[#64748B]">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-2 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-[#00E5FF] opacity-75 animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-[#00E5FF]" />
              </span>
              <span className="text-xs text-[#CBD5E1]">Available for engagements</span>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
