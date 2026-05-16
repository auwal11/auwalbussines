"use client"

import { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  FileText,
  Sparkles,
  Download,
  Copy,
  Check,
  Loader2,
  Plus,
  Trash2,
  Sun,
  Moon,
  History,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
} from "lucide-react"
import { toast } from "sonner"

type CVData = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  experience: {
    title: string
    company: string
    period: string
    achievements: string[]
  }[]
  education: {
    degree: string
    school: string
    year: string
  }[]
  skills: string[]
  certifications: string[]
}

type CVHistory = {
  id: string
  name: string
  title: string | null
  style: string | null
  generated_cv: CVData | null
  ats_score: number | null
  created_at: string
}

const cvStyles = [
  { id: "modern", name: "Modern Professional" },
  { id: "executive", name: "Executive Premium" },
  { id: "tech", name: "Tech Specialist" },
  { id: "creative", name: "Creative Lead" },
]

const quickFillTemplates = [
  {
    name: "Full-Stack Developer",
    bio: `Senior Full-Stack Developer with 5+ years of experience building scalable web applications. 
Proficient in React, Next.js, Node.js, TypeScript, and PostgreSQL.
Led development of e-commerce platform serving 100k+ users.
Implemented CI/CD pipelines reducing deployment time by 70%.
Bachelor's in Computer Science from University of Lagos.
AWS Certified Solutions Architect.`,
  },
  {
    name: "AI Engineer",
    bio: `AI/ML Engineer specializing in NLP and computer vision applications.
3 years experience building production ML systems.
Developed chatbot handling 50k+ daily conversations.
Published research on transformer optimization.
MSc in Artificial Intelligence.
Python, PyTorch, TensorFlow, Claude API.`,
  },
  {
    name: "Mobile Developer",
    bio: `Cross-platform Mobile Developer with expertise in Flutter and React Native.
Shipped 10+ apps on iOS and Android stores.
Built fintech app with 200k+ downloads.
Firebase, GraphQL, REST API integration.
UI/UX focused with attention to performance.
BSc Software Engineering.`,
  },
]

export default function CVBuilderPage() {
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [website, setWebsite] = useState("")
  const [style, setStyle] = useState("modern")
  const [rawBio, setRawBio] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCV, setGeneratedCV] = useState<CVData | null>(null)
  const [atsScore, setAtsScore] = useState<number | null>(null)
  const [darkPreview, setDarkPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<CVHistory[]>([])
  const [editMode, setEditMode] = useState(false)
  const cvRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchHistory()
  }, [])

  async function fetchHistory() {
    const { data } = await supabase
      .from("cv_history")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)

    if (data) setHistory(data)
  }

  function applyTemplate(template: (typeof quickFillTemplates)[0]) {
    setRawBio(template.bio)
    toast.success(`Applied "${template.name}" template`)
  }

  function loadFromHistory(item: CVHistory) {
    setName(item.name)
    setTitle(item.title || "")
    setStyle(item.style || "modern")
    if (item.generated_cv) {
      setGeneratedCV(item.generated_cv)
      setAtsScore(item.ats_score)
      setEmail(item.generated_cv.email || "")
      setPhone(item.generated_cv.phone || "")
      setLocation(item.generated_cv.location || "")
      setWebsite(item.generated_cv.website || "")
    }
    toast.success("Loaded CV from history")
  }

  async function generateCV() {
    if (!name.trim() || !rawBio.trim()) {
      toast.error("Please enter your name and bio data")
      return
    }

    setIsGenerating(true)

    try {
      const res = await fetch("/api/cv/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          title,
          email,
          phone,
          location,
          website,
          style,
          rawBio,
        }),
      })

      const data = await res.json()

      if (data.cv) {
        setGeneratedCV(data.cv)
        setAtsScore(data.atsScore || null)

        // Save to history
        await supabase.from("cv_history").insert({
          name,
          title,
          style,
          raw_bio: rawBio,
          generated_cv: data.cv,
          ats_score: data.atsScore,
        })

        fetchHistory()
        toast.success("CV generated successfully!")
      } else {
        toast.error(data.error || "Failed to generate CV")
      }
    } catch {
      toast.error("Failed to connect to AI")
    }

    setIsGenerating(false)
  }

  async function downloadPDF() {
    if (!cvRef.current) return

    toast.loading("Generating PDF...")

    try {
      const html2pdf = (await import("html2pdf.js")).default

      const opt = {
        margin: 0.5,
        filename: `${name.replace(/\s+/g, "_")}_CV.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      }

      await html2pdf().set(opt).from(cvRef.current).save()
      toast.dismiss()
      toast.success("PDF downloaded!")
    } catch {
      toast.dismiss()
      toast.error("Failed to generate PDF")
    }
  }

  async function copyCV() {
    if (!generatedCV) return

    const text = `${generatedCV.name}
${generatedCV.title}

${generatedCV.summary}

EXPERIENCE
${generatedCV.experience
  .map(
    (e) =>
      `${e.title} at ${e.company} (${e.period})
${e.achievements.map((a) => `• ${a}`).join("\n")}`
  )
  .join("\n\n")}

EDUCATION
${generatedCV.education.map((e) => `${e.degree} - ${e.school} (${e.year})`).join("\n")}

SKILLS
${generatedCV.skills.join(", ")}

${generatedCV.certifications.length > 0 ? `CERTIFICATIONS\n${generatedCV.certifications.join("\n")}` : ""}`

    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("CV copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  function resetForm() {
    setName("")
    setTitle("")
    setEmail("")
    setPhone("")
    setLocation("")
    setWebsite("")
    setRawBio("")
    setGeneratedCV(null)
    setAtsScore(null)
    setEditMode(false)
  }

  async function clearHistory() {
    const { error } = await supabase.from("cv_history").delete().neq("id", "")

    if (!error) {
      setHistory([])
      toast.success("History cleared")
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* History Sidebar */}
      <div className="lg:col-span-2">
        <div className="sticky top-6 space-y-4">
          <div className="rounded-xl border border-border bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-primary">
                <History className="h-3 w-3" />
                History
              </h3>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2 rounded-lg border border-border bg-card p-2 text-center">
                <div>
                  <p className="font-display text-lg font-bold text-foreground">
                    {history.length}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Generated</p>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-primary">
                    {history.filter((h) => h.ats_score && h.ats_score >= 80).length}
                  </p>
                  <p className="text-[10px] text-muted-foreground">High ATS</p>
                </div>
              </div>
            </div>
          </div>

          {history.length > 0 && (
            <div className="max-h-96 space-y-2 overflow-y-auto rounded-xl border border-border bg-surface p-4">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className="w-full rounded-lg border border-border bg-card p-2 text-left transition-colors hover:border-primary/50"
                >
                  <p className="truncate text-xs font-medium text-foreground">
                    {item.name}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {item.style} • {new Date(item.created_at).toLocaleDateString()}
                  </p>
                  {item.ats_score && (
                    <div className="mt-1 h-1 w-full rounded-full bg-border">
                      <div
                        className="h-1 rounded-full bg-primary"
                        style={{ width: `${item.ats_score}%` }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Editor */}
      <div className="space-y-6 lg:col-span-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            AI CV Builder
          </h1>
          <p className="text-sm text-muted-foreground">
            Generate professional CVs with AI-powered optimization
          </p>
        </div>

        {/* Personal Info */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            Personal Information
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Professional Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Senior Software Engineer"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lagos, Nigeria"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yoursite.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* CV Style */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            CV Style
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {cvStyles.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  style === s.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/50"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Fill Templates */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            Quick Fill Templates
          </h2>
          <div className="flex flex-wrap gap-2">
            {quickFillTemplates.map((template) => (
              <button
                key={template.name}
                onClick={() => applyTemplate(template)}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {/* Raw Bio Input */}
        <div className="rounded-xl border border-border bg-surface p-6">
          <h2 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-primary">
            Raw Bio Data *
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">
            Paste your work history, education, skills, and achievements. The AI will
            structure and optimize it.
          </p>
          <textarea
            value={rawBio}
            onChange={(e) => setRawBio(e.target.value)}
            placeholder="Paste your experience, skills, education, certifications...

Example:
- 5 years of web development experience
- Built e-commerce platform for 50k users
- Proficient in React, Node.js, PostgreSQL
- BSc Computer Science from XYZ University
- AWS Certified Developer"
            className="min-h-48 w-full resize-none rounded-lg border border-border bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />

          {/* Progress Bar During Generation */}
          {isGenerating && (
            <div className="mt-4 overflow-hidden rounded-full bg-border">
              <div className="h-1 animate-pulse bg-gradient-to-r from-primary via-accent-cyan to-primary" />
            </div>
          )}

          <button
            onClick={generateCV}
            disabled={isGenerating || !name.trim() || !rawBio.trim()}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent-cyan py-3 font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                AI Building Your CV...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate with AI
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live CV Preview */}
      <div className="lg:col-span-5">
        <div className="sticky top-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
              Live Preview
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkPreview(!darkPreview)}
                className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {darkPreview ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={copyCV}
                disabled={!generatedCV}
                className="flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-primary" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                Copy
              </button>
              <button
                onClick={downloadPDF}
                disabled={!generatedCV}
                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-background transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                <Download className="h-3 w-3" />
                PDF
              </button>
              <button
                onClick={resetForm}
                className="flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Plus className="h-3 w-3" />
                New
              </button>
            </div>
          </div>

          {/* ATS Score */}
          {atsScore !== null && (
            <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  ATS Score
                </span>
                <span className="font-display text-2xl font-bold text-primary">
                  {atsScore}%
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-primary to-accent-cyan transition-all duration-500"
                  style={{ width: `${atsScore}%` }}
                />
              </div>
            </div>
          )}

          {/* CV Document */}
          <div
            ref={cvRef}
            className={`overflow-hidden rounded-xl border ${
              darkPreview
                ? "border-border bg-zinc-900 text-zinc-100"
                : "border-zinc-300 bg-white text-zinc-900"
            }`}
            style={{ fontFamily: "'Crimson Pro', Georgia, serif" }}
          >
            {generatedCV ? (
              <div className="p-8">
                {/* Header */}
                <div className="mb-6 border-b border-current/20 pb-4">
                  <h1 className="text-3xl font-bold">{generatedCV.name}</h1>
                  {generatedCV.title && (
                    <p className="mt-1 text-lg opacity-80">{generatedCV.title}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-70">
                    {generatedCV.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {generatedCV.email}
                      </span>
                    )}
                    {generatedCV.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {generatedCV.phone}
                      </span>
                    )}
                    {generatedCV.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {generatedCV.location}
                      </span>
                    )}
                    {generatedCV.website && (
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {generatedCV.website}
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {generatedCV.summary && (
                  <div className="mb-6">
                    <h2 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      <User className="h-4 w-4" />
                      Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed">{generatedCV.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {generatedCV.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      <Briefcase className="h-4 w-4" />
                      Professional Experience
                    </h2>
                    <div className="space-y-4">
                      {generatedCV.experience.map((exp, i) => (
                        <div key={i}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{exp.title}</h3>
                              <p className="text-sm opacity-70">{exp.company}</p>
                            </div>
                            <span className="text-sm opacity-60">{exp.period}</span>
                          </div>
                          <ul className="mt-2 space-y-1 text-sm">
                            {exp.achievements.map((achievement, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-current opacity-50" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {generatedCV.education.length > 0 && (
                  <div className="mb-6">
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      <GraduationCap className="h-4 w-4" />
                      Education
                    </h2>
                    <div className="space-y-2">
                      {generatedCV.education.map((edu, i) => (
                        <div key={i} className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-sm opacity-70">{edu.school}</p>
                          </div>
                          <span className="text-sm opacity-60">{edu.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {generatedCV.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      <Code className="h-4 w-4" />
                      Technical Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {generatedCV.skills.map((skill, i) => (
                        <span
                          key={i}
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            darkPreview
                              ? "bg-zinc-800 text-zinc-300"
                              : "bg-zinc-100 text-zinc-700"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {generatedCV.certifications.length > 0 && (
                  <div>
                    <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
                      <Award className="h-4 w-4" />
                      Certifications
                    </h2>
                    <ul className="space-y-1 text-sm">
                      {generatedCV.certifications.map((cert, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-current opacity-50" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex min-h-96 flex-col items-center justify-center p-8 text-center">
                <FileText
                  className={`mb-4 h-16 w-16 ${darkPreview ? "text-zinc-700" : "text-zinc-300"}`}
                />
                <p
                  className={`text-sm ${darkPreview ? "text-zinc-500" : "text-zinc-400"}`}
                >
                  Your AI-generated CV will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
