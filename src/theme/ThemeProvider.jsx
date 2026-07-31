"use client"

import { useEffect, useState } from "react"

import { ThemeContext } from "./themeContext.js"

const STORAGE_KEY = "portfolio-theme"
const LIGHT_THEME_COLOR = "#ffffff"
const DARK_THEME_COLOR = "#000000"
// Fixed default for SSR + first client render so hydration always matches.
const DEFAULT_THEME = "light"

function getStoredTheme() {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null
  } catch {
    return null
  }
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveTheme() {
  const bootTheme = document.documentElement.dataset.theme
  if (bootTheme === "light" || bootTheme === "dark") {
    return bootTheme
  }

  return getStoredTheme() ?? getSystemTheme()
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
  const [theme, setTheme] = useState(DEFAULT_THEME)
  const [manualTheme, setManualTheme] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = getStoredTheme()
    const resolved = resolveTheme()
    setManualTheme(Boolean(stored))
    setTheme(resolved)
    applyTheme(resolved)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) {
      return undefined
    }

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

    return undefined
  }, [manualTheme, mounted, theme])

  useEffect(() => {
    if (!mounted || manualTheme) {
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
  }, [manualTheme, mounted])

  const toggleTheme = () => {
    setManualTheme(true)
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  }

  return (
    <ThemeContext.Provider value={{ isDark: theme === "dark", theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}
