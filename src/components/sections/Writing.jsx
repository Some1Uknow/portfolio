import Link from "next/link"

import { blogPath } from "../../lib/site.js"
import FadeIn from "../ui/FadeIn.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

export default function Writing({ posts = [] }) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section id="writing">
      <SectionLabel as="h2">Writing</SectionLabel>
      <div>
        {posts.map((post, index) => (
          <FadeIn key={post.slug} delay={index * 50}>
            <Link
              href={blogPath(post.slug)}
              style={{
                display: "block",
                padding: "14px 0",
                borderBottom: index === posts.length - 1 ? "none" : "1px solid var(--color-border-soft)",
                cursor: "pointer",
                textDecoration: "none",
              }}
              className="hoverable"
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-instrument-serif), Georgia, serif",
                    fontSize: "clamp(13px, 1.4vw, 15px)",
                    letterSpacing: "-0.03em",
                    color: "var(--color-text)",
                    marginBottom: 4,
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  {post.title}
                </h3>
                <time dateTime={post.publishedAt} className="blog-list__meta">
                  {post.publishedAt.split("-").reverse().join(" ")}
                </time>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
