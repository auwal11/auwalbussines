"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Sparkles,
  Send,
  Twitter,
  Facebook,
  MessageCircle,
  Copy,
  Check,
  Loader2,
  ExternalLink,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react"
import { toast } from "sonner"

type Broadcast = {
  id: string
  content: string
  enhanced_content: string | null
  platforms: string[] | null
  status: string
  created_at: string
}

export default function SocialPage() {
  const [rawContent, setRawContent] = useState("")
  const [enhancedContent, setEnhancedContent] = useState("")
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([])
  const [copied, setCopied] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchBroadcasts()
  }, [])

  async function fetchBroadcasts() {
    const { data } = await supabase
      .from("social_broadcasts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (data) setBroadcasts(data)
  }

  async function enhanceWithAI() {
    if (!rawContent.trim()) {
      toast.error("Please enter some content first")
      return
    }

    setIsEnhancing(true)
    try {
      const res = await fetch("/api/social/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: rawContent }),
      })

      const data = await res.json()
      if (data.enhanced) {
        setEnhancedContent(data.enhanced)
        toast.success("Content enhanced with AI!")
      } else {
        toast.error(data.error || "Failed to enhance")
      }
    } catch {
      toast.error("Failed to connect to AI")
    }
    setIsEnhancing(false)
  }

  function togglePlatform(platform: string) {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(enhancedContent || rawContent)
    setCopied(true)
    toast.success("Copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  async function publishContent() {
    if (selectedPlatforms.length === 0) {
      toast.error("Select at least one platform")
      return
    }

    const content = enhancedContent || rawContent
    if (!content.trim()) {
      toast.error("No content to publish")
      return
    }

    setIsPublishing(true)

    // Save to database
    const { error } = await supabase.from("social_broadcasts").insert({
      content: rawContent,
      enhanced_content: enhancedContent || null,
      platforms: selectedPlatforms,
      status: "published",
    })

    if (error) {
      toast.error("Failed to save broadcast")
      setIsPublishing(false)
      return
    }

    // Handle each platform
    for (const platform of selectedPlatforms) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (platform === "whatsapp") {
        const waText = encodeURIComponent(content)
        window.open(`https://wa.me/?text=${waText}`, "_blank")
        toast.success("WhatsApp opened!")
      } else if (platform === "twitter") {
        // Try Twitter API if available
        try {
          const res = await fetch("/api/social/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ platform: "twitter", content }),
          })
          const data = await res.json()
          if (data.success) {
            toast.success("Posted to Twitter!")
          } else {
            // Fallback to web intent
            const tweetText = encodeURIComponent(content.slice(0, 280))
            window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank")
            toast.success("Twitter opened!")
          }
        } catch {
          const tweetText = encodeURIComponent(content.slice(0, 280))
          window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "_blank")
          toast.success("Twitter opened!")
        }
      } else if (platform === "facebook") {
        const fbText = encodeURIComponent(content)
        window.open(
          `https://www.facebook.com/sharer/sharer.php?quote=${fbText}`,
          "_blank"
        )
        toast.success("Facebook opened!")
      }
    }

    fetchBroadcasts()
    setIsPublishing(false)

    // Reset
    setRawContent("")
    setEnhancedContent("")
    setSelectedPlatforms([])
  }

  const charCount = (enhancedContent || rawContent).length
  const charLimit = 280
  const charPercent = Math.min((charCount / charLimit) * 100, 100)

  const presetTemplates = [
    "Just launched a new feature! Check out our latest update that helps businesses grow faster.",
    "Working on something exciting. Stay tuned for a big announcement coming soon!",
    "Thank you to all our amazing clients for your trust. Here's to building great things together!",
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Main Editor */}
      <div className="space-y-6 lg:col-span-2">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Social AI Command Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Create, enhance, and publish content across platforms
          </p>
        </div>

        {/* Step 1: Raw Input */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
              Step 1 — Raw Input
            </h2>
            <div className="flex gap-2">
              {presetTemplates.map((template, i) => (
                <button
                  key={i}
                  onClick={() => setRawContent(template)}
                  className="rounded-lg border border-border bg-card px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  Template {i + 1}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={rawContent}
            onChange={(e) => setRawContent(e.target.value)}
            placeholder="Write your rough draft or idea here..."
            className="min-h-32 w-full resize-none rounded-lg border border-border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={enhanceWithAI}
            disabled={isEnhancing || !rawContent.trim()}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent-cyan py-3 font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEnhancing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enhancing with AI...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Enhance with AI
              </>
            )}
          </button>
        </div>

        {/* Step 2: Enhanced Output */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
              Step 2 — AI Enhanced
            </h2>
            <div className="flex items-center gap-3">
              {/* Character Counter Ring */}
              <div className="relative h-8 w-8">
                <svg className="h-8 w-8 -rotate-90 transform">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-border"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${(charPercent * 75.4) / 100} 75.4`}
                    className={
                      charCount > 280
                        ? "text-red-500"
                        : charCount > 240
                          ? "text-amber-500"
                          : "text-primary"
                    }
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-muted-foreground">
                  {charCount}
                </span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                Copy
              </button>
            </div>
          </div>
          <textarea
            value={enhancedContent}
            onChange={(e) => setEnhancedContent(e.target.value)}
            placeholder="Enhanced content will appear here..."
            className="min-h-32 w-full resize-none rounded-lg border border-border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Step 3: Platform Selection */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            Step 3 — Select Platforms
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Twitter */}
            <button
              onClick={() => togglePlatform("twitter")}
              className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition-all ${
                selectedPlatforms.includes("twitter")
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-border bg-card hover:border-blue-400/50"
              }`}
            >
              <Twitter
                className={`h-8 w-8 ${
                  selectedPlatforms.includes("twitter")
                    ? "text-blue-400"
                    : "text-muted-foreground"
                }`}
              />
              <span className="text-sm font-medium">X (Twitter)</span>
            </button>

            {/* Facebook */}
            <button
              onClick={() => togglePlatform("facebook")}
              className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition-all ${
                selectedPlatforms.includes("facebook")
                  ? "border-blue-600 bg-blue-600/10"
                  : "border-border bg-card hover:border-blue-600/50"
              }`}
            >
              <Facebook
                className={`h-8 w-8 ${
                  selectedPlatforms.includes("facebook")
                    ? "text-blue-600"
                    : "text-muted-foreground"
                }`}
              />
              <span className="text-sm font-medium">Facebook</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => togglePlatform("whatsapp")}
              className={`flex flex-col items-center gap-3 rounded-xl border p-4 transition-all ${
                selectedPlatforms.includes("whatsapp")
                  ? "border-green-500 bg-green-500/10"
                  : "border-border bg-card hover:border-green-500/50"
              }`}
            >
              <MessageCircle
                className={`h-8 w-8 ${
                  selectedPlatforms.includes("whatsapp")
                    ? "text-green-500"
                    : "text-muted-foreground"
                }`}
              />
              <span className="text-sm font-medium">WhatsApp</span>
            </button>
          </div>

          {/* Publish Button */}
          <button
            onClick={publishContent}
            disabled={isPublishing || selectedPlatforms.length === 0}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-background transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPublishing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Publish to Selected Platforms
              </>
            )}
          </button>
        </div>

        {/* Live Previews */}
        {(enhancedContent || rawContent) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Tweet Preview */}
            {selectedPlatforms.includes("twitter") && (
              <div className="rounded-xl border border-blue-400/30 bg-blue-500/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-medium text-blue-400">
                    Tweet Preview
                  </span>
                </div>
                <p className="line-clamp-4 text-sm text-foreground">
                  {(enhancedContent || rawContent).slice(0, 280)}
                </p>
                {charCount > 280 && (
                  <p className="mt-2 text-xs text-red-400">
                    Tweet will be truncated to 280 characters
                  </p>
                )}
              </div>
            )}

            {/* WhatsApp Preview */}
            {selectedPlatforms.includes("whatsapp") && (
              <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-medium text-green-500">
                    WhatsApp Preview
                  </span>
                </div>
                <div className="rounded-lg bg-green-900/30 p-3">
                  <p className="text-sm text-foreground">
                    {enhancedContent || rawContent}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Stats */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            Broadcast Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {broadcasts.length}
              </p>
              <p className="text-xs text-muted-foreground">Posts Sent</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 text-center">
              <p className="font-display text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">Platforms</p>
            </div>
          </div>
        </div>

        {/* AI Tips */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
              AI Engagement Tips
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <TrendingUp className="mt-0.5 h-3 w-3 text-primary" />
              Posts with questions get 2x more engagement
            </li>
            <li className="flex items-start gap-2">
              <TrendingUp className="mt-0.5 h-3 w-3 text-primary" />
              Use 3-5 relevant hashtags for better reach
            </li>
            <li className="flex items-start gap-2">
              <TrendingUp className="mt-0.5 h-3 w-3 text-primary" />
              Post between 9-11 AM for maximum visibility
            </li>
          </ul>
        </div>

        {/* Recent Broadcasts */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            Recent Broadcasts
          </h3>
          {broadcasts.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              No broadcasts yet
            </p>
          ) : (
            <div className="space-y-3">
              {broadcasts.slice(0, 5).map((broadcast) => (
                <div
                  key={broadcast.id}
                  className="rounded-lg border border-border bg-card p-3"
                >
                  <p className="line-clamp-2 text-sm text-foreground">
                    {broadcast.enhanced_content || broadcast.content}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(broadcast.created_at).toLocaleDateString()}
                    {broadcast.platforms?.map((p) => (
                      <span
                        key={p}
                        className="rounded-full bg-primary/10 px-1.5 py-0.5 text-primary"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* API Status */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h3 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            API Connection Status
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Claude AI</span>
              <span className="flex items-center gap-1 text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                LIVE
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Twitter</span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                WEB SHARE
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Facebook</span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                WEB SHARE
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">WhatsApp</span>
              <span className="flex items-center gap-1 text-primary">
                <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                WEB SHARE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
