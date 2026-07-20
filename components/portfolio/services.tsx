'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const services = [
  {
    name: 'Security Consultation',
    description: 'Strategic guidance on security architecture, threat modeling, and vulnerability management programs.',
    offerings: [
      'Threat modeling workshops',
      'Security architecture review',
      'Vulnerability management program design',
      'Security training for development teams',
    ],
  },
  {
    name: 'Vulnerability Research',
    description: 'In-depth security analysis of applications, APIs, and systems to identify vulnerabilities.',
    offerings: [
      'Code security review',
      'Dynamic testing and penetration testing',
      'Smart contract analysis',
      'API security assessment',
    ],
  },
  {
    name: 'Remediation Support',
    description: 'Assistance with vulnerability remediation, verification, and security improvements.',
    offerings: [
      'Remediation guidance',
      'Fix verification testing',
      'Security improvement roadmap',
      'Ongoing support and monitoring',
    ],
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Engagement Models
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Services Available
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Flexible engagement models tailored to your organization's security needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-foreground mb-3">{service.name}</h3>
              <p className="text-muted mb-8 leading-relaxed">{service.description}</p>
              
              <div className="space-y-3">
                {service.offerings.map((offering, oIdx) => (
                  <div key={oIdx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted">{offering}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href="#contact"
                className="mt-8 inline-block px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inquire
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
