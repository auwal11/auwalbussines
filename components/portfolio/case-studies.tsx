'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const caseStudies = [
  {
    id: 1,
    title: 'API Authorization Bypass',
    category: 'API Security',
    description: 'Identified critical authorization flaw allowing users to access administrative endpoints without proper permissions.',
    findings: '3 critical vulnerabilities',
    impact: 'Prevented unauthorized data access and system compromise',
    year: '2024',
  },
  {
    id: 2,
    title: 'Smart Contract Logic Vulnerability',
    category: 'Smart Contract Security',
    description: 'Discovered state manipulation vulnerability in token contract that could enable unauthorized token minting.',
    findings: '1 critical, 2 high-risk issues',
    impact: 'Prevented $2M+ potential loss through responsible disclosure',
    year: '2023',
  },
  {
    id: 3,
    title: 'Data Exposure in Payment Gateway',
    category: 'FinTech Security',
    description: 'Uncovered configuration vulnerability exposing sensitive payment card data and transaction records.',
    findings: '1 critical vulnerability',
    impact: 'Immediate remediation protected millions in daily transactions',
    year: '2023',
  },
]

export function CaseStudies() {
  return (
    <section id="work" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Featured Case Studies
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Representative security research and vulnerability findings from recent engagements.
          </p>
        </motion.div>

        <div className="space-y-6">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 10 }}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/0 group-hover:to-primary/0 transition-colors duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary mb-3">
                      {study.category}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground">{study.title}</h3>
                  </div>
                  <span className="text-sm font-mono text-muted">{study.year}</span>
                </div>

                <p className="text-muted leading-relaxed mb-6">{study.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Findings</p>
                    <p className="font-semibold text-foreground">{study.findings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Impact</p>
                    <p className="font-semibold text-primary">{study.impact}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
