import type { MetadataRoute } from "next";
import { serviceSeo, services } from "@/lib/services";
import { latestPostUpdate, posts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

/**
 * Canonical, indexable URLs only. `lastModified` is the date the page's content last
 * changed — update the date below (or the service/post `updated` field) when you edit a page,
 * never `new Date()`, which would tell crawlers everything changed on every deploy.
 */
const pageUpdated = {
  "/": "2026-11-17",
  "/about": "2026-11-17",
  "/services": "2026-11-17",
  "/contact": "2026-11-17",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, date: string) => ({ url: absoluteUrl(path), lastModified: date });

  return [
    entry("/", pageUpdated["/"]),
    entry("/about", pageUpdated["/about"]),
    entry("/services", pageUpdated["/services"]),
    ...services.map((s) => entry(`/services/${s.slug}`, serviceSeo[s.slug]?.updated ?? pageUpdated["/services"])),
    ...(posts.length ? [entry("/blog", latestPostUpdate())] : []),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.updated)),
    entry("/contact", pageUpdated["/contact"]),
  ];
}
