import { ArrowRight, Github, Shield } from "lucide-react"
import { TypingText } from "./typing-text"

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      {/* Dot grid */}
      <div aria-hidden className="absolute inset-0 bg-dot-grid" />
      <div aria-hidden className="absolute inset-0 bg-grid-mask" />

      {/* Cyan accent orb - primary */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#00E5FF]/[0.08] blur-3xl animate-orb-float"
      />

      {/* Purple accent orb - secondary depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[460px] w-[460px] rounded-full bg-[#7C3AED]/[0.04] blur-3xl animate-orb-float-slow"
      />

      {/* Premium scan beam - cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-transparent via-[#00E5FF]/[0.04] to-transparent blur-2xl animate-scan-beam" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left side metadata column */}
          <aside className="animate-fade-up hidden lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#64748B]">
                Researcher / 001
              </p>
              <div aria-hidden className="mt-3 h-px w-12 bg-[#00E5FF]/60" />
            </div>
            <dl className="mt-10 space-y-5 font-mono text-[11px]">
              <div>
                <dt className="uppercase tracking-[0.2em] text-[#64748B]">Location</dt>
                <dd className="mt-1 text-[#CBD5E1]">Nigeria</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.2em] text-[#64748B]">Active Since</dt>
                <dd className="mt-1 text-[#CBD5E1]">2020</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.2em] text-[#64748B]">Discipline</dt>
                <dd className="mt-1 text-[#CBD5E1]">Web3 Security</dd>
              </div>
            </dl>
          </aside>

          {/* Main column */}
          <div className="lg:col-span-9">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-[#00E5FF]/[0.06] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[#00E5FF]">
              <Shield className="h-3.5 w-3.5" />
              Web3 Security Researcher
            </span>

            <h1 className="animate-fade-up delay-100 mt-7 font-mono text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.92] tracking-[-0.04em] text-zinc-50">
              AUWAL
              <span className="text-[#00E5FF]">.</span>
            </h1>

            <div aria-hidden className="animate-fade-up delay-200 mt-6 h-px w-24 bg-[#00E5FF]/50" />

            <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#CBD5E1] sm:text-xl">
              Independent{" "}
              <span className="text-[#00E5FF]">security researcher</span> &amp; software developer
              hunting critical vulnerabilities in DeFi protocols, smart contracts, and Web3
              infrastructure since 2020.
            </p>

            <div className="animate-fade-up delay-300 mt-5 flex min-h-[1.75rem] items-center font-mono text-sm text-[#94A3B8]">
              <span className="mr-2 text-[#00E5FF]/70">{"$"}</span>
              <TypingText
                words={[
                  "Smart Contract Auditor",
                  "Bug Bounty Hunter",
                  "Rust Developer",
                  "DeFi Researcher",
                ]}
              />
            </div>

            <div className="animate-fade-up delay-500 mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a
                href="#engagements"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] px-6 py-3 font-mono text-sm font-bold text-[#0F172A] transition-all duration-200 hover:shadow-[0_8_24px_rgba(0,229,255,0.4)] hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]"
              >
                View Engagements
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://github.com/auwntech-audit"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(0,229,255,0.2)] bg-[#1E293B]/50 px-6 py-3 font-mono text-sm font-semibold text-[#00E5FF] transition-all duration-200 hover:border-[#00E5FF]/40 hover:bg-[#1E293B]/80 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:-translate-y-1"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
