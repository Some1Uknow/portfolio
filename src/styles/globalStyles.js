export const PAD = "clamp(52px, 12vw, 220px)"

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');
  :root {
    --color-bg: #f5efe5;
    --color-surface: rgba(255, 252, 247, 0.78);
    --color-surface-hover: #fff8ef;
    --color-surface-elevated: rgba(255, 250, 244, 0.78);
    --color-text: #151210;
    --color-muted: #5e554e;
    --color-soft: #857a71;
    --color-faint: #b5a99e;
    --color-border: #ddd2c6;
    --color-border-soft: #ebe2d8;
    --color-accent: #2f9e5b;
    --color-accent-glow: rgba(47, 158, 91, 0.24);
    --color-halo-a: rgba(213, 178, 126, 0.24);
    --color-halo-b: rgba(140, 189, 162, 0.18);
    --selection-bg: #151210;
    --selection-text: #fff8ef;
    --shadow-soft: 0 18px 50px rgba(37, 31, 25, 0.08);
  }
  html[data-theme="dark"] {
    --color-bg: #0d1110;
    --color-surface: rgba(20, 25, 23, 0.82);
    --color-surface-hover: #18201d;
    --color-surface-elevated: rgba(15, 19, 17, 0.84);
    --color-text: #f6efe6;
    --color-muted: #d1c5ba;
    --color-soft: #a89d91;
    --color-faint: #6d655d;
    --color-border: #312d29;
    --color-border-soft: #26221f;
    --color-accent: #6be59b;
    --color-accent-glow: rgba(107, 229, 155, 0.22);
    --color-halo-a: rgba(58, 90, 74, 0.34);
    --color-halo-b: rgba(103, 89, 55, 0.2);
    --selection-bg: #f6efe6;
    --selection-text: #0d1110;
    --shadow-soft: 0 18px 50px rgba(0, 0, 0, 0.35);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; background: var(--color-bg); }
  body {
    background-color: var(--color-bg);
    background-image:
      radial-gradient(circle at 14% 18%, var(--color-halo-a), transparent 32%),
      radial-gradient(circle at 86% 6%, var(--color-halo-b), transparent 28%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 36%);
    color: var(--color-text);
    font-family: 'Geist Mono', 'Courier New', monospace;
    font-size: 13px;
    font-weight: 400;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    transition: background-color 0.35s ease, color 0.35s ease;
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), transparent 30%),
      repeating-linear-gradient(90deg, transparent 0, transparent 108px, rgba(127, 127, 127, 0.04) 108px, rgba(127, 127, 127, 0.04) 109px);
    opacity: 0.45;
  }
  a, button { font: inherit; }
  button { border: 0; background: none; }
  #root { position: relative; min-height: 100vh; }
  ::selection { background: var(--selection-bg); color: var(--selection-text); }
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
  @keyframes pulseGreen { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.6; transform:scale(0.85); } }
  @keyframes scrollLine {
    0% { transform: scaleY(0); transform-origin: top; }
    50% { transform: scaleY(1); transform-origin: top; }
    51% { transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }
  .hero-link::after { content:''; position:absolute; bottom:8px; left:0; right:0; height:1px; background:var(--color-text); transform:scaleX(0); transform-origin:left; transition:transform 0.3s ease; }
  .hero-link:hover::after { transform:scaleX(1); }
  .muted-link { color: var(--color-soft); text-decoration: none; transition: color 0.2s ease; }
  .muted-link:hover { color: var(--color-text); }
  .writing-row:hover > div:first-child > div:first-child { color: var(--color-soft); transition: color 0.2s; }
  .theme-toggle {
    position: fixed;
    top: max(16px, calc(env(safe-area-inset-top) + 12px));
    right: clamp(18px, 4vw, 40px);
    z-index: 60;
    width: 48px;
    height: 28px;
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    background: var(--color-surface-elevated);
    color: var(--color-text);
    cursor: pointer;
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(16px);
    transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  }
  .theme-toggle:hover { transform: translateY(-1px); border-color: var(--color-text); }
  .theme-toggle:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 4px;
  }
  .theme-toggle__track {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 2px;
    border-radius: 999px;
    background: transparent;
  }
  .theme-toggle__thumb {
    width: 22px;
    height: 22px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--color-text);
    color: var(--color-bg);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.25s ease, color 0.25s ease;
  }
  html[data-theme="dark"] .theme-toggle__thumb { transform: translateX(20px); }
  .theme-toggle__glyph { font-size: 12px; line-height: 1; transform: translateY(-0.5px); }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
  @media (max-width: 900px) {
    .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .exp-row { grid-template-columns: 1fr 1fr !important; }
    .exp-row > *:last-child { text-align: left !important; }
  }
  @media (max-width: 640px) {
    .exp-row { grid-template-columns: 1fr !important; gap: 10px !important; }
    .exp-row > *:last-child { text-align: left !important; }
    .projects-grid { grid-template-columns: 1fr !important; }
    .skills-grid { grid-template-columns: 1fr !important; }
    .writing-row { grid-template-columns: 1fr !important; }
    .writing-row > *:last-child { display: none; }
    .theme-toggle {
      right: 16px;
    }
    .footer-shell {
      align-items: flex-start !important;
      gap: 22px !important;
      padding-top: 36px !important;
      padding-bottom: 36px !important;
    }
    .footer-meta {
      width: 100%;
      align-items: flex-start !important;
      text-align: left !important;
    }
    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px 20px;
      line-height: 1.7 !important;
    }
    .footer-link { display: inline-block !important; }
    .footer-note {
      max-width: 18rem;
      line-height: 1.6;
    }
  }
`
