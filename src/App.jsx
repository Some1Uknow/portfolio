import Cursor from "./components/Cursor.jsx"
import HomePage from "./components/pages/HomePage.jsx"
import ProjectPage from "./components/pages/ProjectPage.jsx"
import ThemeToggle from "./components/ui/ThemeToggle.jsx"
import { globalStyles } from "./styles/globalStyles.js"
import { ThemeProvider } from "./theme/ThemeProvider.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <ThemeProvider>
      <style>{globalStyles}</style>

      <BrowserRouter>
        <Cursor />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
