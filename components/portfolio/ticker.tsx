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
    'API Security',
    'Smart Contract Audits',
    'FinTech Security',
    'Product Security',
    'Vulnerability Triage',
    'HackerOne',
    'HackenProof',
    'Cantina',
  ]

  return (
    <section className="border-t border-b border-white/8 bg-surface overflow-hidden">
      <div className="py-3 md:py-4">
        <div
          ref={trackRef}
          className="flex gap-0 will-change-transform"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="ticker-item flex items-center gap-8 px-8 md:px-10 whitespace-nowrap flex-shrink-0"
            >
              <span className="text-xs md:text-sm font-mono text-text-muted uppercase tracking-widest">
                {item}
              </span>
              <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
