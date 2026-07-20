'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animated Grid Background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number
    let time = 0

    const drawGrid = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gridSize = 50
      const wave = Math.sin(time * 0.002) * 2

      ctx.strokeStyle = 'rgba(0, 217, 163, 0.05)'
      ctx.lineWidth = 1

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const offsetY = Math.sin((x + time * 0.05) * 0.01) * 10 + wave
          ctx.beginPath()
          ctx.moveTo(x, y + offsetY)
          ctx.lineTo(x + gridSize, y + offsetY)
          ctx.stroke()
        }
      }

      // Draw animated particles
      ctx.fillStyle = 'rgba(0, 217, 163, 0.1)'
      for (let i = 0; i < 20; i++) {
        const x = Math.sin(time * 0.001 + i) * canvas.width
        const y = (time * 0.1 + i * 30) % canvas.height
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      time++
      animationId = requestAnimationFrame(drawGrid)
    }

    drawGrid()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Grid Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />

      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          className="mb-8 inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest">
            Smart Contract Security
          </span>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Securing Web3
          <br />
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            One Contract at a Time
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Smart Contract Security Researcher, Bug Bounty Hunter, and FinTech Security Engineer.
          Protecting DeFi protocols with precision audits and vulnerability research.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.button 
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-background font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Vulnerabilities
          </motion.button>
          <motion.button 
            className="px-8 py-4 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Reports
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
