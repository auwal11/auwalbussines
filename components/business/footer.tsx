import Link from "next/link"
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"

const socialLinks = [
  { icon: MessageCircle, href: "https://wa.me/2348012345678", label: "WhatsApp" },
  { icon: Github, href: "https://github.com/auwntech-audit", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/auwal", label: "LinkedIn" },
  { icon: Mail, href: "mailto:awntechdigitalservices@gmail.com", label: "Email" },
]

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Security Research", href: "#security" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
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
              <span className="font-display font-semibold text-[#f0f4ff] text-lg">
                Auwal Business
              </span>
            </Link>
            <p className="text-[#8b9bc8] text-sm leading-relaxed mb-6">
              Building smart websites and AI-powered applications that help businesses grow and compete in the modern digital economy.
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

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8b9bc8] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.slice(0, 4).map((link) => (
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

          {/* Legal */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8b9bc8] mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.slice(4).map((link) => (
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
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[#ffffff08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8b9bc8] text-sm">
            &copy; {new Date().getFullYear()} Auwal Business. All rights reserved.
          </p>
          <p className="text-[#6b7c99] text-xs font-mono">
            Built with Next.js &middot; Powered by AI
          </p>
        </div>
      </div>
    </footer>
  )
}
