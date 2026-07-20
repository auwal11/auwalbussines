'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Code, Database, Bug, Zap } from 'lucide-react'

const expertiseAreas = [
  {
    icon: Bug,
    title: 'Vulnerability Research',
    description: 'Systematic discovery and analysis of security weaknesses in applications and systems.',
  },
  {
    icon: Lock,
    title: 'Product Security',
    description: 'Securing products through security design, threat modeling, and secure development practices.',
  },
  {
    icon: Code,
    title: 'API Security',
    description: 'Identifying authorization, authentication, and data exposure vulnerabilities in APIs.',
  },
  {
    icon: Database,
    title: 'Smart Contract Security',
    description: 'Analyzing blockchain protocols and smart contracts for logic and economic vulnerabilities.',
  },
  {
    icon: Zap,
    title: 'FinTech Security',
    description: 'Securing financial systems, payment networks, and digital asset infrastructure.',
  },
  {
    icon: Shield,
    title: 'Security Triage',
    description: 'Prioritizing vulnerabilities by risk, impact, and exploitability for efficient remediation.',
  },
]

export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Core Competencies
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Areas of Expertise
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Specialized knowledge across vulnerability research, product security, and emerging technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, idx) => {
            const Icon = area.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/0 transition-colors duration-300" />
                <div className="relative z-10">
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-3">{area.title}</h3>
                  <p className="text-muted leading-relaxed">{area.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
