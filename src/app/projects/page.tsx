import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProjectCarousel } from "@/components/project-carousel"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { HireMeModal } from "@/components/hire-me-modal"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      <section className="py-20">
        <div className="container">
          <h1 className="text-4xl font-bold text-center mb-16">Projects</h1>
          <ProjectCarousel />
        </div>
      </section>

      <ExperienceTimeline />

      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="max-w-md mx-auto space-y-4">
            <HireMeModal />
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/Raghav-Resume.pdf" target="_blank">
                RESUME
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
