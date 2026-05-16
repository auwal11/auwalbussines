import { Calendar, Layers3, Shield } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { CountUp } from "./count-up"
import { Reveal } from "./reveal"

interface Stat {
  icon: LucideIcon
  value: number
  suffix?: string
  label: string
  sub: string
  isYear?: boolean
}

const STATS: Stat[] = [
  {
    icon: Shield,
    value: 200,
    suffix: "+",
    label: "Vulnerabilities Reported",
    sub: "Across DeFi & Web3 protocols",
  },
  {
    icon: Layers3,
    value: 5,
    suffix: "+",
    label: "Active Platforms",
    sub: "H1, HackenProof, C4, Cantina",
  },
  {
    icon: Calendar,
    value: 2020,
    label: "Bug Bounty Since",
    sub: "Years of focused research",
    isYear: true,
  },
]

export function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="relative">
      <h2 id="stats-heading" className="sr-only">
        Key statistics
      </h2>
      <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-900/20">
          <ul className="grid grid-cols-1 divide-zinc-800/80 sm:grid-cols-3 sm:divide-x">
            {STATS.map(({ icon: Icon, value, suffix, label, sub, isYear }, i) => (
              <Reveal as="li" key={label} delayMs={i * 100}>
                <div className="group flex h-full flex-col gap-4 p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-amber-400/20 bg-amber-400/[0.08] text-amber-300 transition group-hover:border-amber-400/40">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span aria-hidden className="font-mono text-[10px] tracking-[0.25em] text-zinc-600">
                      / {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="font-mono text-5xl font-bold text-zinc-50 display-numeral">
                    {isYear ? (
                      <span>{value}</span>
                    ) : (
                      <CountUp end={value} suffix={suffix} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{label}</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                      {sub}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
