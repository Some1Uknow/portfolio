import { readFile, readdir } from "node:fs/promises"
import path from "node:path"
import { cwd } from "node:process"

import matter from "gray-matter"
import readingTime from "reading-time"
import { z } from "zod"

import { projectsBySlug } from "../content/siteContent.js"

const POSTS_DIRECTORY = path.join(cwd(), "content", "posts")

const frontmatterSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  publishedAt: z.string().date(),
  updatedAt: z.string().date().optional(),
  tags: z.array(z.string().trim().min(1)).min(1),
  draft: z.boolean().optional().default(false),
  ogImage: z.string().trim().min(1).optional(),
  relatedProjects: z.array(z.string().trim().min(1)).optional().default([]),
})

function sortPosts(left, right) {
  return right.publishedAt.localeCompare(left.publishedAt)
}

function toSlug(filename) {
  return filename.replace(/\.mdx$/, "")
}

function validateRelatedProjects(slug, relatedProjects) {
  const unknownProject = relatedProjects.find((projectSlug) => !projectsBySlug.has(projectSlug))

  if (unknownProject) {
    throw new Error(`Post "${slug}" references unknown project "${unknownProject}".`)
  }
}

function parsePost(filename, source) {
  const slug = toSlug(filename)
  const parsed = matter(source)
  const frontmatter = frontmatterSchema.parse(parsed.data)

  validateRelatedProjects(slug, frontmatter.relatedProjects)

  return {
    slug,
    ...frontmatter,
    source: parsed.content,
    readingTime: readingTime(parsed.content),
  }
}

async function getPostFilenames() {
  try {
    const files = await readdir(POSTS_DIRECTORY)
    return files.filter((file) => file.endsWith(".mdx"))
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return []
    }

    throw error
  }
}

export async function getAllPosts() {
  const filenames = await getPostFilenames()
  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const source = await readFile(path.join(POSTS_DIRECTORY, filename), "utf8")
      return parsePost(filename, source)
    }),
  )

  return posts.sort(sortPosts)
}

export async function getPublishedPosts() {
  const posts = await getAllPosts()
  return posts.filter((post) => !post.draft)
}

export async function getPostBySlug(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return null
  }

  try {
    const source = await readFile(path.join(POSTS_DIRECTORY, `${slug}.mdx`), "utf8")
    const post = parsePost(`${slug}.mdx`, source)
    return post.draft ? null : post
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return null
    }

    throw error
  }
}

export function headingId(value) {
  return String(value)
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

export function getTableOfContents(source) {
  const headings = []
  const usedIds = new Map()
  const headingPattern = /^(#{2,3})\s+(.+?)\s*#*\s*$/gm

  for (const match of source.matchAll(headingPattern)) {
    const depth = match[1].length
    const title = match[2].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "").trim()
    const baseId = headingId(title)
    const occurrence = usedIds.get(baseId) || 0
    usedIds.set(baseId, occurrence + 1)

    headings.push({
      depth,
      title,
      id: occurrence ? `${baseId}-${occurrence}` : baseId,
    })
  }

  return headings
}
