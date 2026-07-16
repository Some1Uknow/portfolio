import { readFile, rename, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { githubOssConfig } from "../src/content/githubOssConfig.js"

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputPath = path.join(rootDirectory, "src", "content", "ossContributions.json")
const temporaryOutputPath = `${outputPath}.next`
const githubHeaders = {
  Accept: "application/vnd.github+json",
  "User-Agent": "raghav-codes-oss-sync",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
}

function buildSearchQuery(config) {
  const qualifiers = ["is:pr", `author:${config.username}`, "archived:false"]

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
  return { owner, name, fullName: owner && name ? `${owner}/${name}` : "unknown/unknown" }
}

function stripMarkdown(value) {
  return String(value || "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`#>*_~-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function inferContributionType(item, detail) {
  const labels = item.labels.map((label) => String(label.name).toLowerCase())
  const title = `${item.title} ${detail?.title || ""}`.toLowerCase()

  if (labels.some((label) => label.includes("docs")) || title.includes("docs") || title.includes("readme")) return "Docs"
  if (labels.some((label) => label.includes("fix")) || title.includes("fix") || title.includes("bug")) return "Bug Fix"
  if (labels.some((label) => label.includes("feat")) || title.includes("feat") || title.includes("add ")) return "Feature"
  if (labels.some((label) => label.includes("refactor")) || title.includes("refactor")) return "Refactor"
  if (labels.some((label) => label.includes("test")) || title.includes("test")) return "Tests"
  return "Contribution"
}

function normalizePullRequest(item, detail) {
  const repo = parseRepository(item.repository_url)
  const mergedAt = detail?.merged_at || null
  const summary = stripMarkdown(detail?.body || item.body)

  return {
    id: item.id,
    title: item.title,
    url: item.html_url,
    repo,
    status: mergedAt ? "merged" : item.state === "open" ? "open" : "closed",
    isDraft: Boolean(detail?.draft),
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    mergedAt,
    commentCount: item.comments,
    contributionType: inferContributionType(item, detail),
    summary: summary ? summary.slice(0, 220) : `Pull request opened in ${repo.fullName}.`,
  }
}

function isInConfiguredYear(item, year) {
  if (!year) {
    return true
  }

  return [item.createdAt, item.updatedAt, item.mergedAt].filter(Boolean).some((date) => new Date(date).getUTCFullYear() === year)
}

async function fetchJson(url) {
  const response = await fetch(url, { headers: githubHeaders })
  if (!response.ok) {
    throw new Error(`GitHub request failed with ${response.status} for ${url}`)
  }
  return response.json()
}

async function getPullRequests() {
  const query = buildSearchQuery(githubOssConfig)
  const searchUrl = new URL("https://api.github.com/search/issues")
  searchUrl.searchParams.set("q", query)
  searchUrl.searchParams.set("sort", "updated")
  searchUrl.searchParams.set("order", "desc")
  searchUrl.searchParams.set("per_page", String(githubOssConfig.maxPullRequests))

  const payload = await fetchJson(searchUrl)
  const items = Array.isArray(payload.items) ? payload.items : []
  const pullRequests = await Promise.all(
    items.map(async (item) => {
      try {
        const detail = await fetchJson(item.pull_request.url)
        return normalizePullRequest(item, detail)
      } catch {
        return normalizePullRequest(item, null)
      }
    }),
  )

  return pullRequests.filter((pullRequest) => {
    if (githubOssConfig.mergedOnly && pullRequest.status !== "merged") return false
    if (!githubOssConfig.includeDrafts && pullRequest.isDraft) return false
    return isInConfiguredYear(pullRequest, githubOssConfig.year)
  })
}

async function assertExistingSnapshotIsReadable() {
  try {
    JSON.parse(await readFile(outputPath, "utf8"))
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return
    }
    throw new Error(`Existing OSS snapshot is not valid JSON and was not replaced: ${error.message}`)
  }
}

async function main() {
  await assertExistingSnapshotIsReadable()
  const pullRequests = await getPullRequests()
  const snapshot = {
    syncedAt: new Date().toISOString(),
    pullRequests,
  }

  await writeFile(temporaryOutputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8")
  await rename(temporaryOutputPath, outputPath)
  console.log(`Saved ${pullRequests.length} pull requests to ${path.relative(rootDirectory, outputPath)}.`)
}

main().catch((error) => {
  console.error(`OSS sync failed. The previous snapshot was preserved.\n${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = 1
})
