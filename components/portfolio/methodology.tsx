'use client'

import { motion } from 'framer-motion'

const methodologySteps = [
  {
    number: '01',
    title: 'Reconnaissance',
    description: 'Gather information about the target system, architecture, dependencies, and threat landscape.',
  },
  {
    number: '02',
    title: 'Threat Modeling',
    description: 'Identify potential attack vectors, threat actors, and security risks specific to the application.',
  },
  {
    number: '03',
    title: 'Vulnerability Research',
    description: 'Systematically search for security weaknesses through code analysis, dynamic testing, and fuzzing.',
  },
  {
    number: '04',
    title: 'Validation & Proof of Concept',
    description: 'Verify findings with reproducible proof-of-concept demonstrations showing actual impact.',
  },
  {
    number: '05',
    title: 'Risk Assessment',
    description: 'Evaluate severity, exploitability, and business impact to prioritize remediation efforts.',
  },
  {
    number: '06',
    title: 'Responsible Disclosure',
    description: 'Communicate findings confidentially with sufficient time for remediation before any public disclosure.',
  },
]

export function Methodology() {
  return (
    <section id="methodology" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Process
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Security Research Methodology
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            A systematic approach to identifying and evaluating security vulnerabilities with responsible practices.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {methodologySteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              {/* Connection line */}
              {idx < methodologySteps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="relative rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-300 h-full">
                <div className="text-4xl font-bold text-primary/20 mb-4 font-mono">{step.number}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">Core Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-primary mb-2">Integrity</h4>
              <p className="text-muted">Honest reporting of findings with accurate severity assessments and no exaggeration.</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Responsibility</h4>
              <p className="text-muted">Confidential disclosure practices that give organizations time to remediate before public disclosure.</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-2">Impact</h4>
              <p className="text-muted">Focused on practical, actionable findings that meaningfully improve security posture.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
