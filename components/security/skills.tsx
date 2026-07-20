'use client'

import { useEffect, useRef } from 'react'


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
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return

    gsap.from(titleRef.current, {
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
      duration: 1,
      opacity: 0,
      y: 30,
      ease: 'power3.out',
    })

    const skillBars = containerRef.current.querySelectorAll('.skill-bar-fill')
    skillBars.forEach((bar) => {
      const fill = bar as HTMLElement
      const level = parseInt(fill.getAttribute('data-level') || '0')
      
      gsap.from(fill, {
        scrollTrigger: { trigger: bar, start: 'top 80%' },
        duration: 2,
        width: 0,
        ease: 'power2.out',
      })

      gsap.from(bar.parentElement?.querySelector('.skill-value'), {
        scrollTrigger: { trigger: bar, start: 'top 80%' },
        duration: 2,
        innerText: 0,
        snap: { innerText: 1 },
        ease: 'power2.out',
      })
    })
  }, [])

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Expertise
          </span>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl font-display font-bold mt-4 mb-6"
          >
            Technical Skills
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="space-y-8">
              <h3 className="text-2xl font-bold text-primary">{cat.category}</h3>
              {cat.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-foreground">{skill.name}</span>
                    <span className="skill-value text-sm text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                    <div
                      className="skill-bar-fill h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      data-level={skill.level}
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
