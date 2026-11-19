import type { Post } from "./blog-types";
import { post as customVsTemplate } from "@/content/blog/custom-website-vs-template-website";
import { post as customVsOffTheShelf } from "@/content/blog/custom-software-vs-off-the-shelf";
import { post as aiAutomationSmallBusiness } from "@/content/blog/ai-automation-for-small-businesses";

export type { Post } from "./blog-types";

/**
 * Published articles (newest first). To add one: create a file in src/content/blog,
 * import it here — the blog index, sitemap, llms.txt and JSON-LD pick it up automatically.
 */
export const posts: Post[] = [customVsTemplate, customVsOffTheShelf, aiAutomationSmallBusiness].sort(
  (a, b) => b.published.localeCompare(a.published),
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** Most recent content change across all posts (blog index lastmod). */
export const latestPostUpdate = () =>
  posts.reduce((max, p) => (p.updated > max ? p.updated : max), posts[0]?.updated ?? "");

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
