import HomePage from "../src/components/pages/HomePage.jsx"
import { getPublishedPosts } from "../src/lib/blog.js"
import { JsonLd, homeStructuredData } from "../src/lib/structured-data.jsx"

export const metadata = {
  alternates: {
    canonical: "/",
  },
}

export default async function Page() {
  const posts = await getPublishedPosts()

  return (
    <>
      <JsonLd data={homeStructuredData()} />
      <HomePage latestPosts={posts.slice(0, 3)} />
    </>
  )
}
