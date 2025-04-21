import type React from "react"
import type { Metadata } from "next"

import { Inter } from "next/font/google"

import "./globals.css"
import { SupabaseProvider } from "@/components/supabase-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AWAKE & ARISE - Learning Platform",
  description: "A gamified 3D learning platform for JEE/NEET, bank, government exams, and English skills",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          {children}
          <Toaster />
        </SupabaseProvider>
      </body>
    </html>
  )
}
