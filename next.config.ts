import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this repo. A stray lockfile above the project
  // dir (~/package-lock.json) otherwise makes Next infer the wrong root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
