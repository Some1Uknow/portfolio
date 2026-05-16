import { useEffect, useMemo, useState } from "react"

import { githubOssConfig } from "../content/githubOssConfig.js"

const SEARCH_ENDPOINT = "https://api.github.com/search/issues"

function buildSearchQuery(config) {
  const qualifiers = [`is:pr`, `author:${config.username}`, `archived:false`]

  if (!config.includeDrafts) {
    qualifiers.push("draft:false")
  }

  if (!config.includeOwnRepos) {
    for (const owner of config.excludedOwners) {
      qualifiers.push(`-user:${owner}`)
    }
  }

  return qualifiers.join(" ")
}

function parseRepository(repositoryUrl) {
  const parts = repositoryUrl.split("/")
  const owner = parts.at(-2) || ""
  const name = parts.at(-1) || ""
  return {
    owner,
    name,
    fullName: owner && name ? `${owner}/${name}` : "unknown/unknown",
  }
}

function inferContributionType(item, detail) {
  const labels = item.labels.map((label) => String(label.name).toLowerCase())
  const title = `${item.title} ${detail?.title || ""}`.toLowerCase()

  if (labels.some((label) => label.includes("docs")) || title.includes("docs") || title.includes("readme")) {
    return "Docs"
  }

  if (labels.some((label) => label.includes("fix")) || title.includes("fix") || title.includes("bug")) {
    return "Bug Fix"
  }

  if (labels.some((label) => label.includes("feat")) || title.includes("feat") || title.includes("add ")) {
    return "Feature"
  }

  if (labels.some((label) => label.includes("refactor")) || title.includes("refactor")) {
    return "Refactor"
  }

  if (labels.some((label) => label.includes("test")) || title.includes("test")) {
    return "Tests"
  }

  return "Contribution"
}

function stripMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`#>*_~-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function buildSummary(item, detail, repo) {
  const candidates = [detail?.body, item.body]

  for (const candidate of candidates) {
    if (!candidate) {
      continue
    }

    const cleaned = stripMarkdown(candidate)
    if (cleaned.length > 0) {
      return cleaned.slice(0, 180)
    }
  }

  return `Pull request opened in ${repo.fullName}.`
}

function normalizePullRequest(item, detail) {
  const repo = parseRepository(item.repository_url)
  const mergedAt = detail?.merged_at || null
  const isMerged = Boolean(mergedAt)
  const status = isMerged ? "merged" : item.state === "open" ? "open" : "closed"

  return {
    id: item.id,
    title: item.title,
    url: item.html_url,
    repo,
    status,
    isDraft: Boolean(detail?.draft),
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    mergedAt,
    commentCount: item.comments,
    contributionType: inferContributionType(item, detail),
    summary: buildSummary(item, detail, repo),
  }
}

function isInConfiguredYear(item, year) {
  if (!year) {
    return true
  }

  const createdYear = new Date(item.createdAt).getFullYear()
  const mergedYear = item.mergedAt ? new Date(item.mergedAt).getFullYear() : null
  const updatedYear = new Date(item.updatedAt).getFullYear()

  return createdYear === year || mergedYear === year || updatedYear === year
}

async function fetchPullRequestDetail(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  })

  if (!response.ok) {
    throw new Error(`GitHub PR detail request failed with ${response.status}`)
  }

  return response.json()
}

export default function useGithubPullRequests() {
  const config = useMemo(() => githubOssConfig, [])
  const [state, setState] = useState({
    pullRequests: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function loadPullRequests() {
      try {
        setState((current) => ({ ...current, loading: true, error: null }))

        const query = buildSearchQuery(config)
        const url = new URL(SEARCH_ENDPOINT)
        url.searchParams.set("q", query)
        url.searchParams.set("sort", "updated")
        url.searchParams.set("order", "desc")
        url.searchParams.set("per_page", String(config.maxPullRequests))

        const response = await fetch(url, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        })

        if (!response.ok) {
          throw new Error(`GitHub search request failed with ${response.status}`)
        }

        const payload = await response.json()
        const items = Array.isArray(payload.items) ? payload.items : []
        const detailedItems = await Promise.all(
          items.map(async (item) => {
            try {
              const detail = await fetchPullRequestDetail(item.pull_request.url)
              return normalizePullRequest(item, detail)
            } catch {
              return normalizePullRequest(item, null)
            }
          }),
        )

        const filteredItems = detailedItems.filter((item) => {
          if (config.mergedOnly && item.status !== "merged") {
            return false
          }

          if (!config.includeDrafts && item.isDraft) {
            return false
          }

          if (!isInConfiguredYear(item, config.year)) {
            return false
          }

          return true
        })

        if (!cancelled) {
          setState({
            pullRequests: filteredItems,
            loading: false,
            error: null,
          })
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            pullRequests: [],
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "GitHub data could not be loaded.",
          })
        }
      }
    }

    loadPullRequests()

    return () => {
      cancelled = true
    }
  }, [config])

  return state
}
