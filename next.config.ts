import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "sjsidsfilcvsvgvdmlrh.supabase.co",
      },
    ],
  },
  transpilePackages: ["recharts", "rc-util", "rc-pagination", "rc-picker"],
};

export default nextConfig;
