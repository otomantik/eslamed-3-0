import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // Helps tree-shake icon libraries (and other packages) more aggressively.
    // Safe, low-risk win for "unused JS" reports.
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
