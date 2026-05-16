import type { Metadata } from "next"
import { DM_Sans, Syne, Space_Mono, Crimson_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["600", "700", "800"],
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
  weight: ["400", "700"],
})

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-pro",
  display: "swap",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "Auwal Business — Building Smart Websites & Apps",
  description:
    "AI-powered web development, mobile apps, dashboards, and digital solutions. Transform your business with intelligent technology.",
  generator: "v0.app",
  keywords: [
    "Web Development",
    "AI Applications",
    "Mobile Apps",
    "Flutter",
    "Admin Dashboards",
    "E-Commerce",
    "Digital Solutions",
    "Nigeria",
    "Business Websites",
  ],
  authors: [{ name: "Auwal Business" }],
  openGraph: {
    title: "Auwal Business — Building Smart Websites & Apps",
    description: "AI-powered web development, mobile apps, and digital solutions for modern businesses.",
    type: "website",
  },
}

export const viewport = {
  themeColor: "#020409",
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
      className={`${dmSans.variable} ${syne.variable} ${spaceMono.variable} ${crimsonPro.variable} bg-background`}
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
