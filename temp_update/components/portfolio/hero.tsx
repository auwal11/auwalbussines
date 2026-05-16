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

      {/* Warm radial accent — single, subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-amber-500/[0.08] blur-3xl animate-orb-float"
      />

      {/* Secondary cool accent for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[460px] w-[460px] rounded-full bg-zinc-100/[0.025] blur-3xl"
      />

      {/* Scan beam — modern, security-themed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-transparent via-amber-400/[0.06] to-transparent blur-2xl animate-scan-beam" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left side metadata column */}
          <aside className="animate-fade-up hidden lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                Researcher / 001
              </p>
              <div aria-hidden className="mt-3 h-px w-12 bg-amber-400/60" />
            </div>
            <dl className="mt-10 space-y-5 font-mono text-[11px]">
              <div>
                <dt className="uppercase tracking-[0.2em] text-zinc-600">Location</dt>
                <dd className="mt-1 text-[#CBD5E1]">Nigeria</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.2em] text-zinc-600">Active Since</dt>
                <dd className="mt-1 text-[#CBD5E1]">2020</dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.2em] text-zinc-600">Discipline</dt>
                <dd className="mt-1 text-[#CBD5E1]">Web3 Security</dd>
              </div>
            </dl>
          </aside>

          {/* Main column */}
          <div className="lg:col-span-9">
            <span className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-300">
              <Shield className="h-3.5 w-3.5" />
              Web3 Security Researcher
            </span>

            <h1 className="animate-fade-up delay-100 mt-7 font-mono text-[clamp(3rem,11vw,9rem)] font-bold leading-[0.92] tracking-[-0.04em] text-zinc-50">
              AUWAL
              <span className="text-amber-400">.</span>
            </h1>

            <div aria-hidden className="animate-fade-up delay-200 mt-6 h-px w-24 bg-amber-400/50" />

            <p className="animate-fade-up delay-200 mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[#CBD5E1] sm:text-xl">
              Independent{" "}
              <span className="text-amber-300">security researcher</span> &amp; software developer
              hunting critical vulnerabilities in DeFi protocols, smart contracts, and Web3
              infrastructure since 2020.
            </p>

            <div className="animate-fade-up delay-300 mt-5 flex min-h-[1.75rem] items-center font-mono text-sm text-[#94A3B8]">
              <span className="mr-2 text-amber-400/70">{"$"}</span>
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
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-amber-400 px-5 py-2.5 font-mono text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 hover:shadow-[0_0_36px_-6px_rgba(251,191,36,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                View Engagements
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://github.com/auwntech-audit"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-[#1E293B]/40 px-5 py-2.5 font-mono text-sm font-medium text-zinc-200 transition hover:border-amber-400/50 hover:text-amber-300"
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
