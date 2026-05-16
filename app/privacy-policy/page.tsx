"use client"

import Link from "next/link"
import { ArrowLeft, Shield, Database, MessageSquare, Cookie, Mail, UserCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#020409] text-[#e8f0fe]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#ffffff08] bg-[#020409]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 h-16 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#6b7c99] hover:text-[#00ffb4] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-20">
        {/* Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00ffb4]/10 border border-[#00ffb4]/20 mb-6">
            <Shield className="h-4 w-4 text-[#00ffb4]" />
            <span className="text-xs font-mono text-[#00ffb4]">LEGAL</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#e8f0fe] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#6b7c99]">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Introduction */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Introduction
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>
                Welcome to Auwal Business (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </div>
          </section>

          {/* Data Collection */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Database className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Information We Collect
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>We collect information that you voluntarily provide to us when you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fill out our contact or project request forms</li>
                <li>Use our AI chat assistant</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us via email or social media</li>
              </ul>
              <p className="font-semibold text-[#e8f0fe] mt-6">Personal Data Collected:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                <li><strong>Business Information:</strong> Business name, industry, project requirements</li>
                <li><strong>Communication Data:</strong> Messages sent through our chat assistant or contact forms</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time spent on site</li>
              </ul>
            </div>
          </section>

          {/* AI Data */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-[#00ffb4]" />
              </div>
              AI Assistant & Conversation Data
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>
                Our website features an AI-powered chat assistant that helps you plan your projects. When you use this feature:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Conversations are processed by Anthropic&apos;s Claude AI service</li>
                <li>We may store conversation history to improve our services</li>
                <li>AI-generated proposals and recommendations are stored in our database</li>
                <li>We do not share your conversation data with third parties for marketing purposes</li>
              </ul>
              <p className="text-[#f59e0b] bg-[#f59e0b]/10 p-4 rounded-xl mt-4">
                <strong>Note:</strong> Please do not share sensitive personal information (passwords, financial data, etc.) through the AI chat assistant.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Cookie className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Cookies & Tracking
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze site traffic and usage patterns</li>
                <li>Improve our website performance</li>
                <li>Provide personalized content</li>
              </ul>
              <p>
                You can control cookies through your browser settings. Disabling cookies may affect some features of our website.
              </p>
            </div>
          </section>

          {/* Third Party Services */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Database className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Third-Party Services
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>We use the following third-party services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Supabase:</strong> Database and authentication services</li>
                <li><strong>Anthropic (Claude):</strong> AI chat assistant</li>
                <li><strong>Vercel:</strong> Website hosting and analytics</li>
                <li><strong>Resend:</strong> Email delivery services</li>
              </ul>
              <p>
                Each of these services has their own privacy policies governing the use of your information. We encourage you to review their policies.
              </p>
            </div>
          </section>

          {/* User Rights */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Your Rights
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Objection:</strong> Object to processing of your personal data</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at <a href="mailto:awntechdigitalservices@gmail.com" className="text-[#00ffb4] hover:underline">awntechdigitalservices@gmail.com</a>.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Contact Us
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
              <div className="bg-[#0a1628] rounded-xl p-4 border border-[#ffffff08]">
                <p><strong className="text-[#e8f0fe]">Auwal Business</strong></p>
                <p>Email: <a href="mailto:awntechdigitalservices@gmail.com" className="text-[#00ffb4] hover:underline">awntechdigitalservices@gmail.com</a></p>
                <p>GitHub: <a href="https://github.com/auwntech-audit" className="text-[#00ffb4] hover:underline">@auwntech-audit</a></p>
              </div>
            </div>
          </section>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-[#ffffff08] py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6b7c99] text-sm">
            &copy; {new Date().getFullYear()} Auwal Business. All rights reserved.
          </p>
          <Link href="/terms-of-service" className="text-[#6b7c99] hover:text-[#00ffb4] text-sm transition-colors">
            Terms of Service
          </Link>
        </div>
      </footer>
    </main>
  )
}
