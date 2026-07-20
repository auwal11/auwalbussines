'use client'

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!titleRef.current || !formRef.current) return

    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      duration: 1,
      opacity: 0,
      y: 30,
      ease: 'power3.out',
    })

    gsap.from(formRef.current, {
      scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
      duration: 1,
      opacity: 0,
      y: 40,
      ease: 'power3.out',
    })
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Get in Touch
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-display font-bold mt-4"
          >
            Let's Collaborate
          </h2>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative rounded-2xl border border-primary/10 bg-surface/40 backdrop-blur-xl p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl" />
          <div className="relative z-10 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-primary/20 text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-primary/20 text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-surface/50 border border-primary/20 text-foreground placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Tell me about your project..."
                rows={6}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-background font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
