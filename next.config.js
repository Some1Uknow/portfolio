/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Vary",
            value: "Accept, Accept-Encoding",
          },
        ],
      },
    ]
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
}

export default nextConfig
