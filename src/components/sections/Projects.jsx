import { useNavigate } from "react-router-dom"

import { getProjectIconUrl, projects } from "../../content/siteContent.js"
import { PAD } from "../../styles/globalStyles.js"
import ChainBadge from "../ui/ChainBadge.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

const ARCHIVE_SECTIONS = [
  {
    key: "protocols",
    title: "Protocols",
    blurb: "On-chain primitives.",
  },
  {
    key: "rust-infra",
    title: "Rust + Infra",
    blurb: "Rust systems and infra.",
  },
]

function TileExternalLinks({ project }) {
  return (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          className="muted-link"
          onClick={(event) => event.stopPropagation()}
          style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          {project.liveLabel || "live"} ↗
        </a>
      ) : null}
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer noopener"
        className="muted-link"
        onClick={(event) => event.stopPropagation()}
        style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}
      >
        github ↗
      </a>
    </div>
  )
}

function ProjectTile({ project, featured = false }) {
  const navigate = useNavigate()
  const projectIcon = getProjectIconUrl(project)

  return (
    <article
      className={featured ? "project-tile project-tile--featured" : "project-tile"}
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/projects/${project.slug}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          navigate(`/projects/${project.slug}`)
        }
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 14, minWidth: 0 }}>
          {projectIcon ? (
            <img
              src={projectIcon}
              alt={`${project.name} icon`}
              loading="lazy"
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                objectFit: "cover",
                flexShrink: 0,
                border: "1px solid var(--color-border-soft)",
              }}
            />
          ) : null}

          <div style={{ minWidth: 0 }}>
            <h3
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(25px, 3vw, 34px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                marginBottom: 10,
                paddingTop: 2,
              }}
            >
              {project.name}
            </h3>
            <p style={{ color: "var(--color-muted)", lineHeight: 1.75, maxWidth: 540 }}>{project.shortDescription || project.desc}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
          {project.chains.map((chain) => (
            <ChainBadge key={chain} chain={chain} compact />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
        <div style={{ color: "var(--color-soft)", fontSize: 11, lineHeight: 1.7 }}>{project.meta}</div>
        <TileExternalLinks project={project} />
      </div>
    </article>
  )
}

export default function Projects() {
  const featuredProjects = projects.filter((project) => project.featured)
  const archiveSections = ARCHIVE_SECTIONS.map((section) => ({
    ...section,
    items: projects.filter((project) => !project.featured && project.category === section.key),
  })).filter((section) => section.items.length > 0)

  return (
    <section id="projects" style={{ padding: `0 ${PAD}` }}>
      <SectionLabel>Projects</SectionLabel>

      <div style={{ display: "grid", gap: 26, marginBottom: 96 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ maxWidth: 760 }}>
            <h2
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(34px, 5vw, 52px)",
                lineHeight: 0.98,
                fontWeight: 400,
                letterSpacing: "-0.04em",
                color: "var(--color-text)",
                marginBottom: 12,
              }}
            >
              Proof of Work
            </h2>
            <p style={{ color: "var(--color-muted)", lineHeight: 1.8 }}>
              Multichain Products
            </p>
          </div>

          <div style={{ fontSize: 11, color: "var(--color-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {String(projects.length).padStart(2, "0")} projects
          </div>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <h3
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(28px, 3vw, 38px)",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "var(--color-text)",
                  marginBottom: 8,
                }}
              >
                Featured
              </h3>
              <p style={{ color: "var(--color-muted)", lineHeight: 1.75, maxWidth: 620 }}>
                Main products.
              </p>
            </div>

            <div style={{ fontSize: 11, color: "var(--color-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {String(featuredProjects.length).padStart(2, "0")} featured
            </div>
          </div>

          <div className="projects-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
            {featuredProjects.map((project) => (
              <ProjectTile key={project.slug} project={project} featured />
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <h3
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "clamp(28px, 3vw, 38px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                marginBottom: 8,
              }}
            >
              Archive
            </h3>
            <p style={{ color: "var(--color-muted)", lineHeight: 1.75, maxWidth: 620 }}>
              Everything else.
            </p>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {archiveSections.map((section) => (
              <details key={section.key} className="project-archive">
                <summary className="project-archive__summary">
                  <div>
                    <div
                      style={{
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontSize: "clamp(24px, 2.6vw, 32px)",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        color: "var(--color-text)",
                        marginBottom: 6,
                      }}
                    >
                      {section.title}
                    </div>
                    <p style={{ color: "var(--color-muted)", lineHeight: 1.7, maxWidth: 620 }}>{section.blurb}</p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: 11,
                        color: "var(--color-soft)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {String(section.items.length).padStart(2, "0")} projects
                    </span>
                    <span className="project-archive__chevron" aria-hidden="true">
                      +
                    </span>
                  </div>
                </summary>

                <div className="project-archive__body">
                  <div className="projects-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
                    {section.items.map((project) => (
                      <ProjectTile key={project.slug} project={project} />
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
