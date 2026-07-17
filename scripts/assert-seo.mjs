import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"

import sitemap from "../app/sitemap.js"
import { getAllPosts, getPublishedPosts } from "../src/lib/blog.js"
import { projects } from "../src/content/siteContent.js"
import { PERSON_ID, SITE_LAST_MODIFIED, SITE_URL, blogPath, projectPath } from "../src/lib/site.js"
import { blogStructuredData, homeStructuredData, postStructuredData, projectStructuredData } from "../src/lib/structured-data.js"

function isCanonicalApexUrl(url) {
  return url.startsWith(SITE_URL) && !url.includes("www.raghav.codes")
}

function getPersonEntity(schema) {
  return schema["@graph"].find((entry) => entry["@id"] === PERSON_ID)
}

async function main() {
  const [allPosts, publishedPosts, projectPageSource, projectsSectionSource, blogIndexSource, homePageSource, fadeInSource, projectArchiveSource, sitemapEntries] = await Promise.all([
    getAllPosts(),
    getPublishedPosts(),
    readFile(new URL("../src/components/pages/ProjectPage.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/sections/Projects.jsx", import.meta.url), "utf8"),
    readFile(new URL("../app/blog/page.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/pages/HomePage.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/ui/FadeIn.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/sections/ProjectArchive.jsx", import.meta.url), "utf8"),
    sitemap(),
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
  assert.ok(homePageSource.includes("<main>"), "Homepage must expose a main landmark.")
  assert.equal(fadeInSource.includes('"use client"'), false, "Visible content animation must not require a client component.")
  assert.equal(fadeInSource.includes("IntersectionObserver"), false, "Visible content animation must not wait for client observation.")
  assert.equal(projectArchiveSource.includes("<details"), true, "Project archives must work without client JavaScript.")
  assert.equal(sitemapEntries.find((entry) => entry.url === SITE_URL)?.lastModified, SITE_LAST_MODIFIED, "Homepage sitemap entry must expose lastModified.")
  assert.ok(sitemapEntries.filter((entry) => entry.url.includes("/projects/")).every((entry) => entry.lastModified), "Project sitemap entries must expose lastModified.")

  const homeSchema = homeStructuredData()
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(homeSchema)), "Homepage JSON-LD must serialize.")
  assert.equal(getPersonEntity(homeSchema)["@id"], PERSON_ID, "Homepage must define the stable Person entity.")

  for (const project of projects) {
    const schema = projectStructuredData(project)
    assert.doesNotThrow(() => JSON.parse(JSON.stringify(schema)), `${project.slug} JSON-LD must serialize.`)
    assert.equal(schema["@graph"][0].author["@id"], PERSON_ID, `${project.slug} must reference the shared Person entity.`)
    assert.equal(schema["@graph"][0].url, `${SITE_URL}${projectPath(project.slug)}`, `${project.slug} canonical URL must be self-referencing.`)
    assert.equal(getPersonEntity(schema)?.name, "Raghav Sharma", `${project.slug} must define the linked Person entity.`)
  }

  const blogSchema = blogStructuredData(publishedPosts)
  assert.doesNotThrow(() => JSON.parse(JSON.stringify(blogSchema)), "Blog JSON-LD must serialize.")
  assert.equal(blogSchema["@graph"][0].author["@id"], PERSON_ID, "Blog must reference the shared Person entity.")
  assert.equal(getPersonEntity(blogSchema)?.name, "Raghav Sharma", "Blog must define the linked Person entity.")
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
    assert.equal(schema["@graph"][0].image, `${SITE_URL}${blogPath(post.slug)}/opengraph-image`, `${post.slug} must expose a default article image.`)
    assert.equal(getPersonEntity(schema)?.name, "Raghav Sharma", `${post.slug} must define the linked Person entity.`)
  }

  const samplePostSchema = postStructuredData({
    slug: "sample-post",
    title: "Sample post",
    description: "A sample article used to test default structured-data fields.",
    publishedAt: "2026-07-17",
    tags: ["Testing"],
  })
  assert.equal(samplePostSchema["@graph"][0].image, `${SITE_URL}/blog/sample-post/opengraph-image`, "Posts without a custom image must use the generated OG image in JSON-LD.")

  console.log(`SEO assertions passed for ${projects.length} projects and ${publishedPosts.length} published posts.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
