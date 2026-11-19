import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { TornEdge } from "@/components/ui/Marks";
import { site } from "@/lib/site";
import { topics } from "@/lib/contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Contact YOOH Technologies – Start Your Project";
const description =
  "Contact YOOH Technologies about a website, mobile app, AI automation, e-commerce store or digital marketing. Tell us about your project and get a clear proposal.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact", absoluteTitle: true });

const jsonLd = graph(webPageSchema({ type: "ContactPage", path: "/contact", name: title, description }));

export default function ContactPage() {
  const hasContact = site.contact.email || site.contact.phone || site.contact.address;
  const socials = site.socials.filter((s) => s.href);

  return (
    <>
      <JsonLd data={jsonLd} />
      {/* Photo hero */}
      <section
        data-theme="green"
        aria-labelledby="contact-title"
        className="tex-felt on-dark relative overflow-hidden bg-green pb-16 pt-[calc(72px+3rem)] text-paper md:pb-24 md:pt-[calc(72px+4rem)]"
      >
        <div className="container-x grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <Reveal stagger={0.1}>
            <p data-reveal className="label text-paper/70">
              Contact — Start a project
            </p>
            <RevealText
              as="h1"
              id="contact-title"
              type="chars"
              immediate
              className="display mt-6 text-[clamp(3.5rem,2rem+6vw,8rem)]"
            >
              Contact us
            </RevealText>
            <p data-reveal className="mt-6 max-w-md text-lead leading-relaxed text-paper/80">
              Have an idea, a challenge, or a business ready for its next stage of growth? We&apos;d
              love to hear about it.
            </p>
          </Reveal>

          {/* 4:5 frame: only trims plain wall/desk from the 2:3 photo, keeps the phone whole */}
          <div className="mx-auto w-full max-w-[min(100%,calc(78svh*4/5))] md:ml-auto md:mr-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-paper/15">
              <Image
                src="/images/contact-phone.webp"
                alt="A vintage green rotary telephone on a wooden desk"
                fill
                priority
                sizes="(min-width:768px) 45vw, 92vw"
                className="object-cover object-[50%_65%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section data-theme="paper" aria-labelledby="form-title" className="tex-paper relative bg-paper pb-24 pt-20 text-ink md:pb-36 md:pt-28">
        <TornEdge className="text-paper" seed={61} />
        <div className="container-x">
          <Reveal className="text-center" stagger={0.1}>
            <h2 data-reveal id="form-title" className="heading text-[clamp(2.25rem,1.4rem+3.4vw,4.5rem)] leading-[1.05] text-green">
              Tell us about
              <br />
              your project
            </h2>
            <p data-reveal className="mx-auto mt-6 max-w-lg text-lead text-ink/75">
              Share a few details and let&apos;s build something meaningful together.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 max-w-[760px] md:mt-20">
            <Suspense fallback={<div className="min-h-[900px]" />}>
              <ContactForm topics={topics} />
            </Suspense>

            {(hasContact || socials.length > 0) && (
              <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-ink/15 pt-10 text-center text-ink/75">
                {site.contact.email && (
                  <a href={`mailto:${site.contact.email}`} className="link-line hover:text-green">
                    {site.contact.email}
                  </a>
                )}
                {site.contact.phone && (
                  <a href={`tel:${site.contact.phone}`} className="link-line hover:text-green">
                    {site.contact.phone}
                  </a>
                )}
                {site.contact.address && <p>{site.contact.address}</p>}
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="link-line label hover:text-green">
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
