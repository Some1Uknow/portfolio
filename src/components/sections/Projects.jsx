import { useRef, useState } from "react"

import siteContent from "../../content/siteContent.json"
import useInView from "../../hooks/useInView.js"
import { PAD } from "../../styles/globalStyles.js"
import Pill from "../ui/Pill.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

const { projects } = siteContent
const PROJECT_SECTIONS = [
  {
    key: "protocols",
    title: "Protocols",
    blurb: "On-chain systems, market primitives, and Solana program work.",
  },
  {
    key: "rust",
    title: "Rust",
    blurb: "Systems work, tooling, indexers, and operator-grade backends.",
  },
  {
    key: "dapps",
    title: "Dapps / Others",
    blurb: "User-facing products, explorers, and full-stack application work.",
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const visible = useInView(ref)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      className="hoverable"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "var(--color-surface-hover)" : "var(--color-surface)",
        padding: "36px clamp(20px, 3vw, 40px)",
        position: "relative",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms, background 0.2s ease`,
        cursor: "default",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--color-text)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.4s ease",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 10, color: "var(--color-faint)", letterSpacing: "0.08em" }}>{project.num}</span>
        <div style={{ display: "flex", gap: 12 }}>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="muted-link"
              style={{
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                gap: 3,
                minHeight: 40,
              }}
            >
              {project.liveLabel || "demo"}{" "}
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.2s",
                  transform: hovered ? "translate(2px,-2px)" : "none",
                }}
              >
                ↗
              </span>
            </a>
          ) : null}

          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="muted-link"
            style={{
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              gap: 3,
              minHeight: 40,
            }}
          >
            github{" "}
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.2s",
                transform: hovered ? "translate(2px,-2px)" : "none",
              }}
            >
              ↗
            </span>
          </a>
        </div>
      </div>

      <div
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 22,
          letterSpacing: "-0.02em",
          color: "var(--color-text)",
          marginBottom: 10,
          lineHeight: 1.2,
        }}
      >
        {project.name}
      </div>

      <div style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 16 }}>
        {project.desc}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
        {project.stack.map((item) => (
          <Pill key={item}>{item}</Pill>
        ))}
      </div>

      <div style={{ fontSize: 11, color: "var(--color-soft)" }}>{project.meta}</div>
    </div>
  )
}

export default function Projects() {
  const groupedProjects = PROJECT_SECTIONS.map((section) => ({
    ...section,
    items: projects.filter((project) => project.category === section.key),
  }))

  return (
    <section id="projects" style={{ padding: `0 ${PAD}` }}>
      <SectionLabel>Proof of Work</SectionLabel>

      <div style={{ display: "grid", gap: 40, marginBottom: 96 }}>
        {groupedProjects.map((section) => (
          <div
            key={section.key}
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                alignItems: "flex-end",
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: "var(--color-text)",
                    marginBottom: 8,
                  }}
                >
                  {section.title}
                </h3>
                <p style={{ color: "var(--color-muted)", maxWidth: 520 }}>{section.blurb}</p>
              </div>

              <div style={{ fontSize: 11, color: "var(--color-soft)", letterSpacing: "0.08em" }}>
                {String(section.items.length).padStart(2, "0")} projects
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 1,
                background: "var(--color-border)",
              }}
              className="projects-grid"
            >
              {section.items.map((project, index) => (
                <ProjectCard key={project.num} project={project} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
