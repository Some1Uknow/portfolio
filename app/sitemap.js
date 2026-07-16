import { getPublishedPosts } from "../src/lib/blog.js"
import { projects } from "../src/content/siteContent.js"
import { SITE_URL, blogPath, projectPath } from "../src/lib/site.js"

export default async function sitemap() {
  const posts = await getPublishedPosts()

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}${projectPath(project.slug)}`,
      changeFrequency: "monthly",
      priority: project.featured ? 0.9 : 0.7,
    })),
    ...(posts.length > 0
      ? [
          {
            url: `${SITE_URL}/blog`,
            changeFrequency: "weekly",
            priority: 0.8,
          },
        ]
      : []),
    ...posts.map((post) => ({
      url: `${SITE_URL}${blogPath(post.slug)}`,
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ]
}
