'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="relative border-t border-primary/10 bg-surface/20 backdrop-blur-xl py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Auwal</h3>
            <p className="text-sm text-muted">
              Smart Contract Security Researcher & Bug Bounty Hunter
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Portfolio</h4>
            <ul className="space-y-2">
              {['Vulnerabilities', 'Reports', 'Research'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Social</h4>
            <ul className="space-y-2">
              {['GitHub', 'Twitter', 'LinkedIn'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <a href="mailto:hello@auwal.dev" className="text-sm text-muted hover:text-primary transition-colors">
              hello@auwal.dev
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between text-sm text-muted">
          <p>&copy; 2024 Auwal. All rights reserved.</p>
          <p>Crafted with precision & security in mind</p>
        </div>
      </div>
    </footer>
  )
}
