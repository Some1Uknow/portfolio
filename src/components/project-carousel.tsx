"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Project = {
  id: number
  title: string
  description: string
  image: string
  projectLink: string
  githubLink: string
  tech: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "SmartDoc",
    description: "Comprehensive Automated Document Verification system (SIH Winning Project)",
    image: "/placeholder.svg?height=400&width=600",
    projectLink: "https://smartdoc.vercel.app",
    githubLink: "https://github.com/raghavsharma/smartdoc",
    tech: ["Node.js", "Express.js", "MongoDB", "Solidity", "Hardhat", "IPFS (Pinata)"],
  },
  {
    id: 2,
    title: "VentOut",
    description: "Social Media App for people struggling with mental health issues",
    image: "/placeholder.svg?height=400&width=600",
    projectLink: "https://ventout.vercel.app",
    githubLink: "https://github.com/raghavsharma/ventout",
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "Mongoose", "NextAuth.js"],
  },
  {
    id: 3,
    title: "ResumeMax",
    description: "AI Resume Optimizer and Builder",
    image: "/placeholder.svg?height=400&width=600",
    projectLink: "https://resumemax.vercel.app",
    githubLink: "https://github.com/raghavsharma/resumemax",
    tech: ["MongoDB", "React.js", "Express.js", "Node.js", "TailwindCSS", "OpenAI APIs"],
  },
]

export function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative overflow-hidden">
      <div className="flex justify-between absolute top-1/2 left-2 right-2 z-10 -translate-y-1/2 pointer-events-none">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur pointer-events-auto h-8 w-8"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/80 backdrop-blur pointer-events-auto h-8 w-8"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {projects.map((project) => (
          <div key={project.id} className="min-w-full">
            <Card className="border-0 shadow-none overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col p-3 pt-4">
                    <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.projectLink} target="_blank">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Project Link
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.githubLink} target="_blank">
                          <Github className="h-3 w-3 mr-1" />
                          Github Link
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-1 mt-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-primary" : "bg-primary/20"}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
