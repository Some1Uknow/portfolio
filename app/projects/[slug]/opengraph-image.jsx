import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"

import { getProjectBySlug } from "../../../src/content/siteContent.js"

export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
export const alt = "Project case study by Raghav Sharma"

export default async function OpenGraphImage({ params }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
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
          Raghav Sharma / Case study
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1030 }}>
          <div style={{ display: "flex", fontFamily: "serif", fontSize: 80, letterSpacing: "-0.05em", lineHeight: 0.95 }}>
            {project.name}
          </div>
          <div style={{ color: "#5e554e", display: "flex", fontSize: 29, lineHeight: 1.35 }}>
            {project.shortDescription || project.summary || project.desc}
          </div>
        </div>
        <div style={{ color: "#2f9e5b", display: "flex", fontSize: 22 }}>{project.stack.slice(0, 4).join(" · ")}</div>
      </div>
    ),
    size,
  )
}
