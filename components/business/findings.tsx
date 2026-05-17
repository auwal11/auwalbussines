"use client"

import { ExternalLink } from "lucide-react"

type SeverityType = "critical" | "high" | "medium" | "low" | "informational"

interface Finding {
  severity: SeverityType
  project: string
  title: string
  platform: string
  status: string
  reward?: number
}

const findings: Finding[] = [
  {
    severity: "medium",
    project: "Monday Trade",
    title: "Metabase Setup Token Exposed via Unauthenticated API Endpoint",
    platform: "HackenProof",
    status: "Submitted",
  },
  {
    severity: "high",
    project: "Monday Trade",
    title: "Private Monad RPC/WebSocket Tokens Hardcoded in Public JS Bundle",
    platform: "HackenProof",
    status: "Submitted",
  },
  {
    severity: "medium",
    project: "Whitechain Bridge",
    title: "Missing Replay Protection in receiveTokens() Enables Duplicate Processing",
    platform: "HackenProof",
    status: "Submitted",
  },
  {
    severity: "high",
    project: "Alchemy",
    title: "Incomplete Selector Allow-list in PermissionBuilder — Session-Key Privilege Escalation",
    platform: "Cantina",
    status: "Confirmed",
    reward: 250,
  },
  {
    severity: "high",
    project: "Alchemy",
    title: "entityId Storage Collision: GAS_LIMIT Hook Silently Overwrites NATIVE_TOKEN_TRANSFER Limit",
    platform: "Cantina",
    status: "In Review",
  },
  {
    severity: "medium",
    project: "Alchemy",
    title: "Paymaster Gas Overhead Incorrectly Charged Against Session Key Spending Limit",
    platform: "Cantina",
    status: "In Review",
  },
  {
    severity: "medium",
    project: "K2 Lending",
    title: "Missing Post-Liquidation Health Factor Check in kinetic-router",
    platform: "Code4rena",
    status: "Submitted",
  },
  {
    severity: "medium",
    project: "Monetrix",
    title: "Yield-Stealing Frontrun Attack via Atomic Rate Jump in sUSDM.injectYield()",
    platform: "Code4rena",
    status: "Submitted",
  },
]

function SeverityBadge({ severity, reward }: { severity: SeverityType; reward?: number }) {
  const severityConfig = {
    critical: { label: "Critical", bg: "var(--critical-bg)", text: "var(--critical)", border: "var(--critical-border)" },
    high: { label: "High", bg: "var(--high-bg)", text: "var(--high)", border: "var(--high-border)" },
    medium: { label: "Medium", bg: "var(--medium-bg)", text: "var(--medium)", border: "var(--medium-border)" },
    low: { label: "Low", bg: "var(--low-bg)", text: "var(--low)", border: "var(--low-border)" },
    informational: { label: "Info", bg: "var(--info-bg)", text: "var(--info)", border: "var(--info-border)" },
  }

  const config = severityConfig[severity]

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-semibold border"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        borderColor: config.border,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: config.text }} />
      {config.label}
      {reward && <span className="ml-1 text-[0.7em]">${reward}</span>}
    </div>
  )
}

export function Findings() {
  return (
    <section id="findings" className="relative py-20 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16 animate-fade-up">
          <p className="text-[#00d4aa] font-mono text-xs uppercase tracking-widest mb-2">
            ADVISORIES
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
            Security Findings
          </h2>
          <p className="text-[#8b9bc8] max-w-2xl">
            A selection of critical and high-severity vulnerabilities discovered during security research and bug bounty engagements.
          </p>
        </div>

        {/* Findings Grid */}
        <div className="space-y-4">
          {findings.map((finding, i) => (
            <div
              key={i}
              className="animate-fade-up group bg-[rgba(15,25,50,0.85)] border border-[rgba(0,212,170,0.1)] rounded-xl p-5 hover:border-[rgba(0,212,170,0.4)] hover:translate-y-[-4px] transition-all duration-300 backdrop-blur-sm"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Left - Severity + Project */}
                <div className="flex items-start gap-3 flex-shrink-0">
                  <SeverityBadge severity={finding.severity} reward={finding.reward} />
                  <span className="text-sm font-mono text-[#00d4aa] whitespace-nowrap">{finding.project}</span>
                </div>

                {/* Middle - Title */}
                <div className="flex-1">
                  <h3 className="text-sm sm:text-base font-semibold text-[#f0f4ff] mb-1 group-hover:text-[#00d4aa] transition-colors">
                    {finding.title}
                  </h3>
                  <p className="text-xs text-[#8b9bc8]">{finding.platform}</p>
                </div>

                {/* Right - Status + Arrow */}
                <div className="flex items-center gap-3 lg:ml-auto flex-shrink-0">
                  <span className="text-xs font-mono px-2 py-1 rounded-full bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/20 whitespace-nowrap">
                    {finding.status}
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#8b9bc8] group-hover:text-[#00d4aa] transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
