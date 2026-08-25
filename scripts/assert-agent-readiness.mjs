import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

import { GET as agentMarkdown } from "../app/agent-markdown/route.js"
import { GET as llmsText } from "../app/llms.txt/route.js"
import siteContent, { projects } from "../src/content/siteContent.js"
import { getPublishedPosts } from "../src/lib/blog.js"
import { acceptsMarkdown, preferredRepresentation } from "../src/lib/accept.js"
import { homeMarkdown, notFoundMarkdown } from "../src/lib/agent-content.js"

function assertNegotiationHeaders(response, label) {
  assert.equal(response.status, 200, `${label} should return 200.`)
  assert.match(response.headers.get("content-type") || "", /^text\/markdown; charset=utf-8$/, `${label} should be Markdown.`)
  assert.match(response.headers.get("vary") || "", /(?:^|,\s*)Accept(?:,|$)/i, `${label} should vary on Accept.`)
  assert.match(response.headers.get("vary") || "", /(?:^|,\s*)Accept-Encoding(?:,|$)/i, `${label} should vary on Accept-Encoding.`)
}

function markdownRequest(pathname, marked = true) {
  return new Request(`https://raghav.codes/agent-markdown?path=${encodeURIComponent(pathname)}`, {
    headers: marked ? { "x-agent-markdown": "1" } : {},
  })
}

async function main() {
  assert.equal(preferredRepresentation("text/markdown"), "markdown")
  assert.equal(preferredRepresentation("text/markdown, text/html;q=0.8"), "markdown")
  assert.equal(preferredRepresentation("text/html, text/markdown;q=0.8"), "html")
  assert.equal(preferredRepresentation("*/*"), "html")
  assert.equal(preferredRepresentation("text/markdown;q=0.5, text/html;q=0.9"), "html")
  assert.equal(preferredRepresentation("text/markdown;q=0, */*;q=1"), "html")
  assert.equal(preferredRepresentation("application/pdf"), null)
  assert.equal(acceptsMarkdown("text/markdown, text/html;q=0.8"), true)
  assert.equal(acceptsMarkdown("text/html, */*;q=0.1"), false)

  const posts = await getPublishedPosts()
  const homeResponse = await agentMarkdown(markdownRequest("/"))
  const homeBody = await homeResponse.text()
  assertNegotiationHeaders(homeResponse, "Homepage Markdown")
  assert.match(homeBody, /^# Raghav Sharma — Software Engineer/m)
  assert.ok(homeBody.length > 500, "Homepage Markdown should contain meaningful content.")
  assert.match(homeBody, /When to use this portfolio/)

  const blogResponse = await agentMarkdown(markdownRequest("/blog"))
  assertNegotiationHeaders(blogResponse, "Blog Markdown")
  assert.match(await blogResponse.text(), /^# Marginalia/m)

  for (const pathname of [
    `/blog/${posts[0].slug}`,
    `/projects/${projects[0].slug}`,
  ]) {
    const response = await agentMarkdown(markdownRequest(pathname))
    assertNegotiationHeaders(response, `${pathname} Markdown`)
    assert.match(await response.text(), /^# /m)
  }

  const missingResponse = await agentMarkdown(markdownRequest("/some-path-that-does-not-exist"))
  assert.equal(missingResponse.status, 404, "Unknown Markdown paths should return 404.")
  assert.match(await missingResponse.text(), /Agent guide/)
  assert.match(missingResponse.headers.get("content-type") || "", /^text\/markdown; charset=utf-8$/)

  const unmarkedInternalResponse = await agentMarkdown(markdownRequest("/", false))
  assert.equal(unmarkedInternalResponse.status, 404, "The internal Markdown route must not be directly public.")

  const llmsResponse = await llmsText()
  const llmsBody = await llmsResponse.text()
  assertNegotiationHeaders(llmsResponse, "llms.txt")
  assert.match(llmsBody, /^# Raghav Sharma/m)
  assert.match(llmsBody, /^> /m)
  assert.match(llmsBody, /^## When to use this portfolio/m)
  assert.match(llmsBody, /Accept: text\/markdown/)
  assert.match(llmsBody, /\[Rust backend and systems work\]\(/)
  assert.match(llmsBody, /\[Portfolio\]\(/)
  for (const section of llmsBody.split(/^## /m).slice(1)) {
    assert.match(section, /^- \[[^\]]+\]\([^\)]+\)/m, "Every llms.txt H2 section should contain a Markdown file list.")
  }

  const [heroSource, homePageSource, notFoundSource, proxySource, vercelSource] = await Promise.all([
    readFile(new URL("../src/components/sections/Hero.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/pages/HomePage.jsx", import.meta.url), "utf8"),
    readFile(new URL("../app/not-found.jsx", import.meta.url), "utf8"),
    readFile(new URL("../proxy.js", import.meta.url), "utf8"),
    readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  ])
  assert.match(heroSource, /<h1/)
  assert.doesNotMatch(heroSource, /Raghav Codes is the portfolio/)
  assert.doesNotMatch(heroSource, /hero\.eyebrow|SITE_BRAND/)
  assert.match(heroSource, /aboutParagraphs\.map/)
  assert.equal(homePageSource.includes("<About />"), false, "The original About section should be removed from the homepage.")
  assert.equal(siteContent.aboutParagraphs[0], "tldr; learnt by building things on the internet.")
  assert.match(notFoundSource, /Agent guide/)
  assert.match(notFoundSource, /Sitemap/)
  assert.match(proxySource, /Accept-Encoding/)
  assert.match(proxySource, /api\/\|_next\/\|_vercel/)
  const vercelConfig = JSON.parse(vercelSource)
  assert.equal(vercelConfig.headers[0].headers[0].key, "Vary")
  assert.equal(vercelConfig.headers[0].headers[0].value, "Accept, Accept-Encoding")

  assert.match(homeMarkdown(posts), /^# /m)
  assert.match(notFoundMarkdown("/missing"), /\[Sitemap\]/)

  console.log(`Agent-readiness assertions passed for ${projects.length} projects and ${posts.length} published posts.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
