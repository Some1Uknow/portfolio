import Link from "next/link"
import { SiSolana } from "react-icons/si"

import siteContent, { getProjectIconUrl, projects } from "../../content/siteContent.js"
import { blogPath } from "../../lib/site.js"
import { PAD } from "../../styles/globalStyles.js"
import Pill from "../ui/Pill.jsx"

function ProjectLinks({ project }) {
  if (!project.live && !project.github) {
    return null
  }

  return (
    <div className="project-case__links">
      {project.live ? (
        <a href={project.live} target="_blank" rel="noreferrer noopener" className="project-page-link">
          {project.liveLabel || "live demo"} ↗
        </a>
      ) : null}
      {project.github ? (
        <a href={project.github} target="_blank" rel="noreferrer noopener" className="project-page-link">
          github ↗
        </a>
      ) : null}
    </div>
  )
}

function ProjectIcon({ project }) {
  if (project.iconKind === "solana") {
    return (
      <span className="project-case__icon project-case__icon--solana" aria-hidden="true">
        <SiSolana size={20} color="#14f195" />
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
      width="40"
      height="40"
      decoding="async"
      className="project-case__icon"
    />
  )
}

function SectionBlock({ title, children }) {
  if (!children) {
    return null
  }

  return (
    <section className="project-case__section">
      <h2 className="project-case__section-label">{title}</h2>
      <div className="project-case__section-body">{children}</div>
    </section>
  )
}

function BulletList({ items }) {
  if (!items?.length) {
    return null
  }

  return (
    <ul className="project-case__list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function ProtocolList({ protocols }) {
  if (!protocols.length) {
    return null
  }

  return (
    <section className="project-case__section" aria-labelledby="protocol-list-title">
      <h2 id="protocol-list-title" className="project-case__section-label">
        Protocols
      </h2>
      <div className="project-case__protocol-list">
        {protocols.map((protocol) => (
          <Link key={protocol.slug} href={`/projects/${protocol.slug}`} className="project-case__protocol-row">
            <span className="project-case__protocol-copy">
              <span className="project-case__protocol-name">{protocol.name}</span>
              <span className="project-case__protocol-desc">{protocol.shortDescription || protocol.desc}</span>
            </span>
            <span aria-hidden="true" className="project-case__protocol-arrow">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function ProjectPageBody({ project, relatedPosts }) {
  const outcomes = project.outcomes ?? []
  const features = project.features ?? []
  const architecture = project.architecture ?? []
  const protocolChildren = project.isProtocolHub ? projects.filter((item) => item.category === "protocols") : []

  return (
    <main className="project-case" style={{ padding: `0 ${PAD} 64px` }}>
      <nav className="breadcrumb-nav project-case__nav" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/#projects">Work</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{project.name}</span>
      </nav>

      <header className="project-case__header">
        <div className="project-case__title-row">
          <ProjectIcon project={project} />
          <h1 className="project-case__title">{project.name}</h1>
        </div>

        <p className="project-case__summary">{project.summary || project.desc}</p>

        {project.meta ? (
          <div className="project-case__meta-row">
            <p className="project-case__meta">{project.meta}</p>
          </div>
        ) : null}

        <ProjectLinks project={project} />

        {project.stack?.length ? (
          <div className="project-case__pills project-case__stack">
            {project.stack.map((item) => (
              <Pill key={item}>{item}</Pill>
            ))}
          </div>
        ) : null}
      </header>

      {project.isProtocolHub ? (
        <ProtocolList protocols={protocolChildren} />
      ) : (
        <div className="project-case__body">
          <SectionBlock title="Overview">
            <p>{project.overview}</p>
          </SectionBlock>

          {project.role ? (
            <SectionBlock title="Role">
              <p>{project.role}</p>
            </SectionBlock>
          ) : null}

          {outcomes.length > 0 ? (
            <SectionBlock title="Outcomes">
              <BulletList items={outcomes} />
            </SectionBlock>
          ) : null}

          {project.problem || project.solution ? (
            <div className="project-case__pair">
              {project.problem ? (
                <SectionBlock title="Problem">
                  <p>{project.problem}</p>
                </SectionBlock>
              ) : null}
              {project.solution ? (
                <SectionBlock title="Solution">
                  <p>{project.solution}</p>
                </SectionBlock>
              ) : null}
            </div>
          ) : null}

          {features.length > 0 ? (
            <SectionBlock title="What I built">
              <BulletList items={features} />
            </SectionBlock>
          ) : null}

          {architecture.length > 0 ? (
            <SectionBlock title="Architecture">
              <BulletList items={architecture} />
            </SectionBlock>
          ) : null}
        </div>
      )}

      {relatedPosts.length > 0 ? (
        <section className="project-case__related" aria-labelledby="related-writing-title">
          <h2 id="related-writing-title" className="project-case__section-label">
            Related writing
          </h2>
          <div className="project-case__related-list">
            {relatedPosts.map((post) => (
              <Link key={post.slug} href={blogPath(post.slug)} className="project-case__related-link">
                <span>{post.title}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

export default function ProjectPage({ project, relatedPosts = [] }) {
  return (
    <>
      <ProjectPageBody project={project} relatedPosts={relatedPosts} />
      <footer className="project-case__footer">
        <div className="project-case__footer-inner" style={{ padding: `24px ${PAD}` }}>
          <span>{siteContent.hero.name}</span>
          <span>{siteContent.hero.location}</span>
        </div>
      </footer>
    </>
  )
}
