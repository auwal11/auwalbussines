'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([])
  const logoRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!containerRef.current || !lettersRef.current) return

    const validLetters = lettersRef.current.filter((el) => el !== null)
    const timeline = gsap.timeline()
    
    if (validLetters.length > 0) {
      // Initial scattered state
      gsap.set(validLetters, {
        opacity: 0,
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        rotation: () => gsap.utils.random(-45, 45),
      })

      // Animate letters to center
      timeline.to(validLetters, {
        duration: 1.4,
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        stagger: 0.05,
        ease: 'back.out',
      })
    }

    // Spin logo continuously
    const logoTimeline = gsap.timeline({ repeat: -1 })
    if (logoRef.current) {
      logoTimeline.to(logoRef.current, {
        rotation: 360,
        duration: 8,
        ease: 'none',
      })
    }

    // Cleanup function
    return () => {
      timeline.kill()
      logoTimeline.kill()
    }
  }, [])

  const mainText = 'VULNERABILITY RESEARCH'

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 bg-background"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl -left-40 top-1/3 pointer-events-none opacity-50" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-secondary/10 to-transparent blur-3xl -right-32 bottom-1/4 pointer-events-none opacity-40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-[0.2em]">
            Security Researcher
          </span>
        </div>

        {/* Headline */}
        <div className="relative mb-8">
          <h1 className="text-6xl md:text-7xl lg:text-[110px] font-bold tracking-tight leading-none text-center">
            {mainText.split('').map((letter, i) => (
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
          </h1>

          {/* Spinning logo */}
          <svg
            ref={logoRef}
            viewBox="0 0 100 100"
            className="absolute -right-12 top-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 text-primary"
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <path d="M 50 20 L 65 35 L 65 65 Q 50 75 35 65 L 35 35 Z" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="50" cy="50" r="8" fill="currentColor" />
          </svg>
        </div>

        {/* Subtitle */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-4">
            Securing critical infrastructure across Web3, FinTech, and Enterprise platforms
          </p>
          <p className="text-sm md:text-base text-primary font-mono uppercase tracking-wider">
            Vulnerability Research • Product Security • API Security • Smart Contract Analysis
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="px-8 py-4 rounded-full bg-primary text-background font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:-translate-y-1 cursor-pointer">
            View Case Studies
          </button>
          <button className="px-8 py-4 rounded-full border border-primary/40 text-primary font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:border-primary hover:bg-primary/10 cursor-pointer">
            Get in Touch
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/60">
          <span className="text-xs font-mono uppercase tracking-wider">Scroll to explore</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
