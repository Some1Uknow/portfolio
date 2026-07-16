import { notFound } from "next/navigation"

import ProjectPage from "../../../src/components/pages/ProjectPage.jsx"
import { getProjectBySlug, projects } from "../../../src/content/siteContent.js"
import { getPublishedPosts } from "../../../src/lib/blog.js"
import { projectPath } from "../../../src/lib/site.js"
import { JsonLd, projectStructuredData } from "../../../src/lib/structured-data.jsx"

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export function generateMetadata({ params }) {
  return Promise.resolve(params).then(({ slug }) => {
    const project = getProjectBySlug(slug)

    if (!project) {
      return {}
    }

    const title = `${project.name} case study | Raghav Sharma`
    const description = project.shortDescription || project.summary || project.desc
    const path = projectPath(project.slug)

    return {
      title: { absolute: title },
      description,
      alternates: { canonical: path },
      openGraph: {
        type: "article",
        url: path,
        title,
        description,
        images: [`${path}/opengraph-image`],
      },
      twitter: {
        card: "summary_large_image",
        creator: "@raghavdotsol",
        title,
        description,
        images: [`${path}/opengraph-image`],
      },
    }
  })
}

export default async function Page({ params }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const posts = await getPublishedPosts()
  const relatedPosts = posts.filter((post) => post.relatedProjects.includes(project.slug))

  return (
    <>
      <JsonLd data={projectStructuredData(project)} />
      <ProjectPage project={project} relatedPosts={relatedPosts} />
    </>
  )
}
