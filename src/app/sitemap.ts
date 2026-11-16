import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    page("", 1),
    page("/about", 0.8),
    page("/services", 0.9),
    ...services.map((s) => page(`/services/${s.slug}`, 0.8)),
    page("/contact", 0.7),
  ];
}
