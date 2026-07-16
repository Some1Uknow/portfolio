import { getPublishedPosts } from "../../src/lib/blog.js"
import { projects } from "../../src/content/siteContent.js"
import { SITE_NAME, SITE_URL, absoluteUrl, blogPath, projectPath } from "../../src/lib/site.js"

export const dynamic = "force-static"

export async function GET() {
  const posts = await getPublishedPosts()
  const lines = [
    `# ${SITE_NAME}`,
    "",
    "> Software Engineer building backend systems, developer tools, AI products, and blockchain infrastructure with Rust and TypeScript.",
    "",
    "## Canonical profile",
    "",
    `- [Portfolio](${SITE_URL}/): profile, experience, and selected work`,
    `- [GitHub](https://github.com/some1uknow): source repositories and contribution history`,
    "",
    "## Projects",
    "",
    ...projects.map((project) => `- [${project.name}](${absoluteUrl(projectPath(project.slug))}): ${project.shortDescription || project.summary || project.desc}`),
    "",
    "## Writing",
    "",
    `- [Writing index](${SITE_URL}/blog)`,
    `- [RSS feed](${SITE_URL}/feed.xml)`,
    ...posts.map((post) => `- [${post.title}](${absoluteUrl(blogPath(post.slug))}): ${post.description}`),
    "",
    "This file is a supplementary directory. The canonical HTML pages above are the primary source of information.",
  ]

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
