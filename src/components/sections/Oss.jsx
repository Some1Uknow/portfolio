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

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 14 }}>
          <h3
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontSize: "clamp(26px, 3.6vw, 40px)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              fontWeight: 400,
              color: "var(--color-text)",
              marginBottom: 0,
            }}
          >
            OSS
          </h3>
          {ossContributions.syncedAt ? (
            <time
              dateTime={ossContributions.syncedAt}
              style={{ fontSize: 10, color: "var(--color-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Synced {formatDate(ossContributions.syncedAt)}
            </time>
          ) : (
            <div style={{ fontSize: 10, color: "var(--color-soft)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {String(pullRequests.length).padStart(2, "0")}
            </div>
          )}
        </div>

        {pullRequests.length === 0 ? (
          <div className="oss-empty-state">
            <p>No contribution snapshot is published yet.</p>
            <p>
              Source code and project history remain available on{" "}
              <a href="https://github.com/some1uknow" target="_blank" rel="noreferrer">
                GitHub
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="projects-tile-grid oss-tile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
            {pullRequests.map((pullRequest) => (
              <article key={pullRequest.id} className="project-tile project-tile--compact oss-pr-tile">
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      color: "var(--color-soft)",
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                      lineHeight: 1.4,
                    }}
                  >
                    {pullRequest.repo.fullName} · {statusLabel(pullRequest.status)}
                    {pullRequest.mergedAt || pullRequest.updatedAt
                      ? ` · ${formatDate(pullRequest.mergedAt || pullRequest.updatedAt)}`
                      : ""}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-instrument-serif), Georgia, serif",
                      fontSize: "clamp(15px, 1.6vw, 18px)",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      letterSpacing: "-0.03em",
                      color: "var(--color-text)",
                      marginBottom: 5,
                    }}
                  >
                    <a href={pullRequest.url} target="_blank" rel="noreferrer" className="project-title-link">
                      {pullRequest.title}
                    </a>
                  </h3>
                  <p
                    style={{
                      color: "var(--color-muted)",
                      lineHeight: 1.5,
                      fontSize: 11,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {pullRequest.summary}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <a href={pullRequest.url} target="_blank" rel="noreferrer" className="project-case-study-link">
                    View PR <span aria-hidden="true">↗</span>
                  </a>
                  {pullRequest.contributionType ? (
                    <span style={{ fontSize: 10, color: "var(--color-soft)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {pullRequest.contributionType}
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
