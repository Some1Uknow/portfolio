"use client"

import { ThemeProvider } from "../theme/ThemeProvider.jsx"
import ThemeToggle from "./ui/ThemeToggle.jsx"

export default function ThemeControls() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}
