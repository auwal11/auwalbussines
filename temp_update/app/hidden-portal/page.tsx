"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock, Eye, EyeOff, Loader2, Shield } from "lucide-react"

export default function AdminLogin() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push("/hidden-portal/dashboard")
      } else {
        setError("Invalid password")
      }
    } catch {
      setError("Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020409] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[#7b2fff]/[0.08] blur-[120px]"
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-10">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#00ffb4]/10 border border-[#00ffb4]/30 flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-[#00ffb4]" />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-[#e8f0fe] mb-2">
              Admin Access
            </h1>
            <p className="text-sm text-[#6b7c99] font-mono">
              AUWAL BUSINESS COMMAND CENTER
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-mono text-[#6b7c99] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-neural w-full pl-10 pr-12 py-3"
                  placeholder="Enter admin password"
                  autoFocus
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6b7c99]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7c99] hover:text-[#e8f0fe] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-sm text-[#ff3366] font-mono text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-[#4a6080] font-mono">
            ADMIN ACCESS ONLY
          </p>
        </div>
      </div>
    </div>
  )
}
