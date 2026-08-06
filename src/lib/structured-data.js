import {
  PERSON_ID,
  PERSON_SAME_AS,
  PROFILE_PAGE_ID,
  SITE_LAST_MODIFIED,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  absoluteUrl,
  blogPath,
  projectPath,
} from "./site.js"

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Software engineer building backend systems, developer tools, AI products, and blockchain infrastructure with Rust and TypeScript.",
  jobTitle: "Software Engineer",
  knowsAbout: ["Rust", "TypeScript", "backend systems", "AI agents", "blockchain infrastructure", "Solana"],
  sameAs: PERSON_SAME_AS,
}

export function homeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: `${SITE_NAME} — Software Engineer`,
        url: SITE_URL,
        description:
          "Portfolio, project case studies, and technical writing from Raghav Sharma, a software engineer working with Rust and TypeScript.",
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": PROFILE_PAGE_ID,
        url: SITE_URL,
        name: `${SITE_NAME} — Software Engineer`,
        description:
          "Portfolio and selected work from Raghav Sharma, a software engineer building backend systems, developer tools, AI products, and blockchain infrastructure.",
        dateModified: SITE_LAST_MODIFIED,
        inLanguage: "en",
        mainEntity: { "@id": PERSON_ID },
      },
      personSchema,
    ],
  }
}

export function projectStructuredData(project) {
  const url = absoluteUrl(projectPath(project.slug))
  const description = project.shortDescription || project.summary || project.desc
  const keywords = [...new Set([...(project.stack || []), ...(project.tags || []), ...(project.chains || [])])]

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CreativeWork", "SoftwareSourceCode"],
        "@id": `${url}#project`,
        name: project.name,
        url,
        description,
        image: absoluteUrl(`${projectPath(project.slug)}/opengraph-image`),
        inLanguage: "en",
        keywords,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
          url,
          name: `${project.name} case study | ${SITE_NAME}`,
        },
        author: { "@id": PERSON_ID },
        codeRepository: project.github,
        programmingLanguage: project.stack,
        sameAs: project.live ? [project.live, project.github] : [project.github],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/#projects` },
          { "@type": "ListItem", position: 3, name: project.name, item: url },
        ],
      },
      personSchema,
    ],
  }
}

export function blogStructuredData(posts) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: "Marginalia",
        description: "Notes from the work by Raghav Sharma.",
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        blogPost: posts.map((post) => ({ "@id": `${absoluteUrl(blogPath(post.slug))}#article` })),
      },
      personSchema,
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/blog#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Writing", item: `${SITE_URL}/blog` },
        ],
      },
    ],
  }
}

export function postStructuredData(post) {
  const url = absoluteUrl(blogPath(post.slug))
  const image = absoluteUrl(post.ogImage || `${blogPath(post.slug)}/opengraph-image`)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
        headline: post.title,
        description: post.description,
        url,
        inLanguage: "en",
        articleSection: post.tags[0],
        keywords: post.tags,
        wordCount: post.readingTime?.words,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        image,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Writing", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      personSchema,
    ],
  }
}
