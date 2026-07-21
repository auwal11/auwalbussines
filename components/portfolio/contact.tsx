'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (!containerRef.current) return

    gsap.from('.cta-word', {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  return (
    <section ref={containerRef} id="contact" className="relative py-32 px-12 border-t border-border" suppressHydrationWarning>
      <div className="max-w-6xl mx-auto">
        {/* Large CTA Headline */}
        <div className="mb-16 text-center">
          <h2 className="text-6xl md:text-8xl font-display font-800 leading-tight mb-8" suppressHydrationWarning>
            <div className="overflow-hidden">
              <span className="cta-word inline-block text-white">Open</span>
            </div>
            <div className="overflow-hidden">
              <span className="cta-word inline-block text-white">to</span>
            </div>
            <div className="overflow-hidden">
              <span className="cta-word inline-block text-transparent" style={{ WebkitTextStroke: '2px #0ae448' }}>
                Security
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="cta-word inline-block text-transparent" style={{ WebkitTextStroke: '2px #0ae448' }}>
                Roles.
              </span>
            </div>
          </h2>
        </div>

        {/* Tagline in brackets */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-lg text-foreground-secondary leading-relaxed">
            <span className="text-primary">{'{'}</span> Currently open to: Product Security roles, Penetration Testing
            contracts, Smart Contract audit collaborations, and Bug Bounty program partnerships with FinTech and Web3
            companies. <span className="text-primary">{' }'}</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <button className="px-8 py-4 rounded-full bg-primary text-background font-mono font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:-translate-y-1 cursor-pointer inline-flex items-center gap-2">
            <span>Send a Message</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10v10M7 17L17 7" />
            </svg>
          </button>

          <button className="px-8 py-4 rounded-full border border-primary/50 text-primary font-mono font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:border-primary hover:bg-primary/10 cursor-pointer">
            View HackerOne Profile
          </button>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-border">
          {[
            { label: 'Email', value: 'security@auwalbashar.com' },
            { label: 'GitHub', value: '@auwalbussines' },
            { label: 'Response Time', value: 'Within 48 hours' },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                {item.label}
              </div>
              <div className="text-lg font-display font-700 text-foreground">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
