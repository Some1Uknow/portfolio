import siteContent from "../../content/siteContent.js"
import FadeIn from "../ui/FadeIn.jsx"
import SectionLabel from "../ui/SectionLabel.jsx"
import ExperienceItem from "./ExperienceItem.jsx"

const { experience } = siteContent

export default function Experience() {
  return (
    <section id="experience">
      <SectionLabel>Experience</SectionLabel>
      <div className="experience-list">
        {experience.map((item, index) => (
          <FadeIn key={item.company} delay={index * 60}>
            <ExperienceItem item={item} />
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
