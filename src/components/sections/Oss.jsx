import {
  FiAlertCircle,
  FiArrowUpRight,
  FiClock,
  FiFolder,
  FiGitMerge,
  FiGitPullRequest,
  FiGithub,
} from "react-icons/fi"

import { githubOssConfig } from "../../content/githubOssConfig.js"
import useGithubPullRequests from "../../hooks/useGithubPullRequests.js"
import { PAD } from "../../styles/globalStyles.js"
import FadeIn from "../ui/FadeIn.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

function formatDate(dateString) {
  if (!dateString) {
    return null
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString))
}

function formatRelativeStatus(pr) {
  if (pr.status === "merged" && pr.mergedAt) {
    return `Merged ${formatDate(pr.mergedAt)}`
  }

  if (pr.status === "open") {
    return `Opened ${formatDate(pr.createdAt)}`
  }

  return `Updated ${formatDate(pr.updatedAt)}`
}

function StatusPill({ status }) {
  const icon =
    status === "merged" ? (
      <FiGitMerge aria-hidden="true" size={12} />
    ) : (
      <FiGitPullRequest aria-hidden="true" size={12} />
    )

  const label = status === "merged" ? "Merged" : status === "open" ? "Open" : "Closed"
  const color =
    status === "merged"
      ? "var(--color-accent)"
      : status === "open"
        ? "var(--color-text)"
        : "var(--color-soft)"

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 10,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        border: "1px solid var(--color-border)",
        padding: "4px 8px",
        borderRadius: 2,
        color,
        lineHeight: 1,
      }}
    >
      {icon}
      {label}
    </span>
  )
}

function OssSkeleton() {
  return (
    <div style={{ borderTop: "1px solid var(--color-border-soft)" }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          style={{
            padding: "20px 0",
            borderBottom: "1px solid var(--color-border-soft)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 16, alignItems: "start" }} className="oss-row">
            <div>
              <div style={{ width: 110, height: 10, background: "var(--color-border-soft)", marginBottom: 12 }} />
              <div style={{ width: "72%", height: 20, background: "var(--color-border-soft)", marginBottom: 10 }} />
              <div style={{ width: "88%", height: 10, background: "var(--color-border-soft)" }} />
            </div>
            <div style={{ width: 110, height: 22, background: "var(--color-border-soft)" }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function OssEmptyState() {
  const showingExternalOnly = !githubOssConfig.includeOwnRepos

  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border-soft)",
        borderBottom: "1px solid var(--color-border-soft)",
        padding: "28px 0 36px",
      }}
    >
      <div style={{ fontSize: 13, color: "var(--color-text)", marginBottom: 6 }}>No pull requests to show yet.</div>
      <div style={{ color: "var(--color-muted)", maxWidth: 580 }}>
        {showingExternalOnly
          ? "GitHub tracking is currently limited to external repositories. If you want internal repo PR history too, set `includeOwnRepos` to true in `src/content/githubOssConfig.js`."
          : "GitHub tracking is active, but no matching pull requests were returned for the current filters."}
      </div>
    </div>
  )
}

function OssErrorState({ error }) {
  return (
    <div
      style={{
        borderTop: "1px solid var(--color-border-soft)",
        borderBottom: "1px solid var(--color-border-soft)",
        padding: "28px 0 36px",
        display: "grid",
        gap: 8,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--color-text)", fontSize: 13 }}>
        <FiAlertCircle aria-hidden="true" size={15} />
        GitHub pull requests could not be loaded.
      </div>
      <div style={{ color: "var(--color-muted)", maxWidth: 580 }}>
        {error}. This section depends on the public GitHub API and can fail on rate limits or network restrictions.
      </div>
    </div>
  )
}

function OssRow({ pullRequest, index }) {
  return (
    <FadeIn delay={index * 40}>
      <article
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: 20,
          alignItems: "start",
          padding: "22px 0",
          borderBottom: "1px solid var(--color-border-soft)",
        }}
        className="oss-row"
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-soft)", fontSize: 11, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FiFolder aria-hidden="true" size={13} />
              {pullRequest.repo.fullName}
            </span>
            <span style={{ color: "var(--color-faint)" }}>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FiClock aria-hidden="true" size={12} />
              {formatRelativeStatus(pullRequest)}
            </span>
          </div>

          <h3
            style={{
              fontSize: 14,
              fontWeight: 500,
              lineHeight: 1.5,
              color: "var(--color-text)",
              marginBottom: 6,
            }}
          >
            {pullRequest.title}
          </h3>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.7, maxWidth: 760 }}>{pullRequest.summary}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, color: "var(--color-soft)", fontSize: 11, marginTop: 8 }}>
            <span>{pullRequest.contributionType}</span>
            <span style={{ color: "var(--color-faint)" }}>·</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FiGithub aria-hidden="true" size={12} />
              {pullRequest.commentCount} comments
            </span>
          </div>
        </div>

        <div style={{ display: "grid", justifyItems: "end", gap: 12 }}>
          <StatusPill status={pullRequest.status} />
          <a
            href={pullRequest.url}
            target="_blank"
            rel="noreferrer"
            className="muted-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              minHeight: 40,
              fontSize: 12,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            View PR
            <FiArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
      </article>
    </FadeIn>
  )
}

export default function Oss() {
  const { pullRequests, loading, error } = useGithubPullRequests()

  return (
    <section id="oss" style={{ padding: `0 ${PAD}` }}>
      <SectionLabel>OSS</SectionLabel>

      <div style={{ marginBottom: 96 }}>
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: 18,
            marginBottom: 18,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap" }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 32px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "var(--color-text)",
                  marginBottom: 8,
                }}
              >
                Open Source Pull Requests
              </h2>
              <p style={{ color: "var(--color-muted)", maxWidth: 560 }}>
                2026 authored pull requests only. Filtered to external repositories and linked straight to the review thread.
              </p>
            </div>

            <div style={{ fontSize: 11, color: "var(--color-soft)", letterSpacing: "0.08em" }}>
              {loading ? "SYNCING" : `${String(pullRequests.length).padStart(2, "0")} PULL REQUESTS`}
            </div>
          </div>
        </div>

        {loading ? <OssSkeleton /> : null}
        {!loading && error ? <OssErrorState error={error} /> : null}
        {!loading && !error && pullRequests.length === 0 ? <OssEmptyState /> : null}
        {!loading && !error && pullRequests.length > 0 ? (
          <div style={{ borderTop: "1px solid var(--color-border-soft)" }}>
            {pullRequests.map((pullRequest, index) => (
              <OssRow key={pullRequest.id} pullRequest={pullRequest} index={index} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
