import Link from "next/link"
import { FiArrowUpRight, FiBookOpen, FiGithub } from "react-icons/fi"
import { SiSolana } from "react-icons/si"

import { getProjectIconUrl, projects } from "../../content/siteContent.js"
import { PAD } from "../../styles/globalStyles.js"
import SectionLabel from "../ui/SectionLabel.jsx"

function ProjectActions({ project, external }) {
  const demoUrl = project.live || (external ? project.href : null)

  return (
    <div className="project-tile__actions">
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer noopener"
          className="project-tile__action"
          aria-label={`View ${project.name} source on GitHub`}
        >
          <FiGithub aria-hidden="true" size={14} />
        </a>
      ) : null}
      {demoUrl ? (
        <a
          href={demoUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="project-tile__action"
          aria-label={`Open ${project.name} ${project.liveLabel || "live demo"}`}
        >
          <FiArrowUpRight aria-hidden="true" size={14} />
        </a>
      ) : null}
      {!external ? (
        <Link href={`/projects/${project.slug}`} className="project-tile__action" aria-label={`Read ${project.name} case study`}>
          <FiBookOpen aria-hidden="true" size={14} />
        </Link>
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
      <div className="project-tile__top">
        <div className="project-tile__identity">
          <ProjectIcon project={project} size={compact ? 26 : 28} />
          <Heading
            className="project-tile__title"
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontSize: compact ? "clamp(14px, 1.4vw, 16px)" : "clamp(15px, 1.5vw, 18px)",
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
        </div>
        <ProjectActions project={project} external={external} />
      </div>

      <p className={compact ? "project-tile__description project-tile__description--compact" : "project-tile__description"}>
        {project.shortDescription || project.desc}
      </p>
    </article>
  )
}

export default function Projects() {
  const productProjects = projects.filter((project) => project.featured)
  const othersProjects = projects.filter((project) => !project.featured && project.category === "rust-infra")

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
      </div>
    </section>
  )
}
