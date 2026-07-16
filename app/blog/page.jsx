import Link from "next/link"

import { getPublishedPosts } from "../../src/lib/blog.js"
import { blogPath, formatDate } from "../../src/lib/site.js"
import { JsonLd, blogStructuredData } from "../../src/lib/structured-data.jsx"
import { PAD } from "../../src/styles/globalStyles.js"

export async function generateMetadata() {
  const posts = await getPublishedPosts()
  const isEmpty = posts.length === 0

  return {
    title: { absolute: "Marginalia | Raghav Sharma" },
    description: "Technical notes, project write-ups, and engineering evidence from Raghav Sharma.",
    alternates: { canonical: "/blog" },
    robots: isEmpty ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: {
      type: "website",
      url: "/blog",
      title: "Marginalia | Raghav Sharma",
      description: "Technical notes, project write-ups, and engineering evidence from Raghav Sharma.",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@raghavdotsol",
    },
  }
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts()

  return (
    <main className="reading-page" style={{ padding: `0 ${PAD} 88px`, minHeight: "100vh" }}>
      <JsonLd data={blogStructuredData(posts)} />
      <Link href="/" className="back-link">
        <span aria-hidden="true">←</span> Back
      </Link>
      <header className="reading-page__header">
        <p className="eyebrow">Notes</p>
        <h1>Marginalia</h1>
        <p>Notes from the work, kept close to the margins.</p>
      </header>

      {posts.length === 0 ? (
        <p className="blog-empty">No notes published yet.</p>
      ) : (
        <section aria-label="Published articles" className="blog-list">
          {posts.map((post) => (
            <article key={post.slug} className="blog-list__item">
              <h2>
                <Link href={blogPath(post.slug)}>{post.title}</Link>
              </h2>
              <time dateTime={post.publishedAt} className="blog-list__meta">
                {formatDate(post.publishedAt)}
              </time>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}
