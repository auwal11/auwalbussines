'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const magneticRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magneticRef.current) return
    const rect = magneticRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setMousePosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/40 backdrop-blur-xl border-b border-primary/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-display font-bold"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-all">
            <span className="text-primary">A</span>
          </div>
          <span className="text-foreground">Auwal</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Vulnerabilities', href: '#vulnerabilities' },
            { label: 'Timeline', href: '#timeline' },
            { label: 'Reports', href: '#reports' },
            { label: 'Research', href: '#research' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Button - Magnetic Effect */}
        <a
          ref={magneticRef}
          href="#contact"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-secondary text-surface font-semibold text-sm overflow-hidden group transition-all duration-300"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2">
            Get in Touch
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </a>
      </div>
    </nav>
  )
}
