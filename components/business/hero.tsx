"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Status Badge */}
        <div className="animate-fade-up mb-8 inline-block rounded-full border border-[#D97706]/20 bg-[#D97706]/5 px-4 py-2 text-sm font-medium text-[#D97706]">
          Innovating...
        </div>

        {/* Main Headline */}
        <h1 className="animate-fade-up delay-100 text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
          <span className="text-[#FFFFFF]">Auwal</span>
          <br />
          <span className="text-[#D97706]">Bashar</span>
        </h1>

        {/* Description */}
        <p className="animate-fade-up delay-200 mx-auto max-w-2xl text-lg sm:text-xl text-[#9CA3AF] mb-12 leading-relaxed">
          Web3 Security Researcher. Building the future of decentralized security, one vulnerability at a time.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-up delay-300">
          <Link
            href="https://github.com/auwaldeve"
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold bg-[#D97706] hover:bg-[#F59E0B] text-[#0a0a0a] rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <span>Explore Work</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
