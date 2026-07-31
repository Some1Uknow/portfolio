import siteContent from "../../content/siteContent.js"
import { PAD } from "../../styles/globalStyles.js"

const { footerLinks, hero } = siteContent

export default function Footer() {
  return (
    <footer
      className="footer-shell"
      style={{
        borderTop: "1px solid var(--color-border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 28,
        padding: `40px ${PAD}`,
      }}
    >
      <div
        className="footer-name"
        style={{
          fontFamily: "var(--font-instrument-serif), Georgia, serif",
          fontSize: "clamp(22px, 3vw, 32px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontStyle: "italic",
          textTransform: "lowercase",
          color: "var(--color-text)",
        }}
      >
        {hero.name}
      </div>

      <div
        className="footer-meta"
        style={{
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          minWidth: 0,
        }}
      >
        <div className="footer-links" style={{ fontSize: 10, color: "var(--color-muted)", lineHeight: 2.1 }}>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="footer-link muted-link"
              style={{ display: "block" }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div
          className="footer-note"
          style={{ fontSize: 10, color: "var(--color-faint)", marginTop: 12, letterSpacing: "0.06em" }}
        >
          {hero.location}
        </div>
      </div>
    </footer>
  )
}
