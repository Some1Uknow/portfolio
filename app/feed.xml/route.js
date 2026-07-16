import { getPublishedPosts } from "../../src/lib/blog.js"
import { SITE_NAME, SITE_URL, absoluteUrl, blogPath } from "../../src/lib/site.js"

export const dynamic = "force-static"

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const posts = await getPublishedPosts()
  const latestDate = posts[0]?.updatedAt || posts[0]?.publishedAt || "2026-01-01"
  const items = posts
    .map((post) => {
      const url = absoluteUrl(blogPath(post.slug))
      const published = new Date(`${post.publishedAt}T00:00:00Z`).toUTCString()

      return `\n    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${url}</link>\n      <guid isPermaLink="true">${url}</guid>\n      <description>${escapeXml(post.description)}</description>\n      <pubDate>${published}</pubDate>\n    </item>`
    })
    .join("")
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${SITE_NAME} — Writing</title>\n    <link>${SITE_URL}/blog</link>\n    <description>Technical notes and project write-ups by ${SITE_NAME}.</description>\n    <language>en</language>\n    <lastBuildDate>${new Date(`${latestDate}T00:00:00Z`).toUTCString()}</lastBuildDate>\n    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${items}\n  </channel>\n</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
