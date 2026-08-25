import { getProjectBySlug } from "../../src/content/siteContent.js"
import { getPostBySlug, getPublishedPosts } from "../../src/lib/blog.js"
import { blogIndexMarkdown, homeMarkdown, notFoundMarkdown, postMarkdown, projectMarkdown } from "../../src/lib/agent-content.js"
import { SITE_URL } from "../../src/lib/site.js"

export const dynamic = "force-dynamic"

const INTERNAL_MARKER = "x-agent-markdown"

function response(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept, Accept-Encoding",
      "Cache-Control": status === 200 ? "public, max-age=0, must-revalidate" : "no-store",
      Link: `<${SITE_URL}/llms.txt>; rel="describedby"`,
    },
  })
}

function normalizePath(value) {
  if (!value) {
    return "/"
  }

  const pathname = new URL(value, SITE_URL).pathname
  return pathname === "/" ? pathname : pathname.replace(/\/$/, "")
}

export async function GET(request) {
  const requestUrl = new URL(request.url)

  if (request.headers.get(INTERNAL_MARKER) !== "1") {
    return response(notFoundMarkdown(requestUrl.pathname || "/agent-markdown"), 404)
  }

  const pathname = normalizePath(requestUrl.searchParams.get("path"))

  if (pathname === "/") {
    return response(homeMarkdown(await getPublishedPosts()))
  }

  if (pathname === "/blog") {
    return response(blogIndexMarkdown(await getPublishedPosts()))
  }

  const blogMatch = pathname.match(/^\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)$/)
  if (blogMatch) {
    const post = await getPostBySlug(blogMatch[1])
    return post ? response(postMarkdown(post)) : response(notFoundMarkdown(pathname), 404)
  }

  const projectMatch = pathname.match(/^\/projects\/([a-z0-9]+(?:-[a-z0-9]+)*)$/)
  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1])
    if (!project) {
      return response(notFoundMarkdown(pathname), 404)
    }

    const posts = await getPublishedPosts()
    const relatedPosts = posts.filter((post) => post.relatedProjects.includes(project.slug))
    return response(projectMarkdown(project, relatedPosts))
  }

  if (pathname === "/llms.txt" || pathname === "/sitemap.xml" || pathname === "/robots.txt" || pathname === "/feed.xml") {
    return response(notFoundMarkdown(pathname), 404)
  }

  return response(notFoundMarkdown(pathname), 404)
}
