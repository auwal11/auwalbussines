"use client"

import { Shield, Lock, Bug, Globe, Code, Server, ExternalLink } from "lucide-react"

const platforms = [
  { name: "HackerOne", scope: "Web & Web3 programs", status: "Active" },
  { name: "HackenProof", scope: "DeFi & infrastructure", status: "Active" },
  { name: "Code4rena", scope: "Smart contract audits", status: "Active" },
  { name: "Cantina", scope: "Protocol reviews", status: "Active" },
  { name: "Direct Disclosure", scope: "Coordinated disclosures", status: "Ongoing" },
]

const domains = [
  {
    icon: Code,
    label: "DeFi Protocols",
    blurb: "Lending, AMMs, liquidations, oracle integrations, yield mechanics.",
  },
  {
    icon: Globe,
    label: "Bridges & Cross-Chain",
    blurb: "Message passing, replay protection, validator/relayer assumptions.",
  },
  {
    icon: Shield,
    label: "Smart Contracts",
    blurb: "EVM (Solidity) and Soroban / Rust auditing for logic & access control bugs.",
  },
  {
    icon: Server,
    label: "Web3 Infrastructure",
    blurb: "RPC endpoints, indexers, off-chain components and key management.",
  },
]

const skills = [
  { label: "Smart Contract Security", pct: 90 },
  { label: "Rust / Soroban Development", pct: 80 },
  { label: "EVM / Solidity Auditing", pct: 85 },
  { label: "Web Application Security", pct: 75 },
  { label: "DeFi Protocol Analysis", pct: 88 },
]

export function SecurityResearch() {
  return (
    <section id="security" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-b from-[#7c3aed]/[0.05] to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#00d4aa]/40 bg-gradient-to-r from-[#00d4aa]/10 to-[#7c3aed]/10 px-4 py-1.5 text-xs font-mono text-[#00d4aa] mb-6">
            <Bug className="h-3.5 w-3.5" />
            SECURITY RESEARCH
          </div>
          <h2 className="animate-fade-up delay-100 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
            Web3 Security & Bug Bounty
          </h2>
          <p className="animate-fade-up delay-200 mx-auto max-w-2xl text-[#8b9bc8] text-base sm:text-lg">
            Beyond building apps, I hunt vulnerabilities in DeFi protocols and Web3 infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: About & Skills */}
          <div className="animate-fade-up delay-300 glass-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-[#00d4aa]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[#f0f4ff]">
                  Security Researcher
                </h3>
                <p className="text-sm text-[#8b9bc8]">Bug Bounty Hunter since 2020</p>
              </div>
            </div>

            <p className="text-[#8b9bc8] text-sm leading-relaxed mb-8">
              Independent Web3 security researcher specialized in identifying critical
              vulnerabilities across DeFi protocols and Web3 infrastructure. Active on major
              bug bounty platforms, focused on logic bugs, access control flaws and economic
              exploits in smart contracts written in Solidity and Rust.
            </p>

            {/* Skills bars */}
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <div key={skill.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-[#8b9bc8]">{skill.label}</span>
                    <span className="text-xs font-mono text-[#00d4aa]">{skill.pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[#1a1f30] shadow-lg shadow-[#00d4aa]/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#00d4aa] to-[#7c3aed] transition-all duration-1000 shadow-lg shadow-[#00d4aa]/50"
                      style={{
                        width: `${skill.pct}%`,
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Platforms & Domains */}
          <div className="space-y-6">
            {/* Platforms */}
            <div className="animate-fade-up delay-400 glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-mono text-xs uppercase tracking-wider text-[#8b9bc8]">
                  Active Platforms
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#8b9bc8]">
                  <Lock className="h-3 w-3 text-[#f59e0b]" />
                  Under NDA
                </div>
              </div>
              <div className="space-y-2">
                {platforms.map((p, i) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#00d4aa]/5 border border-[#00d4aa]/15 hover:border-[#00d4aa]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#8b9bc8] w-5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-medium text-sm text-[#f0f4ff]">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline text-xs text-[#8b9bc8]">{p.scope}</span>
                      <span className="flex items-center gap-1.5 text-xs font-mono text-[#8b9bc8]">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.status === "Active" ? "bg-[#00d4aa]" : "bg-[#8b9bc8]"
                          }`}
                        />
                        {p.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Domains */}
            <div className="animate-fade-up delay-500 grid grid-cols-2 gap-3">
              {domains.map((d) => (
                <div
                  key={d.label}
                  className="glass-card rounded-xl p-4 group hover:border-[#00d4aa]/40 transition-colors"
                >
                  <d.icon className="h-5 w-5 text-[#00d4aa] mb-3 group-hover:scale-110 transition-transform" />
                  <h5 className="font-medium text-sm text-[#f0f4ff] mb-1">{d.label}</h5>
                  <p className="text-xs text-[#8b9bc8] leading-relaxed">{d.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
