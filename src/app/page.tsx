import { HireMeModal } from "@/components/hire-me-modal";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectCarousel } from "@/components/project-carousel";
import { BlogCarousel } from "@/components/blog-carousel";
import { SkillsMarquee } from "@/components/skills-marquee";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GithubActivity } from "@/components/github-activity";
import { AchievementsSection } from "@/components/achievements-section";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="fixed top-4 right-4 z-50 md:top-4 md:right-4 sm:top-2 sm:right-2">
        <ModeToggle />
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 max-w-7xl mx-auto">
        {/* Top Section - Profile and GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Profile Section */}
          <div className="bg-card rounded-lg border shadow-sm p-6 h-auto md:h-[180px] flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src="/raghav.jpg"
                  alt="Raghav Sharma"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Raghav Sharma</h1>
                <p className="text-muted-foreground text-md">Full Stack Dev.</p>
                <div className="flex gap-3 mt-2">
                  <Link
                    href="https://github.com/some1uknow"
                    target="_blank"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/raghavsharmaweb3"
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://x.com/some1uknow25"
                    target="_blank"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Activity */}
          <div className="bg-card rounded-lg border shadow-sm md:col-span-2 h-auto md:h-[180px] flex flex-col justify-center">
            <GithubActivity />
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <SkillsMarquee />
        </div>

        {/* Projects and Experience - Equal width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Project Section */}
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <ProjectCarousel />
          </div>

          {/* Experience Section */}
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            <p className="text-muted-foreground text-sm mb-4">
              In a timeline/stepper format
            </p>
            <ExperienceTimeline />
          </div>
        </div>

        {/* Blog, Hire Me/Resume Section - Blog takes half page width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Blog Section */}
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Blogs</h2>
            <BlogCarousel />
          </div>

          {/* Buttons and Minor Sections */}
          <div className="flex flex-col gap-4">
            {/* Buttons Section */}
            <div className="bg-card rounded-lg border shadow-sm p-6 flex flex-col gap-4 justify-center">
              <HireMeModal />
              <Button asChild variant="outline" size="lg">
                <Link href="/Raghav-Resume.pdf" target="_blank">
                  RESUME
                </Link>
              </Button>
            </div>

            {/* Education Section */}
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">EDUCATION</h2>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-medium">
                    Dronacharya College of Engineering
                  </h3>
                  <p className="text-muted-foreground">Gurugram, Haryana, IN</p>
                </div>
                <div>
                  <p className="font-medium">B.E in Computer Science</p>
                  <p className="text-muted-foreground">
                    October 2022 - Present
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="p-1">
              <AchievementsSection />
            </div>

            {/* Contact Section */}
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">CONTACT</h2>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <p className="text-muted-foreground">raghu250407@gmail.com</p>
                </div>
                <div className="flex gap-4">
                  <Link
                    href="https://github.com/some1uknow"
                    target="_blank"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://linkedin.com/in/raghavsharmaweb3"
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://x.com/some1uknow25"
                    target="_blank"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
