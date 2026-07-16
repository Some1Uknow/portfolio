import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

import { getAllPosts, getPublishedPosts } from "../src/lib/blog.js"
import { projects } from "../src/content/siteContent.js"
import { PERSON_ID, SITE_URL, blogPath, projectPath } from "../src/lib/site.js"
import { blogStructuredData, homeStructuredData, postStructuredData, projectStructuredData } from "../src/lib/structured-data.js"

function isCanonicalApexUrl(url) {
  return url.startsWith(SITE_URL) && !url.includes("www.raghav.codes")
}

function getPersonEntity(schema) {
  return schema["@graph"].find((entry) => entry["@id"] === PERSON_ID)
}

async function main() {
  const [allPosts, publishedPosts, projectPageSource, projectsSectionSource, blogIndexSource] = await Promise.all([
    getAllPosts(),
    getPublishedPosts(),
    readFile(new URL("../src/components/pages/ProjectPage.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/sections/Projects.jsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blog/page.jsx", import.meta.url), "utf8"),
  ])

  const projectTitles = projects.map((project) => `${project.name} case study | Raghav Sharma`)
  const projectDescriptions = projects.map((project) => project.shortDescription || project.summary || project.desc)
  const sitemapUrls = [
    SITE_URL,
    ...projects.map((project) => `${SITE_URL}${projectPath(project.slug)}`),
    ...(publishedPosts.length > 0 ? [`${SITE_URL}/blog`] : []),
    ...publishedPosts.map((post) => `${SITE_URL}${blogPath(post.slug)}`),
  ]

  assert.equal(new Set(projectTitles).size, projects.length, "Project titles must be unique.")
  assert.equal(new Set(projectDescriptions).size, projects.length, "Project descriptions must be unique.")
  assert.ok(sitemapUrls.every(isCanonicalApexUrl), "Sitemap entries must use only the canonical apex host.")
  assert.ok(projectsSectionSource.includes("href={`/projects/${project.slug}`}"), "Project cards must render real internal href values.")
  assert.ok(projectPageSource.includes("aria-label=\"Breadcrumb\""), "Project pages must expose breadcrumb navigation.")

  const homeSchema = homeStructuredData()
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(homeSchema)), "Homepage JSON-LD must serialize.")
  assert.equal(getPersonEntity(homeSchema)["@id"], PERSON_ID, "Homepage must define the stable Person entity.")

  for (const project of projects) {
    const schema = projectStructuredData(project)
    assert.doesNotThrow(() => JSON.parse(JSON.stringify(schema)), `${project.slug} JSON-LD must serialize.`)
    assert.equal(schema["@graph"][0].author["@id"], PERSON_ID, `${project.slug} must reference the shared Person entity.`)
    assert.equal(schema["@graph"][0].url, `${SITE_URL}${projectPath(project.slug)}`, `${project.slug} canonical URL must be self-referencing.`)
  }

  const blogSchema = blogStructuredData(publishedPosts)
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(blogSchema)), "Blog JSON-LD must serialize.")
  assert.equal(blogSchema["@graph"][0].author["@id"], PERSON_ID, "Blog must reference the shared Person entity.")
  assert.equal(sitemapUrls.includes(`${SITE_URL}/blog`), publishedPosts.length > 0, "The blog index must enter the sitemap only after publishing.")
  assert.equal(blogIndexSource.includes("robots: isEmpty ? { index: false, follow: true }"), true, "Empty blog index must be noindex,follow.")

  const drafts = allPosts.filter((post) => post.draft)
  for (const draft of drafts) {
    assert.equal(publishedPosts.some((post) => post.slug === draft.slug), false, `Draft ${draft.slug} must be excluded from published posts.`)
    assert.equal(sitemapUrls.includes(`${SITE_URL}${blogPath(draft.slug)}`), false, `Draft ${draft.slug} must be absent from the sitemap.`)
  }

  for (const post of publishedPosts) {
    const schema = postStructuredData(post)
    assert.doesNotThrow(() => JSON.parse(JSON.stringify(schema)), `${post.slug} JSON-LD must serialize.`)
    assert.equal(schema["@graph"][0].author["@id"], PERSON_ID, `${post.slug} must reference the shared Person entity.`)
  }

  console.log(`SEO assertions passed for ${projects.length} projects and ${publishedPosts.length} published posts.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
