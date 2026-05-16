'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, Plus, Play, Pause, RefreshCw, Download, Globe, MapPin, Database } from 'lucide-react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Project {
  id: string
  name: string
  slug: string
}

interface Target {
  id: string
  name: string
  type: string
  value: string
  status: string
  priority: string
}

interface Scan {
  id: string
  scan_type: string
  tool_name: string
  status: string
  progress: number
  findings_count: number
  started_at: string
}

export default function ReconModule() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string>('')
  const [targets, setTargets] = useState<Target[]>([])
  const [scans, setScans] = useState<Scan[]>([])
  const [showNewTarget, setShowNewTarget] = useState(false)
  const [newTarget, setNewTarget] = useState({ name: '', type: 'domain', value: '', priority: 'medium' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedProject) {
      fetchTargets()
      fetchScans()
    }
  }, [selectedProject])

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

  async function fetchTargets() {
    try {
      const response = await fetch(`/api/projects/${selectedProject}/targets`)
      const data = await response.json()
      setTargets(data.targets || [])
    } catch (error) {
      console.error('Failed to fetch targets:', error)
    }
  }

  async function fetchScans() {
    try {
      const response = await fetch(`/api/projects/${selectedProject}/scans`)
      const data = await response.json()
      setScans(data.scans || [])
    } catch (error) {
      console.error('Failed to fetch scans:', error)
    }
  }

  async function createTarget() {
    if (!newTarget.name || !newTarget.value) return

    try {
      const response = await fetch(`/api/projects/${selectedProject}/targets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTarget),
      })

      if (response.ok) {
        await fetchTargets()
        setNewTarget({ name: '', type: 'domain', value: '', priority: 'medium' })
        setShowNewTarget(false)
      }
    } catch (error) {
      console.error('Failed to create target:', error)
    }
  }

  async function startScan(targetId: string, scanType: string, toolName: string) {
    try {
      const response = await fetch(`/api/projects/${selectedProject}/scans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_id: targetId, scan_type: scanType, tool_name: toolName }),
      })

      if (response.ok) {
        await fetchScans()
      }
    } catch (error) {
      console.error('Failed to start scan:', error)
    }
  }

  if (loading) {
    return <div className="p-8 text-[#6b7c99]">Loading reconnaissance module...</div>
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-[#e8f0fe] mb-2">Reconnaissance & Enumeration</h1>
        <p className="text-[#6b7c99]">Subdomain enumeration, DNS analysis, tech fingerprinting, and host detection</p>
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

      {/* Targets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Targets List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#e8f0fe]">Targets ({targets.length})</h2>
            <button
              onClick={() => setShowNewTarget(!showNewTarget)}
              className="flex items-center gap-2 px-4 py-2 bg-[#00ffb4]/10 border border-[#00ffb4]/30 rounded-lg hover:bg-[#00ffb4]/20 transition-all text-[#00ffb4] text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Target
            </button>
          </div>

          {/* New Target Form */}
          {showNewTarget && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 p-4 bg-[#0a0e27] border border-[#00ffb4]/20 rounded-lg space-y-3"
            >
              <input
                type="text"
                placeholder="Target name"
                value={newTarget.name}
                onChange={(e) => setNewTarget({ ...newTarget, name: e.target.value })}
                className="w-full bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-3 py-2 text-[#e8f0fe] text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={newTarget.type}
                  onChange={(e) => setNewTarget({ ...newTarget, type: e.target.value })}
                  className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-3 py-2 text-[#e8f0fe] text-sm"
                >
                  <option value="domain">Domain</option>
                  <option value="ip">IP Address</option>
                  <option value="web_app">Web App</option>
                  <option value="api">API</option>
                  <option value="mobile_app">Mobile App</option>
                </select>
                <select
                  value={newTarget.priority}
                  onChange={(e) => setNewTarget({ ...newTarget, priority: e.target.value })}
                  className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-3 py-2 text-[#e8f0fe] text-sm"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Target value (domain.com, 192.168.1.1, etc)"
                value={newTarget.value}
                onChange={(e) => setNewTarget({ ...newTarget, value: e.target.value })}
                className="w-full bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded px-3 py-2 text-[#e8f0fe] text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={createTarget}
                  className="flex-1 px-4 py-2 bg-[#00ffb4] text-[#0a0e27] rounded font-medium hover:bg-[#00ffb4]/90 transition-all"
                >
                  Create Target
                </button>
                <button
                  onClick={() => setShowNewTarget(false)}
                  className="flex-1 px-4 py-2 bg-[#ffffff]/5 border border-[#00ffb4]/20 rounded text-[#e8f0fe] hover:border-[#00ffb4]/50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Targets Grid */}
          <div className="space-y-3">
            {targets.map((target) => (
              <motion.div
                key={target.id}
                whileHover={{ x: 4 }}
                className="p-4 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg hover:border-[#00ffb4]/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00ffb4]/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-[#00ffb4]" />
                    </div>
                    <div>
                      <div className="font-medium text-[#e8f0fe]">{target.name}</div>
                      <div className="text-xs text-[#6b7c99]">{target.value}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded text-xs bg-[#00d4ff]/10 text-[#00d4ff]">{target.type}</span>
                    <span className={`px-2 py-1 rounded text-xs ${target.priority === 'high' ? 'bg-[#ff6b6b]/10 text-[#ff6b6b]' : 'bg-[#ffd700]/10 text-[#ffd700]'}`}>
                      {target.priority}
                    </span>
                  </div>
                </div>

                {/* Scan buttons */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => startScan(target.id, 'subdomain_enum', 'subfinder')}
                    className="px-3 py-1 text-xs bg-[#00ffb4]/10 border border-[#00ffb4]/20 rounded hover:bg-[#00ffb4]/20 text-[#00ffb4] flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Subdomains
                  </button>
                  <button
                    onClick={() => startScan(target.id, 'dns_analysis', 'dnsx')}
                    className="px-3 py-1 text-xs bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded hover:bg-[#00d4ff]/20 text-[#00d4ff] flex items-center gap-1"
                  >
                    <Database className="w-3 h-3" />
                    DNS
                  </button>
                  <button
                    onClick={() => startScan(target.id, 'tech_detect', 'httpx')}
                    className="px-3 py-1 text-xs bg-[#7b2fff]/10 border border-[#7b2fff]/20 rounded hover:bg-[#7b2fff]/20 text-[#7b2fff] flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3" />
                    Tech Stack
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Active Scans</h2>
          <div className="space-y-3">
            {scans
              .filter((s) => s.status === 'running' || s.status === 'pending')
              .slice(0, 5)
              .map((scan) => (
                <div key={scan.id} className="p-3 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-[#e8f0fe]">{scan.tool_name}</div>
                    <div className="text-xs text-[#00ffb4]">{scan.progress}%</div>
                  </div>
                  <div className="w-full bg-[#ffffff]/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scan.progress}%` }}
                      className="h-full bg-[#00ffb4] rounded-full"
                    />
                  </div>
                  <div className="text-xs text-[#6b7c99] mt-2">{scan.scan_type}</div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Scan Results Section */}
      {scans.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Scan History</h2>
          <div className="space-y-2">
            {scans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-[#e8f0fe]">{scan.tool_name}</div>
                  <div className="text-xs text-[#6b7c99]">{new Date(scan.started_at).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded text-xs ${scan.status === 'completed' ? 'bg-[#00ffb4]/10 text-[#00ffb4]' : 'bg-[#00d4ff]/10 text-[#00d4ff]'}`}>
                    {scan.status}
                  </span>
                  <span className="text-sm text-[#e8f0fe]">{scan.findings_count} findings</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
