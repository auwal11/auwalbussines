'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const bounties = [
  { platform: 'HackerOne', total: '$250,000+', findings: '45+', status: 'Hall of Fame' },
  { platform: 'Code4rena', total: '$180,000+', findings: '32+', status: 'Top Contributor' },
  { platform: 'Immunefi', total: '$150,000+', findings: '28+', status: 'Elite Hunter' },
]

export function BugBounties() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return

    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      duration: 1,
      opacity: 0,
      y: 30,
      ease: 'power3.out',
    })

    const items = containerRef.current.querySelectorAll('.bounty-card')
    gsap.from(items, {
      scrollTrigger: { trigger: containerRef.current, start: 'top 70%' },
      duration: 1,
      opacity: 0,
      y: 40,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [])

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Achievements
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6"
          >
            Bug Bounty Success
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bounties.map((bounty, i) => (
            <div
              key={i}
              className="bounty-card group relative overflow-hidden rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-primary mb-4">{bounty.platform}</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted mb-1">Total Earnings</p>
                    <p className="text-3xl font-bold text-primary">{bounty.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-1">Vulnerabilities</p>
                    <p className="text-xl font-semibold">{bounty.findings}</p>
                  </div>
                  <div className="pt-4 border-t border-primary/10">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                      {bounty.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
