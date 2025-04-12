import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.1.5"], // Add your allowed development origins here
  hostname: "cdn.hashnode.com",
  images: {
    domains: ["cdn.hashnode.com"], // Correctly configure the images domain
  },
};

export default nextConfig;
