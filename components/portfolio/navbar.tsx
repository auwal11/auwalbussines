'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#expertise', label: 'Expertise' },
    { href: '#work', label: 'Case Studies' },
    { href: '#methodology', label: 'Methodology' },
    { href: '#publications', label: 'Publications' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-primary/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo - Spinning dot with text */}
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center relative overflow-hidden">
                <div className="w-2 h-2 bg-background rounded-full" />
                <div className="absolute w-1 h-1 bg-primary rounded-full animate-spin" style={{ width: '6px', height: '6px', border: '1px solid', borderColor: 'var(--background)', animation: 'spin 3s linear infinite' }} />
              </div>
            </div>
            <span className="font-mono text-sm md:text-base font-bold text-foreground uppercase tracking-wider">
              Security Researcher
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs md:text-sm font-mono uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full bg-primary text-background font-mono text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:-translate-y-0.5 cursor-pointer"
            >
              Start Project
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary hover:border-primary/40 transition-all"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-primary/10 bg-surface/50 backdrop-blur-md">
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-mono uppercase tracking-wider text-foreground/70 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="mt-4 px-6 py-2.5 rounded-full bg-primary text-background font-mono text-sm font-bold uppercase tracking-wider text-center transition-all hover:shadow-lg hover:shadow-primary/50"
              >
                Start Project
              </a>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  )
}
