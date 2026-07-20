'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const publications = [
  {
    title: 'Security Research Blog',
    description: 'Regular articles on vulnerability research, security best practices, and emerging threats.',
    url: '#',
  },
  {
    title: 'Conference Speaking',
    description: 'Presentations on smart contract security, vulnerability research, and security practices.',
    url: '#',
  },
  {
    title: 'Security Community',
    description: 'Active participation in security communities and knowledge sharing with other researchers.',
    url: '#',
  },
]

export function Publications() {
  return (
    <section id="publications" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Thought Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 mb-6 text-foreground">
            Publications & Speaking
          </h2>
          <p className="text-lg text-muted max-w-2xl">
            Sharing knowledge and research findings with the security community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publications.map((pub, idx) => (
            <motion.a
              key={idx}
              href={pub.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {pub.title}
                </h3>
                <p className="text-muted leading-relaxed mb-6">{pub.description}</p>
                <div className="flex items-center gap-2 text-primary">
                  <span className="text-sm font-medium">Learn more</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
