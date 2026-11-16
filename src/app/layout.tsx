import type { Metadata, Viewport } from "next";
import { Anton, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Software. Marketing. Growth.`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "website development",
    "app development",
    "UI/UX design",
    "e-commerce",
    "digital marketing",
    "Google Business Profile",
    "AI automation",
    "digital agency",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Software. Marketing. Growth.`,
    description: site.description,
    url: "/",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "YOOH Technologies — Software. Marketing. Growth." }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Software. Marketing. Growth.`,
    description: site.description,
    images: ["/og.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ede9dc",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  slogan: site.tagline,
  description: site.description,
  knowsAbout: services.map((s) => s.title),
  ...(site.contact.email ? { email: site.contact.email } : {}),
  ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
  ...(site.socials.some((s) => s.href)
    ? { sameAs: site.socials.filter((s) => s.href).map((s) => s.href) }
    : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${space.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Flag motion support before paint so hero elements don't flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion-ok')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="ui fixed left-4 top-4 z-[90] -translate-y-24 bg-lime px-4 py-3 text-btn text-ink focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
