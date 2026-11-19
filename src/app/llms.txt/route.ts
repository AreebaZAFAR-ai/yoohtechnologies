import { site, homeFaqs } from "@/lib/site";
import { serviceSeo, services } from "@/lib/services";
import { posts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt — a plain-Markdown summary for AI assistants (llmstxt.org proposal).
 * Experimental: no search engine has confirmed using it. Generated from the same data as the
 * pages so it never drifts out of date.
 */
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} is a software house based in Pakistan. One team of engineers, designers and marketers builds websites, mobile apps, e-commerce stores and custom software, automates business processes with AI, and runs digital marketing, SEO and Google Business Profile management for startups, local businesses and growing companies in Pakistan and internationally.`,
    "",
    `- Official website: ${absoluteUrl("/")}`,
    `- Tagline: ${site.tagline}`,
    `- Location: Pakistan (serving clients in Pakistan and internationally)`,
    `- Email: ${site.contact.email}`,
    `- Contact: ${absoluteUrl("/contact")}`,
    "",
    "## Services",
    "",
    ...services.map(
      (s) => `- [${serviceSeo[s.slug]?.h1 ?? s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`,
    ),
    "",
    "## Company",
    "",
    `- [About ${site.name}](${absoluteUrl("/about")}): who we are, how we work and what we believe.`,
    `- [All services](${absoluteUrl("/services")}): overview, engagement models and general questions.`,
    `- [Website templates](${absoluteUrl("/#templates")}): ready-made website templates with live previews.`,
    `- [Contact](${absoluteUrl("/contact")}): start a project or ask a question.`,
    "",
    "## Guides",
    "",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`),
    "",
    "## Frequently asked questions",
    "",
    ...homeFaqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
