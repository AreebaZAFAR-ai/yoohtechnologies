import type { Metadata, Viewport } from "next";
import { Anton, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/seo/Analytics";
import { graph, organizationSchema, websiteSchema } from "@/lib/seo";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const homeTitle = `${site.name} | Software Development, AI & Digital Solutions`;
const homeDescription =
  "YOOH Technologies builds custom software, websites and mobile apps, AI automation, e-commerce stores and digital marketing for growing businesses worldwide.";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s | ${site.name}`,
  },
  description: homeDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: homeTitle,
    description: homeDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
  // Indexing is the default, so no index/follow here (it would contradict the 404 page's noindex);
  // only allow large image previews and full snippets, which help AI Overviews and Discover.
  robots: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#ede9dc",
  width: "device-width",
  initialScale: 1,
};

/** Site-wide entity graph: one Organization + one WebSite, referenced by @id from every page. */
const siteJsonLd = graph(
  organizationSchema([
    ...services.map((s) => s.title),
    "Custom Software Development",
    "SaaS Development",
    "CRM and Business Integrations",
    "Search Engine Optimization",
  ]),
  websiteSchema(),
);

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
        <JsonLd data={siteJsonLd} />
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
        <Analytics />
      </body>
    </html>
  );
}
