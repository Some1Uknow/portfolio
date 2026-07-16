import { ImageResponse } from "next/og"

export const alt = "Raghav Sharma — Software Engineer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
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
          Raghav Sharma
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontFamily: "serif", fontSize: 86, letterSpacing: "-0.05em", lineHeight: 0.95 }}>
            Software Engineer
          </div>
          <div style={{ color: "#5e554e", display: "flex", fontSize: 29, maxWidth: 920 }}>
            Backend systems, developer tools, AI products, and blockchain infrastructure.
          </div>
        </div>
        <div style={{ color: "#2f9e5b", display: "flex", fontSize: 22 }}>raghav.codes</div>
      </div>
    ),
    size,
  )
}
