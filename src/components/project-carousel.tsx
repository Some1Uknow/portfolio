"use client"

import { useState, useEffect, useCallback, JSX } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa" // Example icons
import { SiExpress, SiTailwindcss, SiOpenai, SiNextdotjs, SiCloudflare } from "react-icons/si" // Additional icons
import Marquee from "react-fast-marquee" // Marquee library

type Project = {
  id: number
  title: string
  description: string[]
  image: string
  projectLink: string
  githubLink: string
  tech: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "ResumeMax",
    description: [
      "AI-powered resume creation to generate resumes using existing data and AI.",
      "Multi-version resume management for users to store and customize resumes for different job profiles.",
      "AI-driven cover letter generator to create personalized cover letters for each application.",
      "Integrated professional ATS-friendly templates for structured and visually appealing resumes.",
      "Tech Stack: MongoDB, React.js, Express.js, Node.js, TailwindCSS, REST APIs, OpenAI APIs.",
    ],
    image: "/resumemax.png",
    projectLink: "https://resumemax.vercel.app",
    githubLink: "https://github.com/some1uknow/resumemax",
    tech: ["MongoDB", "React.js", "Express.js", "Node.js", "TailwindCSS", "OpenAI APIs"],
  },
  {
    id: 2,
    title: "SmartDoc",
    description: [
      "Blockchain-based system to issue and verify digital certificates with Solidity smart contracts.",
      "Integrated IPFS storage using Pinata for decentralized and tamper-proof document management.",
      "AI-driven verification via Ovis AI OCR for metadata extraction and validation.",
      "Developed RESTful APIs for seamless document request, issuance, and verification workflows.",
      "Tech Stack: Node.js, Express.js, MongoDB, Solidity, Hardhat, IPFS (Pinata), REST APIs.",
    ],
    image: "/easygpt.png",
    projectLink: "https://smartdoc.vercel.app",
    githubLink: "https://github.com/some1uknow/smartdoc",
    tech: ["Next.js", "MongoDB", "Cloudflare AI", "TailwindCSS"],
  },
  {
    id: 3,
    title: "VentOut",
    description: [
      "Integrated NextAuth.js for secure authentication and user management.",
      "Implemented Google Auth Service using Google Cloud to ensure seamless user login.",
      "Designed and developed the frontend with Next.js and Tailwind CSS for a responsive and intuitive user experience.",
      "Utilized MongoDB and Mongoose for efficient data storage and management.",
      "Tech Stack: Next.js, Tailwind CSS, MongoDB, Mongoose, NextAuth.js, REST APIs, Git, GitHub.",
    ],
    image: "/ventout.png",
    projectLink: "https://ventout.vercel.app",
    githubLink: "https://github.com/some1uknow/ventout",
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "NextAuth.js"],
  },
]

const techIcons: Record<string, JSX.Element> = {
  "React.js": <FaReact className="mr-1" />,
  "Node.js": <FaNodeJs className="mr-1" />,
  "MongoDB": <FaDatabase className="mr-1" />,
  "Express.js": <SiExpress className="mr-1" />,
  "TailwindCSS": <SiTailwindcss className="mr-1" />,
  "OpenAI APIs": <SiOpenai className="mr-1" />,
  "Next.js": <SiNextdotjs className="mr-1" />,
  "Cloudflare AI": <SiCloudflare className="mr-1" />,
}

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
      <div className="flex justify-between absolute top-1/2 left-1 right-1 gap-2 z-10 -translate-y-1/2 pointer-events-none">
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
              <CardContent className="p-4 flex flex-col gap-4">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-center">{project.title}</h3>
                <div className="text-muted-foreground text-sm space-y-2">
                  {project.description.map((point, index) => (
                    <p key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      {point}
                    </p>
                  ))}
                </div>
                <div className="mb-3">
                  <Marquee gradient={false} speed={50}>
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="flex items-center px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs mx-1"
                      >
                        {techIcons[tech] || null}
                        {tech}
                      </span>
                    ))}
                  </Marquee>
                </div>
                <div className="flex justify-center gap-4">
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
