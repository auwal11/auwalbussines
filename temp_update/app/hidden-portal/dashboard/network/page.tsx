'use client'

import { motion } from 'framer-motion'
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Play, Pause } from 'lucide-react'
import { useState } from 'react'

const SCAN_RESULTS = [
  { port: 22, service: 'SSH', version: 'OpenSSH 7.4', status: 'open', risk: 'medium', cve: 'CVE-2020-14145' },
  { port: 80, service: 'HTTP', version: 'Apache 2.4.6', status: 'open', risk: 'high', cve: 'CVE-2021-41773' },
  { port: 443, service: 'HTTPS', version: 'Apache 2.4.6', status: 'open', risk: 'high', cve: 'CVE-2021-41773' },
  { port: 3306, service: 'MySQL', version: '5.7.21', status: 'open', risk: 'critical', cve: 'CVE-2021-2109' },
  { port: 5432, service: 'PostgreSQL', version: '9.6.0', status: 'open', risk: 'high', cve: 'CVE-2020-14349' },
  { port: 6379, service: 'Redis', version: '3.2.0', status: 'open', risk: 'critical', cve: 'CVE-2017-14048' },
]

const SERVICE_VULNERABILITIES: Record<string, string[]> = {
  SSH: ['Weak key exchange algorithms', 'Old protocol version'],
  HTTP: ['Missing security headers', 'Outdated server version'],
  HTTPS: ['Weak cipher suites', 'Certificate issues'],
  MySQL: ['Default credentials', 'Unpatched vulnerabilities'],
  PostgreSQL: ['Remote code execution', 'Privilege escalation'],
  Redis: ['No authentication', 'Unauthenticated access'],
}

export default function NetworkAttacksModule() {
  const [selectedPort, setSelectedPort] = useState<number | null>(null)
  const [activeScans, setActiveScans] = useState<Record<number, boolean>>({})

  function toggleScan(port: number) {
    setActiveScans((prev) => ({
      ...prev,
      [port]: !prev[port],
    }))
  }

  const selectedService = SCAN_RESULTS.find((r) => r.port === selectedPort)

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-[#e8f0fe] mb-2">Network Attacks & Enumeration</h1>
        <p className="text-[#6b7c99]">Port scanning, service enumeration, and protocol analysis</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Port Scan Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Port Scan Results (192.168.1.1)</h2>

          <div className="space-y-2">
            {SCAN_RESULTS.map((result) => (
              <motion.button
                key={result.port}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedPort(selectedPort === result.port ? null : result.port)}
                className={`w-full text-left p-4 border rounded-lg transition-all ${
                  selectedPort === result.port
                    ? 'bg-[#00ffb4]/10 border-[#00ffb4]/30'
                    : 'bg-[#0a0e27] border-[#00ffb4]/10 hover:border-[#00ffb4]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: result.risk === 'critical' ? '#ff6b6b' : result.risk === 'high' ? '#ffa500' : '#ffd700',
                      }}
                    />
                    <div>
                      <div className="font-mono text-sm text-[#e8f0fe]">:{result.port}</div>
                      <div className="text-xs text-[#6b7c99]">{result.service}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#00d4ff]">{result.version}</span>
                    <span
                      className="px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        background: result.risk === 'critical' ? '#ff6b6b20' : result.risk === 'high' ? '#ffa50020' : '#ffd70020',
                        color: result.risk === 'critical' ? '#ff6b6b' : result.risk === 'high' ? '#ffa500' : '#ffd700',
                      }}
                    >
                      {result.risk.toUpperCase()}
                    </span>
                  </div>
                </div>

                {selectedPort === result.port && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 pt-3 border-t border-[#00ffb4]/10 text-xs"
                  >
                    <div className="mb-2">
                      <span className="text-[#6b7c99]">CVE: </span>
                      <span className="text-[#ff6b6b] font-mono">{result.cve}</span>
                    </div>
                    <div>
                      <button
                        onClick={() => toggleScan(result.port)}
                        className="px-3 py-1 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded text-[#00d4ff] hover:bg-[#00d4ff]/20 transition-all flex items-center gap-1"
                      >
                        {activeScans[result.port] ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        {activeScans[result.port] ? 'Stop' : 'Start'} Service Enum
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Service Details */}
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
          >
            <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Service Details</h2>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-[#6b7c99] mb-1">Service</div>
                <div className="text-sm font-semibold text-[#e8f0fe]">{selectedService.service}</div>
              </div>

              <div>
                <div className="text-xs text-[#6b7c99] mb-1">Version</div>
                <div className="text-sm font-mono text-[#00ffb4]">{selectedService.version}</div>
              </div>

              <div>
                <div className="text-xs text-[#6b7c99] mb-1">Risk Level</div>
                <div
                  className="inline-block px-3 py-1 rounded text-xs font-semibold"
                  style={{
                    background:
                      selectedService.risk === 'critical'
                        ? '#ff6b6b20'
                        : selectedService.risk === 'high'
                        ? '#ffa50020'
                        : '#ffd70020',
                    color:
                      selectedService.risk === 'critical'
                        ? '#ff6b6b'
                        : selectedService.risk === 'high'
                        ? '#ffa500'
                        : '#ffd700',
                  }}
                >
                  {selectedService.risk.toUpperCase()}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#6b7c99] mb-2">Known Vulnerabilities</div>
                <div className="space-y-1">
                  {(SERVICE_VULNERABILITIES[selectedService.service] || []).map((vuln, idx) => (
                    <div key={idx} className="text-xs p-2 bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 rounded text-[#ff6b6b]">
                      • {vuln}
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded text-[#ff6b6b] text-sm font-medium hover:bg-[#ff6b6b]/20 transition-all">
                View Exploit Options
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Open Ports', value: SCAN_RESULTS.length, icon: Activity, color: '#00ffb4' },
          { label: 'Critical', value: SCAN_RESULTS.filter((r) => r.risk === 'critical').length, icon: AlertTriangle, color: '#ff6b6b' },
          { label: 'High', value: SCAN_RESULTS.filter((r) => r.risk === 'high').length, icon: TrendingUp, color: '#ffa500' },
          { label: 'Medium', value: SCAN_RESULTS.filter((r) => r.risk === 'medium').length, icon: CheckCircle, color: '#ffd700' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <div className="text-2xl font-bold text-[#e8f0fe]">{stat.value}</div>
            </div>
            <div className="text-xs text-[#6b7c99]">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
