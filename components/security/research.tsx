'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const research = [
  {
    id: 1,
    title: 'The Evolution of Flash Loan Attacks',
    date: 'Oct 2024',
    category: 'DeFi Security',
  },
  {
    id: 2,
    title: 'Formal Verification in Smart Contracts',
    date: 'Sep 2024',
    category: 'Research',
  },
  {
    id: 3,
    title: 'Zero-Knowledge Proof Vulnerabilities',
    date: 'Aug 2024',
    category: 'Cryptography',
  },
]

export function Research() {
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

    const cards = containerRef.current.querySelectorAll('.research-card')
    gsap.from(cards, {
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
            Published
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6"
          >
            Research & Publications
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {research.map((item) => (
            <div
              key={item.id}
              className="research-card group relative overflow-hidden rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <p className="text-xs text-primary font-mono uppercase tracking-wider mb-2">
                  {item.category}
                </p>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.date}</p>
                <button className="mt-6 text-primary hover:text-secondary transition-colors text-sm font-semibold flex items-center gap-2">
                  Read More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
