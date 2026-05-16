import { createClient } from "@/lib/supabase/server"
import { Users, FileText, Share2, Clock, TrendingUp, CheckCircle } from "lucide-react"
import Link from "next/link"

async function getStats() {
  const supabase = await createClient()
  
  const [clientsResult, broadcastsResult] = await Promise.all([
    supabase.from("client_requests").select("id, status, created_at"),
    supabase.from("social_broadcasts").select("id, created_at"),
  ])

  const clients = clientsResult.data || []
  const broadcasts = broadcastsResult.data || []

  // Calculate stats
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const thisWeekClients = clients.filter(
    (c) => new Date(c.created_at) >= weekAgo
  ).length

  const pendingClients = clients.filter(
    (c) => c.status === "new" || c.status === "in-review"
  ).length

  const completedClients = clients.filter((c) => c.status === "completed").length

  return {
    totalClients: clients.length,
    thisWeekClients,
    pendingClients,
    completedClients,
    totalBroadcasts: broadcasts.length,
    recentClients: clients.slice(0, 5),
  }
}

export default async function DashboardOverview() {
  const stats = await getStats()

  const statCards = [
    {
      label: "Total Submissions",
      value: stats.totalClients,
      icon: Users,
      color: "#3b82f6",
      href: "/hidden-portal/dashboard/clients",
    },
    {
      label: "This Week",
      value: stats.thisWeekClients,
      icon: TrendingUp,
      color: "#06b6d4",
    },
    {
      label: "Pending",
      value: stats.pendingClients,
      icon: Clock,
      color: "#f59e0b",
    },
    {
      label: "Completed",
      value: stats.completedClients,
      icon: CheckCircle,
      color: "#3b82f6",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome to the Auwal Business Command Center
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="glass-card rounded-xl p-5 group hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              {stat.href && (
                <Link
                  href={stat.href}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  View all
                </Link>
              )}
            </div>
            <div className="font-display text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Recent Submissions
          </h2>
          {stats.recentClients.length === 0 ? (
            <p className="text-muted-foreground text-sm">No submissions yet</p>
          ) : (
            <div className="space-y-3">
              {stats.recentClients.map((client: { id: string; status: string; created_at: string }) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">
                      New request
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(client.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Link
            href="/hidden-portal/dashboard/clients"
            className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View all clients
          </Link>
        </div>

        {/* Quick Links */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link
              href="/hidden-portal/dashboard/social"
              className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Share2 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Social AI Command Center
                </div>
                <div className="text-xs text-muted-foreground">
                  Create and publish social posts with AI
                </div>
              </div>
            </Link>
            <Link
              href="/hidden-portal/dashboard/cv-builder"
              className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-accent-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  AI CV Builder
                </div>
                <div className="text-xs text-muted-foreground">
                  Generate professional CVs with AI
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
