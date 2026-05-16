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
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-[#0F172A]/70 border-b transition-colors ${
        scrolled ? "border-zinc-800/80" : "border-zinc-800/30"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.2em] text-[#F8FAFC]"
          aria-label="AUWAL home"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.7)]" />
          <span>AUWAL</span>
          <span aria-hidden className="ml-0.5 inline-block h-3.5 w-[2px] bg-amber-400 animate-blink" />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 font-mono text-[13px]">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group flex items-center gap-1.5 text-[#94A3B8] hover:text-amber-300 transition-colors"
                >
                  <span className="text-zinc-600 group-hover:text-amber-400/70 transition-colors">
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
            <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-amber-400" />
          </span>
          <span className="font-mono text-xs text-[#CBD5E1]">Available for work</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#CBD5E1] hover:bg-zinc-800/60 md:hidden"
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
          className="border-t border-zinc-800/60 bg-[#0F172A]/90 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-4 py-3 font-mono text-sm">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-[#CBD5E1] hover:bg-zinc-800/60 hover:text-amber-300"
                >
                  <span className="text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-2 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-amber-400" />
              </span>
              <span className="text-xs text-[#CBD5E1]">Available for work</span>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  )
}
