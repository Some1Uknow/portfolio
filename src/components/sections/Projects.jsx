import Link from "next/link"
import { SiSolana } from "react-icons/si"

import { getProjectIconUrl, projects } from "../../content/siteContent.js"
import { PAD } from "../../styles/globalStyles.js"
import ProjectArchive from "./ProjectArchive.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

function TileExternalLinks({ project }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          className="muted-link"
          aria-label={`Open ${project.name} live site`}
          style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          {project.liveLabel || "live demo"} ↗
        </a>
      ) : null}
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer noopener"
          className="muted-link"
          aria-label={`View ${project.name} source on GitHub`}
          style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}
        >
          GitHub ↗
        </a>
      ) : null}
    </div>
  )
}

function ProjectIcon({ project, size = 28 }) {
  if (project.iconKind === "solana") {
    return (
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: 7,
          flexShrink: 0,
          border: "1px solid var(--color-border-soft)",
          background: "var(--color-surface-elevated)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <SiSolana size={Math.round(size * 0.55)} color="#14f195" />
      </span>
    )
  }

  const projectIcon = getProjectIconUrl(project)
  if (!projectIcon) {
    return null
  }

  return (
    <img
      src={projectIcon}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{
        width: size,
        height: size,
        borderRadius: 7,
        objectFit: "cover",
        flexShrink: 0,
        border: "1px solid var(--color-border-soft)",
      }}
    />
  )
}

function ProjectTile({ project, compact = false, headingLevel = 4 }) {
  const href = project.href || `/projects/${project.slug}`
  const external = Boolean(project.href)
  const Heading = headingLevel === 3 ? "h3" : "h4"

  return (
    <article className={compact ? "project-tile project-tile--compact" : "project-tile"}>
      <div style={{ display: "flex", gap: 10, minWidth: 0, alignItems: "flex-start" }}>
        <ProjectIcon project={project} size={compact ? 26 : 28} />

        <div style={{ minWidth: 0, flex: 1 }}>
          <Heading
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontSize: compact ? "clamp(15px, 1.6vw, 18px)" : "clamp(16px, 1.8vw, 20px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              marginBottom: 5,
            }}
          >
            {external ? (
              <a href={href} target="_blank" rel="noreferrer noopener" className="project-title-link">
                {project.name}
              </a>
            ) : (
              <Link href={href} className="project-title-link">
                {project.name}
              </Link>
            )}
          </Heading>
          <p
            style={{
              color: "var(--color-muted)",
              lineHeight: 1.5,
              fontSize: compact ? 11 : 12,
              maxWidth: 520,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.shortDescription || project.desc}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="project-case-study-link"
            aria-label={`Open ${project.name}`}
          >
            open {project.name} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <Link href={`/projects/${project.slug}`} className="project-case-study-link">
            {project.ctaLabel || "Read case study"} <span aria-hidden="true">→</span>
          </Link>
        )}
        <TileExternalLinks project={project} />
      </div>
    </article>
  )
}

export default function Projects() {
  const productProjects = projects.filter((project) => project.featured)
  const othersProjects = projects.filter((project) => !project.featured && project.category === "rust-infra")
  const moreProductProjects = projects.filter((project) => !project.featured && project.category === "products")
  const protocolProjects = projects.filter((project) => project.category === "protocols")

  return (
    <section id="projects" style={{ padding: `0 ${PAD}` }}>
      <SectionLabel as="h2">Projects</SectionLabel>

      <div style={{ display: "grid", gap: 28 }}>
        <div style={{ display: "grid", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ maxWidth: 760 }}>
              <h3
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                  fontSize: "clamp(26px, 3.6vw, 40px)",
                  lineHeight: 1,
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  color: "var(--color-text)",
                  marginBottom: 0,
                }}
              >
                Products
              </h3>
            </div>

            <div style={{ fontSize: 10, color: "var(--color-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {String(productProjects.length).padStart(2, "0")} products
            </div>
          </div>

          <div className="projects-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
            {productProjects.map((project) => (
              <ProjectTile key={project.slug} project={project} headingLevel={4} />
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
            <h3
              style={{
                fontFamily: "var(--font-instrument-serif), Georgia, serif",
                fontSize: "clamp(20px, 2.6vw, 28px)",
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "var(--color-text)",
                marginBottom: 0,
              }}
            >
              Rust & infrastructure
            </h3>
            <div style={{ fontSize: 10, color: "var(--color-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {String(othersProjects.length).padStart(2, "0")}
            </div>
          </div>

          <div className="projects-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
            {othersProjects.map((project) => (
              <ProjectTile key={project.slug} project={project} compact headingLevel={4} />
            ))}
          </div>
        </div>

        {moreProductProjects.length > 0 ? (
          <ProjectArchive
            title="More product work"
            blurb="Additional products and experiments with live surfaces, source code, or a focused case study."
            count={moreProductProjects.length}
          >
            <div className="projects-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
              {moreProductProjects.map((project) => (
                <ProjectTile key={project.slug} project={project} compact headingLevel={4} />
              ))}
            </div>
          </ProjectArchive>
        ) : null}

        {protocolProjects.length > 0 ? (
          <ProjectArchive
            title="Solana protocol work"
            blurb="Rust and Anchor primitives covering AMMs, escrow, flash loans, and tokenized vault custody."
            count={protocolProjects.length}
          >
            <div className="projects-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
              {protocolProjects.map((project) => (
                <ProjectTile key={project.slug} project={project} compact headingLevel={4} />
              ))}
            </div>
          </ProjectArchive>
        ) : null}
      </div>
    </section>
  )
}
