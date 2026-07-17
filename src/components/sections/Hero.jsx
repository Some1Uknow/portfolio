import siteContent from "../../content/siteContent.js"
import { SiOpenai } from "react-icons/si"

const heroItems = [
  { style: { animation: "fadeUp 0.7s ease 0.05s both" } },
  { style: { animation: "fadeUp 0.8s ease 0.18s both" } },
  { style: { animation: "fadeUp 0.8s ease 0.32s both" } },
  { style: { animation: "fadeUp 0.8s ease 0.44s both" } },
]

const { hero, links } = siteContent

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingBottom: 24,
        paddingTop: "max(56px, env(safe-area-inset-top))",
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          marginBottom: 20,
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          ...heroItems[0].style,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            background: "var(--color-accent)",
            borderRadius: "50%",
            display: "inline-block",
            animation: "pulseGreen 2s infinite",
            flexShrink: 0,
            marginTop: 4,
            boxShadow: "0 0 0 6px var(--color-accent-glow)",
          }}
        />
        <span>
          {hero.eyebrow} — {hero.location}
        </span>
      </p>

      <h1
        style={{
          fontFamily: "var(--font-instrument-serif), Georgia, serif",
          fontSize: "clamp(36px, 6.5vw, 88px)",
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--color-text)",
          textTransform: "lowercase",
          marginBottom: 28,
          whiteSpace: "nowrap",
          ...heroItems[1].style,
        }}
      >
        {hero.name}
      </h1>

      <div
        className="hero-status"
        aria-label="Currently cooking something with OpenAI Codex"
        style={{
          marginBottom: 24,
          ...heroItems[2].style,
        }}
      >
        <span className="hero-status__dot" aria-hidden="true" />
        <span>cooking something with</span>
        <span className="hero-status__codex">
          <SiOpenai aria-hidden="true" size={13} />
          Codex
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0", marginBottom: 16, ...heroItems[3].style }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            style={{
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-text)",
              textDecoration: "none",
              padding: "10px 0",
              marginRight: 24,
              position: "relative",
            }}
            className="hero-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}
