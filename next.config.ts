import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent monorepo/root lockfile confusion in local and CI builds.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
