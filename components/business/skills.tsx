"use client"

import { Reveal } from "./reveal"

interface SkillRow {
  label: string
  items: Skill[]
}

interface Skill {
  name: string
  desc: string
}

const skillRows: SkillRow[] = [
  {
    label: "Languages",
    items: [
      { name: "Rust", desc: "Smart contracts & security tools" },
      { name: "Solidity", desc: "EVM smart contracts" },
      { name: "Python", desc: "Security automation" },
      { name: "TypeScript", desc: "Web3 dApps" },
    ],
  },
  {
    label: "Tools & Platforms",
    items: [
      { name: "Foundry", desc: "Smart contract testing" },
      { name: "Termux/Linux", desc: "Mobile bug hunting" },
      { name: "Git/GitHub", desc: "Version control" },
      { name: "Burp Suite", desc: "Web security" },
    ],
  },
  {
    label: "Protocols",
    items: [
      { name: "Ethereum/EVM", desc: "DeFi protocols" },
      { name: "Bitcoin/UTXO", desc: "Bitcoin security" },
      { name: "Stellar/Soroban", desc: "Rust contracts" },
      { name: "Monad", desc: "High-performance EVM" },
    ],
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16 animate-fade-up">
          <p className="text-[#00d4aa] font-mono text-xs uppercase tracking-widest mb-2">
            ARSENAL
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f4ff]">
            Technical Arsenal
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {skillRows.map((row, rowIdx) => (
            <div key={row.label}>
              {/* Row label */}
              <div className="mb-5 flex items-center gap-4 pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#8b9bc8]">
                  {row.label}
                </span>
                <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-[rgba(0,212,170,0.3)] to-transparent" />
                <span className="font-mono text-xs tracking-widest text-[#8b9bc8]">
                  {String(row.items.length).padStart(2, "0")}
                </span>
              </div>

              {/* Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {row.items.map((skill, i) => (
                  <Reveal as="div" key={skill.name} delayMs={rowIdx * 60 + i * 50}>
                    <div className="group bg-[rgba(15,25,50,0.85)] border border-[rgba(124,58,237,0.3)] rounded-lg p-4 hover:border-[rgba(0,212,170,0.5)] transition-all duration-300 cursor-pointer">
                      <h3 className="text-sm font-semibold text-[#f0f4ff] mb-1 group-hover:text-[#00d4aa] transition-colors">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-[#8b9bc8]">{skill.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
