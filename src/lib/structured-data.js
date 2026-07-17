import {
  PERSON_ID,
  PERSON_SAME_AS,
  PROFILE_PAGE_ID,
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
  jobTitle: "Software Engineer",
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
      },
      {
        "@type": "ProfilePage",
        "@id": PROFILE_PAGE_ID,
        url: SITE_URL,
        name: `${SITE_NAME} — Software Engineer`,
        mainEntity: { "@id": PERSON_ID },
      },
      personSchema,
    ],
  }
}

export function projectStructuredData(project) {
  const url = absoluteUrl(projectPath(project.slug))

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CreativeWork", "SoftwareSourceCode"],
        "@id": `${url}#project`,
        name: project.name,
        url,
        description: project.shortDescription || project.summary || project.desc,
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
        author: { "@id": PERSON_ID },
        blogPost: posts.map((post) => ({ "@id": `${absoluteUrl(blogPath(post.slug))}#article` })),
      },
      personSchema,
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
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
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
