"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

const categories = ["All", "Websites", "Dashboards", "AI Apps", "Mobile"]

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "Real-time analytics and inventory management system for online retailers.",
    image: "/images/projects/dashboard-1.jpg",
    category: "Dashboards",
    tech: ["Next.js", "Supabase", "Tailwind"],
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "AI Customer Support Bot",
    description: "Intelligent chatbot that handles 80% of customer inquiries automatically.",
    image: "/images/projects/ai-bot.jpg",
    category: "AI Apps",
    tech: ["Claude AI", "React", "Node.js"],
    link: "#",
  },
  {
    id: 3,
    title: "Restaurant Ordering App",
    description: "Cross-platform mobile app for food ordering with real-time tracking.",
    image: "/images/projects/mobile-app.jpg",
    category: "Mobile",
    tech: ["Flutter", "Firebase", "Stripe"],
    link: "#",
  },
  {
    id: 4,
    title: "Corporate Website Redesign",
    description: "Modern, responsive website that increased conversions by 40%.",
    image: "/images/projects/website-1.jpg",
    category: "Websites",
    tech: ["Next.js", "Framer Motion", "CMS"],
    link: "#",
  },
  {
    id: 5,
    title: "Inventory Management System",
    description: "Full-stack solution for tracking products, orders, and shipments.",
    image: "/images/projects/dashboard-2.jpg",
    category: "Dashboards",
    tech: ["React", "PostgreSQL", "Docker"],
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "AI Content Generator",
    description: "Tool that creates marketing copy, social posts, and blog content.",
    image: "/images/projects/ai-content.jpg",
    category: "AI Apps",
    tech: ["OpenAI", "Next.js", "Vercel"],
    link: "#",
  },
]

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/20 bg-[#7c3aed]/5 px-4 py-1.5 text-xs font-mono text-[#7c3aed] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
            PORTFOLIO
          </div>
          <h2 className="animate-fade-up delay-100 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
            Recent Projects
          </h2>
          <p className="animate-fade-up delay-200 mx-auto max-w-2xl text-[#8b9bc8] text-base sm:text-lg">
            A selection of work that showcases our expertise across different domains.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="animate-fade-up delay-300 flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#00d4aa] text-[#0a0f1e]"
                  : "bg-[#0a1628] text-[#8b9bc8] hover:text-[#00d4aa] border border-[#ffffff08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <div
              key={project.id}
              className="animate-fade-up group relative rounded-2xl overflow-hidden glass-card"
              style={{ animationDelay: `${(i + 4) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-[#0a1628]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4aa]/20 to-[#7c3aed]/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-sm text-[#8b9bc8]">{project.category}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0a0f1e]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.link}
                    className="p-3 rounded-full bg-[#00d4aa] text-[#0a0f1e] hover:scale-110 transition-transform"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      className="p-3 rounded-full bg-[#ffffff10] text-[#f0f4ff] hover:bg-[#ffffff20] transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#00d4aa]/10 text-[#00d4aa]">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-[#f0f4ff] mb-2 group-hover:text-[#00d4aa] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[#8b9bc8] mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded text-xs bg-[#ffffff05] text-[#8b9bc8] border border-[#ffffff08]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
