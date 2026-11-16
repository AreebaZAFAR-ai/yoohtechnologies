import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/services";
import { TornEdge } from "@/components/ui/Marks";

/**
 * Footer: brand + three link columns, a wide team photo, the company name set large, and a
 * small bottom bar.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const { email, phone, address } = site.contact;

  return (
    <footer data-theme="paper" className="tex-paper relative overflow-x-clip bg-paper text-ink">
      <TornEdge className="text-paper" seed={11} />

      <div className="container-x relative pt-20 lg:pt-24">
        {/* Top: brand + link columns */}
        <div className="grid gap-12 pb-14 lg:grid-cols-12 lg:gap-8 lg:pb-16">
          <div className="flex flex-col justify-between gap-8 lg:col-span-5">
            <div>
              <Link href="/" className="heading text-xl font-semibold">
                {site.name}
              </Link>
              <p className="mt-4 max-w-xs text-small leading-relaxed text-ink/70">{site.message}</p>
            </div>
            <p className="label text-ink/50">{site.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <FooterCol title="Pages">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-line hover:text-green">
                    {l.label}
                  </Link>
                </li>
              ))}
            </FooterCol>

            <FooterCol title="Services">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="link-line hover:text-green">
                    {s.title}
                  </Link>
                </li>
              ))}
            </FooterCol>

            <FooterCol title="Connect">
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="link-line break-all hover:text-green">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="link-line hover:text-green">
                    {phone}
                  </a>
                </li>
              )}
              {address && <li className="text-ink/70">{address}</li>}
              {site.socials.map((s) =>
                s.href ? (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line inline-flex items-center gap-1 hover:text-green"
                    >
                      {s.label} <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  </li>
                ) : (
                  <li key={s.label} className="text-ink/50">
                    {s.label}
                  </li>
                ),
              )}
              <li className="pt-2">
                <Link href="/contact" className="link-line font-semibold hover:text-green">
                  Start a project
                </Link>
              </li>
            </FooterCol>
          </div>
        </div>

        {/* Photo */}
        <div className="border-t border-ink/15 pt-6">
          <Image
            src="/images/footer-logo.webp"
            width={445}
            height={454}
            alt="YOOH Technologies: Software. Marketing. Digital."
            sizes="(min-width: 640px) 400px, 80vw"
            className="mx-auto h-auto w-[min(80vw,400px)] rounded-xl"
          />
        </div>

        {/* Company name, set large */}
        <p
          aria-hidden
          className="display select-none whitespace-nowrap py-8 text-center text-[clamp(2.25rem,9vw,9.5rem)] leading-[0.9] text-green md:py-10"
        >
          {site.name}
        </p>

        {/* Bottom bar */}
        <div className="grid grid-cols-1 gap-2 border-t border-ink/15 py-6 text-center sm:grid-cols-3 sm:text-left">
          <p className="label text-ink/60">
            © {year} {site.name}
          </p>
          <p className="label text-ink/60 sm:text-center">All rights reserved</p>
          <p className="label text-ink/60 sm:text-right">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="label mb-5 text-ink/50">{title}</h2>
      <ul className="space-y-2.5 text-small">{children}</ul>
    </div>
  );
}
