'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'

const skillCategories = [
  {
    category: 'Smart Contracts',
    skills: [
      { name: 'Solidity', level: 95 },
      { name: 'Rust', level: 85 },
      { name: 'Vyper', level: 80 },
    ],
  },
  {
    category: 'Security Analysis',
    skills: [
      { name: 'Static Analysis', level: 98 },
      { name: 'Dynamic Testing', level: 92 },
      { name: 'Formal Verification', level: 88 },
    ],
  },
  {
    category: 'Tools & Frameworks',
    skills: [
      { name: 'Foundry', level: 96 },
      { name: 'Hardhat', level: 90 },
      { name: 'Truffle', level: 85 },
    ],
  },
]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Technical Expertise
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6">
            Skills & Proficiency
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Specialized in smart contract security, formal verification, and advanced security analysis tools.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-8">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted">{skill.level}%</span>
                    </div>
                    <motion.div
                      className="h-2 bg-surface rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: skillIdx * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
