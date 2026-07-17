import Pill from "../ui/Pill.jsx"

export default function ExperienceItem({ item }) {
  return (
    <details className="experience-entry">
      <summary className="experience-entry__overview">
        <div className="experience-identity">
          <img className="experience-logo" src={item.logo} alt="" width="40" height="40" loading="lazy" decoding="async" />
          <span className="experience-trigger">
            <span className="experience-company-row">
              <h3 className="experience-company">{item.company}</h3>
              <svg aria-hidden="true" className="experience-chevron" viewBox="0 0 24 24">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
            <span className="experience-role">{item.role}</span>
          </span>
        </div>

        <p className="experience-date">{item.date}</p>
      </summary>

      <div className="experience-details">
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
    </details>
  )
}
