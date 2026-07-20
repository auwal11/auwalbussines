'use client'

import { motion } from 'framer-motion'

const timeline = [
  {
    year: '2024',
    title: 'Security Research Focus',
    description: 'Deepening expertise in vulnerability research across APIs, smart contracts, and fintech systems.',
  },
  {
    year: '2023',
    title: 'Product Security Engagements',
    description: 'Working with enterprises on security architecture, threat modeling, and vulnerability remediation.',
  },
  {
    year: '2022',
    title: 'Expanding Scope',
    description: 'Broadened research focus beyond Web3 to include traditional fintech and enterprise applications.',
  },
  {
    year: '2021',
    title: 'Development & Research',
    description: 'Combining software development with security research for deeper technical understanding.',
  },
  {
    year: '2020',
    title: 'Security Research Begins',
    description: 'Started formal security research and vulnerability disclosure practices.',
  },
]

export function Timeline() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Timeline
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Professional Journey
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Evolution of expertise and focus in security research and vulnerability management.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary/50 opacity-30" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background transform -translate-x-1.5 md:-translate-x-2" />

                {/* Content */}
                <div className={`flex-1 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-6">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-primary/10 text-primary mb-3">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
