'use client'

export function TopBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-accent-green text-black">
      <div className="max-w-7xl mx-auto px-12 py-2.5 flex items-center justify-center gap-4">
        <span className="font-mono text-xs font-600 tracking-widest">
          Open to Security Roles & Bug Bounty Collaborations
        </span>
        <a
          href="#contact"
          className="font-mono text-xs font-700 whitespace-nowrap hover:opacity-70 transition-opacity"
        >
          Get in Touch →
        </a>
      </div>
    </div>
  )
}
