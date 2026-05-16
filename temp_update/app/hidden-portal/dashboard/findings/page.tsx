'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, AlertTriangle, TrendingUp, Filter, Download, Edit2, Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Finding {
  id: string
  title: string
  description: string
  severity: string
  cvss_score?: number
  status: string
  affected_endpoint?: string
  created_at: string
  finding_type: string
}

interface Project {
  id: string
  name: string
}

const SEVERITY_COLORS = {
  critical: '#ff6b6b',
  high: '#ffa500',
  medium: '#ffd700',
  low: '#00d4ff',
  info: '#00ffb4',
}

export default function FindingsModule() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [findings, setFindings] = useState<Finding[]>([])
  const [showNewFinding, setShowNewFinding] = useState(false)
  const [selectedSeverity, setSelectedSeverity] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [newFinding, setNewFinding] = useState({
    title: '',
    description: '',
    finding_type: 'injection',
    severity: 'medium',
    affected_endpoint: '',
    proof_of_concept: '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedProject) {
      fetchFindings()
    }
  }, [selectedProject, selectedSeverity, selectedStatus])

  async function fetchProjects() {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data.projects || [])
      if (data.projects?.[0]) {
        setSelectedProject(data.projects[0].id)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchFindings() {
    try {
      let url = `/api/projects/${selectedProject}/findings`
      const params = new URLSearchParams()
      if (selectedSeverity) params.append('severity', selectedSeverity)
      if (selectedStatus) params.append('status', selectedStatus)
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetch(url)
      const data = await response.json()
      setFindings(data.findings || [])
    } catch (error) {
      console.error('Failed to fetch findings:', error)
    }
  }

  async function createFinding() {
    if (!newFinding.title || !newFinding.description) return

    try {
      const response = await fetch(`/api/projects/${selectedProject}/findings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFinding),
      })

      if (response.ok) {
        await fetchFindings()
        setNewFinding({
          title: '',
          description: '',
          finding_type: 'injection',
          severity: 'medium',
          affected_endpoint: '',
          proof_of_concept: '',
        })
        setShowNewFinding(false)
      }
    } catch (error) {
      console.error('Failed to create finding:', error)
    }
  }

  async function deleteFinding(id: string) {
    if (confirm('Delete this finding?')) {
      try {
        const response = await fetch(`/api/projects/${selectedProject}/findings/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          await fetchFindings()
        }
      } catch (error) {
        console.error('Failed to delete finding:', error)
      }
    }
  }

  const severityData = Object.entries(
    findings.reduce(
      (acc, f) => {
        acc[f.severity] = (acc[f.severity] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
  ).map(([severity, count]) => ({
    name: severity.charAt(0).toUpperCase() + severity.slice(1),
    value: count,
  }))

  const typeData = Object.entries(
    findings.reduce(
      (acc, f) => {
        acc[f.finding_type] = (acc[f.finding_type] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
  ).map(([type, count]) => ({
    name: type.replace('_', ' ').charAt(0).toUpperCase() + type.slice(1),
    count: count,
  }))

  if (loading) {
    return <div className="p-8 text-[#6b7c99]">Loading findings module...</div>
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-[#e8f0fe] mb-2">Vulnerability Findings</h1>
        <p className="text-[#6b7c99]">Track, manage, and report security findings across projects</p>
      </motion.div>

      {/* Project Selector */}
      {projects.length > 0 && (
        <div className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-4">
          <label className="block text-sm font-medium text-[#e8f0fe] mb-2">Select Project</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full bg-[#0a0e27] border border-[#00ffb4]/20 rounded px-4 py-2 text-[#e8f0fe] focus:outline-none focus:border-[#00ffb4]/50"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="px-4 py-2 text-sm bg-[#0a0e27] border border-[#00ffb4]/20 rounded text-[#e8f0fe] focus:outline-none"
          >
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="info">Info</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 text-sm bg-[#0a0e27] border border-[#00ffb4]/20 rounded text-[#e8f0fe] focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <button
          onClick={() => setShowNewFinding(!showNewFinding)}
          className="flex items-center gap-2 px-6 py-2 bg-[#00ffb4]/10 border border-[#00ffb4]/30 rounded-lg hover:bg-[#00ffb4]/20 transition-all text-[#00ffb4]"
        >
          <Plus className="w-4 h-4" />
          New Finding
        </button>
      </div>

      {/* New Finding Form */}
      {showNewFinding && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-6 bg-[#0a0e27] border border-[#00ffb4]/20 rounded-lg space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Finding title"
              value={newFinding.title}
              onChange={(e) => setNewFinding({ ...newFinding, title: e.target.value })}
              className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-4 py-2 text-[#e8f0fe]"
            />
            <select
              value={newFinding.severity}
              onChange={(e) => setNewFinding({ ...newFinding, severity: e.target.value })}
              className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-4 py-2 text-[#e8f0fe]"
            >
              <option value="info">Info</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={newFinding.finding_type}
              onChange={(e) => setNewFinding({ ...newFinding, finding_type: e.target.value })}
              className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-4 py-2 text-[#e8f0fe]"
            >
              <option value="injection">SQL Injection</option>
              <option value="xss">XSS</option>
              <option value="auth_bypass">Authentication Bypass</option>
              <option value="idor">IDOR</option>
              <option value="rce">RCE</option>
              <option value="ssrf">SSRF</option>
            </select>
            <input
              type="text"
              placeholder="Affected endpoint (e.g., /api/users)"
              value={newFinding.affected_endpoint}
              onChange={(e) => setNewFinding({ ...newFinding, affected_endpoint: e.target.value })}
              className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-4 py-2 text-[#e8f0fe]"
            />
          </div>

          <textarea
            placeholder="Description of the vulnerability"
            value={newFinding.description}
            onChange={(e) => setNewFinding({ ...newFinding, description: e.target.value })}
            className="w-full bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-4 py-2 text-[#e8f0fe] h-24 resize-none"
          />

          <textarea
            placeholder="Proof of concept (optional)"
            value={newFinding.proof_of_concept}
            onChange={(e) => setNewFinding({ ...newFinding, proof_of_concept: e.target.value })}
            className="w-full bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-4 py-2 text-[#e8f0fe] h-24 resize-none"
          />

          <div className="flex gap-2">
            <button
              onClick={createFinding}
              className="flex-1 px-4 py-2 bg-[#00ffb4] text-[#0a0e27] rounded font-medium hover:bg-[#00ffb4]/90 transition-all"
            >
              Create Finding
            </button>
            <button
              onClick={() => setShowNewFinding(false)}
              className="flex-1 px-4 py-2 bg-[#ffffff]/5 border border-[#00ffb4]/20 rounded text-[#e8f0fe] hover:border-[#00ffb4]/50 transition-all"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Stats & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Severity Distribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Severity Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={severityData} cx="50%" cy="50%" labelLine={false} label={{ fill: '#e8f0fe', fontSize: 12 }} outerRadius={80} fill="#8884d8" dataKey="value">
                {['#ff6b6b', '#ffa500', '#ffd700', '#00d4ff', '#00ffb4'].map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0a0e27', border: '1px solid #00ffb4', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Type Distribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Finding Types</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={typeData}>
              <CartesianGrid stroke="#00ffb4" strokeDasharray="3 3" />
              <XAxis stroke="#6b7c99" />
              <YAxis stroke="#6b7c99" />
              <Tooltip contentStyle={{ background: '#0a0e27', border: '1px solid #00ffb4', borderRadius: '8px' }} />
              <Bar dataKey="count" fill="#00ffb4" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Findings List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Findings ({findings.length})</h2>
        <div className="space-y-3">
          {findings.map((finding) => (
            <motion.div
              key={finding.id}
              whileHover={{ x: 4 }}
              className="p-4 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg hover:border-[#00ffb4]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{ background: SEVERITY_COLORS[finding.severity as keyof typeof SEVERITY_COLORS] || '#00ffb4' }}
                    />
                    <div>
                      <h3 className="font-semibold text-[#e8f0fe]">{finding.title}</h3>
                      <p className="text-sm text-[#6b7c99]">{finding.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${SEVERITY_COLORS[finding.severity as keyof typeof SEVERITY_COLORS] || '#00ffb4'}20`,
                      color: SEVERITY_COLORS[finding.severity as keyof typeof SEVERITY_COLORS] || '#00ffb4',
                    }}
                  >
                    {finding.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#6b7c99]">{finding.status}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6b7c99]">
                <div>{finding.finding_type.replace('_', ' ')}</div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-[#ffffff]/10 rounded transition-all text-[#00d4ff]">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteFinding(finding.id)} className="p-1 hover:bg-[#ffffff]/10 rounded transition-all text-[#ff6b6b]">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
