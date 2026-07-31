"use client"

import { useTheme } from "../../theme/themeContext.js"

export default function ThemeToggle() {
  const { isDark, toggleTheme, mounted } = useTheme()

  // Keep SSR and first client paint identical; real theme applies via document bootstrap.
  const showDark = mounted ? isDark : false

  return (
    <button
      type="button"
      className="theme-toggle hoverable"
      onClick={toggleTheme}
      aria-label={`Switch to ${showDark ? "light" : "dark"} mode`}
      title={`Switch to ${showDark ? "light" : "dark"} mode`}
      suppressHydrationWarning
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">
          <span className="theme-toggle__glyph" suppressHydrationWarning>
            {showDark ? "☾" : "☀"}
          </span>
        </span>
      </span>
    </button>
  )
}
