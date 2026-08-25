const DEFAULT_ACCEPT = "text/html"

function parseMediaRange(value, index) {
  const [mediaType, ...parameters] = value
    .trim()
    .toLowerCase()
    .split(";")
    .map((part) => part.trim())

  const [type, subtype] = mediaType.split("/")

  if (!type || !subtype) {
    return null
  }

  let quality = 1

  for (const parameter of parameters) {
    const [name, rawValue] = parameter.split("=").map((part) => part.trim())

    if (name === "q") {
      const parsed = Number(rawValue)
      quality = Number.isFinite(parsed) ? Math.max(0, Math.min(1, parsed)) : 0
    }
  }

  return {
    type,
    subtype,
    quality,
    specificity: type === "*" ? 0 : subtype === "*" ? 1 : 2,
    index,
  }
}

function parseAccept(value) {
  return String(value || DEFAULT_ACCEPT)
    .split(",")
    .map(parseMediaRange)
    .filter(Boolean)
}

function matches(range, type, subtype) {
  return (range.type === "*" || range.type === type) && (range.subtype === "*" || range.subtype === subtype)
}

function bestMatch(ranges, type, subtype) {
  return ranges
    .filter((range) => matches(range, type, subtype))
    .sort((left, right) => {
      if (right.specificity !== left.specificity) {
        return right.specificity - left.specificity
      }

      if (right.quality !== left.quality) {
        return right.quality - left.quality
      }

      return left.index - right.index
    })[0] || { quality: 0, specificity: -1, index: Number.POSITIVE_INFINITY }
}

/**
 * Select the representation preferred by a client that can receive HTML or Markdown.
 * Wildcards keep the browser-safe HTML default; an explicit text/markdown range can win
 * when it has the best q-value, specificity, or tie-break position.
 */
export function preferredRepresentation(accept) {
  const ranges = parseAccept(accept)
  const markdown = bestMatch(ranges, "text", "markdown")
  const html = bestMatch(ranges, "text", "html")

  if (accept && markdown.quality === 0 && html.quality === 0) {
    return null
  }

  if (markdown.quality > html.quality) {
    return "markdown"
  }

  if (markdown.quality > 0 && markdown.specificity > html.specificity) {
    return "markdown"
  }

  if (
    markdown.quality > 0 &&
    markdown.quality === html.quality &&
    markdown.specificity === html.specificity &&
    markdown.index < html.index
  ) {
    return "markdown"
  }

  return "html"
}

export function acceptsMarkdown(accept) {
  return preferredRepresentation(accept) === "markdown"
}
