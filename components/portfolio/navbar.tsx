'use client'

import { useEffect, useState } from 'react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 px-12 h-20 flex items-center justify-between transition-all duration-300 ${
        isMounted && isScrolled
          ? 'bg-background/90 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-3">
        {/* Spinning pinwheel logo */}
        <svg
          viewBox="0 0 100 100"
          className="w-8 h-8 animate-spin"
          style={{ animationDuration: '8s' }}
        >
          <path d="M 50 20 Q 70 30, 75 50 Q 70 35, 50 30 Z" fill="#0ae448" opacity="0.9" />
          <path d="M 75 50 Q 70 70, 50 80 Q 60 65, 70 60 Z" fill="#00d4ff" opacity="0.8" />
          <path d="M 50 80 Q 30 70, 25 50 Q 35 65, 50 70 Z" fill="#0ae448" opacity="0.5" />
          <path d="M 25 50 Q 30 30, 50 20 Q 40 35, 30 45 Z" fill="#00d4ff" opacity="0.6" />
          <circle cx="50" cy="50" r="6" fill="#0ae448" />
        </svg>
        <div className="text-sm font-display font-900 uppercase tracking-wider">
          <div>AB</div>
        </div>
      </div>

      {/* Center: Nav Links */}
      <div className="hidden md:flex items-center gap-12">
        {[
          { label: 'Research', href: '#' },
          { label: 'Methodology', href: '#' },
          { label: 'Timeline', href: '#' },
          { label: 'Contact', href: '#' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: CTA Button */}
      <button className="px-6 py-2 rounded-full border border-primary text-primary font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/30">
        Open to Work
      </button>
    </nav>
  )
}
