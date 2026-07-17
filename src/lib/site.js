export const SITE_URL = "https://raghav.codes"
export const SITE_NAME = "Raghav Sharma"
export const PERSON_ID = `${SITE_URL}/#raghav-sharma`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const PROFILE_PAGE_ID = `${SITE_URL}/#profile`
export const SITE_LAST_MODIFIED = "2026-07-17"

export const PERSON_SAME_AS = [
  "https://github.com/some1uknow",
  "https://www.linkedin.com/in/raghavsharmaweb3",
  "https://x.com/raghavdotsol",
]

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, SITE_URL).toString()
}

export function projectPath(slug) {
  return `/projects/${slug}`
}

export function blogPath(slug) {
  return `/blog/${slug}`
}

export function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${dateString}T00:00:00Z`))
}
