import assert from "node:assert/strict"
import { chromium } from "playwright"

/* global document */

const errors = []
const browser = await chromium.launch({ headless: true })
const baseUrl = process.env.PORTFOLIO_URL || "http://127.0.0.1:4321"
const viewports = [
  ["1440", 1440, 1000],
  ["1280", 1280, 900],
  ["1024", 1024, 768],
  ["768", 768, 800],
  ["430", 430, 900],
  ["390", 390, 844],
  ["375", 375, 812],
  ["320", 320, 720],
]
const zoomWidths = [
  ["100", 1440],
  ["110", 1309],
  ["125", 1152],
  ["150", 960],
  ["175", 823],
  ["200", 720],
]
const expectedAbout = [
  "I learnt by building things on the internet. What started as curiosity slowly turned into an obsession with understanding how software works beneath the surface — the systems, infrastructure, and weird edge cases that make products actually work.",
  "I mostly write Rust and TypeScript. Over time, that pulled me deeper into backend systems, developer tools, and blockchain infrastructure, where I could learn by building things that had to work beyond a demo.",
  "I founded LearnSol, a hands-on Solana and Rust learning platform used by 2,200+ developers. I built its curriculum, retrieval system, sandbox, and production stack, and received a $5,000 Solana Foundation grant for the work.",
  "Since then, I’ve kept shipping and experimenting. I built CipherPay for private payroll and batch payouts on Solana, EzDeploy for deploying static GitHub projects in a click, and a bunch of smaller systems across payments, protocols, indexing, and infrastructure.",
  "Along the way, I worked as a software engineering intern at FOSSEE, IIT Bombay and Debales AI, won Smart India Hackathon, had my work featured by Colosseum, and became a member of Superteam India.",
  "Lately, I’ve been going deep on AI agents — building my own products around them and experimenting with how agents use tools, make decisions, move money, and interact with software without a human sitting in the middle.",
  "It feels like the next rabbit hole I want to spend a long time exploring.",
  "I’m now looking for my first full-time role at an awesome startup, working with people who care deeply about what they build. I want to ship ambitious products, learn ridiculously fast, and get very good at building things that are hard to make simple.",
]

for (const [name, width, height] of [...viewports, ...zoomWidths.map(([zoom, width]) => [`zoom-${zoom}`, width, 900])]) {
  const page = await browser.newPage({ viewport: { width, height } })
  page.on("console", (message) => message.type() === "error" && errors.push(`console: ${message.text()}`))
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`))
  const response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" })
  assert.equal(response?.status(), 200)
  assert.equal(await page.locator("h1").count(), 1)
  assert.deepEqual(await page.locator(".narrative > p").allTextContents(), expectedAbout)
  assert.equal(await page.locator('a[href="/blog"]', { hasText: "writings" }).count(), 1)
  assert.equal(await page.locator("script[src]").count(), 0)
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true)
  if (name === "1440") {
    assert.equal(await page.evaluate(() => document.documentElement.scrollHeight <= document.documentElement.clientHeight), true)
  }
  if (name === "1440" || name === "375") {
    await page.screenshot({ path: `/tmp/portfolio-${name}.png`, fullPage: true })
  }
  await page.close()
}

const page = await browser.newPage()
for (const path of [
  "/blog/",
  "/blog/how-i-grew-my-app-to-1000-users-in-50-days/",
  "/blog/why-i-stopped-using-npm-and-moved-to-pnpm/",
]) {
  const response = await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" })
  assert.equal(response?.status(), 200)
  assert.equal(await page.locator("h1").count(), 1)
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth), true)
}

const response = await page.goto(`${baseUrl}/definitely-missing`, { waitUntil: "networkidle" })
assert.equal(response?.status(), 404)
assert.equal(await page.locator('meta[name="robots"]').getAttribute("content"), "noindex, nofollow")
await browser.close()

assert.deepEqual(errors, [])
console.log("Browser verification passed: homepage, writings, 8 viewports, 6 zoom-equivalent widths, console, overflow, zero client scripts, and HTTP 404.")
