'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

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

  return (
    <section id="timeline" className="relative py-32 px-6 overflow-hidden">
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
            Career Timeline
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">
            Milestones & Achievements
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary/50 opacity-30" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {achievements.map((item, index) => (
              <motion.div 
                key={index}
                className="flex flex-col md:flex-row md:items-center md:gap-8"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
