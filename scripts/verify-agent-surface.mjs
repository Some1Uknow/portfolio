import assert from "node:assert/strict"

import siteContent, { projects } from "../src/content/siteContent.js"
import { getPublishedPosts } from "../src/lib/blog.js"

const baseUrl = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "")

function url(pathname) {
  return `${baseUrl}${pathname}`
}

function hasVary(response, value) {
  return (response.headers.get("vary") || "")
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .includes(value.toLowerCase())
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function headingLevels(html) {
  return [...html.matchAll(/<h([1-6])\b/gi)].map((match) => Number(match[1]))
}

async function get(pathname, headers) {
  const response = await fetch(url(pathname), { headers })
  const body = await response.text()
  return { response, body }
}

function assertHtmlPage(result, pathname) {
  assert.equal(result.response.status, 200, `${pathname} should return 200 HTML.`)
  assert.match(result.response.headers.get("content-type") || "", /^text\/html/i, `${pathname} should be HTML.`)
  assert.equal(hasVary(result.response, "Accept-Encoding"), true, `${pathname} HTML should vary on Accept-Encoding.`)
  assert.match(result.response.headers.get("link") || "", /llms\.txt.*describedby/i, `${pathname} should point agents at llms.txt.`)
}

function assertMarkdownPage(result, pathname) {
  assert.equal(result.response.status, 200, `${pathname} should return 200 Markdown.`)
  assert.match(result.response.headers.get("content-type") || "", /^text\/markdown; charset=utf-8$/i, `${pathname} should be Markdown.`)
  assert.equal(hasVary(result.response, "Accept"), true, `${pathname} Markdown should vary on Accept.`)
  assert.equal(hasVary(result.response, "Accept-Encoding"), true, `${pathname} Markdown should vary on Accept-Encoding.`)
  assert.match(result.body, /^# /m, `${pathname} Markdown should expose an H1.`)
}

async function main() {
  const posts = await getPublishedPosts()
  const htmlPaths = [
    "/",
    "/blog",
    ...posts.map((post) => `/blog/${post.slug}`),
    ...projects.map((project) => `/projects/${project.slug}`),
  ]

  for (const pathname of htmlPaths) {
    const html = await get(pathname, { Accept: "text/html" })
    assertHtmlPage(html, pathname)
    assert.ok((html.body.match(/<h1\b/gi) || []).length >= 1, `${pathname} should have an H1 in raw HTML.`)
  }

  const homeHtml = await get("/", { Accept: "text/html" })
  assert.ok(visibleText(homeHtml.body).length >= 500, "Homepage raw HTML should contain at least 500 meaningful characters without JavaScript.")
  assert.match(homeHtml.body, new RegExp(siteContent.aboutParagraphs[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), "Original About copy should render below the hero name.")
  assert.doesNotMatch(homeHtml.body, /Raghav Codes is the portfolio of Raghav Sharma/, "The generic agent intro should not be visible on the homepage.")
  assert.doesNotMatch(homeHtml.body, />About<\/h2>/, "The original About section should be removed from the homepage.")
  const homepageHeadings = headingLevels(homeHtml.body)
  assert.equal(homepageHeadings[0], 1, "Homepage heading structure should start at H1.")
  assert.equal(homepageHeadings.includes(2), true, "Homepage should expose H2 section headings.")
  assert.equal(homepageHeadings.every((level, index) => index === 0 || level - homepageHeadings[index - 1] <= 1), true, "Homepage headings should not skip levels.")

  for (const pathname of htmlPaths) {
    const markdown = await get(pathname, { Accept: "text/markdown" })
    assertMarkdownPage(markdown, pathname)
  }

  const missingHtml = await get("/some-path-that-does-not-exist", { Accept: "text/html" })
  assert.equal(missingHtml.response.status, 404, "Unknown HTML paths should return a real 404.")
  assert.match(missingHtml.body, /Agent guide/)
  assert.match(missingHtml.body, /Sitemap/)

  const missingMarkdown = await get("/some-path-that-does-not-exist", { Accept: "text/markdown" })
  assert.equal(missingMarkdown.response.status, 404, "Unknown Markdown paths should return a real 404.")
  assert.match(missingMarkdown.response.headers.get("content-type") || "", /^text\/markdown; charset=utf-8$/i)
  assert.match(missingMarkdown.body, /\[Agent guide\]/)

  const missingAssetLikePath = await get("/missing.json", { Accept: "text/markdown" })
  assert.equal(missingAssetLikePath.response.status, 404, "Unknown asset-like paths should return a real 404.")
  assert.match(missingAssetLikePath.response.headers.get("content-type") || "", /^text\/markdown; charset=utf-8$/i)

  const notAcceptable = await get("/", { Accept: "application/pdf" })
  assert.equal(notAcceptable.response.status, 406, "Unsupported explicit representations should return 406.")
  assert.match(notAcceptable.response.headers.get("content-type") || "", /^text\/plain; charset=utf-8$/i)
  assert.equal(hasVary(notAcceptable.response, "Accept"), true, "406 responses should vary on Accept.")

  const llms = await get("/llms.txt", { Accept: "text/markdown" })
  assert.equal(llms.response.status, 200, "/llms.txt should return 200.")
  assert.match(llms.response.headers.get("content-type") || "", /^text\/markdown; charset=utf-8$/i)
  assert.equal(hasVary(llms.response, "Accept"), true, "/llms.txt should vary on Accept.")
  assert.match(llms.body, /^# /m)
  assert.match(llms.body, /^## When to use this portfolio/m)

  const robots = await get("/robots.txt")
  assert.equal(robots.response.status, 200, "/robots.txt should return 200.")
  assert.match(robots.body, /sitemap\.xml/)

  const sitemap = await get("/sitemap.xml")
  assert.equal(sitemap.response.status, 200, "/sitemap.xml should return 200.")
  assert.match(sitemap.response.headers.get("content-type") || "", /xml/i)
  assert.match(sitemap.body, /<urlset[\s>]/)

  const feed = await get("/feed.xml")
  assert.equal(feed.response.status, 200, "/feed.xml should return 200.")
  assert.match(feed.response.headers.get("content-type") || "", /rss\+xml/i)
  assert.match(feed.body, /<rss\b/)

  const imagePaths = [
    "/opengraph-image",
    ...posts.map((post) => `/blog/${post.slug}/opengraph-image`),
    ...projects.map((project) => `/projects/${project.slug}/opengraph-image`),
  ]
  for (const pathname of imagePaths) {
    const image = await get(pathname)
    assert.equal(image.response.status, 200, `${pathname} should return 200.`)
    assert.match(image.response.headers.get("content-type") || "", /^image\//i, `${pathname} should return an image.`)
  }

  console.log(`Verified ${htmlPaths.length} HTML pages, ${htmlPaths.length} Markdown pages, machine-readable files, 404 recovery, and ${imagePaths.length} image endpoints at ${baseUrl}.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
