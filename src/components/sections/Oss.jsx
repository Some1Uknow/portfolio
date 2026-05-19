import { useEffect, useMemo, useState } from "react"
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiClock,
  FiFolder,
  FiGitMerge,
  FiGitPullRequest,
  FiGithub,
  FiX,
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
    <div
      className="oss-org-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: 16,
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          style={{
            minHeight: 164,
            border: "1px solid var(--color-border-soft)",
            background: "var(--color-surface)",
            padding: 20,
            display: "grid",
            alignContent: "space-between",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                background: "var(--color-border-soft)",
              }}
            />
            <div style={{ display: "grid", gap: 8, minWidth: 0, flex: 1 }}>
              <div style={{ width: "55%", height: 12, background: "var(--color-border-soft)" }} />
              <div style={{ width: "34%", height: 10, background: "var(--color-border-soft)" }} />
            </div>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ width: "80%", height: 10, background: "var(--color-border-soft)" }} />
            <div style={{ width: "100%", height: 10, background: "var(--color-border-soft)" }} />
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

function OrganizationCard({ organization, index, onOpen }) {
  const mergedCount = organization.pullRequests.filter((item) => item.status === "merged").length
  const repoCount = new Set(organization.pullRequests.map((item) => item.repo.fullName)).size

  return (
    <FadeIn delay={index * 45}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${organization.login} contributions`}
        style={{
          width: "100%",
          minHeight: 164,
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          padding: 20,
          display: "grid",
          alignContent: "space-between",
          gap: 18,
          textAlign: "left",
          cursor: "pointer",
          transition: "transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease",
          boxShadow: "var(--shadow-soft)",
        }}
        className="oss-org-card"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <img
            src={organization.avatarUrl}
            alt={`${organization.login} icon`}
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              border: "1px solid var(--color-border-soft)",
              objectFit: "cover",
              flexShrink: 0,
              background: "var(--color-surface-elevated)",
            }}
          />

          <div style={{ minWidth: 0 }}>
            <div
              style={{
                color: "var(--color-text)",
                fontSize: 16,
                lineHeight: 1.2,
                marginBottom: 6,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {organization.login}
            </div>
            <div style={{ color: "var(--color-soft)", fontSize: 11, letterSpacing: "0.08em" }}>ORGANIZATION</div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap", color: "var(--color-muted)", fontSize: 12 }}>
            <span>{String(organization.pullRequests.length).padStart(2, "0")} PRs</span>
            <span>{String(repoCount).padStart(2, "0")} repos</span>
            <span>{String(mergedCount).padStart(2, "0")} merged</span>
          </div>
          <div style={{ color: "var(--color-soft)", fontSize: 12, lineHeight: 1.6 }}>
            {organization.pullRequests
              .slice(0, 2)
              .map((item) => item.repo.fullName)
              .filter((value, currentIndex, values) => values.indexOf(value) === currentIndex)
              .join(" + ")}
          </div>
        </div>
      </button>
    </FadeIn>
  )
}

function OssModal({ organization, onClose }) {
  useEffect(() => {
    if (!organization) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [organization, onClose])

  if (!organization) {
    return null
  }

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 80,
        background: "rgba(10, 10, 10, 0.56)",
        backdropFilter: "blur(10px)",
        padding: "min(5vw, 32px)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="oss-modal-title"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "min(1080px, 100%)",
          maxHeight: "min(88vh, 960px)",
          overflow: "auto",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            alignItems: "flex-start",
            padding: 24,
            borderBottom: "1px solid var(--color-border-soft)",
            background: "var(--color-surface-elevated)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
            <img
              src={organization.avatarUrl}
              alt={`${organization.login} icon`}
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                border: "1px solid var(--color-border-soft)",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <h3
                id="oss-modal-title"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 34px)",
                  lineHeight: 1,
                  marginBottom: 8,
                  color: "var(--color-text)",
                }}
              >
                {organization.login}
              </h3>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", color: "var(--color-soft)", fontSize: 12 }}>
                <a
                  href={organization.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="muted-link"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 40 }}
                >
                  View organization
                  <FiArrowUpRight aria-hidden="true" size={14} />
                </a>
                <span>{String(organization.pullRequests.length).padStart(2, "0")} pull requests</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close contributions modal"
            style={{
              width: 42,
              height: 42,
              display: "grid",
              placeItems: "center",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <FiX aria-hidden="true" size={18} />
          </button>
        </div>

        <div style={{ padding: "0 24px 8px" }}>
          <div style={{ borderTop: "1px solid var(--color-border-soft)" }}>
            {organization.pullRequests.map((pullRequest, index) => (
              <OssRow key={pullRequest.id} pullRequest={pullRequest} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Oss() {
  const { pullRequests, loading, error } = useGithubPullRequests()
  const organizations = useMemo(() => {
    const grouped = new Map()

    for (const pullRequest of pullRequests) {
      const key = pullRequest.organization.login

      if (!grouped.has(key)) {
        grouped.set(key, {
          ...pullRequest.organization,
          pullRequests: [],
        })
      }

      grouped.get(key).pullRequests.push(pullRequest)
    }

    return Array.from(grouped.values()).sort((left, right) => right.pullRequests.length - left.pullRequests.length)
  }, [pullRequests])
  const [selectedOrganizationLogin, setSelectedOrganizationLogin] = useState(null)

  const selectedOrganization = useMemo(
    () => organizations.find((organization) => organization.login === selectedOrganizationLogin) || null,
    [organizations, selectedOrganizationLogin],
  )

  useEffect(() => {
    if (!selectedOrganizationLogin) {
      return
    }

    if (!organizations.some((organization) => organization.login === selectedOrganizationLogin)) {
      setSelectedOrganizationLogin(null)
    }
  }, [organizations, selectedOrganizationLogin])

  return (
    <>
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
                  Ecosystem contribution
                </h2>
                <p style={{ color: "var(--color-muted)", maxWidth: 560 }}>
                  External organizations first. Open any card to inspect the pull requests behind the work.
                </p>
              </div>

              <div style={{ fontSize: 11, color: "var(--color-soft)", letterSpacing: "0.08em" }}>
                {loading ? "SYNCING" : `${String(organizations.length).padStart(2, "0")} ORGANIZATIONS`}
              </div>
            </div>
          </div>

          {loading ? <OssSkeleton /> : null}
          {!loading && error ? <OssErrorState error={error} /> : null}
          {!loading && !error && pullRequests.length === 0 ? <OssEmptyState /> : null}
          {!loading && !error && organizations.length > 0 ? (
            <div
              className="oss-org-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 16,
              }}
            >
              {organizations.map((organization, index) => (
                <OrganizationCard
                  key={organization.login}
                  organization={organization}
                  index={index}
                  onOpen={() => setSelectedOrganizationLogin(organization.login)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <OssModal organization={selectedOrganization} onClose={() => setSelectedOrganizationLogin(null)} />
    </>
  )
}
