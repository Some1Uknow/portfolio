import siteContent from "../../content/siteContent.json"
import FadeIn from "../ui/FadeIn.jsx"
import Pill from "../ui/Pill.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

const { experience } = siteContent

export default function Experience() {
  return (
    <section id="experience">
      <SectionLabel>Experience</SectionLabel>
      <div style={{ paddingBottom: 96 }}>
        {experience.map((item, index) => (
          <FadeIn key={item.company} delay={index * 60}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 160px",
                gap: 32,
                padding: "32px 0",
                borderTop: index === 0 ? "1px solid var(--color-border-soft)" : "none",
                borderBottom: "1px solid var(--color-border-soft)",
              }}
              className="exp-row"
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text)" }}>{item.company}</div>
                <div style={{ fontSize: 11, color: "var(--color-soft)", marginTop: 3 }}>{item.location}</div>
                {item.badge ? (
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 10,
                      color: "var(--color-muted)",
                      border: "1px solid var(--color-faint)",
                      padding: "2px 7px",
                      borderRadius: 2,
                      marginTop: 8,
                    }}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </div>

              <div>
                <div style={{ fontSize: 13, color: "var(--color-text)", marginBottom: 10 }}>{item.role}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      style={{
                        fontSize: 12,
                        color: "var(--color-muted)",
                        paddingLeft: 14,
                        position: "relative",
                        marginBottom: 4,
                        lineHeight: 1.6,
                      }}
                    >
                      <span style={{ position: "absolute", left: 0, color: "var(--color-faint)", fontSize: 10, top: 3 }}>—</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
                  {item.stack.map((stackItem) => (
                    <Pill key={stackItem}>{stackItem}</Pill>
                  ))}
                </div>
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-soft)",
                  textAlign: "right",
                  paddingTop: 2,
                  whiteSpace: "nowrap",
                }}
              >
                {item.date}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
