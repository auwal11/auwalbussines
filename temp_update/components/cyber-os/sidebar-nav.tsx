'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Search,
  Globe,
  Shield,
  Wifi,
  Zap,
  Lock,
  FileText,
  Bot,
  Terminal,
  Settings,
  Layers,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  description: string
  children?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Recon & Enum',
    href: '/hidden-portal/dashboard/recon',
    icon: <Search className="w-5 h-5" />,
    description: 'Subdomain enumeration & reconnaissance',
  },
  {
    label: 'Web Exploitation',
    href: '/hidden-portal/dashboard/web-exploit',
    icon: <Globe className="w-5 h-5" />,
    description: 'OWASP & payload testing',
  },
  {
    label: 'API Security',
    href: '/hidden-portal/dashboard/api-security',
    icon: <Shield className="w-5 h-5" />,
    description: 'JWT, IDOR, rate limiting tests',
  },
  {
    label: 'Network Attacks',
    href: '/hidden-portal/dashboard/network',
    icon: <Wifi className="w-5 h-5" />,
    description: 'Port scanning & service enum',
  },
  {
    label: 'Exploitation',
    href: '/hidden-portal/dashboard/exploitation',
    icon: <Zap className="w-5 h-5" />,
    description: 'Reverse shells & exploitation',
  },
  {
    label: 'Post-Exploitation',
    href: '/hidden-portal/dashboard/post-exploit',
    icon: <Lock className="w-5 h-5" />,
    description: 'Lateral movement & persistence',
  },
  {
    label: 'Automation',
    href: '/hidden-portal/dashboard/automation',
    icon: <Layers className="w-5 h-5" />,
    description: 'Workflows & tool automation',
  },
  {
    label: 'Terminal',
    href: '/hidden-portal/dashboard/terminal',
    icon: <Terminal className="w-5 h-5" />,
    description: 'Embedded xterm console',
  },
  {
    label: 'Reporting',
    href: '/hidden-portal/dashboard/reporting',
    icon: <FileText className="w-5 h-5" />,
    description: 'Generate reports & CVSS',
  },
  {
    label: 'AI Assistant',
    href: '/hidden-portal/dashboard/ai-assistant',
    icon: <Bot className="w-5 h-5" />,
    description: 'Vulnerability analysis & remediation',
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-[#0a0e27]/80 border border-[#00ffb4]/20 hover:border-[#00ffb4]/50 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -100 }}
        className="fixed left-0 top-0 z-40 w-64 h-screen bg-[#0a0e27] border-r border-[#00ffb4]/10 flex flex-col overflow-hidden md:translate-x-0 md:static md:h-screen"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-[#00ffb4]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ffb4] to-[#00d4ff] flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#0a0e27]" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#e8f0fe]">CYBER OS</div>
              <div className="text-xs text-[#6b7c99]">Red Team Suite</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href)
            return (
              <motion.div key={item.href} whileHover={{ x: 4 }}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex flex-col gap-2 p-3 rounded-lg border transition-all duration-200',
                    isActive
                      ? 'bg-[#00ffb4]/10 border-[#00ffb4]/30 shadow-lg shadow-[#00ffb4]/20'
                      : 'border-[#00ffb4]/0 hover:border-[#00ffb4]/20 hover:bg-[#ffffff]/5'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'transition-colors',
                        isActive ? 'text-[#00ffb4]' : 'text-[#6b7c99] group-hover:text-[#00ffb4]'
                      )}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div
                        className={cn(
                          'text-sm font-medium transition-colors',
                          isActive ? 'text-[#00ffb4]' : 'text-[#e8f0fe]'
                        )}
                      >
                        {item.label}
                      </div>
                      <div className="text-xs text-[#6b7c99] hidden sm:block">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-[#00ffb4]/10">
          <Link
            href="/hidden-portal/dashboard/settings"
            className="flex items-center gap-3 p-3 rounded-lg border border-[#00ffb4]/0 hover:border-[#00ffb4]/20 transition-all"
          >
            <Settings className="w-5 h-5 text-[#6b7c99]" />
            <div className="flex-1">
              <div className="text-sm font-medium text-[#e8f0fe]">Settings</div>
              <div className="text-xs text-[#6b7c99]">Workspace & API keys</div>
            </div>
          </Link>
        </div>
      </motion.aside>
    </>
  )
}
