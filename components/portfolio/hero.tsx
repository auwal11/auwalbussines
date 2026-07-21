'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const logoRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!containerRef.current || !lettersRef.current) return

    // Letter animation - scatter to assemble
    const validLetters = lettersRef.current.filter((el) => el !== null)
    if (validLetters.length > 0) {
      gsap.from(validLetters, {
        x: () => (Math.random() - 0.5) * 1600,
        y: () => (Math.random() - 0.5) * 1200,
        rotation: () => (Math.random() - 0.5) * 720,
        scale: () => Math.random() * 1.5 + 0.2,
        opacity: 0,
        duration: 1.6,
        ease: 'power4.out',
        stagger: { each: 0.035, from: 'random' },
      })

      // Floating animation after landing
      gsap.to(validLetters, {
        y: (i) => Math.sin(i * 0.5) * 8,
        duration: 3,
        ease: 'sine.inOut',
        stagger: 0.01,
        delay: 1.7,
        yoyo: true,
        repeat: -1,
      })
    }

    // Spinning pinwheel logo
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
      })
    }

    // Tagline fade in
    const tagline = containerRef.current.querySelector('[data-tagline]')
    if (tagline) {
      gsap.from(tagline, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.2,
      })
    }

    // CTA button slide up
    const cta = containerRef.current.querySelector('[data-cta]')
    if (cta) {
      gsap.from(cta, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 1.4,
      })
    }
  }, [])

  const firstLine = 'SECURITY'
  const secondLine = 'RESEARCH.'

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-background overflow-hidden flex flex-col justify-between px-12 pt-32 pb-16"
    >
      {/* Background glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl -left-48 top-1/4" />
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-secondary/5 to-transparent blur-3xl -right-40 bottom-1/3" />
      </div>

      {/* Main headline with logo */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {/* Line 1: SECURITY (filled) */}
        <h1 className="text-white font-display font-900 leading-none mb-0">
          <span
            style={{
              fontSize: 'clamp(80px, 15vw, 220px)',
              display: 'block',
              overflow: 'visible',
            }}
          >
            {firstLine.split('').map((letter, i) => (
              <span
                key={i}
                ref={(el) => {
                  lettersRef.current[i] = el
                }}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </span>
        </h1>

        {/* Spinning logo - between the two lines */}
        <div className="relative -my-8 pl-2 h-28 md:h-40 flex items-center pointer-events-none">
          <svg
            ref={logoRef}
            viewBox="0 0 100 100"
            className="w-24 h-24 md:w-40 md:h-40"
            style={{ willChange: 'transform' }}
          >
            {/* Petal 1 - top-right (green) */}
            <path
              d="M 50 20 Q 70 30, 75 50 Q 70 35, 50 30 Z"
              fill="#0ae448"
              opacity="0.9"
            />
            {/* Petal 2 - bottom-right (cyan) */}
            <path
              d="M 75 50 Q 70 70, 50 80 Q 60 65, 70 60 Z"
              fill="#00d4ff"
              opacity="0.8"
            />
            {/* Petal 3 - bottom-left (transparent green) */}
            <path
              d="M 50 80 Q 30 70, 25 50 Q 35 65, 50 70 Z"
              fill="#0ae448"
              opacity="0.5"
            />
            {/* Petal 4 - top-left (transparent cyan) */}
            <path
              d="M 25 50 Q 30 30, 50 20 Q 40 35, 30 45 Z"
              fill="#00d4ff"
              opacity="0.6"
            />
            {/* Center circle */}
            <circle cx="50" cy="50" r="6" fill="#0ae448" />
          </svg>
        </div>

        {/* Line 2: RESEARCH (outline only) */}
        <h2
          className="font-display font-900 leading-none text-transparent"
          style={{
            fontSize: 'clamp(90px, 17vw, 240px)',
            WebkitTextStroke: '2px #0ae448',
            display: 'block',
          }}
        >
          {secondLine.split('').map((letter, i) => (
            <span
              key={`second-${i}`}
              ref={(el) => {
                lettersRef.current[firstLine.length + i] = el
              }}
              className="inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h2>
      </div>

      {/* Bottom content - tagline and CTA */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        {/* Left: Tagline in brackets */}
        <div data-tagline className="max-w-sm">
          <div className="text-sm md:text-base text-foreground-secondary leading-relaxed font-sans">
            <span className="text-primary">{'{'}</span> Security Researcher specializing in Vulnerability Research, API
            Security, Smart Contract Audits &amp; FinTech Security
            <span className="text-primary">{' }'}</span>
          </div>
        </div>

        {/* Right: CTA Button */}
        <button
          data-cta
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-background rounded-full font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:-translate-y-1 cursor-pointer whitespace-nowrap"
        >
          <span>View Work</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h10v10M7 17L17 7" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-12 text-primary/50">
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
