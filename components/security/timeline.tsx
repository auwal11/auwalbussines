'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    year: '2024',
    quarter: 'Q4',
    title: 'Secured $500M+ DeFi Protocols',
    description: 'Conducted comprehensive audits across multiple protocols',
    type: 'milestone',
  },
  {
    year: '2024',
    quarter: 'Q3',
    title: 'Bug Bounty Hall of Fame',
    description: 'Awarded top contributor on HackerOne and Code4rena',
    type: 'achievement',
  },
  {
    year: '2024',
    quarter: 'Q2',
    title: 'Published 15 Security Papers',
    description: 'Research on smart contract vulnerabilities',
    type: 'research',
  },
  {
    year: '2024',
    quarter: 'Q1',
    title: 'Founded Security Lab',
    description: 'Established independent security research initiative',
    type: 'milestone',
  },
]

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!containerRef.current || !titleRef.current) return

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

    const items = containerRef.current.querySelectorAll('.timeline-item')
    gsap.from(items, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
      duration: 1,
      opacity: 0,
      x: -40,
      stagger: 0.15,
      ease: 'power3.out',
    })
  }, [])

  return (
    <section id="timeline" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Career Timeline
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6"
          >
            Milestones & Achievements
          </h2>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary/50 opacity-30" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {achievements.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className={`flex ${index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'} gap-8 items-center md:items-stretch`}>
                  {/* Content */}
                  <div className={`w-full ${index % 2 === 0 ? 'md:w-1/2 md:text-right' : 'md:w-1/2'}`}>
                    <div className="group cursor-pointer">
                      <span className="text-sm font-mono text-primary uppercase tracking-wider">
                        {item.year} {item.quarter}
                      </span>
                      <h3 className="text-2xl font-bold mt-2 mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-full md:w-auto flex justify-center md:justify-center">
                    <div className={`relative w-4 h-4 rounded-full border-2 border-primary bg-background transition-all duration-300 ${
                      item.type === 'milestone' ? 'w-6 h-6 ring-4 ring-primary/30' : ''
                    }`} />
                  </div>

                  {/* Spacer */}
                  <div className={`w-full ${index % 2 === 0 ? 'md:w-1/2' : 'md:w-1/2 md:text-right'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
