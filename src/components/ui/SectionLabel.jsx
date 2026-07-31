import { SECTION_GAP } from "../../styles/globalStyles.js"

export default function SectionLabel({ as = "div", children, paddingTop = SECTION_GAP }) {
  const style = {
    display: "flex",
    alignItems: "center",
    gap: 14,
    fontSize: 9,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--color-soft)",
    fontWeight: 400,
    lineHeight: 1.3,
    marginBottom: 18,
    paddingTop,
  }
  const rule = <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--color-border)" }} />

  if (as === "h2") {
    return (
      <h2 style={style}>
        {children}
        {rule}
      </h2>
    )
  }

  return (
    <div style={style}>
      {children}
      {rule}
    </div>
  )
}
