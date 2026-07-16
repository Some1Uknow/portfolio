import About from "../sections/About.jsx"
import Awards from "../sections/Awards.jsx"
import Experience from "../sections/Experience.jsx"
import Footer from "../sections/Footer.jsx"
import Hero from "../sections/Hero.jsx"
import Oss from "../sections/Oss.jsx"
import Projects from "../sections/Projects.jsx"
import Writing from "../sections/Writing.jsx"
import { PAD } from "../../styles/globalStyles.js"

export default function HomePage({ latestPosts }) {
  return (
    <>
      <div style={{ padding: `0 ${PAD}` }}>
        <Hero />
        <About />
        <Experience />
      </div>

      <Projects />
      <Oss />

      <div style={{ padding: `0 ${PAD}` }}>
        <Writing posts={latestPosts} />
        <Awards />
      </div>

      <Footer />
    </>
  )
}
