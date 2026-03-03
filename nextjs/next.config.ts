import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-sqlite3-multiple-ciphers"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mark better-sqlite3 as external to prevent bundling
      config.externals.push("better-sqlite3-multiple-ciphers");
    }
    return config;
  },
  // Support for both Turbopack and Webpack
  turbopack: {
    resolveAlias: {
      "better-sqlite3-multiple-ciphers": "better-sqlite3-multiple-ciphers",
    },
  },
  // Image configurations  for logo images (google and github)
  images: {
    remotePatterns: [
      {
        // Google logo images
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        // GitHub avatar images
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  // output: "standalone",
};

export default nextConfig;
