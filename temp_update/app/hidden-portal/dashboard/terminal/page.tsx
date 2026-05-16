'use client'

import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerminal } from 'xterm'
import { FitAddon } from '@xterm/addon-fit'
import 'xterm/css/xterm.css'
import { motion } from 'framer-motion'
import { Plus, X, Maximize2, Minimize2, Download, Trash2, Copy } from 'lucide-react'

interface TerminalTab {
  id: string
  name: string
  terminal?: XTerminal
}

export default function TerminalModule() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [tabs, setTabs] = useState<TerminalTab[]>([])
  const [activeTab, setActiveTab] = useState<string>('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const fitAddonRef = useRef<FitAddon | null>(null)
  const terminalsRef = useRef<{ [key: string]: XTerminal }>({})

  useEffect(() => {
    // Create initial terminal
    createNewTerminal()
  }, [])

  function createNewTerminal() {
    const id = `terminal-${Date.now()}`
    const term = new XTerminal({
      cursorBlink: true,
      fontSize: 14,
      lineHeight: 1.2,
      theme: {
        background: '#0a0e27',
        foreground: '#e8f0fe',
        cursor: '#00ffb4',
        cursorAccent: '#0a0e27',
        black: '#020409',
        red: '#ff6b6b',
        green: '#00ffb4',
        yellow: '#ffd700',
        blue: '#00d4ff',
        magenta: '#7b2fff',
        cyan: '#00ffb4',
        white: '#e8f0fe',
      },
      cols: 120,
      rows: 30,
    })

    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddonRef.current = fitAddon

    terminalsRef.current[id] = term
    const newTabs = [...tabs, { id, name: `Terminal ${tabs.length + 1}` }]
    setTabs(newTabs)
    setActiveTab(id)

    // Schedule mounting after state update
    setTimeout(() => {
      const element = document.getElementById(`terminal-container-${id}`)
      if (element) {
        term.open(element)
        fitAddon.fit()

        // Simulate command prompt
        term.write('\r\n\x1b[1;32m$\x1b[0m ')

        // Command handling
        let currentCommand = ''
        term.onData((data) => {
          if (data === '\r') {
            // Execute command
            if (currentCommand.trim()) {
              term.write('\r\n')
              simulateCommandExecution(term, currentCommand)
              currentCommand = ''
            }
            term.write('\r\n\x1b[1;32m$\x1b[0m ')
          } else if (data === '\u007f') {
            // Backspace
            if (currentCommand.length > 0) {
              currentCommand = currentCommand.slice(0, -1)
              term.write('\b \b')
            }
          } else if (data.charCodeAt(0) < 32 && data !== '\t') {
            // Ignore other control characters
          } else {
            currentCommand += data
            term.write(data)
          }
        })
      }
    }, 0)
  }

  function simulateCommandExecution(term: XTerminal, command: string) {
    const cmd = command.trim().toLowerCase()

    if (cmd === 'help') {
      term.write('\r\nAvailable commands:\r\n')
      term.write('  \x1b[1;36mscan\x1b[0m      - Start a security scan\r\n')
      term.write('  \x1b[1;36mrecon\x1b[0m     - Begin reconnaissance\r\n')
      term.write('  \x1b[1;36mexploit\x1b[0m   - Show exploitation options\r\n')
      term.write('  \x1b[1;36mshell\x1b[0m     - Open reverse shell\r\n')
      term.write('  \x1b[1;36mclear\x1b[0m     - Clear terminal\r\n')
      term.write('  \x1b[1;36mhelp\x1b[0m      - Show this message\r\n')
    } else if (cmd === 'clear') {
      term.clear()
    } else if (cmd.startsWith('scan')) {
      term.write('\r\n\x1b[1;33m[*] Starting network scan...\x1b[0m\r\n')
      setTimeout(() => {
        term.write('\x1b[1;32m[+] Scan completed: 42 hosts found\x1b[0m\r\n')
      }, 1500)
    } else if (cmd.startsWith('recon')) {
      term.write('\r\n\x1b[1;33m[*] Initiating reconnaissance...\x1b[0m\r\n')
      term.write('\x1b[1;33m    [*] Gathering OSINT data\r\n')
      term.write('\x1b[1;33m    [*] Scanning subdomains\r\n')
      term.write('\x1b[1;33m    [*] Analyzing DNS records\x1b[0m\r\n')
      setTimeout(() => {
        term.write('\x1b[1;32m[+] Reconnaissance complete\x1b[0m\r\n')
      }, 2000)
    } else if (cmd.startsWith('exploit')) {
      term.write('\r\n\x1b[1;31m=== EXPLOITATION OPTIONS ===\x1b[0m\r\n')
      term.write('\x1b[1;33m[*] RCE Payloads\r\n')
      term.write('[*] SQL Injection Strings\r\n')
      term.write('[*] XSS Vectors\r\n')
      term.write('[*] Deserialization Exploits\x1b[0m\r\n')
    } else if (cmd.startsWith('shell')) {
      term.write('\r\n\x1b[1;32m[+] Reverse shell session initiated\x1b[0m\r\n')
      term.write('\x1b[1;33m[*] Listening on 0.0.0.0:4444\r\n')
      term.write('[*] Waiting for connection...\x1b[0m\r\n')
    } else {
      term.write(`\r\n\x1b[1;31mCommand not found: ${command}\x1b[0m\r\n`)
      term.write('Type \x1b[1;36mhelp\x1b[0m for available commands\r\n')
    }
  }

  function closeTab(id: string) {
    const newTabs = tabs.filter((tab) => tab.id !== id)
    if (newTabs.length === 0) {
      createNewTerminal()
    } else {
      setTabs(newTabs)
      if (activeTab === id) {
        setActiveTab(newTabs[newTabs.length - 1].id)
      }
    }
  }

  function downloadLog() {
    const log = terminalsRef.current[activeTab]?.buffer.normal.toString() || 'No log available'
    const element = document.createElement('a')
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(log)}`)
    element.setAttribute('download', `terminal-log-${Date.now()}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'relative'} flex flex-col bg-[#020409]`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center justify-between p-4 border-b border-[#00ffb4]/10 ${isFullscreen ? 'bg-[#0a0e27]' : ''}`}
      >
        <h1 className="text-2xl font-bold text-[#e8f0fe]">Integrated Terminal</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-[#ffffff]/10 rounded-lg transition-all"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5 text-[#00ffb4]" /> : <Maximize2 className="w-5 h-5 text-[#00ffb4]" />}
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-[#00ffb4]/10 bg-[#0a0e27] overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ backgroundColor: 'rgba(0, 255, 180, 0.1)' }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg border border-b-0 transition-all ${
              activeTab === tab.id
                ? 'bg-[#00ffb4]/10 border-[#00ffb4]/30 text-[#00ffb4]'
                : 'bg-[#ffffff]/5 border-[#00ffb4]/10 text-[#6b7c99] hover:text-[#e8f0fe]'
            }`}
          >
            <span className="text-sm font-medium">{tab.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeTab(tab.id)
              }}
              className="p-1 hover:bg-[#ffffff]/20 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.button>
        ))}
        <button
          onClick={createNewTerminal}
          className="ml-2 p-2 hover:bg-[#ffffff]/10 rounded-lg transition-all text-[#6b7c99] hover:text-[#00ffb4]"
          title="New terminal"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Terminal Container */}
      <div className={`flex-1 ${isFullscreen ? 'h-screen' : 'h-96'} overflow-hidden bg-[#020409]`}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`terminal-container-${tab.id}`}
            className={`w-full h-full ${activeTab === tab.id ? 'block' : 'hidden'}`}
          />
        ))}
      </div>

      {/* Command Palette */}
      <div className="p-4 border-t border-[#00ffb4]/10 bg-[#0a0e27]">
        <div className="flex gap-2">
          <button
            onClick={() => {
              const term = terminalsRef.current[activeTab]
              if (term) {
                term.write('\x1b[2J\x1b[H') // Clear screen
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffffff]/5 border border-[#00ffb4]/20 hover:border-[#00ffb4]/50 text-[#e8f0fe] text-sm transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
          <button
            onClick={downloadLog}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffffff]/5 border border-[#00ffb4]/20 hover:border-[#00ffb4]/50 text-[#e8f0fe] text-sm transition-all"
          >
            <Download className="w-4 h-4" />
            Download Log
          </button>
          <div className="flex-1" />
          <span className="text-xs text-[#6b7c99] self-center">Type <span className="text-[#00ffb4]">help</span> for available commands</span>
        </div>
      </div>
    </div>
  )
}
