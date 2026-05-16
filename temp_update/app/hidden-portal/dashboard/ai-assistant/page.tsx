'use client'

import { motion } from 'framer-motion'
import { Bot, Send, AlertTriangle, Lightbulb } from 'lucide-react'
import { useState } from 'react'

const AI_PROMPT_TEMPLATES = [
  { title: 'Analyze Vulnerability', prompt: 'Analyze this vulnerability and suggest remediation steps' },
  { title: 'Attack Path Suggestions', prompt: 'Based on discovered vulnerabilities, what are the possible attack paths?' },
  { title: 'Recon Guidance', prompt: 'What additional reconnaissance should we perform based on current findings?' },
  { title: 'Exploit Recommendations', prompt: 'Recommend suitable exploitation techniques for this vulnerability' },
]

export default function AIAssistantModule() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content:
        'I am your AI Security Assistant. I can analyze vulnerabilities, suggest attack paths, guide reconnaissance efforts, and provide exploitation recommendations. Ask me anything about your findings!',
    },
  ])
  const [input, setInput] = useState('')

  function sendMessage() {
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages([...messages, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant' as const,
        content: `I've analyzed your inquiry about "${input.substring(0, 30)}...". Based on the findings in your security assessment, I recommend focusing on: 1) Input validation flaws, 2) Authentication mechanisms, 3) API rate limiting. Would you like more details on any of these areas?`,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 500)

    setInput('')
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-[#e8f0fe] mb-2">AI Security Assistant</h1>
        <p className="text-[#6b7c99]">AI-powered vulnerability analysis, remediation suggestions, and attack path guidance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6 flex flex-col h-96 md:h-96"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4 flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Chat with AI Assistant
          </h2>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-[#00ffb4]/20 border border-[#00ffb4]/30 text-[#e8f0fe]'
                      : 'bg-[#0a0e27] border border-[#00ffb4]/10 text-[#6b7c99]'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask me about vulnerabilities, attack paths, or remediation..."
              className="flex-1 px-4 py-2 bg-[#0a0e27] border border-[#00ffb4]/20 rounded text-[#e8f0fe] text-sm"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-[#00ffb4]/10 border border-[#00ffb4]/30 rounded hover:bg-[#00ffb4]/20 transition-all text-[#00ffb4]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Prompt Templates */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Suggested Prompts
          </h2>

          <div className="space-y-2">
            {AI_PROMPT_TEMPLATES.map((template) => (
              <button
                key={template.title}
                onClick={() => setInput(template.prompt)}
                className="w-full text-left p-3 bg-[#0a0e27] border border-[#00ffb4]/10 rounded hover:border-[#00ffb4]/30 transition-all hover:bg-[#0a0e27]/80"
              >
                <div className="text-sm font-medium text-[#e8f0fe]">{template.title}</div>
                <div className="text-xs text-[#6b7c99] mt-1">{template.prompt}</div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#ff6b6b]" />
          AI-Generated Insights
        </h2>

        <div className="space-y-3">
          {[
            'Critical SQL Injection vulnerability in login form - immediate patching required',
            'Authentication mechanism lacks rate limiting - susceptible to brute force attacks',
            'Recommended security headers are missing (CSP, X-Frame-Options, X-Content-Type-Options)',
          ].map((insight, idx) => (
            <div key={idx} className="p-3 bg-[#0a0e27] border border-[#ff6b6b]/10 rounded text-sm text-[#e8f0fe]">
              • {insight}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
