import siteContent from "../../content/siteContent.json"

const { footerLinks } = siteContent

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
        gap: 32,
        padding: "48px clamp(24px, 6vw, 96px)",
      }}
    >
      <div
        className="footer-name"
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontStyle: "italic",
          textTransform: "lowercase",
          color: "var(--color-text)",
        }}
      >
        raghav sharma
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
        <div className="footer-links" style={{ fontSize: 11, color: "var(--color-muted)", lineHeight: 2.2 }}>
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
          New Delhi, IN — Available worldwide
        </div>
      </div>
    </footer>
  )
}
