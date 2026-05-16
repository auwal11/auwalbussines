'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AlertTriangle, Activity, TrendingUp, CheckCircle, Clock, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Stats {
  totalFindings: number
  criticalCount: number
  highCount: number
  activeScans: number
  totalProjects: number
  recentFindings: any[]
  scansTrend: any[]
}

const COLORS = ['#ff6b6b', '#ffa500', '#ffd700', '#00d4ff', '#00ffb4']

export default function CyberOSDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return

        // Get user's team and projects
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('team_id')
          .eq('id', user.id)
          .single()

        if (!profile?.team_id) {
          setStats({
            totalFindings: 0,
            criticalCount: 0,
            highCount: 0,
            activeScans: 0,
            totalProjects: 0,
            recentFindings: [],
            scansTrend: [],
          })
          setLoading(false)
          return
        }

        // Fetch all data
        const [projects, findings, scans] = await Promise.all([
          supabase
            .from('projects')
            .select('id')
            .eq('team_id', profile.team_id),
          supabase
            .from('findings')
            .select('id, title, severity, created_at, targets(name)')
            .order('created_at', { ascending: false })
            .limit(10),
          supabase
            .from('scans')
            .select('id, status, scan_type, created_at')
            .order('created_at', { ascending: false }),
        ])

        const findingsData = findings.data || []
        const scansData = scans.data || []

        setStats({
          totalFindings: findingsData.length,
          criticalCount: findingsData.filter((f: any) => f.severity === 'critical').length,
          highCount: findingsData.filter((f: any) => f.severity === 'high').length,
          activeScans: scansData.filter((s: any) => s.status === 'running' || s.status === 'pending').length,
          totalProjects: projects.data?.length || 0,
          recentFindings: findingsData.slice(0, 5),
          scansTrend: [
            { name: 'Mon', scans: 12, findings: 4 },
            { name: 'Tue', scans: 19, findings: 6 },
            { name: 'Wed', scans: 15, findings: 8 },
            { name: 'Thu', scans: 22, findings: 10 },
            { name: 'Fri', scans: 18, findings: 7 },
            { name: 'Sat', scans: 8, findings: 3 },
            { name: 'Sun', scans: 5, findings: 2 },
          ],
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#00ffb4]">Loading Cyber OS...</div>
      </div>
    )
  }

  const statCards = [
    {
      label: 'Critical Findings',
      value: stats?.criticalCount || 0,
      icon: AlertTriangle,
      color: '#ff6b6b',
      bgColor: 'from-[#ff6b6b]/20 to-[#ff6b6b]/5',
    },
    {
      label: 'High Severity',
      value: stats?.highCount || 0,
      icon: TrendingUp,
      color: '#ffa500',
      bgColor: 'from-[#ffa500]/20 to-[#ffa500]/5',
    },
    {
      label: 'Active Scans',
      value: stats?.activeScans || 0,
      icon: Activity,
      color: '#00d4ff',
      bgColor: 'from-[#00d4ff]/20 to-[#00d4ff]/5',
    },
    {
      label: 'Total Projects',
      value: stats?.totalProjects || 0,
      icon: BarChart3,
      color: '#00ffb4',
      bgColor: 'from-[#00ffb4]/20 to-[#00ffb4]/5',
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl md:text-4xl font-bold text-[#e8f0fe] mb-2">Cyber Operating System</h1>
        <p className="text-[#6b7c99]">Real-time offensive security operations center</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.bgColor} border border-[#00ffb4]/20 rounded-lg p-6 backdrop-blur-sm hover:border-[#00ffb4]/50 transition-all`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[#6b7c99]">{stat.icon && <stat.icon className="w-5 h-5" />}</div>
              <div className="text-sm text-[#6b7c99]">Last 24h</div>
            </div>
            <div className="text-4xl font-bold text-[#e8f0fe] mb-2">{stat.value}</div>
            <div className="text-sm text-[#6b7c99]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scans & Findings Trend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6 backdrop-blur-sm"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats?.scansTrend || []}>
              <CartesianGrid stroke="#00ffb4" strokeDasharray="3 3" />
              <XAxis stroke="#6b7c99" />
              <YAxis stroke="#6b7c99" />
              <Tooltip
                contentStyle={{
                  background: '#0a0e27',
                  border: '1px solid #00ffb4',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="scans" stroke="#00d4ff" strokeWidth={2} dot={{ fill: '#00d4ff' }} />
              <Line type="monotone" dataKey="findings" stroke="#ff6b6b" strokeWidth={2} dot={{ fill: '#ff6b6b' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Finding Severity Distribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6 backdrop-blur-sm"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Severity Distribution</h2>
          <div className="space-y-3">
            {[
              { label: 'Critical', count: stats?.criticalCount || 0, color: '#ff6b6b' },
              { label: 'High', count: stats?.highCount || 0, color: '#ffa500' },
              { label: 'Medium', count: 5, color: '#ffd700' },
              { label: 'Low', count: 3, color: '#00d4ff' },
              { label: 'Info', count: 2, color: '#00ffb4' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#e8f0fe]">{item.label}</span>
                    <span className="text-[#00ffb4]">{item.count}</span>
                  </div>
                  <div className="w-full bg-[#ffffff]/10 rounded h-2">
                    <div
                      className="h-full rounded transition-all"
                      style={{ width: `${(item.count / Math.max(stats?.criticalCount || 1, 10)) * 100}%`, background: item.color }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Findings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6 backdrop-blur-sm"
      >
        <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Recent Findings</h2>
        <div className="space-y-3">
          {stats?.recentFindings && stats.recentFindings.length > 0 ? (
            stats.recentFindings.map((finding: any) => (
              <div
                key={finding.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#ffffff]/3 border border-[#00ffb4]/10 hover:border-[#00ffb4]/30 transition-all"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#e8f0fe]">{finding.title}</div>
                  <div className="text-xs text-[#6b7c99]">{finding.targets?.name || 'Unknown target'}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    finding.severity === 'critical'
                      ? 'bg-[#ff6b6b]/20 text-[#ff6b6b]'
                      : finding.severity === 'high'
                      ? 'bg-[#ffa500]/20 text-[#ffa500]'
                      : 'bg-[#ffd700]/20 text-[#ffd700]'
                  }`}
                >
                  {finding.severity.toUpperCase()}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-[#6b7c99]">No findings yet. Start reconnaissance to discover vulnerabilities.</div>
          )}
        </div>
      </motion.div>

      {/* Quick Start Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <Link
          href="/hidden-portal/dashboard/recon"
          className="group p-6 rounded-lg bg-gradient-to-br from-[#00ffb4]/20 to-[#00ffb4]/5 border border-[#00ffb4]/30 hover:border-[#00ffb4]/50 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#00ffb4]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00ffb4]" />
            </div>
            <h3 className="font-semibold text-[#e8f0fe]">Start Reconnaissance</h3>
          </div>
          <p className="text-sm text-[#6b7c99]">Begin with subdomain enumeration and asset mapping</p>
        </Link>

        <Link
          href="/hidden-portal/dashboard/terminal"
          className="group p-6 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#00d4ff]/5 border border-[#00d4ff]/30 hover:border-[#00d4ff]/50 transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[#00d4ff]/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00d4ff]" />
            </div>
            <h3 className="font-semibold text-[#e8f0fe]">Open Terminal</h3>
          </div>
          <p className="text-sm text-[#6b7c99]">Execute commands with integrated xterm.js console</p>
        </Link>
      </motion.div>
    </div>
  )
}
