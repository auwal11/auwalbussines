"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Sparkles } from "lucide-react"

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#security", label: "Security Research" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#020409]/80 backdrop-blur-xl border-b border-[#00ffb4]/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#00ffb4]/10 border border-[#00ffb4]/30 group-hover:border-[#00ffb4]/60 transition-colors">
              <span className="font-display font-bold text-[#00ffb4] text-sm">A</span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00ffb4] animate-pulse-dot" />
            </div>
            <span className="font-display font-semibold text-[#e8f0fe] text-lg hidden sm:inline">
              Auwal<span className="text-[#00ffb4]">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#6b7c99] hover:text-[#00ffb4] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const event = new CustomEvent("openAIChat")
                window.dispatchEvent(event)
              }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ffb4]/10 border border-[#00ffb4]/30 text-[#00ffb4] text-sm font-medium hover:bg-[#00ffb4]/20 hover:border-[#00ffb4]/50 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Chat</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#6b7c99] hover:text-[#00ffb4] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#00ffb4]/10 animate-fade-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-[#6b7c99] hover:text-[#00ffb4] hover:bg-[#00ffb4]/5 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  const event = new CustomEvent("openAIChat")
                  window.dispatchEvent(event)
                }}
                className="mx-4 mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#00ffb4]/10 border border-[#00ffb4]/30 text-[#00ffb4] font-medium"
              >
                <Sparkles className="h-4 w-4" />
                <span>Talk to AI Assistant</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
