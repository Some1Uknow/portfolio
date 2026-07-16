"use client"

import { useId, useState } from "react"

import Pill from "../ui/Pill.jsx"

export default function ExperienceItem({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  const detailsId = useId()

  return (
    <article className={`experience-entry${isOpen ? " is-open" : ""}`}>
      <div className="experience-entry__overview">
        <div className="experience-identity">
          <img className="experience-logo" src={item.logo} alt="" width="40" height="40" />
          <button
            aria-controls={detailsId}
            aria-expanded={isOpen}
            className="experience-trigger"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            <span className="experience-company-row">
              <span className="experience-company">{item.company}</span>
              <svg aria-hidden="true" className="experience-chevron" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
            <span className="experience-role">{item.role}</span>
          </button>
        </div>

        <p className="experience-date">{item.date}</p>
      </div>

      <div aria-hidden={!isOpen} className="experience-details" id={detailsId}>
        <div className="experience-details__content">
          <div className="experience-details__inner">
            <p className="experience-details__location">{item.location}</p>
            {item.badge ? <span className="experience-badge">{item.badge}</span> : null}

            <ul className="experience-details__bullets">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="experience-stack" aria-label={`Technologies used at ${item.company}`}>
              {item.stack.map((stackItem) => (
                <Pill key={stackItem}>{stackItem}</Pill>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
