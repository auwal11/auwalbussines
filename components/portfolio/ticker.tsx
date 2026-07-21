'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    const items = track.querySelectorAll('.ticker-item')
    
    if (items.length === 0) return

    // Duplicate items for seamless loop
    const originalHTML = track.innerHTML
    track.innerHTML = originalHTML + originalHTML

    // Create animation timeline
    const timeline = gsap.timeline({ repeat: -1 })
    timeline.to(track, {
      x: -track.scrollWidth / 2,
      duration: 30,
      ease: 'none',
    })

    // Cleanup function
    return () => {
      timeline.kill()
    }
  }, [])

  const items = [
    'Vulnerability Research',
    'API Security Testing',
    'Smart Contract Audits',
    'FinTech Security',
    'Product Security',
    'Penetration Testing',
    'Security Triage',
    'Threat Modeling',
  ]

  return (
    <section className="border-t border-primary/10 border-b bg-surface/50 overflow-hidden">
      <div className="py-4 md:py-6">
        <div
          ref={trackRef}
          className="flex gap-0 will-change-transform"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="ticker-item flex items-center gap-6 px-8 md:px-10 whitespace-nowrap flex-shrink-0"
            >
              <span className="text-sm md:text-base font-mono text-foreground/70 uppercase tracking-wider">
                {item}
              </span>
              <div className="w-1 h-1 rounded-full bg-primary/40 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
