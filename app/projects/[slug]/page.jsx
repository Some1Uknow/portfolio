import { notFound } from "next/navigation"

import ProjectPage from "../../../src/components/pages/ProjectPage.jsx"
import { getProjectBySlug, projects } from "../../../src/content/siteContent.js"

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export default async function Page({ params }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectPage project={project} />
}
