"use client"

import { useEffect, useRef } from "react"
import { FaJs, FaPython, FaReact, FaNodeJs, FaDocker, FaGit, FaAws } from "react-icons/fa"
import { SiTypescript, SiCplusplus, SiNextdotjs, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiCloudflare, SiVercel, SiPostman, SiAxios, SiTermius } from "react-icons/si"

const skills = [
  // Programming Languages
  { name: "JavaScript", icon: <FaJs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Python", icon: <FaPython /> },
  { name: "C++", icon: <SiCplusplus /> },

  // Frameworks and Libraries
  { name: "React.js", icon: <FaReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Express.js", icon: <SiExpress /> },
  { name: "TailwindCSS", icon: <SiTailwindcss /> },

  // Databases
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },

  // Cloud and Deployment
  { name: "AWS", icon: <FaAws /> },
  { name: "Vercel", icon: <SiVercel /> },
  { name: "Cloudflare", icon: <SiCloudflare /> },
  { name: "Docker", icon: <FaDocker /> },

  // Tools
  { name: "Git", icon: <FaGit /> },
  { name: "GitHub", icon: <FaGit /> },
  { name: "Postman", icon: <SiPostman /> },
  { name: "Axios", icon: <SiAxios /> },
  { name: "Bash", icon: <SiTermius /> },
]

export function SkillsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = containerRef.current
    if (!scrollContainer) return

    const scrollWidth = scrollContainer.scrollWidth
    const clientWidth = scrollContainer.clientWidth

    // Only animate if content is wider than container
    if (scrollWidth <= clientWidth) return

    let animationId: number
    let scrollPos = 0

    const scroll = () => {
      scrollPos += 0.5
      if (scrollPos >= scrollWidth / 2) {
        scrollPos = 0
      }
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollPos
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide py-2 gap-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Duplicate the skills to create a seamless loop */}
        {[...skills, ...skills].map((skill, index) => (
          <div key={index} className="flex-shrink-0 bg-secondary rounded-md px-4 py-2 border border-primary/10 flex items-center gap-2">
            <span className="text-lg">{skill.icon}</span>
            <span className="text-sm font-medium whitespace-nowrap">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
