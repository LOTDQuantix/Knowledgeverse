import type { NextConfig } from "next";

// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true } // Required for static export
};

export default nextConfig;