import { NextResponse } from "next/server"

import { preferredRepresentation } from "./src/lib/accept.js"

const MARKDOWN_ROUTE = "/agent-markdown"
const MARKDOWN_REQUEST_HEADER = "x-agent-markdown"
const NEGOTIATED_VARY = "Accept, Accept-Encoding"
const AGENT_GUIDE_LINK = '</llms.txt>; rel="describedby"'
const NON_NEGOTIATED_PATHS = new Set(["/feed.xml", "/llms.txt", "/robots.txt", "/sitemap.xml"])

function isStaticAsset(pathname) {
  return /\.(?:avif|css|gif|ico|jpe?g|js|map|png|svg|ttf|webp|woff2?)$/i.test(pathname)
}

function withNegotiationHeaders(response) {
  response.headers.set("Vary", NEGOTIATED_VARY)
  response.headers.set("Link", AGENT_GUIDE_LINK)
  return response
}

export function proxy(request) {
  const pathname = request.nextUrl.pathname

  if (pathname === MARKDOWN_ROUTE || NON_NEGOTIATED_PATHS.has(pathname) || isStaticAsset(pathname)) {
    return NextResponse.next()
  }

  const representation = preferredRepresentation(request.headers.get("accept"))

  if (representation === null) {
    return withNegotiationHeaders(
      new Response("Not Acceptable\n\nAvailable: text/html, text/markdown\n", {
        status: 406,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Vary": NEGOTIATED_VARY,
        },
      }),
    )
  }

  if (representation !== "markdown") {
    return withNegotiationHeaders(NextResponse.next())
  }

  const url = request.nextUrl.clone()
  url.pathname = MARKDOWN_ROUTE
  url.search = ""
  url.searchParams.set("path", request.nextUrl.pathname)

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(MARKDOWN_REQUEST_HEADER, "1")

  return withNegotiationHeaders(NextResponse.rewrite(url, { request: { headers: requestHeaders } }))
}

export const config = {
  matcher: ["/((?!api/|_next/|_vercel/).*)"],
}
