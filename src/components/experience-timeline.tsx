import { JSX } from "react"
import { FaReact, FaPython, FaDocker, FaGit } from "react-icons/fa"
import { SiDjango, SiNextdotjs, SiTailwindcss, SiGithub } from "react-icons/si"

type Experience = {
  id: number
  title: string
  company: string
  location: string
  period: string
  description: string[]
  skills: JSX.Element[]
}

const experiences: Experience[] = [
  {
    id: 1,
    title: "SWE Intern",
    company: "FOSSEE | IIT Bombay",
    location: "Remote",
    period: "Feb 2025 - May 2025",
    description: [
      "Worked on Osdag, an open-source tool that helps design structures like beams and columns used in civil engineering.",
      "Built backend APIs using Django to handle structural calculations for different design modules.",
      "Created easy-to-use frontends in React to show the CAD model and its related calculations.",
      "Added user session management so users can smoothly work on their designs without losing progress.",
    ],
    skills: [<FaGit />, <SiGithub />, <FaReact />, <FaPython />, <SiDjango />, <FaDocker />],
  },
  {
    id: 2,
    title: "Full Stack Intern",
    company: "Debales AI",
    location: "Katy, Texas, USA | Remote",
    period: "July 2024 - September 2024",
    description: [
      "Developed dynamic pages that efficiently display AI-generated data, enhancing user engagement by 20%.",
      "Implemented session storage for chat history, improving user retention and multi-session continuity.",
      "Enhanced chatbot functionality by integrating product image display, increasing user interaction rates by 45%.",
      "Built a feedback system for chatbot response rating, contributing to a 15% improvement in response accuracy.",
      "Resolved critical bugs and reduced UI/UX inconsistencies to improve user satisfaction by 15%.",
    ],
    skills: [<FaGit />, <SiGithub />, <SiNextdotjs />, <SiTailwindcss />],
  },
]

export function ExperienceTimeline() {
  return (
    <ol className="relative border-l border-gray-400 dark:border-gray-700">
      {experiences.map((exp) => (
        <li key={exp.id} className="mb-10 ml-6">
          {/* Timeline dot */}
          <div className="absolute w-3 h-3 bg-gray-400 rounded-full -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>

          {/* Content */}
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {exp.period}
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {exp.title}
          </h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {exp.company} - {exp.location}
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-base font-normal text-gray-500 dark:text-gray-400">
            {exp.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <div className="flex gap-2 mt-3">
            {exp.skills.map((icon, index) => (
              <span key={index} className="text-primary text-lg">
                {icon}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ol>
  )
}
