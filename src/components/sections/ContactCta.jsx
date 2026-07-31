import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6"

import siteContent from "../../content/siteContent.js"

const email = siteContent.links.find((link) => link.href.startsWith("mailto:"))?.href || "mailto:raghu250407@gmail.com"
const linkedin = siteContent.links.find((link) => link.label === "linkedin")?.href || "https://linkedin.com/in/raghavsharmaweb3"
const x = siteContent.links.find((link) => link.label === "x")?.href || "https://x.com/raghavdotsol"

export default function ContactCta() {
  return (
    <section id="contact" style={{ paddingTop: 40, paddingBottom: 48 }}>
      <div
        style={{
          borderTop: "1px solid var(--color-border-soft)",
          borderBottom: "1px solid var(--color-border-soft)",
          padding: "28px 0",
          display: "grid",
          gap: 14,
          maxWidth: 640,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-instrument-serif), Georgia, serif",
            fontSize: "clamp(20px, 2.8vw, 28px)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            fontWeight: 400,
            margin: 0,
          }}
        >
          want to work together?
        </p>
        <p style={{ color: "var(--color-muted)", lineHeight: 1.65, margin: 0, fontSize: 12 }}>
          email me, or hit me up on x / linkedin. no forms.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <a href={email} className="contact-cta-link contact-cta-link--primary">
            email me
          </a>
          <a href={x} target="_blank" rel="noreferrer" className="contact-cta-link" aria-label="X (Twitter)">
            <FaXTwitter size={14} aria-hidden="true" />
            <span>x</span>
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="contact-cta-link" aria-label="LinkedIn">
            <FaLinkedinIn size={14} aria-hidden="true" />
            <span>linkedin</span>
          </a>
        </div>
      </div>
    </section>
  )
}
