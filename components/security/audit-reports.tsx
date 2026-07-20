'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reports = [
  {
    id: 1,
    protocol: 'Uniswap V4',
    date: 'Oct 2024',
    severity: 'Full Security Audit',
    status: 'Completed',
    findings: 3,
  },
  {
    id: 2,
    protocol: 'Lido staking',
    date: 'Sep 2024',
    severity: 'Smart Contract Review',
    status: 'Completed',
    findings: 1,
  },
  {
    id: 3,
    protocol: 'Aave V3',
    date: 'Aug 2024',
    severity: 'Full Security Audit',
    status: 'Completed',
    findings: 5,
  },
]

export function AuditReports() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return

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

    const cards = containerRef.current.querySelectorAll('.report-card')
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
    <section id="reports" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Professional Work
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6"
          >
            Audit Reports
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Comprehensive security audits for leading protocols and projects in the Web3 ecosystem.
          </p>
        </div>

        {/* Reports Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="report-card group relative overflow-hidden rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {report.protocol}
                    </h3>
                    <p className="text-sm text-muted mt-1">{report.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                      {report.findings} findings
                    </span>
                  </div>
                </div>

                <p className="text-muted text-sm mb-6">{report.severity}</p>

                <button className="w-full px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 text-sm font-semibold">
                  Download Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
