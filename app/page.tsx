'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { Navbar } from '@/components/security/navbar'
import { Hero } from '@/components/security/hero'
import { Vulnerabilities } from '@/components/security/vulnerabilities'
import { Timeline } from '@/components/security/timeline'
import { AuditReports } from '@/components/security/audit-reports'
import { BugBounties } from '@/components/security/bug-bounties'
import { Skills } from '@/components/security/skills'
import { Research } from '@/components/security/research'
import { Contact } from '@/components/security/contact'
import { Footer } from '@/components/security/footer'

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
        <Vulnerabilities />
        <Timeline />
        <AuditReports />
        <BugBounties />
        <Skills />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
