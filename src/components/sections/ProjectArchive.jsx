"use client"

import { useId, useState } from "react"

export default function ProjectArchive({ blurb, children, count, title }) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()

  return (
    <article className={`project-archive${isOpen ? " is-open" : ""}`}>
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="project-archive__trigger"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="project-archive__heading">
          <span className="project-archive__title">{title}</span>
          <span className="project-archive__blurb">{blurb}</span>
        </span>

        <span className="project-archive__meta">
          <span className="project-archive__count">{String(count).padStart(2, "0")} projects</span>
          <svg aria-hidden="true" className="project-archive__chevron" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      <div className="project-archive__body" id={panelId}>
        <div className="project-archive__panel" aria-hidden={!isOpen} {...(!isOpen ? { inert: "" } : {})}>
          <div className="project-archive__body-content">{children}</div>
        </div>
      </div>
    </article>
  )
}
