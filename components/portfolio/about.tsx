import { Globe, Languages, MapPin, Target, UserRound } from "lucide-react"
import { Reveal } from "./reveal"

interface SkillBar {
  label: string
  pct: number
}

const SKILL_BARS: SkillBar[] = [
  { label: "Smart Contract Security", pct: 90 },
  { label: "Rust / Soroban Development", pct: 80 },
  { label: "EVM / Solidity Auditing", pct: 85 },
  { label: "Web Application Security", pct: 75 },
  { label: "DeFi Protocol Analysis", pct: 88 },
]

const PROFILE: { icon: React.ElementType; label: string; value: string }[] = [
  { icon: UserRound, label: "Name", value: "AUWAL" },
  { icon: Globe, label: "Role", value: "Web3 Security Researcher & Software Developer" },
  { icon: MapPin, label: "Location", value: "Nigeria" },
  { icon: Languages, label: "Languages", value: "English" },
  { icon: Target, label: "Focus", value: "DeFi Security, Smart Contract Auditing, Bug Bounty" },
]

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 border-t border-zinc-900">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#00E5FF]">
            / 01 — Profile
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            About.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="h-full rounded-xl border border-[rgba(0,229,255,0.1)]/80 bg-[#1E293B]/40 p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-amber-400/30 bg-[#00E5FF]/[0.08] text-[#00E5FF]">
                    <UserRound className="h-4 w-4" />
                  </span>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#CBD5E1]">
                    whoami
                  </p>
                </div>
                <span aria-hidden className="font-mono text-[10px] tracking-widest text-[#64748B]">
                  ID/01
                </span>
              </div>
              <dl className="divide-y divide-zinc-800/80">
                {PROFILE.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="grid grid-cols-3 gap-3 py-3">
                    <dt className="col-span-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </dt>
                    <dd className="col-span-2 text-sm text-[#CBD5E1]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delayMs={120}>
            <div className="flex h-full flex-col gap-7 rounded-xl border border-[rgba(0,229,255,0.1)]/80 bg-[#1E293B]/40 p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#00E5FF]">
                  $ cat about.md
                </p>
                <p className="mt-3 text-pretty text-base leading-relaxed text-[#CBD5E1]">
                  Independent Web3 security researcher specialized in identifying critical
                  vulnerabilities across DeFi protocols and Web3 infrastructure. Bug bounty hunter
                  since <span className="text-[#00E5FF]">2020</span>, with active engagements on{" "}
                  <span className="text-[#F8FAFC]">HackerOne</span>,{" "}
                  <span className="text-[#F8FAFC]">HackenProof</span>,{" "}
                  <span className="text-[#F8FAFC]">Code4rena</span>, and{" "}
                  <span className="text-[#F8FAFC]">Cantina</span> — focused on logic bugs, access
                  control flaws and economic exploits in smart contracts written in Solidity and
                  Rust.
                </p>
              </div>

              <div className="space-y-4">
                {SKILL_BARS.map((s, i) => (
                  <div key={s.label}>
                    <div className="mb-1.5 flex items-center justify-between font-mono text-[11px]">
                      <span className="text-[#CBD5E1]">{s.label}</span>
                      <span className="text-[#00E5FF]">{s.pct}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-[#1A2332]">
                      <div
                        className="h-full rounded-full bg-[#00E5FF] shadow-[0_0_10px_rgba(251,191,36,0.5)]"
                        style={{
                          width: `${s.pct}%`,
                          transition: "width 1.2s ease-out",
                          transitionDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
