import Cursor from "./components/Cursor.jsx"
import About from "./components/sections/About.jsx"
import Awards from "./components/sections/Awards.jsx"
import Experience from "./components/sections/Experience.jsx"
import Footer from "./components/sections/Footer.jsx"
import Hero from "./components/sections/Hero.jsx"
import Oss from "./components/sections/Oss.jsx"
import Projects from "./components/sections/Projects.jsx"
import ThemeToggle from "./components/ui/ThemeToggle.jsx"
import { globalStyles, PAD } from "./styles/globalStyles.js"
import { ThemeProvider } from "./theme/ThemeProvider.jsx"

export default function App() {
  return (
    <ThemeProvider>
      <style>{globalStyles}</style>

      <Cursor />
      <ThemeToggle />

      <div style={{ padding: `0 ${PAD}` }}>
        <Hero />
        <About />
        <Experience />
      </div>

      <Projects />
      <Oss />

      <div style={{ padding: `0 ${PAD}` }}>
        <Awards />
      </div>

      <Footer />
    </ThemeProvider>
  )
}
