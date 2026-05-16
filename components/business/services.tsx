"use client"

import { Globe, LayoutDashboard, Bot, Smartphone, ShoppingCart, Cog } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    description: "High-converting landing pages & company sites that establish your brand and drive results.",
    color: "#00d4aa",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    description: "Real-time data panels for business intelligence, analytics, and operational control.",
    color: "#00d4aa",
  },
  {
    icon: Bot,
    title: "AI Web Applications",
    description: "Chatbots, automation tools, and smart workflows powered by cutting-edge AI technology.",
    color: "#7c3aed",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Cross-platform iOS & Android applications built with Flutter for seamless user experiences.",
    color: "#00d4aa",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Platforms",
    description: "Full-featured online stores with payment integration, inventory management, and analytics.",
    color: "#00d4aa",
  },
  {
    icon: Cog,
    title: "Custom Solutions",
    description: "APIs, automation systems, SaaS tools, and bespoke digital solutions for unique needs.",
    color: "#7c3aed",
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-[#00d4aa]/[0.03] blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#00d4aa]/20 bg-[#00d4aa]/5 px-4 py-1.5 text-xs font-mono text-[#00d4aa] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
            SERVICES
          </div>
          <h2 className="animate-fade-up delay-100 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
            What We Build
          </h2>
          <p className="animate-fade-up delay-200 mx-auto max-w-2xl text-[#8b9bc8] text-base sm:text-lg">
            From concept to deployment, we create digital solutions that transform how your business operates.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="animate-fade-up glass-card group relative rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${(i + 3) * 100}ms` }}
            >
              {/* Icon */}
              <div
                className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${service.color}15, ${service.color}08)`,
                  border: `1px solid ${service.color}30`,
                }}
              >
                <service.icon
                  className="h-7 w-7 transition-colors"
                  style={{ color: service.color }}
                />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-[#f0f4ff] mb-3 group-hover:text-[#00d4aa] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#8b9bc8] text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Hover glow effect */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.color}08, transparent 40%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
