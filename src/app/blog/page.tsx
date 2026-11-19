import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate, posts } from "@/lib/blog";
import { ORG_ID, absoluteUrl, graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Blog: Web, Software & AI Guides | YOOH Technologies";
const description =
  "Practical guides from YOOH Technologies on website development, custom software, AI automation, e-commerce and digital marketing for growing businesses.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/blog", absoluteTitle: true });

const jsonLd = graph(
  webPageSchema({ type: "CollectionPage", path: "/blog", name: title, description }),
  {
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    url: absoluteUrl("/blog"),
    name: "YOOH Technologies Blog",
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({ "@id": `${absoluteUrl(`/blog/${p.slug}`)}#article` })),
  },
);

export default function BlogPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <section
        data-theme="paper"
        aria-labelledby="blog-title"
        className="tex-paper relative bg-paper pb-16 pt-40 text-center text-ink md:pb-24 md:pt-52"
      >
        <div className="container-x">
          <RevealText
            as="h1"
            id="blog-title"
            type="chars"
            immediate
            className="display text-[clamp(3.5rem,2rem+8vw,9rem)] text-green"
          >
            Blog
          </RevealText>
          <Reveal>
            <p data-reveal className="mx-auto mt-6 max-w-xl text-lead leading-relaxed text-ink/75">
              Practical guides on websites, custom software, AI automation and digital marketing —
              written to help you make better decisions for your business.
            </p>
          </Reveal>
        </div>
      </section>

      <section data-theme="paper" aria-label="Articles" className="tex-paper relative bg-paper pb-24 text-ink md:pb-36">
        <div className="container-x">
          <Reveal as="ul" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08} y={24}>
            {posts.map((p) => (
              <li data-reveal key={p.slug}>
                <article className="h-full">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex h-full flex-col rounded-xl bg-white/55 p-6 ring-1 ring-ink/10 transition-all duration-300 hover:bg-white/80 hover:ring-ink/40 md:p-8"
                  >
                    <span className="label text-green">{p.category}</span>
                    <h2 className="heading mt-4 text-h3 leading-snug">{p.title}</h2>
                    <p className="mt-3 flex-1 text-small leading-relaxed text-ink/70">{p.excerpt}</p>
                    <span className="mt-6 flex items-center justify-between gap-4 text-small text-ink/55">
                      <span>
                        <time dateTime={p.published}>{formatDate(p.published)}</time> · {p.readingMinutes} min
                        read
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="size-5 shrink-0 text-ink transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <FinalCTA
        compact
        plain
        title={
          <>
            Let&apos;s make something <span className="text-paper">matter.</span>
          </>
        }
      />
    </>
  );
}
