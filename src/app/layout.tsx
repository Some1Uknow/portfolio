import type React from "react"
import type { Metadata } from "next"
import { Inter, EB_Garamond, GFS_Didot } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const ebGaramond = EB_Garamond({ subsets: ["latin"] })
const gfsDidot = GFS_Didot({ subsets: ["greek"], weight: "400" })

export const metadata: Metadata = {
  title: "Raghav Sharma | Full Stack Developer",
  description: "Portfolio of Raghav Sharma, a Full Stack Developer based in New Delhi, India",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={gfsDidot.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
