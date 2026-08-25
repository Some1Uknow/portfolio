import Awards from "../sections/Awards.jsx"
import ContactCta from "../sections/ContactCta.jsx"
import Experience from "../sections/Experience.jsx"
import Footer from "../sections/Footer.jsx"
import Hero from "../sections/Hero.jsx"
import Projects from "../sections/Projects.jsx"
import Writing from "../sections/Writing.jsx"
import { PAD } from "../../styles/globalStyles.js"

export default function HomePage({ latestPosts }) {
  return (
    <>
      <main>
        <div style={{ padding: `0 ${PAD}` }}>
          <Hero />
          <Experience />
        </div>

        <Projects />

        <div style={{ padding: `0 ${PAD}` }}>
          <Writing posts={latestPosts} />
          <Awards />
          <ContactCta />
        </div>
      </main>

      <Footer />
    </>
  )
}
