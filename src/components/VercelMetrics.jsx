"use client"

import dynamic from "next/dynamic"

const Analytics = dynamic(() => import("@vercel/analytics/next").then((module) => module.Analytics), {
  ssr: false,
})

const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((module) => module.SpeedInsights), {
  ssr: false,
})

export default function VercelMetrics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
