import { Link, useParams } from "react-router-dom"

import siteContent, { getProjectBySlug, getProjectIconUrl } from "../../content/siteContent.js"
import { PAD } from "../../styles/globalStyles.js"
import ChainBadge from "../ui/ChainBadge.jsx"
import Pill from "../ui/Pill.jsx"

function ProjectLinks({ project }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          className="project-page-link"
        >
          {project.liveLabel || "live demo"} ↗
        </a>
      ) : null}
      <a href={project.github} target="_blank" rel="noreferrer noopener" className="project-page-link">
        github ↗
      </a>
    </div>
  )
}

function CompactCard({ title, children }) {
  if (!children) {
    return null
  }

  return (
    <section
      style={{
        display: "grid",
        gap: 10,
        padding: "18px 18px 20px",
        border: "1px solid var(--color-border-soft)",
        background: "var(--color-surface)",
      }}
    >
      <div
        style={{
          fontSize: 10,
          color: "var(--color-soft)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      {children}
    </section>
  )
}

function ProjectPageBody({ project }) {
  const projectIcon = getProjectIconUrl(project)
  const highlights = [...(project.features ?? []), ...(project.outcomes ?? [])].slice(0, 5)

  return (
    <main style={{ padding: `0 ${PAD} 72px`, minHeight: "100vh" }}>
      <div style={{ paddingTop: "max(32px, env(safe-area-inset-top))", paddingBottom: 48 }}>
        <Link to="/" className="muted-link" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ← back to portfolio
        </Link>
      </div>

      <section
        style={{
          display: "grid",
          gap: 24,
          paddingBottom: 36,
          borderBottom: "1px solid var(--color-border)",
          marginBottom: 28,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ display: "grid", gap: 16, maxWidth: 760 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              {projectIcon ? (
                <img
                  src={projectIcon}
                  alt={`${project.name} icon`}
                  style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover", border: "1px solid var(--color-border-soft)" }}
                />
              ) : null}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.chains.map((chain) => (
                  <ChainBadge key={chain} chain={chain} />
                ))}
              </div>
            </div>

            <div>
              <h1
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(38px, 7vw, 72px)",
                  lineHeight: 0.96,
                  fontWeight: 400,
                  letterSpacing: "-0.04em",
                  color: "var(--color-text)",
                  marginBottom: 12,
                  paddingTop: 2,
                }}
              >
                {project.name}
              </h1>
              <p style={{ maxWidth: 760, fontSize: 15, lineHeight: 1.72, color: "var(--color-muted)" }}>{project.summary || project.desc}</p>
            </div>
          </div>

          <div style={{ display: "grid", gap: 14, minWidth: "min(100%, 240px)" }}>
            <ProjectLinks project={project} />
            <div style={{ fontSize: 12, color: "var(--color-soft)", lineHeight: 1.7 }}>{project.meta}</div>
            {project.tags?.length ? (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {project.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {project.stack.map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </section>

      <div className="project-page-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 0.9fr)", gap: 18 }}>
        <div style={{ display: "grid", gap: 18 }}>
          <CompactCard title="Overview">
            <p style={{ color: "var(--color-muted)", lineHeight: 1.8 }}>{project.overview}</p>
          </CompactCard>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }} className="project-compact-grid">
            <CompactCard title="Problem">
              <p style={{ color: "var(--color-muted)", lineHeight: 1.75 }}>{project.problem}</p>
            </CompactCard>

            <CompactCard title="Solution">
              <p style={{ color: "var(--color-muted)", lineHeight: 1.75 }}>{project.solution}</p>
            </CompactCard>
          </div>
        </div>

        <aside style={{ display: "grid", gap: 18, alignContent: "start" }}>
          <CompactCard title="Role">
            <p style={{ color: "var(--color-muted)", lineHeight: 1.75 }}>{project.role}</p>
          </CompactCard>

          <CompactCard title="Highlights">
            <div style={{ display: "grid", gap: 10 }}>
              {highlights.map((item) => (
                <div key={item} style={{ color: "var(--color-muted)", lineHeight: 1.7 }}>
                  {item}
                </div>
              ))}
            </div>
          </CompactCard>
        </aside>
      </div>
    </main>
  )
}

function ProjectNotFound() {
  return (
    <main style={{ padding: `72px ${PAD}`, minHeight: "100vh", display: "grid", alignContent: "start", gap: 18 }}>
      <Link to="/" className="muted-link" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        ← back to portfolio
      </Link>
      <h1
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: "clamp(40px, 8vw, 72px)",
          lineHeight: 0.95,
          fontWeight: 400,
          letterSpacing: "-0.04em",
          color: "var(--color-text)",
        }}
      >
        Project not found
      </h1>
      <p style={{ maxWidth: 560, color: "var(--color-muted)", lineHeight: 1.8 }}>
        The requested project page does not exist yet. Return to the main portfolio to browse the available case studies.
      </p>
    </main>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  return (
    <>
      {project ? <ProjectPageBody project={project} /> : <ProjectNotFound />}
      <footer style={{ borderTop: "1px solid var(--color-border)" }}>
        <div style={{ padding: `28px ${PAD}`, display: "flex", justifyContent: "space-between", gap: 18, flexWrap: "wrap", color: "var(--color-soft)", fontSize: 11, letterSpacing: "0.06em" }}>
          <span>{siteContent.hero.name}</span>
          <span>{siteContent.hero.availability}</span>
        </div>
      </footer>
    </>
  )
}
