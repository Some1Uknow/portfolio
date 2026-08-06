"use client"

import { useEffect, useSyncExternalStore } from "react"

import { ThemeContext } from "./themeContext.js"

const STORAGE_KEY = "portfolio-theme"
const LIGHT_THEME_COLOR = "#ffffff"
const DARK_THEME_COLOR = "#000000"
// Fixed default for SSR + first client render so hydration always matches.
const DEFAULT_THEME = "light"
const themeListeners = new Set()

function subscribeTheme(listener) {
  themeListeners.add(listener)
  return () => themeListeners.delete(listener)
}

function notifyThemeChange() {
  themeListeners.forEach((listener) => listener())
}

function getThemeSnapshot() {
  if (typeof document === "undefined") {
    return DEFAULT_THEME
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "light"
}

function getServerThemeSnapshot() {
  return DEFAULT_THEME
}

function getMountedSnapshot() {
  return true
}

function getServerMountedSnapshot() {
  return false
}

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
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot)
  const mounted = useSyncExternalStore(subscribeTheme, getMountedSnapshot, getServerMountedSnapshot)

  useEffect(() => {
    applyTheme(resolveTheme())
    notifyThemeChange()

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (event) => {
      if (getStoredTheme()) {
        return
      }

      applyTheme(event.matches ? "dark" : "light")
      notifyThemeChange()
    }

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    applyTheme(nextTheme)

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // Ignore storage failures and keep the in-memory theme state.
    }

    notifyThemeChange()
  }

  return (
    <ThemeContext.Provider value={{ isDark: theme === "dark", theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}
