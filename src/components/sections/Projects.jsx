import Link from "next/link"

import { getProjectIconUrl, projects } from "../../content/siteContent.js"
import { PAD } from "../../styles/globalStyles.js"
import ChainBadge from "../ui/ChainBadge.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"
import ProjectArchive from "./ProjectArchive.jsx"

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
  {
    key: "products",
    title: "Products",
    blurb: "Product experiments and developer-facing tools.",
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
        style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}
      >
        github ↗
      </a>
    </div>
  )
}

function ProjectTile({ project, featured = false }) {
  const projectIcon = getProjectIconUrl(project)

  return (
    <article
      className={featured ? "project-tile project-tile--featured" : "project-tile"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 18, alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: 14, minWidth: 0 }}>
          {projectIcon ? (
            <img
              src={projectIcon}
              alt={`${project.name} icon`}
              width="42"
              height="42"
              loading="lazy"
              decoding="async"
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
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontSize: "clamp(25px, 3vw, 34px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                marginBottom: 10,
                paddingTop: 2,
              }}
            >
              <Link href={`/projects/${project.slug}`} className="project-title-link">
                {project.name}
              </Link>
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
        <Link href={`/projects/${project.slug}`} className="project-case-study-link">
          Read case study <span aria-hidden="true">→</span>
        </Link>
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
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
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
              Software projects across backend systems, developer tools, AI, and blockchain.
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
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
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
                Selected products with live links, source code, and implementation detail.
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
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
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
              Protocol experiments, Rust systems work, developer tooling, and product prototypes.
            </p>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {archiveSections.map((section) => (
              <ProjectArchive
                key={section.key}
                blurb={section.blurb}
                count={section.items.length}
                title={section.title}
              >
                <div className="projects-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
                  {section.items.map((project) => (
                    <ProjectTile key={project.slug} project={project} />
                  ))}
                </div>
              </ProjectArchive>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
