"use client"

import Link from "next/link"
import { ArrowLeft, FileText, Scale, AlertTriangle, Sparkles, Ban, RefreshCw, Mail } from "lucide-react"

export default function TermsOfServicePage() {
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
            <FileText className="h-4 w-4 text-[#00ffb4]" />
            <span className="text-xs font-mono text-[#00ffb4]">LEGAL</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#e8f0fe] mb-4">
            Terms of Service
          </h1>
          <p className="text-[#6b7c99]">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Agreement */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Agreement to Terms
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>
                By accessing or using the Auwal Business website and services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
              <p>
                These Terms of Service apply to all visitors, users, and others who access or use our website, AI assistant, contact forms, and any other services we provide.
              </p>
            </div>
          </section>

          {/* Services Description */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Our Services
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>Auwal Business provides the following services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Business Websites:</strong> Design and development of professional websites</li>
                <li><strong>Admin Dashboards:</strong> Custom business intelligence and management panels</li>
                <li><strong>AI Web Applications:</strong> Chatbots, automation tools, and smart workflows</li>
                <li><strong>Mobile Apps:</strong> Cross-platform iOS and Android applications</li>
                <li><strong>E-Commerce Platforms:</strong> Online stores with payment integration</li>
                <li><strong>Custom Digital Solutions:</strong> APIs, automation, and SaaS tools</li>
              </ul>
              <p>
                Service terms, pricing, timelines, and deliverables for specific projects are agreed upon separately through our project proposals.
              </p>
            </div>
          </section>

          {/* AI Disclaimer */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#00ffb4]" />
              </div>
              AI-Generated Content Disclaimer
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>
                Our website features an AI-powered chat assistant designed to help you plan your projects. Please note:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI responses are generated automatically and may not always be accurate</li>
                <li>AI-generated proposals are preliminary estimates and subject to change</li>
                <li>Final project scopes, pricing, and terms require human confirmation</li>
                <li>The AI assistant does not constitute professional advice</li>
              </ul>
              <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-xl p-4 mt-4">
                <p className="text-[#f59e0b] text-sm">
                  <strong>Important:</strong> AI-generated content should be reviewed before making business decisions. We are not liable for actions taken based solely on AI recommendations.
                </p>
              </div>
            </div>
          </section>

          {/* Acceptable Use */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <Ban className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Acceptable Use
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>You agree NOT to use our services to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
                <li>Transmit malware, viruses, or harmful code</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Use automated systems to abuse our AI services</li>
                <li>Reverse engineer or exploit our technology</li>
              </ul>
              <p>
                We reserve the right to terminate access for users who violate these terms.
              </p>
            </div>
          </section>

          {/* IP Rights */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Intellectual Property
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>
                The Auwal Business website, including its design, content, features, and functionality, is owned by Auwal Business and protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p><strong className="text-[#e8f0fe]">For custom projects:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Upon full payment, clients receive ownership of custom code and designs created specifically for their project</li>
                <li>We retain the right to use generic components and frameworks across projects</li>
                <li>Third-party libraries and assets remain subject to their respective licenses</li>
                <li>We may showcase completed projects in our portfolio unless otherwise agreed</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Limitation of Liability
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>
                To the fullest extent permitted by law, Auwal Business shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Loss of profits, data, or business opportunities</li>
                <li>Service interruptions or downtime</li>
                <li>Errors or inaccuracies in AI-generated content</li>
                <li>Third-party actions or services</li>
                <li>Security breaches beyond our reasonable control</li>
              </ul>
              <p>
                Our total liability for any claim shall not exceed the amount paid by you for our services in the twelve (12) months preceding the claim.
              </p>
            </div>
          </section>

          {/* Changes */}
          <section className="glass-card rounded-2xl p-6 sm:p-8 border border-[#ffffff08]">
            <h2 className="font-display text-xl font-semibold text-[#e8f0fe] mb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00ffb4]/10 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-[#00ffb4]" />
              </div>
              Changes to Terms
            </h2>
            <div className="text-[#a3b3cc] leading-relaxed space-y-4">
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. We will update the &quot;Last updated&quot; date at the top of this page.
              </p>
              <p>
                Your continued use of our services after any changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.
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
              <p>If you have questions about these Terms of Service, please contact us:</p>
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
          <Link href="/privacy-policy" className="text-[#6b7c99] hover:text-[#00ffb4] text-sm transition-colors">
            Privacy Policy
          </Link>
        </div>
      </footer>
    </main>
  )
}
