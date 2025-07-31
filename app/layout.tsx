"use client"

import type React from "react"

import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Inter } from "next/font/google"
import { useTheme } from "@/lib/theme"
import { useEffect } from "react"
import { Chatbot } from "@/components/chatbot/chatbot"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "v0 App",
//   description: "Created with v0",
//   generator: "v0.dev",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme on mount
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <html lang="en" className={theme}>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className={inter.className}>
        {children}
        <Chatbot />
      </body>
    </html>
  )
}
