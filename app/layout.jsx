import "./globals.css"
import Script from "next/script"

import ThemeControls from "../src/components/ThemeControls.jsx"
import VercelMetrics from "../src/components/VercelMetrics.jsx"
import { SITE_NAME, SITE_URL } from "../src/lib/site.js"

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Raghav Sharma — Software Engineer",
    template: "%s | Raghav Sharma",
  },
  description:
    "Raghav Sharma is a software engineer building backend systems, developer tools, AI products, and blockchain infrastructure with Rust and TypeScript.",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
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
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: "Raghav Sharma — Software Engineer",
    description:
      "Backend systems, developer tools, AI products, and blockchain infrastructure built with Rust and TypeScript.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Raghav Sharma — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raghavdotsol",
    site: "@raghavdotsol",
    title: "Raghav Sharma — Software Engineer",
    description:
      "Backend systems, developer tools, AI products, and blockchain infrastructure built with Rust and TypeScript.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.svg",
  },
}

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

const themeBootstrap = `(() => {
  try {
    var saved = localStorage.getItem("portfolio-theme");
    var theme = saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="portfolio-theme" strategy="beforeInteractive">
          {themeBootstrap}
        </Script>
        <ThemeControls />
        <div className="app-content">{children}</div>
        <VercelMetrics />
      </body>
    </html>
  )
}
