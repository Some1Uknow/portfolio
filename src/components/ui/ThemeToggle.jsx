import { useTheme } from "../../theme/themeContext.js"

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="theme-toggle hoverable"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">
          <span className="theme-toggle__glyph">{isDark ? "☾" : "☀"}</span>
        </span>
      </span>
    </button>
  )
}
