import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel's adapter packages the deployment; standalone is for Docker.
  // Next.js 16.3 can fail tracing when both are enabled (next.js#96646).
  output: process.env.VERCEL === "1" ? undefined : "standalone",
};

export default nextConfig;
