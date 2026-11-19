import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { FaqList } from "@/components/shared/FaqList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getService, serviceSeo, services } from "@/lib/services";
import { engagementModels, site } from "@/lib/site";
import { ORG_ID, absoluteUrl, breadcrumbSchema, faqSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";
import { cn } from "@/lib/cn";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const seo = serviceSeo[s.slug];
  return pageMetadata({
    title: seo?.title ?? `${s.title} Services | ${site.name}`,
    absoluteTitle: true,
    description: seo?.description ?? s.summary,
    path: `/services/${s.slug}`,
    image: `/services/${s.slug}/opengraph-image`,
  });
}

/** Plain text followed by a green accent phrase. */
function Accent({ parts, className }: { parts: [string, string]; className?: string }) {
  return (
    <>
      {parts[0]} <span className={cn("text-green", className)}>{parts[1]}</span>
    </>
  );
}

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-ink/[0.05] px-3 py-1.5 text-[0.8125rem] text-ink/75 ring-1 ring-ink/10">
          {t}
        </li>
      ))}
    </ul>
  );
}

const sectionHead = "heading text-[clamp(2rem,1.4rem+2.2vw,3.25rem)] leading-[1.08] tracking-tight";

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedServices = service.related
    .map((r) => getService(r))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const contactHref = `/contact?service=${service.slug}`;

  const seo = serviceSeo[service.slug];
  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ];
  const description = seo?.description ?? service.summary;

  const jsonLd = graph(
    webPageSchema({ path, name: seo?.title ?? service.title, description, breadcrumb: true }),
    breadcrumbSchema(crumbs),
    {
      "@type": "Service",
      "@id": `${absoluteUrl(path)}#service`,
      name: seo?.h1 ?? service.title,
      serviceType: service.title,
      description: service.intro,
      url: absoluteUrl(path),
      provider: { "@id": ORG_ID },
      areaServed: site.areaServed.map((name) => ({ "@type": "Country", name })),
      mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.title,
        itemListElement: service.items.map((it) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: it.name, description: it.text },
        })),
      },
    },
    faqSchema(path, service.faqs),
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <section
        data-theme="paper"
        aria-labelledby="service-title"
        className="tex-paper relative bg-paper pb-20 pt-[calc(88px+2.5rem)] text-ink md:pb-28 md:pt-[calc(88px+4rem)]"
      >
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7" stagger={0.08}>
            <div data-reveal>
              <Breadcrumbs crumbs={crumbs} />
            </div>
            {/* The H1 carries the search phrase (eyebrow) and the brand headline. */}
            <h1 id="service-title" data-reveal className="mt-8">
              <Eyebrow as="span">
                Service {service.number} · {seo?.h1 ?? service.title}
              </Eyebrow>{" "}
              <span className="heading mt-6 block text-[clamp(2.5rem,1.6rem+3.6vw,4.75rem)] leading-[1.02] tracking-tight">
                <Accent parts={service.headline} />
              </span>
            </h1>
            <p data-reveal className="mt-8 max-w-xl text-lead leading-relaxed text-ink/75">
              {service.intro}
            </p>
            <div data-reveal className="mt-10 flex flex-wrap items-center gap-6">
              <ButtonLink href={contactHref} variant="ink" className="rounded-full">
                Start a project
              </ButtonLink>
              <Link href="/services" className="ui group inline-flex items-center gap-2 text-btn hover:text-green">
                All services
                <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:pt-16" y={40}>
            <aside className="rounded-2xl bg-white/55 p-6 ring-1 ring-ink/10 md:p-8">
              <h2 className="label text-ink/55">What you get</h2>
              <ul className="mt-4 space-y-2.5 text-small">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-ink/40" />
                    {d}
                  </li>
                ))}
              </ul>
              <h2 className="label mt-8 text-ink/55">Ways to work</h2>
              <div className="mt-3">
                <Chips items={engagementModels.map((m) => m.title)} />
              </div>
              <h2 className="label mt-8 text-ink/55">Tools we often use</h2>
              <div className="mt-3">
                <Chips items={service.tools} />
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* What we do */}
      <section data-theme="paper" aria-labelledby="what-title" className="tex-paper relative bg-paper pb-20 text-ink md:pb-28">
        <div className="container-x">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end" stagger={0.08}>
            <div className="lg:col-span-7">
              <div data-reveal>
                <Eyebrow>What we do</Eyebrow>
              </div>
              <h2 id="what-title" data-reveal className={cn(sectionHead, "mt-5")}>
                {service.whatWeDo.title[0]}
                <br />
                <span className="text-green">{service.whatWeDo.title[1]}</span>
              </h2>
            </div>
            <p data-reveal className="max-w-md text-lead leading-relaxed text-ink/75 lg:col-span-5">
              {service.whatWeDo.text}
            </p>
          </Reveal>

          {/* Each cell draws its own left line; the wrapper clips the first column's. */}
          <div className="mt-14 overflow-hidden border-b border-ink/15">
            <Reveal
              as="ul"
              className="grid sm:-ml-[calc(1.5rem+1px)] sm:grid-cols-2 lg:grid-cols-3"
              stagger={0.06}
              y={24}
            >
              {service.items.map((it) => (
                <li data-reveal key={it.name} className="border-t border-ink/15 py-8 sm:border-l sm:px-6">
                  <h3 className="heading text-h3">{it.name}</h3>
                  <p className="mt-3 max-w-sm text-small leading-relaxed text-ink/70">{it.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section data-theme="paper" aria-labelledby="how-title" className="relative bg-paper-deep py-20 text-ink md:py-28">
        <div className="container-x">
          <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end" stagger={0.08}>
            <div className="lg:col-span-7">
              <div data-reveal>
                <Eyebrow>How it works</Eyebrow>
              </div>
              <h2 id="how-title" data-reveal className={cn(sectionHead, "mt-5")}>
                {service.process.length === 4 ? "Four" : service.process.length} steps,{" "}
                <span className="text-green">no surprises.</span>
              </h2>
            </div>
            <p data-reveal className="max-w-md text-lead leading-relaxed text-ink/75 lg:col-span-5">
              You always know what we&apos;re working on, why it matters and what comes next.
            </p>
          </Reveal>

          <Reveal as="ol" className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" stagger={0.08} y={24}>
            {service.process.map((step, i) => (
              <li data-reveal key={step.title} className="border-t border-ink/25 pt-6">
                <span className="heading text-[2.75rem] font-light leading-none text-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="heading mt-6 text-h4 font-semibold">{step.title}</h3>
                <p className="mt-2 text-small leading-relaxed text-ink/70">{step.text}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Is it a fit? */}
      <section data-theme="paper" aria-labelledby="fit-title" className="tex-paper relative bg-paper py-20 text-ink md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" stagger={0.08}>
            <div data-reveal>
              <Eyebrow>Is it a fit?</Eyebrow>
            </div>
            <h2 id="fit-title" data-reveal className={cn(sectionHead, "mt-5")}>
              A good fit <span className="text-green">if…</span>
            </h2>
            <hr data-reveal className="mt-10 border-ink/15" />
            <p data-reveal className="mt-8 max-w-md text-lead leading-relaxed text-ink/80">
              {site.name} brings design, development and marketing under one roof, so your project
              has one team from the first call to launch and beyond.
            </p>
            <Link
              data-reveal
              href="/contact"
              className="ui group mt-6 inline-flex items-center gap-2 text-btn hover:text-green"
            >
              Talk to us
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal as="ul" className="border-b border-ink/15 lg:col-span-6 lg:col-start-7" stagger={0.06}>
            {service.fit.map((f) => (
              <li data-reveal key={f} className="flex gap-4 border-t border-ink/15 py-5 leading-relaxed">
                <span aria-hidden className="mt-[0.55em] size-2 shrink-0 rounded-[2px] bg-green" />
                {f}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Questions */}
      <section data-theme="paper" aria-labelledby="faq-title" className="relative bg-paper-deep py-20 text-ink md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" stagger={0.08}>
            <div data-reveal>
              <Eyebrow>Questions</Eyebrow>
            </div>
            <h2 id="faq-title" data-reveal className={cn(sectionHead, "mt-5")}>
              Good to <span className="text-green">know.</span>
            </h2>
            <p data-reveal className="mt-6 text-small text-ink/65">
              Something else?{" "}
              <Link href={contactHref} className="text-green underline underline-offset-4 hover:text-ink">
                Ask us directly.
              </Link>
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <div data-reveal>
              <FaqList faqs={service.faqs} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related services + closing line */}
      <section data-theme="paper" aria-labelledby="related-title" className="tex-paper relative bg-paper py-20 text-ink md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 id="related-title">
              <Eyebrow as="span">Related services</Eyebrow>
            </h2>
          </Reveal>
          <Reveal as="ul" className="mt-6 grid gap-4 md:grid-cols-3 md:gap-5" stagger={0.08} y={24}>
            {relatedServices.map((r) => (
              <li data-reveal key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col rounded-xl bg-white/55 p-6 ring-1 ring-ink/10 transition-all duration-300 hover:bg-white/80 hover:ring-ink/40 md:p-7"
                >
                  <span className="label text-ink/50">{r.number}</span>
                  <span className="mt-3 flex items-center justify-between gap-4">
                    <span className="heading text-h3">{r.title}</span>
                    <ArrowRight
                      aria-hidden
                      className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                  <span className="mt-3 text-small text-ink/65">{r.short}</span>
                </Link>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-20 flex flex-col gap-8 border-t border-ink/25 pt-12 md:mt-24 md:flex-row md:items-center md:justify-between md:pt-16">
            <p data-reveal className="heading max-w-3xl text-[clamp(1.875rem,1.3rem+2.2vw,3.25rem)] leading-[1.1] tracking-tight">
              <Accent parts={service.closing} />
            </p>
            <div data-reveal className="shrink-0">
              <ButtonLink href={contactHref} variant="ink" className="rounded-full">
                Start a project
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
