import { Header } from "@/components/business/header"
import { Hero } from "@/components/business/hero"
import { Stats } from "@/components/business/stats"
import { Services } from "@/components/business/services"
import { Portfolio } from "@/components/business/portfolio"
import { SecurityResearch } from "@/components/business/security-research"
import { Contact } from "@/components/business/contact"
import { Footer } from "@/components/business/footer"
import { AIChat } from "@/components/business/ai-chat"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f0f4ff]">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <SecurityResearch />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  )
}
