import type { ReactNode } from "react";

export type Post = {
  slug: string;
  /** H1 and default <title>. */
  title: string;
  /** Optional <title>, used as-is without the brand suffix (keep ≤ 60 chars). */
  seoTitle?: string;
  /** Meta description (≈150–160 chars). */
  description: string;
  /** Card excerpt on /blog. */
  excerpt: string;
  category: string;
  /** ISO dates (YYYY-MM-DD). Change `updated` only when the article content changes. */
  published: string;
  updated: string;
  readingMinutes: number;
  /** Service slugs linked at the end of the article. */
  relatedServices: string[];
  faqs?: { q: string; a: string }[];
  /** Article body (server component). Use h2/h3/p/ul/ol/table; styled by `.prose-yooh`. */
  Body: () => ReactNode;
};
