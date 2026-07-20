'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

const research = [
  {
    id: 1,
    title: 'DeFi Protocol Vulnerabilities: A Deep Dive',
    description: 'Comprehensive analysis of common vulnerability patterns in DeFi smart contracts.',
    date: 'March 2024',
    link: '#',
  },
  {
    id: 2,
    title: 'Formal Verification for Smart Contracts',
    description: 'Using Coq and TLA+ to formally verify critical contract invariants.',
    date: 'February 2024',
    link: '#',
  },
  {
    id: 3,
    title: 'Cross-Chain Bridge Security',
    description: 'Identifying and mitigating risks in cross-chain message passing.',
    date: 'January 2024',
    link: '#',
  },
]

export function Research() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative min-h-screen py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Knowledge Sharing
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">
            Research & Publications
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            In-depth security research and technical articles on smart contract security.
          </p>
        </motion.div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {research.map((item, idx) => (
            <motion.div
              key={item.id}
              className="group rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">
                <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                  {item.date}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-muted mb-6 line-clamp-2">
                {item.description}
              </p>

              <a
                href={item.link}
                className="inline-flex items-center text-primary hover:text-secondary transition-colors"
              >
                <span className="text-sm font-medium">Read More</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
