import Link from "next/link"
import { notFound } from "next/navigation"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import remarkGfm from "remark-gfm"

import { getPostBySlug, getPublishedPosts, headingId } from "../../../src/lib/blog.js"
import { projectsBySlug } from "../../../src/content/siteContent.js"
import { blogPath, projectPath, SITE_BRAND } from "../../../src/lib/site.js"
import { JsonLd, postStructuredData } from "../../../src/lib/structured-data.jsx"
import { PAD } from "../../../src/styles/globalStyles.js"

export const dynamicParams = false

function textFromChildren(children) {
  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }

  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("")
  }

  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren(children.props.children)
  }

  return ""
}

function ArticleHeading({ id, level, children }) {
  const title = textFromChildren(children)

  const content = (
    <>
      {children}
      <a href={`#${id}`} className="heading-anchor" aria-label={`Link to ${title}`}>
        #
      </a>
    </>
  )

  return level === 2 ? <h2 id={id}>{content}</h2> : <h3 id={id}>{content}</h3>
}

function createMdxComponents() {
  const headingOccurrences = new Map()

  function getHeadingId(children) {
    const baseId = headingId(textFromChildren(children))
    const occurrence = headingOccurrences.get(baseId) || 0
    headingOccurrences.set(baseId, occurrence + 1)

    return occurrence ? `${baseId}-${occurrence}` : baseId
  }

  return {
    h2: (props) => <ArticleHeading level={2} {...props} id={getHeadingId(props.children)} />,
    h3: (props) => <ArticleHeading level={3} {...props} id={getHeadingId(props.children)} />,
  }
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  const title = `${post.title} | Raghav Sharma — ${SITE_BRAND}`
  const path = blogPath(post.slug)
  const image = post.ogImage || `${path}/opengraph-image`

  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: ["Raghav Sharma"],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raghavdotsol",
      title,
      description: post.description,
      images: [image],
    },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { content } = await compileMDX({
    source: post.source,
    components: createMdxComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
      },
    },
  })
  const relatedProjects = post.relatedProjects.map((projectSlug) => projectsBySlug.get(projectSlug)).filter(Boolean)

  return (
    <main className="article-shell" style={{ padding: `0 ${PAD} 88px`, minHeight: "100vh" }}>
      <JsonLd data={postStructuredData(post)} />
      <nav className="breadcrumb-nav article-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/blog">Writing</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{post.title}</span>
      </nav>

      <header className="article-header">
        <h1>{post.title}</h1>
      </header>

      <div className="article-layout">
        <article className="prose">{content}</article>
      </div>

      {relatedProjects.length > 0 ? (
        <section className="article-related-work" aria-labelledby="related-work-title">
          <p className="eyebrow">Related work</p>
          <h2 id="related-work-title">Projects referenced in this article</h2>
          <div>
            {relatedProjects.map((project) => (
              <Link key={project.slug} href={projectPath(project.slug)}>
                <span>{project.name}</span>
                <span>{project.shortDescription || project.summary}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
