'use client'

import { motion } from 'framer-motion'

const skills = {
  'Vulnerability Research': ['Security Code Review', 'Dynamic Analysis', 'Fuzzing', 'Threat Modeling', 'Exploit Development'],
  'Technologies': ['Solidity', 'Python', 'Rust', 'JavaScript/TypeScript', 'Go'],
  'Tools & Frameworks': ['Burp Suite', 'Foundry', 'Hardhat', 'Echidna', 'Git', 'Linux', 'Docker'],
}

export function Skills() {
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
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(skills).map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">{category[0]}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category[1].map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: (catIdx * 5 + idx) * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-3 rounded-lg border border-primary/20 bg-surface/50 hover:border-primary/50 hover:bg-surface/80 transition-all text-foreground font-medium text-center"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
