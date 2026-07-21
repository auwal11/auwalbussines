'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border py-16 px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div>
            <svg viewBox="0 0 100 100" className="w-8 h-8 mb-4 animate-spin" style={{ animationDuration: '8s' }}>
              <path d="M 50 20 Q 70 30, 75 50 Q 70 35, 50 30 Z" fill="#0ae448" opacity="0.9" />
              <path d="M 75 50 Q 70 70, 50 80 Q 60 65, 70 60 Z" fill="#00d4ff" opacity="0.8" />
              <path d="M 50 80 Q 30 70, 25 50 Q 35 65, 50 70 Z" fill="#0ae448" opacity="0.5" />
              <path d="M 25 50 Q 30 30, 50 20 Q 40 35, 30 45 Z" fill="#00d4ff" opacity="0.6" />
              <circle cx="50" cy="50" r="6" fill="#0ae448" />
            </svg>
            <h3 className="font-display font-900 text-foreground uppercase tracking-wider text-sm mb-2">
              Auwal Bashar
            </h3>
            <p className="text-xs text-muted-foreground">
              Security Researcher
            </p>
          </div>

          {/* Links */}
          {[
            {
              label: 'Research',
              items: ['Methodology', 'Timeline', 'Platforms'],
            },
            {
              label: 'Specializations',
              items: ['Vulnerability Research', 'API Security', 'Smart Contracts'],
            },
            {
              label: 'Connect',
              items: ['HackerOne', 'GitHub', 'Contact'],
            },
            {
              label: 'Legal',
              items: ['Privacy', 'Terms', 'Disclosure'],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                {section.label}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-xs text-foreground-secondary hover:text-foreground transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Auwal Bashar. No unverified claims. No inflated figures. Only real, responsible research.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: 'GitHub', href: '#' },
              { label: 'HackerOne', href: '#' },
              { label: 'HackenProof', href: '#' },
              { label: 'Cantina', href: '#' },
              { label: 'Twitter/X', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 uppercase tracking-widest font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
