'use client'

import { motion } from 'framer-motion'
import { Layers, Play, Clock, CheckCircle } from 'lucide-react'

const WORKFLOWS = [
  { name: 'Daily Recon Scan', trigger: 'Scheduled Daily 2AM', status: 'active', nextRun: '2024-01-15 02:00' },
  { name: 'Subdomain Discovery', trigger: 'Manual', status: 'idle', nextRun: 'Never' },
  { name: 'Vulnerability Scan', trigger: 'On Finding', status: 'active', nextRun: 'Real-time' },
  { name: 'Report Generation', trigger: 'Weekly Friday', status: 'scheduled', nextRun: '2024-01-19 17:00' },
]

export default function AutomationModule() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-[#e8f0fe] mb-2">Automation & Workflows</h1>
        <p className="text-[#6b7c99]">Python automation, bash scripts, scheduled workflows, and fuzzing engine</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Automation Workflows</h2>

        <div className="space-y-3">
          {WORKFLOWS.map((workflow) => (
            <motion.div
              key={workflow.name}
              whileHover={{ x: 4 }}
              className="p-4 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg hover:border-[#00ffb4]/30 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-[#00ffb4]" />
                  <div>
                    <h3 className="font-semibold text-[#e8f0fe]">{workflow.name}</h3>
                    <div className="text-xs text-[#6b7c99]">{workflow.trigger}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      workflow.status === 'active'
                        ? 'bg-[#00ffb4]/20 text-[#00ffb4]'
                        : workflow.status === 'scheduled'
                        ? 'bg-[#00d4ff]/20 text-[#00d4ff]'
                        : 'bg-[#6b7c99]/20 text-[#6b7c99]'
                    }`}
                  >
                    {workflow.status}
                  </span>
                  <button className="p-2 hover:bg-[#ffffff]/10 rounded-lg transition-all text-[#00ffb4]">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#6b7c99]">
                <Clock className="w-3 h-3" />
                <span>Next run: {workflow.nextRun}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Recent Executions</h2>
        <div className="text-center py-8 text-[#6b7c99]">No recent automations. Create and schedule workflows to start automation.</div>
      </motion.div>
    </div>
  )
}
