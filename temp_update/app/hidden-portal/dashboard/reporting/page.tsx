'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Plus, Eye, Edit2, Trash2, FileText } from 'lucide-react'

interface Report {
  id: string
  title: string
  project: string
  status: 'draft' | 'in_review' | 'finalized'
  created: string
  findings_summary: {
    critical: number
    high: number
    medium: number
    low: number
    info: number
  }
  risk_rating: 'critical' | 'high' | 'medium' | 'low'
}

const CVSS_VECTORS = {
  'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H': 9.8,
  'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H': 9.0,
  'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N': 6.1,
  'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H': 7.8,
}

const SEVERITY_RANGES = [
  { min: 9.0, max: 10.0, severity: 'Critical', color: '#ff6b6b' },
  { min: 7.0, max: 8.9, severity: 'High', color: '#ffa500' },
  { min: 4.0, max: 6.9, severity: 'Medium', color: '#ffd700' },
  { min: 0.1, max: 3.9, severity: 'Low', color: '#00d4ff' },
]

const REPORT_TEMPLATES = [
  { name: 'Executive Summary', description: 'High-level overview for management' },
  { name: 'Technical Findings', description: 'Detailed vulnerability analysis' },
  { name: 'Full Assessment', description: 'Complete pentest report' },
  { name: 'Remediation Plan', description: 'Fix and remediation guidance' },
]

export default function ReportingModule() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'example.com Security Assessment',
      project: 'Q1 2024 Audit',
      status: 'finalized',
      created: new Date().toISOString(),
      findings_summary: { critical: 2, high: 5, medium: 12, low: 8, info: 3 },
      risk_rating: 'high',
    },
  ])

  const [showNewReport, setShowNewReport] = useState(false)
  const [selectedCVSS, setSelectedCVSS] = useState(Object.keys(CVSS_VECTORS)[0])
  const [showCVSSCalc, setShowCVSSCalc] = useState(false)
  const [cvssValues, setCvssValues] = useState({
    AV: 'N',
    AC: 'L',
    PR: 'N',
    UI: 'N',
    S: 'U',
    C: 'H',
    I: 'H',
    A: 'H',
  })

  function calculateCVSS() {
    // Simplified CVSS 3.1 calculation
    const baseScore = CVSS_VECTORS[selectedCVSS as keyof typeof CVSS_VECTORS] || 7.5
    return baseScore
  }

  function getCVSSColor(score: number) {
    const range = SEVERITY_RANGES.find((r) => score >= r.min && score <= r.max)
    return range?.color || '#00ffb4'
  }

  function exportReportPDF(reportId: string) {
    const report = reports.find((r) => r.id === reportId)
    if (!report) return

    // Simulate PDF generation
    const content = `
SECURITY ASSESSMENT REPORT
${report.title}

Risk Rating: ${report.risk_rating.toUpperCase()}

FINDINGS SUMMARY:
- Critical: ${report.findings_summary.critical}
- High: ${report.findings_summary.high}
- Medium: ${report.findings_summary.medium}
- Low: ${report.findings_summary.low}
- Informational: ${report.findings_summary.info}

Total Findings: ${
      report.findings_summary.critical +
      report.findings_summary.high +
      report.findings_summary.medium +
      report.findings_summary.low +
      report.findings_summary.info
    }

Generated: ${new Date().toISOString()}
    `

    const element = document.createElement('a')
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`)
    element.setAttribute('download', `${report.title.replace(/\s+/g, '-')}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-[#e8f0fe] mb-2">Report Generation</h1>
        <p className="text-[#6b7c99]">Professional report creation, CVSS scoring, and export</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CVSS Calculator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1 bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">CVSS Calculator</h2>

          {!showCVSSCalc ? (
            <div>
              <div className="mb-4">
                <label className="block text-xs font-mono text-[#6b7c99] mb-2">Select Vector</label>
                <select
                  value={selectedCVSS}
                  onChange={(e) => setSelectedCVSS(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0a0e27] border border-[#00ffb4]/20 rounded text-[#e8f0fe] text-xs"
                >
                  {Object.entries(CVSS_VECTORS).map(([vector, score]) => (
                    <option key={vector} value={vector}>
                      {vector} ({score})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-[#0a0e27] border border-[#00ffb4]/20 rounded mb-4">
                <div className="text-xs text-[#6b7c99] mb-2">CVSS Score</div>
                <div className="text-3xl font-bold text-[#e8f0fe]">{calculateCVSS().toFixed(1)}</div>
                <div
                  className="text-xs font-semibold mt-2"
                  style={{ color: getCVSSColor(calculateCVSS()) }}
                >
                  {SEVERITY_RANGES.find((r) => calculateCVSS() >= r.min && calculateCVSS() <= r.max)?.severity}
                </div>
              </div>

              <button
                onClick={() => setShowCVSSCalc(true)}
                className="w-full px-4 py-2 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded hover:bg-[#00d4ff]/20 transition-all text-[#00d4ff] text-sm font-medium"
              >
                Customize Vector
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { key: 'AV', label: 'Attack Vector', options: ['N', 'A', 'L', 'P'] },
                { key: 'AC', label: 'Attack Complexity', options: ['L', 'H'] },
                { key: 'PR', label: 'Privileges Required', options: ['N', 'L', 'H'] },
                { key: 'UI', label: 'User Interaction', options: ['N', 'R'] },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs text-[#6b7c99] block mb-1">{field.label}</label>
                  <select
                    value={cvssValues[field.key as keyof typeof cvssValues]}
                    onChange={(e) => setCvssValues({ ...cvssValues, [field.key]: e.target.value })}
                    className="w-full px-3 py-1 bg-[#0a0e27] border border-[#00ffb4]/20 rounded text-[#e8f0fe] text-xs"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <button
                onClick={() => setShowCVSSCalc(false)}
                className="w-full px-4 py-2 bg-[#00ffb4]/10 border border-[#00ffb4]/30 rounded hover:bg-[#00ffb4]/20 transition-all text-[#00ffb4] text-xs font-medium"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#e8f0fe]">Reports ({reports.length})</h2>
            <button
              onClick={() => setShowNewReport(!showNewReport)}
              className="flex items-center gap-2 px-4 py-2 bg-[#00ffb4]/10 border border-[#00ffb4]/30 rounded hover:bg-[#00ffb4]/20 transition-all text-[#00ffb4] text-sm"
            >
              <Plus className="w-4 h-4" />
              New Report
            </button>
          </div>

          <div className="space-y-3">
            {reports.map((report) => (
              <motion.div
                key={report.id}
                whileHover={{ x: 4 }}
                className="p-4 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg hover:border-[#00ffb4]/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-[#00ffb4]" />
                      <h3 className="font-semibold text-[#e8f0fe]">{report.title}</h3>
                    </div>
                    <div className="text-xs text-[#6b7c99]">{report.project}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        background: `${getCVSSColor(7.5)}20`,
                        color: getCVSSColor(7.5),
                      }}
                    >
                      {report.risk_rating.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${report.status === 'finalized' ? 'bg-[#00ffb4]/10 text-[#00ffb4]' : 'bg-[#ffd700]/10 text-[#ffd700]'}`}>
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2 mb-3 text-xs">
                  <div className="text-center">
                    <div className="text-[#ff6b6b]">{report.findings_summary.critical}</div>
                    <div className="text-[#6b7c99]">Critical</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#ffa500]">{report.findings_summary.high}</div>
                    <div className="text-[#6b7c99]">High</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#ffd700]">{report.findings_summary.medium}</div>
                    <div className="text-[#6b7c99]">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#00d4ff]">{report.findings_summary.low}</div>
                    <div className="text-[#6b7c99]">Low</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[#00ffb4]">{report.findings_summary.info}</div>
                    <div className="text-[#6b7c99]">Info</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-1 text-xs bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-all flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button className="flex-1 px-3 py-1 text-xs bg-[#7b2fff]/10 border border-[#7b2fff]/20 rounded text-[#7b2fff] hover:bg-[#7b2fff]/20 transition-all flex items-center justify-center gap-1">
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => exportReportPDF(report.id)}
                    className="flex-1 px-3 py-1 text-xs bg-[#00ffb4]/10 border border-[#00ffb4]/20 rounded text-[#00ffb4] hover:bg-[#00ffb4]/20 transition-all flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    Export
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Report Templates */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Report Templates</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REPORT_TEMPLATES.map((template) => (
            <motion.button
              key={template.name}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg hover:border-[#00ffb4]/30 transition-all text-left group"
            >
              <FileText className="w-6 h-6 text-[#00ffb4] mb-2 group-hover:text-[#00ffb4]" />
              <div className="font-semibold text-[#e8f0fe] text-sm">{template.name}</div>
              <div className="text-xs text-[#6b7c99] mt-1">{template.description}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
