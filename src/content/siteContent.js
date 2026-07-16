import siteContent from "./siteContent.json" with { type: "json" }

export const projects = siteContent.projects

const KNOWN_ICON_URLS = {
  learnsol: "https://www.learnsol.site/icon.png",
  "buy-me-some-tokens": "https://buymesometokens.vercel.app/logo.png",
}

export const projectsBySlug = new Map(projects.map((project) => [project.slug, project]))

export function getProjectBySlug(slug) {
  return projectsBySlug.get(slug) ?? null
}

export function getProjectIconUrl(project) {
  if (KNOWN_ICON_URLS[project.slug]) {
    return KNOWN_ICON_URLS[project.slug]
  }

  if (project.live) {
    return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(project.live)}`
  }

  if (project.icon) {
    return project.icon
  }

  if (project.github) {
    return `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(project.github)}`
  }

  return null
}

export default siteContent
