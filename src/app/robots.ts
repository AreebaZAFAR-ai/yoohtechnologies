import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Crawl policy: all public pages, CSS, JS and images are open to every crawler — including
 * AI search and assistant crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot,
 * Google-Extended, Applebot…) because being cited by AI search is a business goal.
 * Only the contact-form API is excluded. To opt out of AI *training* while staying in AI
 * search, add e.g. `{ userAgent: ["GPTBot", "CCBot", "Google-Extended"], disallow: "/" }`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
