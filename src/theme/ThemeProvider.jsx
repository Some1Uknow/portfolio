import { createContext, useContext, useEffect, useState } from "react"

const STORAGE_KEY = "portfolio-theme"
const LIGHT_THEME_COLOR = "#f5efe5"
const DARK_THEME_COLOR = "#0d1110"

const ThemeContext = createContext(null)

function getStoredTheme() {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null
  } catch {
    return null
  }
}

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme

  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute("content", theme === "dark" ? DARK_THEME_COLOR : LIGHT_THEME_COLOR)
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      const bootTheme = document.documentElement.dataset.theme
      if (bootTheme === "light" || bootTheme === "dark") {
        return bootTheme
      }
    }

    return getStoredTheme() ?? getSystemTheme()
  })

  const [manualTheme, setManualTheme] = useState(() => Boolean(getStoredTheme()))

  useEffect(() => {
    applyTheme(theme)

    try {
      if (manualTheme) {
        window.localStorage.setItem(STORAGE_KEY, theme)
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Ignore storage failures and keep the in-memory theme state.
    }
  }, [manualTheme, theme])

  useEffect(() => {
    if (manualTheme || typeof window === "undefined") {
      return undefined
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event) => {
      setTheme(event.matches ? "dark" : "light")
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [manualTheme])

  const toggleTheme = () => {
    setManualTheme(true)
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  }

  return (
    <ThemeContext.Provider value={{ isDark: theme === "dark", theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}
