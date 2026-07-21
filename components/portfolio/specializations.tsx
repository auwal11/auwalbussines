'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Specializations() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const track = trackRef.current
    const proxy = { x: 0 },
      smoothness = 0.8,
      rawProxyX = 0,
      speed = gsap.utils.unitize((x) => gsap.quickTo(proxy, 'x', { duration: smoothness, ease: 'power4' }), 'px'),
      bindEvents = () => {
        let currentScroll = gsap.getProperty(track, 'x'),
          isAnimating = false

        gsap.set(track, { transformOrigin: '50% 50%', force3D: true })

        ScrollTrigger.create({
          onUpdate: (self) => {
            let scrollDelta = self.getVelocity()
            speed(currentScroll += scrollDelta * -0.05)
            gsap.to(proxy, {
              x: currentScroll,
              duration: smoothness,
              ease: 'power4',
              overwrite: 'auto',
              onStart: () => {
                if (!isAnimating) {
                  isAnimating = true
                  gsap.ticker.add(updateTrack)
                }
              },
            })
          },
        })

        gsap.ticker.add(updateTrack)

        function updateTrack() {
          gsap.set(track, { x: proxy.x }, { overwrite: false })
        }
      }

    bindEvents()
  }, [])

  const specializations = [
    {
      num: '01',
      icon: '🔍',
      title: 'Vulnerability Research',
      desc: 'Systematic identification of security weaknesses in web applications, APIs, and protocols using manual analysis, code review, and proof-of-concept development.',
      tags: ['Web Apps', 'APIs', 'Manual'],
    },
    {
      num: '02',
      icon: '⚡',
      title: 'API Security',
      desc: 'Deep-dive assessment of REST, GraphQL, and WebSocket endpoints. Authentication flaws, authorization bypasses, mass assignment, and business logic vulnerabilities.',
      tags: ['REST', 'GraphQL', 'OAuth'],
    },
    {
      num: '03',
      icon: '🔗',
      title: 'Smart Contract Security',
      desc: 'Static and dynamic analysis of Solidity contracts. Reentrancy, integer overflow, access control flaws, and economic attack vectors on DeFi protocols.',
      tags: ['Solidity', 'EVM', 'DeFi'],
    },
    {
      num: '04',
      icon: '💳',
      title: 'FinTech Security',
      desc: 'Security research targeting payment processors, digital wallets, banking APIs, and financial data flows. Focus on fraud vectors and transaction integrity.',
      tags: ['Payments', 'KYC/AML', 'PCI'],
    },
    {
      num: '05',
      icon: '📋',
      title: 'Vulnerability Triage',
      desc: 'Accurate severity scoring using CVSS, impact analysis, and clear reproduction steps. Translating technical findings into actionable security intelligence.',
      tags: ['CVSS', 'OWASP', 'CVE'],
    },
    {
      num: '06',
      icon: '🛡️',
      title: 'Product Security',
      desc: 'Holistic security assessment of digital products from design through deployment. Threat modeling, SDLC integration, and risk prioritization for engineering teams.',
      tags: ['SDLC', 'Threat Model', 'Risk'],
    },
  ]

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen bg-background flex flex-col justify-center overflow-hidden">
        {/* Header */}
        <div className="absolute top-24 left-12 right-12 z-10 flex items-end justify-between">
          <h2 className="text-5xl md:text-7xl font-display font-900">What I Research</h2>
          <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider">06 Specializations</div>
        </div>

        {/* Horizontal track */}
        <div className="overflow-hidden">
          <div ref={trackRef} className="flex gap-5 px-12 will-change-transform">
            {specializations.map((spec) => (
              <div
                key={spec.num}
                className="flex-shrink-0 w-96 bg-surface border border-border rounded-3xl p-9 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer"
              >
                {/* Card number */}
                <div className="text-xs font-mono text-primary uppercase tracking-widest mb-6">
                  {spec.num}
                </div>

                {/* Icon */}
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {spec.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-display font-700 mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {spec.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                  {spec.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {spec.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono text-primary border border-primary/30 rounded-full px-3 py-1 bg-primary/5 group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-border group-hover:border-primary/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-all duration-300 group-hover:rotate-45">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10M7 17L17 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
