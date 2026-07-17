export default function FadeIn({ children, delay = 0, x = 0, y = 12, style = {} }) {
  return (
    <div
      className="fade-in"
      style={{
        "--fade-delay": `${delay}ms`,
        "--fade-x": `${x}px`,
        "--fade-y": `${y}px`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
