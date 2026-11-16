import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder (a stray lockfile in D:\yooh confuses inference)
  outputFileTracingRoot: path.join(__dirname),

  poweredByHeader: false,

  images: {
    // AVIF first (typically 20–50% smaller than WebP), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Keep optimised variants cached for 30 days instead of 60 seconds.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    // Files in /public aren't fingerprinted, so cache for a week and revalidate in the
    // background rather than forever. (_next/static and next/image already set their own.)
    const week = "public, max-age=604800, stale-while-revalidate=86400";
    return [
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: week }] },
    ];
  },

  // Services removed in Nov 2026 — send old links to the closest current service.
  async redirects() {
    return [
      { source: "/services/software-development", destination: "/services/website-development", permanent: false },
      { source: "/services/branding-design", destination: "/services/ui-ux-design", permanent: false },
      { source: "/services/business-growth", destination: "/services/digital-marketing", permanent: false },
      { source: "/services/digital-presence", destination: "/services/google-map-business", permanent: false },
    ];
  },
};

export default nextConfig;
