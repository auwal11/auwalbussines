"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, Share2, FileText, LogOut, Shield } from "lucide-react"

const navItems = [
  { href: "/hidden-portal/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/hidden-portal/dashboard/clients", icon: Users, label: "Clients" },
  { href: "/hidden-portal/dashboard/social", icon: Share2, label: "Social AI" },
  { href: "/hidden-portal/dashboard/cv-builder", icon: FileText, label: "CV Builder" },
]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/hidden-portal")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface/90 backdrop-blur-xl border-b border-border">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/hidden-portal/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display font-semibold text-foreground hidden sm:inline">
            Command Center
          </span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-danger hover:bg-danger/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  )
}
