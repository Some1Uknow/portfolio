import siteContent from "../../content/siteContent.js"
import { SiOpenai } from "react-icons/si"
import FadeIn from "../ui/FadeIn.jsx"

const heroItems = [
  { style: { animation: "fadeUp 0.8s ease 0.18s both" } },
  { style: { animation: "fadeUp 0.8s ease 0.32s both" } },
  { style: { animation: "fadeUp 0.8s ease 0.44s both" } },
]

const { hero, links, aboutParagraphs } = siteContent

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingBottom: 0,
        paddingTop: "max(48px, env(safe-area-inset-top))",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-instrument-serif), Georgia, serif",
          fontSize: "clamp(26px, 4vw, 52px)",
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: "var(--color-text)",
          textTransform: "lowercase",
          marginBottom: 20,
          whiteSpace: "nowrap",
          ...heroItems[0].style,
        }}
      >
        {hero.name}
      </h1>

      <FadeIn y={0} x={-8}>
        <div style={{ maxWidth: 760, marginBottom: 20 }}>
          {aboutParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              style={{
                fontSize: 12,
                color: "var(--color-muted)",
                lineHeight: 1.6,
                marginBottom: 0,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>

      <div
        className="hero-status"
        aria-label="Currently cooking something with OpenAI Codex"
        style={{
          marginBottom: 24,
          ...heroItems[1].style,
        }}
      >
        <span className="hero-status__dot" aria-hidden="true" />
        <span>cooking something with</span>
        <span className="hero-status__codex">
          <SiOpenai aria-hidden="true" size={13} />
          Codex
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0 0", marginBottom: 16, ...heroItems[2].style }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noreferrer" : undefined}
            style={{
              fontSize: 10,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--color-text)",
              textDecoration: "none",
              padding: "8px 0",
              marginRight: 20,
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
