'use client'

import { useEffect, useState } from 'react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 70)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed left-0 right-0 z-40 px-12 h-16 flex items-center justify-between transition-all duration-400 ${
        isMounted && isScrolled
          ? 'top-0 bg-background/92 backdrop-blur-xl border-b border-border'
          : 'top-11'
      }`}
    >
      {/* Left: Spinning Logo + Name */}
      <div className="flex items-center gap-4">
        {/* Spinning pinwheel logo 28px */}
        <svg
          viewBox="0 0 100 100"
          className="w-7 h-7 animate-spin flex-shrink-0"
          style={{ animationDuration: '8s' }}
        >
          <path d="M 50 20 Q 70 30, 75 50 Q 70 35, 50 30 Z" fill="#ff6b35" opacity="0.95" />
          <path d="M 75 50 Q 70 70, 50 80 Q 60 65, 70 60 Z" fill="#a855f7" opacity="0.95" />
          <path d="M 50 80 Q 30 70, 25 50 Q 35 65, 50 70 Z" fill="#ec4899" opacity="0.85" />
          <path d="M 25 50 Q 30 30, 50 20 Q 40 35, 30 45 Z" fill="#4ade80" opacity="0.85" />
        </svg>
        <span className="font-display font-800 text-sm tracking-tight text-white">
          Auwal Bashar
        </span>
      </div>

      {/* Center: Nav Links */}
      <div className="hidden md:flex items-center gap-12">
        {[
          { label: 'Research', href: '#about' },
          { label: 'Methodology', href: '#methodology' },
          { label: 'Timeline', href: '#timeline' },
          { label: 'Contact', href: '#contact' },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-mono text-10px uppercase tracking-widest text-text-muted hover:text-white transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right: CTA Button */}
      <button className="btn-ghost font-mono text-xs font-600 tracking-widest">
        Open to Work
      </button>
    </nav>
  )
}
