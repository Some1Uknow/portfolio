import siteContent from "../../content/siteContent.js"
import FadeIn from "../ui/FadeIn.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

const { awards } = siteContent

export default function Awards() {
  return (
    <section id="awards">
      <SectionLabel as="h2">Things I&apos;m proud of</SectionLabel>
      <div>
        {awards.map((award, index) => (
          <FadeIn key={award.num} delay={index * 50} x={-10} y={0}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1fr auto",
                gap: 24,
                alignItems: "start",
                padding: "22px 0",
                borderTop: index === 0 ? "1px solid var(--color-border-soft)" : "none",
                borderBottom: "1px solid var(--color-border-soft)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                  fontSize: 18,
                  color: "var(--color-faint)",
                  fontStyle: "italic",
                }}
              >
                {award.num}
              </span>
              <div>
                <h3 style={{ fontSize: 12, color: "var(--color-text)", fontWeight: 400, lineHeight: 1.5, marginBottom: 3 }}>{award.title}</h3>
                <div style={{ fontSize: 11, color: "var(--color-muted)", lineHeight: 1.55 }}>{award.desc}</div>
              </div>
              {award.year ? (
                <div style={{ fontSize: 10, color: "var(--color-soft)", whiteSpace: "nowrap", paddingTop: 2 }}>
                  {award.year}
                </div>
              ) : null}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
