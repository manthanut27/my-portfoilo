import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignore TypeScript errors during production builds to save CPU and RAM
    ignoreBuildErrors: true,
  },
  // Avoid generating heavy browser source maps in production to reduce disk IO and compilation memory
  productionBrowserSourceMaps: false,
  experimental: {
    // Compile only the modules actually imported from large packages
    optimizePackageImports: [
      "three",
      "@react-three/drei",
      "@react-three/fiber",
      "gsap",
      "framer-motion",
      "@supabase/supabase-js",
      "zod",
    ],
    // Restrict static generation to sequential single-worker compilation for smaller page sets
    staticGenerationMinPagesPerWorker: 50,
  },
};

export default nextConfig;
