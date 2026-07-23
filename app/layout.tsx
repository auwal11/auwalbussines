import type { Metadata } from "next"
import { Plus_Jakarta_Sans, DM_Sans, Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "Auwal Bashar — Security Researcher | Vulnerability Research & FinTech Security",
  description:
    "Vulnerability research specialist focusing on API security, smart contract audits, and FinTech security. Active on HackerOne, HackenProof, and Cantina.",
  generator: "v0.app",
  keywords: [
    "Security Researcher",
    "Vulnerability Research",
    "Product Security",
    "API Security",
    "Smart Contract Security",
    "FinTech Security",
    "Bug Bounty",
    "HackerOne",
    "Penetration Testing",
  ],
  authors: [{ name: "Auwal Bashar" }],
  openGraph: {
    title: "Auwal Bashar — Security Researcher",
    description: "Vulnerability research specialist focusing on API security, smart contracts, and FinTech platforms.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${dmSans.variable} ${spaceMono.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-white">
        {children}
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast:
                "!bg-card !border !border-primary/20 !text-foreground !font-mono !text-xs",
              title: "!text-foreground",
              description: "!text-muted-foreground",
              success: "!border-primary/40",
              error: "!border-danger/40",
            },
          }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
