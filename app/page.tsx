import { Header } from "@/components/business/header"
import { Hero } from "@/components/business/hero"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#FFFFFF]">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  )
}
