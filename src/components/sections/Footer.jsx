import siteContent from "../../content/siteContent.json"

const { footerLinks } = siteContent

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e5e5",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 32,
        padding: "48px clamp(24px, 6vw, 96px)",
      }}
    >
      <div
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "clamp(28px, 4vw, 40px)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontStyle: "italic",
          textTransform: "lowercase",
          color: "#0a0a0a",
        }}
      >
        raghav sharma
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 11, color: "#666", lineHeight: 2.2 }}>
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{ display: "block", color: "#666", textDecoration: "none" }}
              onMouseEnter={(event) => {
                event.currentTarget.style.color = "#0a0a0a"
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.color = "#666"
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 10, color: "#ccc", marginTop: 12, letterSpacing: "0.06em" }}>
          New Delhi, IN — Available worldwide
        </div>
      </div>
    </footer>
  )
}
