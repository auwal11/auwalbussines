'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.from('.method-step', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Reconnaissance',
      desc: 'Surface mapping, endpoint discovery, technology fingerprinting, and attack surface analysis before any active testing.',
    },
    {
      num: '02',
      title: 'Vulnerability Discovery',
      desc: 'Manual testing combined with targeted tooling. Focus on business logic, authentication flows, and data handling.',
    },
    {
      num: '03',
      title: 'Proof of Concept',
      desc: 'Developing clear, minimal reproduction steps that demonstrate real impact without causing damage to production systems.',
    },
    {
      num: '04',
      title: 'Impact Assessment',
      desc: 'CVSS scoring, business impact analysis, and affected user estimation. Accuracy over inflation — every time.',
    },
    {
      num: '05',
      title: 'Responsible Disclosure',
      desc: 'Coordinated disclosure through official programs or security contacts. Clear timelines, professional communication.',
    },
    {
      num: '06',
      title: 'Documentation',
      desc: 'Detailed technical writeups with remediation guidance. Making findings useful for engineering teams, not just security.',
    },
  ]

  return (
    <section ref={containerRef} id="methodology" className="relative py-32 px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-16 flex items-center gap-3">
          <div className="w-7 h-px bg-primary" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Process</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl font-display font-900 mb-20 leading-tight">Methodology</h2>

        {/* 6 step grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="method-step">
              <div className="pb-6 border-t border-border pt-6">
                {/* Number */}
                <div className="text-xs font-mono text-primary uppercase tracking-widest mb-4">
                  {step.num}
                </div>
                {/* Title */}
                <h3 className="text-xl font-display font-700 text-foreground mb-4">
                  {step.title}
                </h3>
                {/* Description */}
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
