"use client"

import Cursor from "./Cursor.jsx"
import ThemeToggle from "./ui/ThemeToggle.jsx"
import { ThemeProvider } from "../theme/ThemeProvider.jsx"

export default function AppShell({ children }) {
  return (
    <ThemeProvider>
      <Cursor />
      <ThemeToggle />
      <div className="app-content">{children}</div>
    </ThemeProvider>
  )
}
