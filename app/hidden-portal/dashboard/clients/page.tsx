"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import {
  Users,
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Building2,
  Calendar,
  FileText,
  ExternalLink,
} from "lucide-react"

type ClientRequest = {
  id: string
  name: string
  email: string
  phone: string | null
  business_name: string | null
  business_type: string | null
  description: string | null
  needs: string[] | null
  features: string[] | null
  budget_range: string | null
  timeline: string | null
  ai_proposal: Record<string, unknown> | null
  status: "new" | "in-review" | "contacted" | "completed"
  created_at: string
  updated_at: string
}

const statusColors = {
  new: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "in-review": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-primary/20 text-primary border-primary/30",
}

const statusLabels = {
  new: "New",
  "in-review": "In Review",
  contacted: "Contacted",
  completed: "Completed",
}

export default function ClientsPage() {
  const [requests, setRequests] = useState<ClientRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchRequests()
  }, [])

  async function fetchRequests() {
    const { data, error } = await supabase
      .from("client_requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error && data) {
      setRequests(data)
    }
    setLoading(false)
  }

  async function updateStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from("client_requests")
      .update({ status: newStatus })
      .eq("id", id)

    if (!error) {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, status: newStatus as ClientRequest["status"] } : r
        )
      )
    }
  }

  function exportToCSV() {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Business",
      "Type",
      "Budget",
      "Timeline",
      "Status",
      "Date",
    ]
    const rows = filteredRequests.map((r) => [
      r.name,
      r.email,
      r.phone || "",
      r.business_name || "",
      r.business_type || "",
      r.budget_range || "",
      r.timeline || "",
      r.status,
      new Date(r.created_at).toLocaleDateString(),
    ])

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `client-requests-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.business_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Client Requests
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage and respond to project inquiries
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-card"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or business..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-surface py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none rounded-lg border border-border bg-surface py-2 pl-10 pr-10 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in-review">In Review</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No client requests found</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredRequests.map((request) => (
              <div key={request.id} className="group">
                {/* Row */}
                <div
                  className="flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-card"
                  onClick={() =>
                    setExpandedId(expandedId === request.id ? null : request.id)
                  }
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-foreground truncate">
                        {request.name}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[request.status]}`}
                      >
                        {statusLabels[request.status]}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {request.email}
                      </span>
                      {request.business_name && (
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {request.business_name}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {expandedId === request.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                {/* Expanded Details */}
                {expandedId === request.id && (
                  <div className="border-t border-border bg-card/50 p-4">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Contact Info */}
                      <div className="space-y-4">
                        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                          Contact Information
                        </h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="text-muted-foreground">Email:</span>{" "}
                            <a
                              href={`mailto:${request.email}`}
                              className="text-primary hover:underline"
                            >
                              {request.email}
                            </a>
                          </p>
                          {request.phone && (
                            <p>
                              <span className="text-muted-foreground">Phone:</span>{" "}
                              <a
                                href={`tel:${request.phone}`}
                                className="text-foreground"
                              >
                                {request.phone}
                              </a>
                            </p>
                          )}
                        </div>

                        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                          Business Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          {request.business_name && (
                            <p>
                              <span className="text-muted-foreground">Business:</span>{" "}
                              {request.business_name}
                            </p>
                          )}
                          {request.business_type && (
                            <p>
                              <span className="text-muted-foreground">Type:</span>{" "}
                              {request.business_type}
                            </p>
                          )}
                          {request.description && (
                            <p>
                              <span className="text-muted-foreground">Description:</span>{" "}
                              {request.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="space-y-4">
                        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                          Project Requirements
                        </h3>
                        <div className="space-y-2 text-sm">
                          {request.needs && request.needs.length > 0 && (
                            <div>
                              <span className="text-muted-foreground">Needs:</span>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {request.needs.map((need, i) => (
                                  <span
                                    key={i}
                                    className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                                  >
                                    {need}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {request.budget_range && (
                            <p>
                              <span className="text-muted-foreground">Budget:</span>{" "}
                              {request.budget_range}
                            </p>
                          )}
                          {request.timeline && (
                            <p>
                              <span className="text-muted-foreground">Timeline:</span>{" "}
                              {request.timeline}
                            </p>
                          )}
                        </div>

                        {/* Status Update */}
                        <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                          Update Status
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {(["new", "in-review", "contacted", "completed"] as const).map(
                            (status) => (
                              <button
                                key={status}
                                onClick={() => updateStatus(request.id, status)}
                                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                                  request.status === status
                                    ? statusColors[status]
                                    : "border-border bg-surface text-muted-foreground hover:border-primary/30"
                                }`}
                              >
                                {statusLabels[status]}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {/* AI Proposal */}
                    {request.ai_proposal && (
                      <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <h3 className="font-mono text-xs font-medium uppercase tracking-wider text-primary">
                            AI-Generated Proposal
                          </h3>
                        </div>
                        <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-lg bg-background p-3 font-mono text-xs text-foreground">
                          {JSON.stringify(request.ai_proposal, null, 2)}
                        </pre>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <a
                        href={`mailto:${request.email}?subject=Re: Your Project Inquiry`}
                        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary/90"
                      >
                        <Mail className="h-4 w-4" />
                        Send Email
                      </a>
                      {request.phone && (
                        <a
                          href={`https://wa.me/${request.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/20"
                        >
                          <ExternalLink className="h-4 w-4" />
                          WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
