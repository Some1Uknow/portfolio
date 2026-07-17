import "./globals.css"
import { Geist_Mono, Instrument_Serif } from "next/font/google"

import ThemeControls from "../src/components/ThemeControls.jsx"
import VercelMetrics from "../src/components/VercelMetrics.jsx"
import { SITE_URL } from "../src/lib/site.js"

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Raghav Sharma — Software Engineer",
    template: "%s | Raghav Sharma",
  },
  description:
    "Raghav Sharma is a software engineer building backend systems, developer tools, AI products, and blockchain infrastructure with Rust and TypeScript.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Raghav Sharma — Software Engineer",
    description:
      "Backend systems, developer tools, AI products, and blockchain infrastructure built with Rust and TypeScript.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raghavdotsol",
    site: "@raghavdotsol",
  },
  icons: {
    icon: "/favicon.svg",
  },
}

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1110" },
  ],
}

const themeBootstrap = `(() => {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <ThemeControls />
        <div className="app-content">{children}</div>
        <VercelMetrics />
      </body>
    </html>
  )
}
