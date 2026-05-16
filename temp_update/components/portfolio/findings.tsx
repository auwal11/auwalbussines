import { Lock } from "lucide-react"
import { Reveal } from "./reveal"

interface Platform {
  name: string
  scope: string
  status: "Active" | "Ongoing"
}

const PLATFORMS: Platform[] = [
  { name: "HackerOne", scope: "Web & Web3 programs", status: "Active" },
  { name: "HackenProof", scope: "DeFi & infrastructure", status: "Active" },
  { name: "Code4rena", scope: "Smart contract audits", status: "Active" },
  { name: "Cantina", scope: "Protocol reviews", status: "Active" },
  { name: "Direct Disclosure", scope: "Coordinated disclosures", status: "Ongoing" },
]

interface Domain {
  label: string
  blurb: string
}

const DOMAINS: Domain[] = [
  {
    label: "DeFi Protocols",
    blurb: "Lending, AMMs, liquidations, oracle integrations, yield mechanics.",
  },
  {
    label: "Bridges & Cross-Chain",
    blurb: "Message passing, replay protection, validator/relayer assumptions.",
  },
  {
    label: "Smart Contracts",
    blurb: "EVM (Solidity) and Soroban / Rust auditing for logic & access control bugs.",
  },
  {
    label: "Web3 Infrastructure",
    blurb: "RPC endpoints, indexers, off-chain components and key management.",
  },
]

export function Findings() {
  return (
    <section
      id="engagements"
      className="relative scroll-mt-24 border-t border-zinc-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-amber-300">
              / 02 — Engagements
            </p>
            <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
              Where I work,
              <br />
              what I look at.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-[#94A3B8]">
              Active across major bug bounty platforms and audit competitions. Specific findings,
              clients and proofs-of-concept are shared privately under coordinated disclosure.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-[#0F0E1A]/60 px-3 py-1.5 font-mono text-[11px] text-[#94A3B8]">
              <Lock className="h-3 w-3 text-amber-300" />
              Details disclosed under NDA / responsible disclosure
            </div>
          </Reveal>

          <div className="lg:col-span-8 lg:pl-8 lg:border-l lg:border-zinc-900">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Platforms
              </p>
              <ul className="mt-4 divide-y divide-zinc-900 border-y border-zinc-900">
                {PLATFORMS.map((p, i) => (
                  <li
                    key={p.name}
                    className="group grid grid-cols-12 items-center gap-3 px-1 py-4 transition hover:bg-amber-400/[0.02]"
                  >
                    <span className="col-span-1 font-mono text-[11px] tracking-widest text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="col-span-5 font-mono text-base font-semibold text-[#F8FAFC] group-hover:text-amber-300 transition-colors sm:col-span-4">
                      {p.name}
                    </span>
                    <span className="col-span-4 hidden text-xs text-[#94A3B8] sm:inline-block sm:col-span-5">
                      {p.scope}
                    </span>
                    <span className="col-span-6 inline-flex justify-end sm:col-span-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#94A3B8]">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.status === "Active" ? "bg-amber-400" : "bg-zinc-500"
                          } shadow-[0_0_8px_currentColor]`}
                        />
                        {p.status}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delayMs={120}>
              <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Research focus
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {DOMAINS.map((d) => (
                  <li
                    key={d.label}
                    className="group rounded-lg border border-zinc-800/80 bg-[#0F0E1A]/30 p-5 transition hover:border-amber-400/40 hover:bg-[#0F0E1A]/60"
                  >
                    <p className="font-mono text-sm font-semibold text-[#F8FAFC] group-hover:text-amber-300 transition-colors">
                      {d.label}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[#94A3B8]">{d.blurb}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
