import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://raghav.codes",
  output: "static",
  integrations: [sitemap({ filter: (page) => !page.endsWith("/404/") })],
  build: { format: "directory" },
})
