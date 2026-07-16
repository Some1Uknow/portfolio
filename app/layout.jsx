import "./globals.css"

import AppShell from "../src/components/AppShell.jsx"

export const metadata = {
  title: "Raghav Sharma — Protocol & Backend Engineer",
  description: "Portfolio of Raghav Sharma, a Rust, Solana, and DeFi engineer.",
  metadataBase: new URL("https://raghav.codes"),
  openGraph: {
    title: "Raghav Sharma — Protocol & Backend Engineer",
    description: "Rust · Solana · DeFi",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
}

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1110" },
  ],
}

const themeBootstrap = `(() => {
  try {
    const saved = localStorage.getItem("portfolio-theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
