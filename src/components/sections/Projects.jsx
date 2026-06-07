import { useRef, useState } from "react"

import siteContent from "../../content/siteContent.json"
import useInView from "../../hooks/useInView.js"
import { PAD } from "../../styles/globalStyles.js"
import Pill from "../ui/Pill.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

const { projects } = siteContent

const PROJECT_SECTIONS = [
  {
    key: "products",
    title: "Products",
    blurb: "On-chain products built end to end by me",
    categories: ["products"],
  },
  {
    key: "protocols",
    title: "Protocols",
    blurb: "On-chain Defi Protocols and Solana programs.",
    categories: ["protocols"],
  },
  {
    key: "rustOthers",
    title: "Rust / Others",
    blurb: "Rust projects and other technical proof of work.",
    categories: ["rust", "dapps"],
  },
]

function getYouTubeEmbedUrl(videoUrl) {
  if (!videoUrl) {
    return null
  }

  try {
    const url = new URL(videoUrl)
    let videoId = null

    if (url.hostname.includes("youtu.be")) {
      videoId = url.pathname.split("/").filter(Boolean)[0] || null
    } else if (url.hostname.includes("youtube.com")) {
      videoId = url.searchParams.get("v")
    }

    if (!videoId) {
      return null
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`
  } catch {
    return null
  }
}

function CardLinks({ project, hovered }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      {project.live ? (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
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
        rel="noreferrer noopener"
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
  )
}

function ProjectHeader({ project, number, hovered }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
      <span style={{ fontSize: 10, color: "var(--color-faint)", letterSpacing: "0.08em" }}>{number}</span>
      <CardLinks project={project} hovered={hovered} />
    </div>
  )
}

function ProjectTags({ tags = [], align = "flex-start" }) {
  if (!tags.length) {
    return null
  }

  return (
    <div style={{ display: "flex", justifyContent: align, flexWrap: "wrap", gap: 6 }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            display: "inline-flex",
            alignItems: "center",
            minHeight: 20,
            padding: "2px 7px",
            border: "1px solid var(--color-border-soft)",
            borderRadius: 2,
            color: "var(--color-soft)",
            background: "var(--color-surface-elevated)",
            fontSize: 10,
            lineHeight: 1,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function ProjectTitle({ project, tags }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          fontFamily: "'Instrument Serif', Georgia, serif",
          fontSize: 22,
          letterSpacing: "-0.02em",
          color: "var(--color-text)",
          lineHeight: 1.2,
        }}
      >
        {project.name}
      </div>
      <ProjectTags tags={tags} align="flex-end" />
    </div>
  )
}

function ProjectBody({ project, tags }) {
  return (
    <>
      <ProjectTitle project={project} tags={tags} />
      <div style={{ fontSize: 12, color: "var(--color-muted)", lineHeight: 1.7, marginBottom: 16 }}>
        {project.desc}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
        {project.stack.map((item) => (
          <Pill key={item}>{item}</Pill>
        ))}
      </div>

      <div style={{ fontSize: 11, color: "var(--color-soft)" }}>{project.meta}</div>
    </>
  )
}

function ProductMedia({ project }) {
  const embedUrl = getYouTubeEmbedUrl(project.videoUrl)

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        border: "1px solid var(--color-border-soft)",
        borderRadius: 2,
        background: "var(--color-surface-elevated)",
      }}
    >
      {embedUrl ? (
        <iframe
          title={`${project.name} YouTube demo`}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
            background: "transparent",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            padding: 16,
            color: "var(--color-soft)",
            fontSize: 11,
            letterSpacing: "0.08em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          video coming soon
        </div>
      )}
    </div>
  )
}

function ProjectCardShell({ children, index }) {
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
        display: "grid",
        alignContent: "start",
        gap: 16,
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

      {children(hovered)}
    </div>
  )
}

function ProjectCard({ project, number, index }) {
  return (
    <ProjectCardShell index={index}>
      {(hovered) => (
        <>
          <ProjectHeader project={project} number={number} hovered={hovered} />
          <ProjectBody project={project} />
        </>
      )}
    </ProjectCardShell>
  )
}

function ProductCard({ project, number, index }) {
  return (
    <ProjectCardShell index={index}>
      {(hovered) => (
        <>
          <ProjectHeader project={project} number={number} hovered={hovered} />
          <ProductMedia project={project} />
          <ProjectBody project={project} tags={project.tags} />
        </>
      )}
    </ProjectCardShell>
  )
}

function ProjectGrid({ isProducts, children }) {
  return (
    <div
      className={isProducts ? "projects-grid projects-grid--products" : "projects-grid"}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 1,
        background: "var(--color-border)",
      }}
    >
      {children}
    </div>
  )
}

export default function Projects() {
  const groupedProjects = PROJECT_SECTIONS.map((section) => ({
    ...section,
    items: projects.filter((project) => section.categories.includes(project.category)),
  }))

  let displayIndex = 1

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

            <ProjectGrid isProducts={section.key === "products"}>
              {section.items.map((project, index) => {
                const number = String(displayIndex++).padStart(2, "0")

                return section.key === "products" ? (
                  <ProductCard key={project.github} project={project} number={number} index={index} />
                ) : (
                  <ProjectCard key={project.github} project={project} number={number} index={index} />
                )
              })}
            </ProjectGrid>
          </div>
        ))}
      </div>
    </section>
  )
}
