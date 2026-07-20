'use client'

import { motion } from 'framer-motion'
import { Github, Mail, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    'Expertise': [
      { label: 'Vulnerability Research', href: '#expertise' },
      { label: 'Product Security', href: '#expertise' },
      { label: 'API Security', href: '#expertise' },
    ],
    'Work': [
      { label: 'Case Studies', href: '#work' },
      { label: 'Methodology', href: '#methodology' },
      { label: 'Publications', href: '#publications' },
    ],
    'Connect': [
      { label: 'Contact', href: '#contact' },
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Email', href: 'mailto:contact@example.com' },
    ],
  }

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ]

  return (
    <footer className="relative border-t border-primary/10 bg-surface/40 backdrop-blur-xl py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="font-display font-bold text-primary">A</span>
              </div>
              <span className="font-display font-semibold text-foreground">Auwal Bashar</span>
            </div>
            <p className="text-sm text-muted">
              Security researcher specializing in vulnerability research, product security, and enterprise protection.
            </p>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(links).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                      className="text-sm text-muted hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 mb-8" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Auwal Bashar. All rights reserved. | Truthful and transparent security research.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg border border-primary/20 bg-surface/50 text-muted hover:border-primary/50 hover:text-primary hover:bg-surface/80 transition-all flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
