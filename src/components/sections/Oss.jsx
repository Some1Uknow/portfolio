import ossContributions from "../../content/ossContributions.json"
import { PAD } from "../../styles/globalStyles.js"
import SectionLabel from "../ui/SectionLabel.jsx"

function formatDate(value) {
  if (!value) {
    return null
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value))
}

function statusLabel(status) {
  if (status === "merged") {
    return "Merged"
  }

  if (status === "open") {
    return "Open"
  }

  return "Closed"
}

export default function Oss() {
  const pullRequests = ossContributions.pullRequests || []

  return (
    <section id="oss" style={{ padding: `0 ${PAD}` }}>
      <SectionLabel as="h2">Open source</SectionLabel>

      <div style={{ marginBottom: 96 }}>
        <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: 18, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-instrument-serif), Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "var(--color-text)",
                  marginBottom: 8,
                }}
              >
                Contribution record
              </h3>
              <p style={{ color: "var(--color-muted)", maxWidth: 600 }}>
                A committed snapshot of public pull requests. Each item links to its original GitHub evidence.
              </p>
            </div>
            {ossContributions.syncedAt ? (
              <time dateTime={ossContributions.syncedAt} style={{ fontSize: 11, color: "var(--color-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Synced {formatDate(ossContributions.syncedAt)}
              </time>
            ) : null}
          </div>
        </div>

        {pullRequests.length === 0 ? (
          <div className="oss-empty-state">
            <p>No contribution snapshot is published yet.</p>
            <p>
              Source code and project history remain available on <a href="https://github.com/some1uknow" target="_blank" rel="noreferrer">GitHub</a>.
            </p>
          </div>
        ) : (
          <div className="oss-static-list">
            {pullRequests.map((pullRequest) => (
              <article key={pullRequest.id}>
                <div>
                  <p>
                    {pullRequest.repo.fullName} · {statusLabel(pullRequest.status)} · {formatDate(pullRequest.mergedAt || pullRequest.updatedAt)}
                  </p>
                  <h3>
                    <a href={pullRequest.url} target="_blank" rel="noreferrer">
                      {pullRequest.title}
                    </a>
                  </h3>
                  <p>{pullRequest.summary}</p>
                </div>
                <a href={pullRequest.url} target="_blank" rel="noreferrer" className="project-case-study-link">
                  View PR <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
