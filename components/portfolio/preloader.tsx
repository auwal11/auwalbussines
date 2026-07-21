'use client'

import { useEffect, useState } from 'react'
import gsap from 'gsap'

export function Preloader() {
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Only show preloader once on initial load
    const hasSeenPreloader = sessionStorage.getItem('preloader-shown')
    if (hasSeenPreloader) {
      setIsComplete(true)
      return
    }

    sessionStorage.setItem('preloader-shown', 'true')

    let currentCount = 0
    const target = 100
    const counterEl = document.querySelector('[data-counter]')

    if (!counterEl) return

    // Simulate loading with random increments
    const interval = setInterval(() => {
      const increment = Math.random() * 30
      currentCount = Math.min(currentCount + increment, 95)

      if (counterEl) {
        counterEl.textContent = Math.floor(currentCount).toString()
      }
    }, 100)

    // Complete the counter
    setTimeout(() => {
      clearInterval(interval)
      gsap.to(counterEl, {
        textContent: 100,
        duration: 0.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onComplete: () => {
          // Slide up exit animation
          gsap.to('[data-preloader]', {
            yPercent: -100,
            duration: 0.8,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsComplete(true)
            },
          })
        },
      })
    }, 1800)
  }, [])

  if (isComplete) return null

  return (
    <div
      data-preloader
      className="fixed inset-0 z-50 bg-background flex items-center justify-center"
    >
      {/* Progress bar background */}
      <div className="absolute bottom-12 left-12 right-12 h-px bg-border" />

      {/* Animated progress bar */}
      <div
        className="absolute bottom-12 left-12 h-px bg-primary"
        style={{
          width: '0%',
          animation: 'progressPulse 1.5s ease-in-out infinite',
        }}
      />

      {/* Counter */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-7xl md:text-8xl font-display font-900 text-foreground tracking-tight">
          <span data-counter>0</span>
        </div>
        <div className="text-xs font-mono text-muted-foreground uppercase tracking-[0.2em]">
          Loading
        </div>
      </div>

      <style>{`
        @keyframes progressPulse {
          0% { width: 0%; }
          50% { width: 40%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  )
}
