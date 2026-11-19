import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { FaqList } from "@/components/shared/FaqList";
import { FinalCTA } from "@/components/shared/FinalCTA";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDate, getPost, posts } from "@/lib/blog";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";
import {
  ORG_ID,
  absoluteUrl,
  breadcrumbSchema,
  faqSchema,
  graph,
  pageMetadata,
  webPageSchema,
} from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.seoTitle ?? p.title,
    absoluteTitle: Boolean(p.seoTitle),
    description: p.description,
    path: `/blog/${p.slug}`,
    image: `/blog/${p.slug}/opengraph-image`,
    type: "article",
    publishedTime: p.published,
    modifiedTime: p.updated,
  });
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];
  const related = post.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = graph(
    webPageSchema({ path, name: post.title, description: post.description, breadcrumb: true }),
    breadcrumbSchema(crumbs),
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      url,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      image: `${url}/opengraph-image`,
      datePublished: post.published,
      dateModified: post.updated,
      articleSection: post.category,
      inLanguage: "en",
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
    },
    ...(post.faqs?.length ? [faqSchema(path, post.faqs)] : []),
  );

  const { Body } = post;

  return (
    <>
      <JsonLd data={jsonLd} />

      <article>
        <header
          data-theme="paper"
          className="tex-paper relative bg-paper pb-12 pt-[calc(88px+2.5rem)] text-ink md:pb-16 md:pt-[calc(88px+4rem)]"
        >
          <Reveal className="container-x max-w-4xl" stagger={0.08}>
            <div data-reveal>
              <Breadcrumbs crumbs={crumbs} />
            </div>
            <div data-reveal className="mt-8">
              <Eyebrow>
                {post.category} · {post.readingMinutes} min read
              </Eyebrow>
            </div>
            <h1
              data-reveal
              className="heading mt-6 text-[clamp(2.25rem,1.5rem+3vw,4rem)] leading-[1.05] tracking-tight"
            >
              {post.title}
            </h1>
            <p data-reveal className="mt-6 max-w-2xl text-lead leading-relaxed text-ink/75">
              {post.description}
            </p>
            <p data-reveal className="mt-6 text-small text-ink/60">
              By the {site.name} team · Published <time dateTime={post.published}>{formatDate(post.published)}</time>
              {post.updated !== post.published && (
                <>
                  {" "}
                  · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </>
              )}
            </p>
          </Reveal>
        </header>

        <div data-theme="paper" className="tex-paper relative bg-paper pb-20 text-ink md:pb-28">
          <div className="container-x max-w-4xl">
            <div className="prose-yooh max-w-[68ch] border-t border-ink/15 pt-10">
              <Body />
            </div>
          </div>
        </div>

        {post.faqs?.length ? (
          <section data-theme="paper" aria-labelledby="post-faq-title" className="relative bg-paper-deep py-20 text-ink md:py-24">
            <div className="container-x grid max-w-6xl gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Eyebrow>Questions</Eyebrow>
                <h2 id="post-faq-title" className="heading mt-5 text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.08] tracking-tight">
                  Frequently asked <span className="text-green">questions.</span>
                </h2>
              </div>
              <div className="lg:col-span-7">
                <FaqList faqs={post.faqs} />
              </div>
            </div>
          </section>
        ) : null}
      </article>

      <section data-theme="paper" aria-labelledby="post-related-title" className="tex-paper relative bg-paper py-20 text-ink md:py-24">
        <div className="container-x">
          <h2 id="post-related-title">
            <Eyebrow as="span">Related services</Eyebrow>
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col rounded-xl bg-white/55 p-6 ring-1 ring-ink/10 transition-all duration-300 hover:bg-white/80 hover:ring-ink/40 md:p-7"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="heading text-h3">{r.title}</span>
                    <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="mt-3 text-small text-ink/65">{r.short}</span>
                </Link>
              </li>
            ))}
          </ul>

          {more.length > 0 && (
            <>
              <h2 className="mt-16">
                <Eyebrow as="span">More articles</Eyebrow>
              </h2>
              <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
                {more.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex h-full flex-col rounded-xl bg-white/55 p-6 ring-1 ring-ink/10 transition-all duration-300 hover:bg-white/80 hover:ring-ink/40 md:p-7"
                    >
                      <span className="label text-green">{p.category}</span>
                      <span className="heading mt-3 text-h4 font-semibold leading-snug">{p.title}</span>
                      <span className="mt-2 text-small text-ink/65">{p.excerpt}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
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
