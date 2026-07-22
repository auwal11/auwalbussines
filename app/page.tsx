'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { Preloader } from '@/components/portfolio/preloader'
import { TopBanner } from '@/components/portfolio/top-banner'
import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { Ticker } from '@/components/portfolio/ticker'
import { About } from '@/components/portfolio/about'
import { Methodology } from '@/components/portfolio/methodology'
import { Timeline } from '@/components/portfolio/timeline'
import { Platforms } from '@/components/portfolio/platforms'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smooth: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Preloader />
      <TopBanner />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Methodology />
        <Timeline />
        <Platforms />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
