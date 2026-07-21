'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (!containerRef.current) return

    // Animate lines in from bottom
    gsap.from('.reveal-line', {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 65%',
        end: 'top 35%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  if (!isMounted) {
    return (
      <section
        ref={containerRef}
        id="about"
        className="relative py-32 px-12 border-t border-border"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 flex items-center gap-3">
            <div className="w-7 h-px bg-primary" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">About</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-800 mb-24 leading-tight">
            Why Auwal Bashar?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-6">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                I hunt for vulnerabilities that matter.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative py-32 px-12 border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-16 flex items-center gap-3">
          <div className="w-7 h-px bg-primary" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">About</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-900 mb-24 leading-tight">
          <div className="overflow-hidden">
            <div className="reveal-line">Why Auwal Bashar?</div>
          </div>
        </h2>

        {/* Two column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Main narrative */}
          <div className="space-y-6">
            <p className="text-lg text-foreground-secondary leading-relaxed overflow-hidden">
              <div className="reveal-line">
                I hunt for vulnerabilities that matter — the kind that could bring down payment systems, drain smart contracts, or expose millions of user records.
              </div>
            </p>
            <p className="text-lg text-foreground-secondary leading-relaxed overflow-hidden">
              <div className="reveal-line">
                I operate across HackerOne, HackenProof, and Cantina, focusing exclusively on FinTech platforms, DeFi protocols, and enterprise APIs where the impact is highest.
              </div>
            </p>
            <p className="text-lg text-foreground-secondary leading-relaxed overflow-hidden">
              <div className="reveal-line">
                No overclaiming. No noise. Just methodical, evidence-backed vulnerability research.
              </div>
            </p>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-8">
            {[
              { label: 'Active on', value: '3+ Platforms' },
              { label: 'Focus', value: 'FinTech & Web3' },
              { label: 'Platforms', value: 'HackerOne, HackenProof, Cantina' },
              { label: 'Methodology', value: 'OWASP-aligned' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="border-t border-border pt-4 overflow-hidden"
              >
                <div className="reveal-line text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  {stat.label}
                </div>
                <div className="reveal-line text-base md:text-lg font-display font-700 text-foreground">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
