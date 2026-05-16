"use client"

import { useState, useEffect, useRef } from "react"
import { X, Send, Sparkles, Loader2, User, Bot } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the Auwal Business AI Assistant. I help you plan your perfect website or app. What are you looking to build?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true)
    window.addEventListener("openAIChat", handleOpenChat)
    return () => window.removeEventListener("openAIChat", handleOpenChat)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }],
        }),
      })

      if (!res.ok) throw new Error("Failed to get response")

      const data = await res.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again or contact us directly.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#00d4aa] text-[#0a0f1e] flex items-center justify-center shadow-lg animate-pulse-ring hover:scale-105 transition-transform"
        aria-label="Open AI Chat"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Chat Modal */}
      <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[420px] h-[85vh] sm:h-[600px] sm:max-h-[80vh] glass-card sm:rounded-2xl flex flex-col animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#ffffff08]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-[#00d4aa]" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-[#f0f4ff]">
                AI Assistant
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#00d4aa]">
                <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-pulse" />
                Online
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-[#8b9bc8] hover:text-[#f0f4ff] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user"
                    ? "bg-[#7c3aed]/20 text-[#7c3aed]"
                    : "bg-[#00d4aa]/10 text-[#00d4aa]"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#00d4aa] text-[#0a0f1e] rounded-tr-md"
                    : "bg-[#0a1628] text-[#f0f4ff] border border-[#ffffff08] rounded-tl-md"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-[#00d4aa]" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-md bg-[#0a1628] border border-[#ffffff08]">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#8b9bc8] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#8b9bc8] animate-bounce delay-100" />
                  <span className="w-2 h-2 rounded-full bg-[#8b9bc8] animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#ffffff08]">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="input-neural flex-1 px-4 py-3 text-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
