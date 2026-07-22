'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const logoRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!containerRef.current || !lettersRef.current) return

    // Letter animation - scatter to assemble (exact GSAP.com behavior)
    const validLetters = lettersRef.current.filter((el) => el !== null)
    if (validLetters.length > 0) {
      gsap.from(validLetters, {
        x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
        y: () => (Math.random() - 0.5) * window.innerHeight * 1.2,
        rotation: () => (Math.random() - 0.5) * 720,
        scale: () => Math.random() * 1.8 + 0.1,
        opacity: 0,
        duration: 1.6,
        ease: 'power4.out',
        stagger: { each: 0.03, from: 'random' },
      })

      // Subtle floating animation after landing
      gsap.to(validLetters, {
        y: () => (Math.random() - 0.5) * 14,
        duration: () => 2 + Math.random() * 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.05, from: 'random' },
        delay: () => Math.random() * 1,
      })
    }
  }, [])

  const firstLine = 'Securing'
  const secondLine = 'Technology'

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-background overflow-hidden flex flex-col justify-between px-12 pt-40 pb-20"
    >
      {/* Main headline with logo */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        {/* Line 1: Securing (filled white) */}
        <h1 className="text-white font-display font-900 leading-none mb-0" suppressHydrationWarning>
          <span
            style={{
              fontSize: 'clamp(72px, 13vw, 200px)',
              display: 'block',
              overflow: 'visible',
              letterSpacing: '-0.02em',
            }}
            suppressHydrationWarning
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

        {/* Spinning pinwheel logo - between the two lines (90px per spec) */}
        <div className="relative -my-6 pl-0 h-32 flex items-center pointer-events-none">
          <svg
            ref={logoRef}
            viewBox="0 0 100 100"
            className="w-24 h-24 md:w-32 md:h-32"
            style={{ willChange: 'transform', animation: 'spin 8s linear infinite' }}
          >
            {/* Petal 1: top-right — orange/coral #ff6b35 */}
            <path d="M50,50 C50,50 75,40 80,20 C85,0 60,5 50,50" fill="#ff6b35" opacity="0.95" />
            {/* Petal 2: bottom-right — purple/violet #a855f7 */}
            <path d="M50,50 C50,50 60,75 80,80 C100,85 95,60 50,50" fill="#a855f7" opacity="0.95" />
            {/* Petal 3: bottom-left — pink/magenta #ec4899 */}
            <path d="M50,50 C50,50 25,60 20,80 C15,100 40,95 50,50" fill="#ec4899" opacity="0.85" />
            {/* Petal 4: top-left — lighter green #4ade80 */}
            <path d="M50,50 C50,50 40,25 20,20 C0,15 5,40 50,50" fill="#4ade80" opacity="0.85" />
          </svg>
        </div>

        {/* Line 2: Technology (white filled) */}
        <h2
          className="font-display font-900 leading-none text-white"
          style={{
            fontSize: 'clamp(80px, 15vw, 230px)',
            display: 'block',
            letterSpacing: '-0.02em',
          }}
          suppressHydrationWarning
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

      {/* Bottom content - tagline and CTA (exact GSAP.com style) */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">
        {/* Left: Tagline in brackets (exact GSAP.com style) */}
        <div data-tagline className="max-w-sm flex-shrink-0">
          <p className="font-mono text-xs md:text-sm text-text-muted leading-relaxed border-l border-white/15 pl-4">
            {'{ Security Researcher — specializing in Vulnerability Research, '}
            <br />
            {'API Security, Smart Contract Audits & FinTech Security }'}
          </p>
        </div>

        {/* Right: CTA Button (exact GSAP.com style) */}
        <button
          data-cta
          className="btn-ghost font-mono text-xs font-600 tracking-widest whitespace-nowrap w-fit"
        >
          Get in Touch
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
