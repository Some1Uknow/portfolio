export default function SectionLabel({ children, paddingTop = 96 }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--color-soft)",
        marginBottom: 48,
        paddingTop,
      }}
    >
      {children}
      <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
    </div>
  )
}
