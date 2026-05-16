"use client"

import { useEffect, useRef, useState } from "react"

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
  { value: 24, suffix: "/7", label: "AI-Powered Support" },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref} className="display-numeral">
      {count}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 divider-line" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="animate-fade-up text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#00ffb4] mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#6b7c99] uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 divider-line" />
    </section>
  )
}
