import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { getPostBySlug, getPublishedPosts } from "../../../src/lib/blog.js"

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
export const alt = "Technical writing by Raghav Sharma"

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function OpenGraphImage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#f5efe5",
          color: "#151210",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "76px",
          width: "100%",
        }}
      >
        <div style={{ color: "#5e554e", display: "flex", fontSize: 24, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Raghav Sharma / Writing
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1030 }}>
          <div style={{ display: "flex", fontFamily: "serif", fontSize: 72, letterSpacing: "-0.05em", lineHeight: 0.96 }}>
            {post.title}
          </div>
          <div style={{ color: "#5e554e", display: "flex", fontSize: 28, lineHeight: 1.35 }}>{post.description}</div>
        </div>
        <div style={{ color: "#2f9e5b", display: "flex", fontSize: 22 }}>{post.tags.join(" · ")}</div>
      </div>
    ),
    size,
  )
}
