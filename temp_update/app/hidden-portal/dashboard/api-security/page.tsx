'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Eye, EyeOff, Plus, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react'

interface JWTToken {
  id: string
  token: string
  decoded: {
    header: Record<string, any>
    payload: Record<string, any>
  }
  vulnerabilities: string[]
}

function decodeJWT(token: string) {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) throw new Error('Invalid JWT format')

    const header = JSON.parse(Buffer.from(parts[0], 'base64').toString())
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString())

    const vulnerabilities: string[] = []

    // Check for common vulnerabilities
    if (header.alg === 'none') vulnerabilities.push('Algorithm set to "none" - CRITICAL')
    if (header.alg === 'HS256' && !payload.iss) vulnerabilities.push('Missing issuer claim')
    if (!payload.exp) vulnerabilities.push('No expiration time set')
    if (!payload.iat) vulnerabilities.push('No issued-at claim')

    return { header, payload, vulnerabilities }
  } catch (error) {
    throw new Error('Failed to decode JWT: ' + String(error))
  }
}

const RATE_LIMIT_TESTS = [
  { method: 'GET', endpoint: '/api/users', rateLimit: '100 req/min' },
  { method: 'POST', endpoint: '/api/auth/login', rateLimit: '5 req/min' },
  { method: 'GET', endpoint: '/api/search', rateLimit: 'Unlimited' },
  { method: 'DELETE', endpoint: '/api/admin/users', rateLimit: '10 req/hour' },
]

const IDOR_TESTS = [
  { id: 1, endpoint: '/api/profile/123', vulnerability: 'Direct object reference' },
  { id: 2, endpoint: '/api/invoices/456', vulnerability: 'No authorization check' },
  { id: 3, endpoint: '/api/documents/789', vulnerability: 'Missing validation' },
]

const API_ENDPOINTS = [
  { method: 'GET', path: '/api/users/{id}', description: 'Get user by ID' },
  { method: 'POST', path: '/api/auth/login', description: 'User authentication' },
  { method: 'PUT', path: '/api/profile', description: 'Update user profile' },
  { method: 'DELETE', path: '/api/users/{id}', description: 'Delete user account' },
]

export default function APISecurityModule() {
  const [activeTab, setActiveTab] = useState<'jwt' | 'rate-limit' | 'idor' | 'endpoints'>('jwt')
  const [jwtToken, setJwtToken] = useState('')
  const [decodedTokens, setDecodedTokens] = useState<JWTToken[]>([])
  const [showFullToken, setShowFullToken] = useState<Record<string, boolean>>({})
  const [copiedToken, setCopiedToken] = useState('')

  function decodeAndAnalyzeJWT() {
    if (!jwtToken.trim()) {
      alert('Enter a JWT token')
      return
    }

    try {
      const decoded = decodeJWT(jwtToken)
      const token: JWTToken = {
        id: `jwt-${Date.now()}`,
        token: jwtToken,
        decoded: {
          header: decoded.header,
          payload: decoded.payload,
        },
        vulnerabilities: decoded.vulnerabilities,
      }

      setDecodedTokens([token, ...decodedTokens])
      setJwtToken('')
    } catch (error) {
      alert(String(error))
    }
  }

  function copyToken(token: string) {
    navigator.clipboard.writeText(token)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(''), 2000)
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-[#e8f0fe] mb-2">API Security Testing</h1>
        <p className="text-[#6b7c99]">JWT analysis, rate limiting, IDOR, and authorization testing</p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-[#00ffb4]/10 overflow-x-auto">
        {[
          { key: 'jwt' as const, label: 'JWT Analyzer', icon: '🔑' },
          { key: 'rate-limit' as const, label: 'Rate Limiting', icon: '⏱️' },
          { key: 'idor' as const, label: 'IDOR Testing', icon: '🚨' },
          { key: 'endpoints' as const, label: 'Endpoints', icon: '📡' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab.key
                ? 'border-[#00ffb4] text-[#00ffb4]'
                : 'border-transparent text-[#6b7c99] hover:text-[#e8f0fe]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* JWT Analyzer Tab */}
      {activeTab === 'jwt' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* JWT Input */}
          <div className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">JWT Decoder</h2>

            <textarea
              value={jwtToken}
              onChange={(e) => setJwtToken(e.target.value)}
              placeholder="Paste JWT token here..."
              className="w-full h-40 px-4 py-3 bg-[#0a0e27] border border-[#00ffb4]/20 rounded text-[#00ffb4] text-xs font-mono resize-none"
            />

            <button
              onClick={decodeAndAnalyzeJWT}
              className="w-full mt-4 px-4 py-2 bg-[#00ffb4]/10 border border-[#00ffb4]/30 rounded hover:bg-[#00ffb4]/20 transition-all text-[#00ffb4] font-medium flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Decode & Analyze
            </button>
          </div>

          {/* Decoded Tokens */}
          <div className="space-y-4">
            {decodedTokens.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0a0e27] border border-[#00ffb4]/20 rounded-lg p-4"
              >
                {/* Vulnerabilities */}
                {item.vulnerabilities.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {item.vulnerabilities.map((vuln, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 rounded text-xs text-[#ff6b6b]">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{vuln}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Header */}
                <div className="mb-3">
                  <div className="text-xs font-semibold text-[#00ffb4] mb-2">HEADER</div>
                  <code className="text-xs text-[#6b7c99] font-mono block bg-[#000000]/50 p-2 rounded overflow-x-auto">
                    {JSON.stringify(item.decoded.header, null, 2)}
                  </code>
                </div>

                {/* Payload */}
                <div>
                  <div className="text-xs font-semibold text-[#00ffb4] mb-2">PAYLOAD</div>
                  <code className="text-xs text-[#6b7c99] font-mono block bg-[#000000]/50 p-2 rounded overflow-x-auto">
                    {JSON.stringify(item.decoded.payload, null, 2)}
                  </code>
                </div>

                {/* Full Token */}
                <div className="mt-3">
                  <button
                    onClick={() => setShowFullToken((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className="text-xs text-[#00d4ff] hover:text-[#00ffb4] transition-colors flex items-center gap-1"
                  >
                    {showFullToken[item.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    {showFullToken[item.id] ? 'Hide' : 'Show'} full token
                  </button>

                  {showFullToken[item.id] && (
                    <code className="text-xs text-[#00ffb4] font-mono block bg-[#000000]/50 p-2 rounded mt-2 break-all">
                      {item.token}
                    </code>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Rate Limiting Tab */}
      {activeTab === 'rate-limit' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">Rate Limiting Test Results</h2>

          <div className="space-y-3">
            {RATE_LIMIT_TESTS.map((test, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-4 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg hover:border-[#00ffb4]/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 rounded text-xs font-mono bg-[#00d4ff]/10 text-[#00d4ff]">{test.method}</span>
                    <span className="text-sm font-medium text-[#e8f0fe]">{test.endpoint}</span>
                  </div>
                  <div className="text-xs text-[#6b7c99]">Limit: {test.rateLimit}</div>
                </div>
                <button className="px-4 py-2 bg-[#00ffb4]/10 border border-[#00ffb4]/20 rounded text-[#00ffb4] text-xs font-medium hover:bg-[#00ffb4]/20 transition-all">
                  Test
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* IDOR Testing Tab */}
      {activeTab === 'idor' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">IDOR/BOLA Testing</h2>

          <div className="space-y-3">
            {IDOR_TESTS.map((test) => (
              <motion.div
                key={test.id}
                whileHover={{ x: 4 }}
                className="p-4 bg-[#0a0e27] border border-[#ff6b6b]/10 rounded-lg hover:border-[#ff6b6b]/30 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-mono text-sm text-[#00ffb4]">{test.endpoint}</div>
                    <div className="text-xs text-[#6b7c99] mt-1">{test.vulnerability}</div>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-[#ff6b6b]/20 text-[#ff6b6b] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Vulnerable
                  </span>
                </div>

                <div className="flex gap-2 mt-3">
                  <input
                    type="number"
                    placeholder="Test ID"
                    className="flex-1 px-3 py-1 text-xs bg-[#0a0e27] border border-[#00ffb4]/20 rounded text-[#e8f0fe]"
                    defaultValue={test.id}
                  />
                  <button className="px-4 py-1 text-xs bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 rounded text-[#ff6b6b] hover:bg-[#ff6b6b]/20 transition-all">
                    Test
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Endpoints Tab */}
      {activeTab === 'endpoints' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#ffffff]/5 border border-[#00ffb4]/10 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-[#e8f0fe] mb-4">API Endpoints Overview</h2>

          <div className="space-y-2">
            {API_ENDPOINTS.map((ep, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-3 bg-[#0a0e27] border border-[#00ffb4]/10 rounded-lg hover:border-[#00ffb4]/30 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                        ep.method === 'GET' ? 'bg-[#00d4ff]/10 text-[#00d4ff]' : 'bg-[#ffa500]/10 text-[#ffa500]'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-sm font-mono text-[#e8f0fe]">{ep.path}</span>
                  </div>
                  <div className="text-xs text-[#6b7c99] mt-1">{ep.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
