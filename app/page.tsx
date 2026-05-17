import { Header } from "@/components/business/header"
import { Hero } from "@/components/business/hero"
import { Stats } from "@/components/business/stats"
import { Findings } from "@/components/business/findings"
import { Skills } from "@/components/business/skills"
import { Contact } from "@/components/business/contact"
import { Footer } from "@/components/business/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f0f4ff]">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Findings />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
