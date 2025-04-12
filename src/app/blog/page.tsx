import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogCarousel } from "@/components/blog-carousel"
import { EducationSection } from "@/components/education-section"
import { AchievementsSection } from "@/components/achievements-section"

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-20">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-16">Blog</h1>
          <BlogCarousel />
        </div>
      </section>

      <EducationSection />
      <AchievementsSection />

      <Footer />
    </main>
  )
}
