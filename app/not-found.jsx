import Link from "next/link"

import { SITE_URL } from "../src/lib/site.js"
import { PAD } from "../src/styles/globalStyles.js"

export const metadata = {
  title: "Page not found",
  description: "The page you requested does not exist on Raghav Sharma's portfolio.",
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <main style={{ padding: `72px ${PAD}`, minHeight: "100vh", display: "grid", alignContent: "start", gap: 18 }}>
      <Link href="/" className="muted-link" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        ← back to portfolio
      </Link>
      <h1
        style={{
          fontFamily: "var(--font-instrument-serif), Georgia, serif",
          fontSize: "clamp(40px, 8vw, 72px)",
          lineHeight: 0.95,
          fontWeight: 400,
          letterSpacing: "-0.04em",
          color: "var(--color-text)",
        }}
      >
        Page not found
      </h1>
      <p style={{ maxWidth: 560, color: "var(--color-muted)", lineHeight: 1.8 }}>
        This page does not exist. Return to the portfolio to browse available case studies and writing.
      </p>
      <nav aria-label="Where to look next" style={{ display: "grid", gap: 8, maxWidth: 560 }}>
        <strong style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500 }}>
          Where to look next
        </strong>
        <ul style={{ paddingLeft: 18, color: "var(--color-muted)", lineHeight: 1.8 }}>
          <li><Link href="/">Portfolio</Link> — profile, experience, and selected projects.</li>
          <li><a href={`${SITE_URL}/llms.txt`}>Agent guide</a> — when to use this portfolio and canonical links.</li>
          <li><a href={`${SITE_URL}/sitemap.xml`}>Sitemap</a> — indexable page URLs.</li>
          <li><Link href="/blog">Writing</Link> — technical notes and project write-ups.</li>
        </ul>
      </nav>
    </main>
  )
}
