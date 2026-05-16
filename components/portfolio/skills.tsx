import {
  Bitcoin,
  Box,
  Braces,
  FileCode,
  GitBranch,
  Hexagon,
  Layers,
  Network,
  ShieldCheck,
  Terminal,
  TerminalSquare,
  Wrench,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Reveal } from "./reveal"

interface Skill {
  name: string
  icon: LucideIcon
  desc: string
}

interface SkillRow {
  label: string
  items: Skill[]
}

const ROWS: SkillRow[] = [
  {
    label: "Languages",
    items: [
      { name: "Rust", icon: Wrench, desc: "Smart contracts, security tooling" },
      { name: "Solidity", icon: FileCode, desc: "EVM smart contracts" },
      { name: "Python", icon: Terminal, desc: "Security automation" },
      { name: "TypeScript", icon: Braces, desc: "Web3 dApps" },
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "Foundry", icon: ShieldCheck, desc: "Contract testing & fuzzing" },
      { name: "Termux / Linux", icon: TerminalSquare, desc: "Mobile bug hunting" },
      { name: "Git / GitHub", icon: GitBranch, desc: "Version control" },
      { name: "Burp Suite", icon: Box, desc: "Web security" },
    ],
  },
  {
    label: "Protocols",
    items: [
      { name: "Ethereum / EVM", icon: Hexagon, desc: "DeFi protocols" },
      { name: "Bitcoin / UTXO", icon: Bitcoin, desc: "Bitcoin security" },
      { name: "Stellar / Soroban", icon: Layers, desc: "Rust contracts" },
      { name: "Monad", icon: Network, desc: "High-performance EVM" },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 border-t border-[rgba(0,229,255,0.08)]">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FF6B00]">
            / 03 — Stack
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl">
            Technical arsenal.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#94A3B8]">
            Languages, tooling and protocol expertise used day-to-day in audits and bug bounty
            research.
          </p>
        </div>

        <div className="space-y-12">
          {ROWS.map((row, rowIdx) => (
            <div key={row.label}>
              <div className="mb-5 flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#64748B]">
                  {row.label}
                </span>
                <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[rgba(0,229,255,0.2)] to-transparent" />
                <span className="font-mono text-[10px] tracking-widest text-[#64748B]">
                  {String(row.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[rgba(0,229,255,0.12)] bg-[#1A2332]/60 backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
                {row.items.map((skill, i) => {
                  const Icon = skill.icon
                  return (
                    <Reveal as="li" key={skill.name} delayMs={rowIdx * 60 + i * 50}>
                      <div className="group flex h-full items-start gap-3 bg-[#09080E]/40 p-5 transition-all duration-200 hover:bg-[#0F0E1A]/60 hover:border-l-2 hover:border-l-[#FF6B00]">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(0,229,255,0.15)] bg-[#0F0E1A]/50 text-[#94A3B8] transition-all duration-200 group-hover:border-[#FF6B00]/40 group-hover:bg-[#FF6B00]/10 group-hover:text-[#FF6B00] group-hover:shadow-[0_0_12px_rgba(0,229,255,0.15)]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-mono text-sm font-semibold text-[#F8FAFC]">
                            {skill.name}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-[#64748B]">{skill.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
