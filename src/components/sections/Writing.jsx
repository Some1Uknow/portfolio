import Link from "next/link"

import { blogPath, formatDate } from "../../lib/site.js"
import FadeIn from "../ui/FadeIn.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"

export default function Writing({ posts = [] }) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section id="writing">
      <SectionLabel>Writing</SectionLabel>
      <div style={{ paddingBottom: 32 }}>
        {posts.map((post, index) => (
          <FadeIn key={post.slug} delay={index * 50}>
            <Link
              href={blogPath(post.slug)}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 24,
                alignItems: "start",
                padding: "24px 0",
                borderBottom: "1px solid var(--color-border-soft)",
                borderTop: index === 0 ? "1px solid var(--color-border-soft)" : "none",
                cursor: "pointer",
                textDecoration: "none",
              }}
              className="writing-row hoverable"
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: 18,
                    letterSpacing: "-0.01em",
                    color: "var(--color-text)",
                    marginBottom: 5,
                  }}
                >
                  {post.title}
                </div>
                <div style={{ fontSize: 11, color: "var(--color-soft)" }}>{post.tags.join(" · ")}</div>
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  color: "var(--color-soft)",
                  paddingTop: 4,
                  whiteSpace: "nowrap",
                }}
              >
                {formatDate(post.publishedAt)} · {post.readingTime.text}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
