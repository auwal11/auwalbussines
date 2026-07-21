'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from('.timeline-entry', {
      x: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  const entries = [
    {
      year: '2024 — Present',
      title: 'Active Bug Bounty Researcher',
      content: 'Platforms: HackerOne · HackenProof · Cantina\nFocus: API Security, FinTech platforms, Smart Contract Audits\nStatus: Active',
    },
    {
      year: '2023',
      title: 'Expanded into Smart Contract Security',
      content: 'Began auditing Solidity contracts on Cantina platform.\nFocus: EVM security, DeFi protocol vulnerabilities, reentrancy patterns, access control weaknesses.',
    },
    {
      year: '2022',
      title: 'Web Application & API Security Focus',
      content: 'Deepened expertise in REST API vulnerabilities, authentication bypass techniques, and OWASP Top 10.\nActive on HackerOne and HackenProof programs.',
    },
    {
      year: '2020',
      title: 'Started Vulnerability Research',
      content: 'Began systematic security research. First reported vulnerabilities through responsible disclosure.\nStarted on public bug bounty platforms.',
    },
  ]

  return (
    <section ref={containerRef} id="timeline" className="relative py-32 px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-16 flex items-center gap-3">
          <div className="w-7 h-px bg-primary" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Journey</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl font-display font-900 mb-24 leading-tight">Journey</h2>

        {/* Timeline entries */}
        <div className="space-y-12 relative pl-8">
          {/* Green glowing line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary to-primary/30 shadow-lg shadow-primary/30" />

          {entries.map((entry, idx) => (
            <div key={idx} className="timeline-entry group">
              {/* Glowing dot */}
              <div className="absolute -left-4 top-2 w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />

              <div className="space-y-2">
                <div className="text-xs font-mono text-primary uppercase tracking-widest">
                  {entry.year}
                </div>
                <h3 className="text-2xl font-display font-700 text-foreground group-hover:text-primary transition-colors duration-300">
                  {entry.title}
                </h3>
                <p className="text-base text-foreground-secondary leading-relaxed whitespace-pre-line">
                  {entry.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
