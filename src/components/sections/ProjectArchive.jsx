export default function ProjectArchive({ blurb, children, count, title }) {
  return (
    <details className="project-archive">
      <summary className="project-archive__trigger">
        <span className="project-archive__heading">
          <h3 className="project-archive__title">{title}</h3>
          <span className="project-archive__blurb">{blurb}</span>
        </span>

        <span className="project-archive__meta">
          <span className="project-archive__count">{String(count).padStart(2, "0")} projects</span>
          <svg aria-hidden="true" className="project-archive__chevron" viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </summary>

      <div className="project-archive__body">
        <div className="project-archive__panel">
          <div className="project-archive__body-content">{children}</div>
        </div>
      </div>
    </details>
  )
}
