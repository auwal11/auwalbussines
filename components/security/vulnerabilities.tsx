'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const vulnerabilities = [
  {
    id: 1,
    title: 'Reentrancy Attack Vector',
    platform: 'Uniswap V3',
    severity: 'critical',
    impact: 'Potential fund loss',
    status: 'Confirmed',
  },
  {
    id: 2,
    title: 'Integer Overflow in Token Transfer',
    platform: 'AAVE Protocol',
    severity: 'high',
    impact: 'Unauthorized minting',
    status: 'Patched',
  },
  {
    id: 3,
    title: 'Access Control Misconfiguration',
    platform: 'Compound Finance',
    severity: 'high',
    impact: 'Admin privilege escalation',
    status: 'Fixed',
  },
  {
    id: 4,
    title: 'Oracle Price Manipulation',
    platform: 'Yearn Finance',
    severity: 'medium',
    impact: 'Slippage exploitation',
    status: 'Mitigated',
  },
  {
    id: 5,
    title: 'Flash Loan Attack',
    platform: 'Curve Finance',
    severity: 'high',
    impact: 'Liquidity pool drain',
    status: 'Confirmed',
  },
  {
    id: 6,
    title: 'Storage Collision Bug',
    platform: 'MakerDAO',
    severity: 'medium',
    impact: 'State mutation',
    status: 'Acknowledged',
  },
]

const severityColors = {
  critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  high: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  low: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
}

export function Vulnerabilities() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return

    // Animate title on scroll
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
      },
      duration: 1,
      opacity: 0,
      y: 30,
      ease: 'power3.out',
    })

    // Animate cards
    const cards = containerRef.current.querySelectorAll('.vuln-card')
    gsap.from(cards, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
      duration: 1,
      opacity: 0,
      y: 40,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [])

  return (
    <section id="vulnerabilities" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Security Research
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6"
          >
            Vulnerabilities Found
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            A curated selection of critical vulnerabilities discovered in leading DeFi protocols.
            Each finding has been thoroughly analyzed and responsibly disclosed.
          </p>
        </div>

        {/* Vulnerabilities Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {vulnerabilities.map((vuln) => {
            const colors = severityColors[vuln.severity as keyof typeof severityColors]
            return (
              <div
                key={vuln.id}
                className="vuln-card group relative overflow-hidden rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-6 hover:border-primary/30 transition-all duration-300"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Severity Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {vuln.severity.toUpperCase()}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {vuln.title}
                  </h3>

                  {/* Platform */}
                  <p className="text-sm text-muted mb-4 font-mono">{vuln.platform}</p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted">
                      <span className="text-foreground-secondary">Impact:</span> {vuln.impact}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                    <span className="text-xs text-muted font-mono">{vuln.status}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      vuln.status === 'Confirmed' ? 'bg-red-500' :
                      vuln.status === 'Patched' || vuln.status === 'Fixed' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`} />
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
