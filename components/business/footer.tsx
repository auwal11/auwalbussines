import Link from "next/link"
import { Github, Mail } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/auwaldeve", label: "GitHub" },
  { icon: Mail, href: "mailto:alhajiauwalalhaji@gmail.com", label: "Email" },
]

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Findings", href: "#findings" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-[#ffffff08] bg-[#0a0f1e]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center">
                <span className="font-display font-bold text-[#00d4aa] text-sm">A</span>
              </div>
              <span className="font-display font-semibold text-[#f0f4ff] font-mono text-lg">
                AUWAL.DEV
              </span>
            </Link>
            <p className="text-[#8b9bc8] text-sm leading-relaxed mb-6">
              Web3 Security Researcher. Hunting vulnerabilities in DeFi protocols and smart contracts.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#0a1628] border border-[#ffffff08] flex items-center justify-center text-[#8b9bc8] hover:text-[#00d4aa] hover:border-[#00d4aa]/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8b9bc8] mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#8b9bc8] hover:text-[#00d4aa] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8b9bc8] mb-4">
              Get In Touch
            </h4>
            <p className="text-[#8b9bc8] text-sm mb-3">
              Email: alhajiauwalalhaji@gmail.com
            </p>
            <p className="text-[#8b9bc8] text-sm mb-3">
              Location: Nigeria 🇳🇬
            </p>
            <p className="text-[#8b9bc8] text-sm">
              Available for work
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(0,212,170,0.1)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[#8b9bc8] text-sm">
            &copy; {new Date().getFullYear()} Auwal Bashar — Web3 Security Researcher
          </p>
          <p className="text-[#8b9bc8] text-xs font-mono">
            Built with Next.js &middot; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
