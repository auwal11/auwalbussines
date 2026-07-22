'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const expertiseCards = [
  {
    num: '01',
    title: 'Vulnerability Research',
    description: 'Systematic discovery of weaknesses in apps and systems. Manual analysis, code review, PoC dev.',
    tags: ['Manual Testing', 'Code Review', 'PoC'],
  },
  {
    num: '02',
    title: 'API Security',
    description: 'REST, GraphQL, WebSocket auth bypasses, mass assignment, business logic vulns.',
    tags: ['REST', 'GraphQL', 'Auth'],
  },
  {
    num: '03',
    title: 'Smart Contract Security',
    description: 'Solidity audits, reentrancy, access control, DeFi logic flaws. EVM security focus.',
    tags: ['Solidity', 'Reentrancy', 'DeFi'],
  },
  {
    num: '04',
    title: 'FinTech Security',
    description: 'Payment systems, digital wallets, banking APIs, transaction integrity, fraud vectors.',
    tags: ['Payments', 'Wallets', 'Banking'],
  },
  {
    num: '05',
    title: 'Vulnerability Triage',
    description: 'CVSS scoring, impact analysis, clear repro steps. Technical → actionable intelligence.',
    tags: ['CVSS', 'Scoring', 'Reports'],
  },
  {
    num: '06',
    title: 'Product Security',
    description: 'Security from design to deploy. Threat modeling, SDLC integration, risk prioritization.',
    tags: ['Threat Model', 'SDLC', 'Risk'],
  },
]

export function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (!trackRef.current || !containerRef.current) return

    const track = trackRef.current
    const container = containerRef.current

    // Horizontal scroll animation with pin
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 96),
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.8,
        start: 'top top',
        end: () => '+=' + (track.scrollWidth - window.innerWidth + 200),
        invalidateOnRefresh: true,
      },
    })

    // Stagger card animations
    gsap.from('.expertise-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isMounted])

  return (
    <section
      ref={containerRef}
      id="expertise"
      className="relative w-full bg-background"
      style={{ height: '500vh' }}
    >
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen flex flex-col justify-start bg-background">
        {/* Header */}
        <div className="px-12 pt-24 pb-12">
          <div className="max-w-6xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="w-7 h-px bg-white/30" />
              <span className="font-mono text-xs uppercase tracking-widest text-text-muted">Expertise</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-800 mb-6 leading-tight">
              Research Expertise
            </h2>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="relative flex-1 overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 h-full will-change-transform"
            style={{ width: 'fit-content' }}
          >
            {expertiseCards.map((card, idx) => (
              <div
                key={idx}
                className="expertise-card flex-shrink-0 w-80 h-96 bg-surface border border-white/8 rounded-2xl p-8 flex flex-col justify-between hover:border-white/15 transition-colors duration-300"
              >
                {/* Card Number */}
                <div>
                  <div className="font-mono text-xs text-text-dim mb-4 tracking-widest">
                    {card.num}
                  </div>
                  {/* Title */}
                  <h3 className="font-display font-800 text-xl text-white mb-3 leading-tight">
                    {card.title}
                  </h3>
                  {/* Description */}
                  <p className="font-sans text-sm text-text-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Tags + Arrow */}
                <div className="flex items-end justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {card.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-9px px-2.5 py-1.5 rounded-full border border-white/10 text-text-dim bg-white/3"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-text-muted text-xs group-hover:bg-white group-hover:text-black group-hover:border-white transition-all">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
