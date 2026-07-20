'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { Navbar } from '@/components/portfolio/navbar'
import { Hero } from '@/components/portfolio/hero'
import { Expertise } from '@/components/portfolio/expertise'
import { CaseStudies } from '@/components/portfolio/case-studies'
import { Timeline } from '@/components/portfolio/timeline'
import { Methodology } from '@/components/portfolio/methodology'
import { Skills } from '@/components/portfolio/skills'
import { Publications } from '@/components/portfolio/publications'
import { Services } from '@/components/portfolio/services'
import { Contact } from '@/components/portfolio/contact'
import { Footer } from '@/components/portfolio/footer'

export default function Page() {
  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <CaseStudies />
        <Timeline />
        <Methodology />
        <Skills />
        <Publications />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
