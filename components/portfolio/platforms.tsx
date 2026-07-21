'use client'

export function Platforms() {
  const platforms = [
    {
      name: 'HackerOne',
      handle: '@auwalbussines',
      focus: 'Web App Security',
      cta: 'View Profile',
      icon: '🔐',
    },
    {
      name: 'HackenProof',
      handle: '@auwaldeve',
      focus: 'API Security',
      cta: 'View Profile',
      icon: '🛡️',
    },
    {
      name: 'Cantina',
      handle: 'Active Auditor',
      focus: 'Smart Contract Security',
      cta: 'View Profile',
      icon: '🔗',
    },
  ]

  return (
    <section className="relative py-32 px-12 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-16 flex items-center gap-3">
          <div className="w-7 h-px bg-primary" />
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-primary">Platforms</span>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl font-display font-900 mb-24 leading-tight">
          Platforms &amp; Scope
        </h2>

        {/* Three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-border bg-surface p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {/* Icon */}
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {platform.icon}
              </div>

              {/* Name */}
              <h3 className="text-2xl font-display font-700 text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {platform.name}
              </h3>

              {/* Handle */}
              <div className="text-xs font-mono text-primary uppercase tracking-widest mb-6">
                {platform.handle}
              </div>

              {/* Focus */}
              <p className="text-sm text-foreground-secondary mb-8">
                {platform.focus}
              </p>

              {/* CTA */}
              <button className="text-xs font-mono uppercase tracking-widest text-primary hover:text-foreground transition-colors duration-300 flex items-center gap-2">
                <span>{platform.cta}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
