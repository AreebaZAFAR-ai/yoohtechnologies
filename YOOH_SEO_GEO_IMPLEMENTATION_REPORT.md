# YOOH Technologies — SEO & GEO Implementation Report

**Date:** 17 November 2026 · **Site:** https://www.yoohtechnologies.com/ · **Stack:** Next.js 15.5.29 (App Router), React 19, Tailwind CSS v4, deployed on Vercel

This report covers the audit, the changes made, how they were checked, and what is still left to do. Nothing here promises a ranking position. These changes remove technical blockers and give search engines and AI assistants clear, accurate information to work with.

---

## 1. Initial audit summary (before changes)

| # | Severity | Finding |
|---|---|---|
| 1 | **Critical** | Every canonical tag, the sitemap, robots.txt, `og:url` and JSON-LD pointed to **`https://yooh.tech`**. That domain is down (HTTP 523). Google was being told that the real pages are duplicates of a dead domain. The cause was a default value in `src/lib/site.ts`. |
| 2 | **High** | `og:image` pointed to `/og.jpg`, which **returns 404**. Social and AI link previews had no image. |
| 3 | **High** | When a page sets its own `openGraph`, Next.js replaces the layout's version instead of merging it. About, Services, Contact and every service page therefore had **no og:image, og:title, og:type or site name**. |
| 4 | High | The homepage H1 was only the brand name ("YOOH Technologies"). Service-page H1s were slogans that didn't include the service name, e.g. "Marketing that reaches the people who buy." |
| 5 | Medium | Titles were short and generic ("Services — YOOH Technologies", "About Us — …"). Service meta descriptions repeated the display summary. |
| 6 | Medium | Sitemap `lastmod` was set to the build time (`new Date()`), so every deploy claimed every page had changed. |
| 7 | Medium | robots.txt used a non-standard `Host:` line, also pointing at the wrong domain. |
| 8 | Medium | Structured data was split up: an Organization with no `@id`, no WebSite node, no breadcrumbs, no page-level schema, and an SVG logo. |
| 9 | Medium | There was no blog or informational content, so nothing could build topical authority or give AI assistants answers to cite. |
| 10 | Low | Invalid HTML: a `<p>` inside an `<h2>` in "Related services" on service pages. |
| 11 | Low | No analytics or Search Console hooks. No `llms.txt`. No apple-touch icon. |
| 12 | Info | `http://yoohtechnologies.com/` takes **two redirect hops**: http→https (apex), then apex→www. This is a Vercel domain setting, not app code (see §13). |
| 13 | Info | Things already done well: next/image with AVIF/WebP, `priority` only on above-the-fold images, good alt text, `next/font` with `display: swap`, every page statically prerendered, server-rendered text (the animations don't hide content from crawlers), trailing-slash URLs 308-redirected to clean URLs, and an accessible FAQ built on `<details>`. |

**Business facts the audit could not verify.** These need your input:
- `stats` in `src/lib/site.ts` shows **120+ projects, 85+ clients, 94% retention, 8 years**. The code comment says "Update these with the real figures". If these numbers aren't accurate, they are a trust and E-E-A-T risk. I did not repeat them anywhere new, and they are not in any schema.
- `site.contact` and all social URLs were empty. **Update (17 Nov 2026):** the owner supplied the email (`yoohtechnologies@yoohtechnologies.com`) and location (Pakistan), and both are now live in the footer, contact page, schema and llms.txt. Phone and social URLs are still empty.
- Template prices ($99) are marked as placeholders in `src/lib/templates.ts`, so no Product schema was added.

---

## 2. Technical issues fixed

1. The canonical origin is now hard-coded as `https://www.yoohtechnologies.com` in `src/lib/site.ts`. The env override was removed, so a preview deployment can never put another domain into canonical tags.
2. A shared `pageMetadata()` helper (`src/lib/seo.ts`) builds the complete set of tags for every page: title, description, self-referencing canonical, full Open Graph (type, site name, locale, url, title, description, image) and Twitter card.
3. Generated OG images: a site-wide card plus one per service and one per blog post, all in the brand palette and all returning 200 as PNG.
4. Canonicals are self-referencing on all 15 indexable URLs. The root layout no longer sets a canonical, so a page that forgets one can't inherit `/`.
5. The sitemap now uses real content dates and lists only canonical, indexable URLs (15).
6. robots.txt: removed `Host`, fixed the sitemap URL, and documented the crawler policy.
7. Removed the root `robots: index, follow` so it no longer conflicts with the 404 page's `noindex`. Added `max-image-preview:large` and `max-snippet:-1`.
8. Fixed the invalid heading HTML.
9. Added `public/logo.png` (512×512) as the Organization logo and `app/apple-icon.png` (180×180).

---

## 3. Files modified

| File | Change |
|---|---|
| `src/lib/site.ts` | Canonical origin, `areaServed`, Blog added to nav, `homeFaqs` |
| `src/lib/services.ts` | `serviceSeo` map (title, description, H1 phrase, `updated` date) and 6 new question-based FAQs, written from facts already on the site |
| `src/app/layout.tsx` | New default title/description, title template `%s \| YOOH Technologies`, verification env hooks, Organization + WebSite `@graph`, GA4 component |
| `src/app/page.tsx` | Home metadata, WebPage + FAQPage JSON-LD, new FAQ section |
| `src/components/home/Hero.tsx` | H1 now contains the brand plus "Custom Software, Web Development & AI Solutions for Growing Businesses". Added a supporting paragraph. Visual styles unchanged. |
| `src/app/services/page.tsx` | Metadata, CollectionPage + ItemList + FAQPage JSON-LD, keyword-descriptive intro |
| `src/app/services/[slug]/page.tsx` | Per-service metadata and OG image. The H1 now includes the search phrase in the existing eyebrow style. Shared Breadcrumbs component. Single `@graph` with WebPage, BreadcrumbList, Service (provider by `@id`, `areaServed`) and FAQPage. |
| `src/app/about/page.tsx` | Metadata, AboutPage JSON-LD, clear entity description under the H1 |
| `src/app/contact/page.tsx` | Metadata, ContactPage JSON-LD |
| `src/app/sitemap.ts` | Real `lastmod` dates; blog URLs included |
| `src/app/robots.ts` | Cleaned up and policy documented |
| `src/app/globals.css` | Added `.prose-yooh` article styles using existing brand tokens only |
| `README.md` | New env vars and SEO notes |

## 4. New files

| File | Purpose |
|---|---|
| `src/lib/seo.ts` | `pageMetadata()`, `absoluteUrl()` and JSON-LD builders: organization, website, webPage, breadcrumb, faq, graph |
| `src/lib/og.tsx`, `src/app/opengraph-image.tsx`, `src/app/services/[slug]/opengraph-image.tsx`, `src/app/blog/[slug]/opengraph-image.tsx` | Generated 1200×630 OG cards |
| `src/components/seo/JsonLd.tsx` | Safe server-rendered JSON-LD (escapes `<`) |
| `src/components/seo/Breadcrumbs.tsx` | Visible breadcrumbs that match the BreadcrumbList schema |
| `src/components/seo/Analytics.tsx` | GA4, loaded only when the env var is set |
| `src/components/ui/Eyebrow.tsx` | Shared eyebrow; `as="span"` lets it sit inside a heading |
| `src/components/home/HomeFaq.tsx` | Answer-first home FAQ and service links |
| `src/lib/blog.ts`, `src/lib/blog-types.ts`, `src/content/blog/*.tsx` | Blog registry and 3 articles |
| `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx` | Blog index and article pages: BlogPosting, Breadcrumb, FAQ schema; related services; more articles |
| `src/app/llms.txt/route.ts` | `/llms.txt`, generated from site data |
| `public/logo.png`, `src/app/apple-icon.png` | Raster logo and touch icon |

---

## 5. Metadata per page (verified in rendered HTML)

| URL | Title | Description length |
|---|---|---|
| `/` | YOOH Technologies \| Software Development, AI & Digital Solutions | 156 |
| `/about` | About YOOH Technologies \| Software & Digital Agency | 162 |
| `/services` | Services: Web, Apps, AI & Marketing \| YOOH Technologies | 147 |
| `/services/website-development` | Website Development Services \| YOOH Technologies | 156 |
| `/services/app-development` | Mobile App Development – iOS & Android \| YOOH Technologies | 157 |
| `/services/e-commerce` | E-commerce Website Development \| YOOH Technologies | 159 |
| `/services/ui-ux-design` | UI/UX Design Services for Web & Mobile \| YOOH Technologies | 156 |
| `/services/digital-marketing` | Digital Marketing & SEO Services \| YOOH Technologies | 158 |
| `/services/ai-automation` | AI Automation Services for Businesses \| YOOH Technologies | 156 |
| `/services/google-map-business` | Google Business Profile Management \| YOOH Technologies | 150 |
| `/blog` | Blog: Web, Software & AI Guides \| YOOH Technologies | 152 |
| `/blog/custom-website-vs-template-website` | Custom Website vs Template Website: Which Should You Choose? | 152 |
| `/blog/custom-software-vs-off-the-shelf` | Custom Software vs Off-the-Shelf Software: How to Decide | 154 |
| `/blog/ai-automation-for-small-businesses` | AI Automation for Small Businesses: A Practical Guide | 159 |
| `/contact` | Contact YOOH Technologies – Start Your Project | 161 |

Every title and description is unique. Each page has exactly one H1 and a canonical equal to its own URL.

### Keyword-to-URL map (prevents cannibalisation)

| Primary topic / keywords | Target URL |
|---|---|
| YOOH Technologies (brand), software development company, digital solutions agency, custom software development | `/` |
| website development services, business website development, custom website development | `/services/website-development` |
| mobile app development company, Android / iOS app development | `/services/app-development` |
| e-commerce website development, Shopify / WooCommerce development, online store development | `/services/e-commerce` |
| UI UX design agency, website / mobile app UI UX design | `/services/ui-ux-design` |
| digital marketing agency, SEO services, social media marketing | `/services/digital-marketing` |
| AI automation services, business process automation, AI workflow automation, AI agents | `/services/ai-automation` |
| Google Business Profile management, Google Maps ranking, local SEO | `/services/google-map-business` |
| custom vs template website (informational) | `/blog/custom-website-vs-template-website` |
| custom vs off-the-shelf software (informational) | `/blog/custom-software-vs-off-the-shelf` |
| AI automation for small businesses, automate lead generation (informational) | `/blog/ai-automation-for-small-businesses` |
| about / company entity | `/about` |

**Gap:** *custom software development*, *SaaS development* and *CRM integrations* have no dedicated page. The `software-development` service page was deliberately removed this month and now redirects to website development. I didn't recreate it because that would reverse your decision. If custom software and SaaS are still core offerings, a dedicated page backed by real project examples is the biggest content opportunity left (see §16).

---

## 6. Structured data implemented

Each page outputs one `@graph`. Every node references the same `Organization` (`/#organization`) and `WebSite` (`/#website`) by `@id`, so no conflicting duplicate entities are created.

| Type | Where |
|---|---|
| Organization (logo ImageObject, slogan, description, email, `address` with `addressCountry: PK`, `contactPoint` with email, knowsAbout, areaServed; `sameAs` added automatically once social URLs are filled in) | All pages |
| WebSite (publisher → Organization) | All pages |
| WebPage / AboutPage / ContactPage / CollectionPage | Each page |
| Service + OfferCatalog (provider by @id, areaServed) | 7 service pages |
| BreadcrumbList (matches the visible breadcrumbs) | Service pages, blog posts |
| FAQPage (matches the visible FAQs) | Home, Services, each service, each post |
| ItemList | `/services` |
| Blog, BlogPosting (author/publisher = Organization, dates, image) | `/blog`, posts |

**Deliberately not added:** AggregateRating or Review (no verifiable review source), LocalBusiness (no confirmed public address), Product for templates (prices are placeholders).

*Note:* since 2023 Google shows FAQ rich results only for authoritative government and health sites. FAQPage markup is still valid and helps machines read the content, but don't expect FAQ snippets in Google results.

---

## 7. Sitemap & robots.txt status

- `/sitemap.xml`: 15 canonical URLs with real `lastmod` dates. Excludes `/api/*`, the 404 page and redirecting URLs. **When you edit a page, update its date** in `src/app/sitemap.ts`, in `serviceSeo[slug].updated`, or in the post's `updated` field.
- `/robots.txt`: `Allow: /`, `Disallow: /api/`, `Sitemap: https://www.yoohtechnologies.com/sitemap.xml`. CSS, JS and images are not blocked.
- **AI crawler policy:** all crawlers are allowed, including GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot and Google-Extended, because being cited by AI search is one of your stated goals. To opt out of AI *training* while staying visible in AI *search*, uncomment the pattern documented in `src/app/robots.ts`. That's a business decision, so I left the existing allow-all policy in place.

## 8. Canonical & redirect status

| Check | Result |
|---|---|
| Self-referencing canonicals on all 15 URLs | ✅ verified locally |
| `/about/` → `/about` | ✅ 308 (Next.js default) |
| Old service URLs (`/services/software-development` etc.) | 307 **temporary** redirects (unchanged). If those services won't return, switch to `permanent: true` in `next.config.ts`. |
| `https://yoohtechnologies.com` → `https://www…` | ✅ 308, one hop (checked against live) |
| `http://yoohtechnologies.com` → https apex → www | ⚠️ **two hops**. Fix in Vercel → Project → Settings → Domains: make sure the apex is set to *Redirect to www.yoohtechnologies.com* with 308. The http→https hop is enforced by Vercel and is harmless. |
| `http://www…` → `https://www…` | ✅ one hop |
| Query parameters (`/contact?service=…`) | ✅ canonical strips them |

## 9. International SEO

- **Strategy:** one strong global English site (`lang="en"`, `og:locale en_US`) with `areaServed` set to Pakistan, United States, United Kingdom, Canada and Australia in the Organization and Service schema.
- **No `/locations/*` pages and no hreflang were created.** There is currently no genuinely localised content (local pricing, local case studies, local contact arrangements). Pages that only swap the country name are thin and duplicative, and hreflang is only correct when real alternate pages exist.
- **When to add them:** once you have at least one real client example, pricing or engagement details, and a contact route specific to a market. Then create `/locations/<country>`. Hreflang isn't needed for same-language market pages unless they're true alternates of each other.
- **Location confirmed by the owner:** YOOH Technologies is a software house based in Pakistan. This is now stated on the About page, in the home FAQ, in llms.txt and in the Organization `address` (country only). Adding a city would strengthen the local signal for Pakistani searches. Only add a LocalBusiness schema or Google Business Profile if there is an eligible public address or service area.

## 10. GEO (AI-search) improvements

- **Clear entity:** consistent name, URL, logo, description and `@id` on every page. The About page now opens with a plain-language statement of who YOOH is.
- **Answer-first content:** the home FAQ (6 questions), 6 new service FAQs, and three articles. Each article opens with a bolded "Short answer" and then expands under question-style H2s ("What is AI business automation?", "How to automate lead generation…").
- **Internal linking:** the home FAQ links to every service. Articles link to the relevant services, templates and contact page, and each one shows related services and more articles.
- **`/llms.txt`:** generated from the same data as the pages, so it can't drift out of date. This is an experiment; no major engine has confirmed it uses llms.txt.
- **Rendered HTML:** all content is in the server-rendered HTML (checked with the raw HTML fetch), so crawlers that don't run JavaScript still see it.
- I can't claim that any AI crawler has indexed the site. Nothing here verified that.

## 11. Performance

There was no regression. Everything is still statically prerendered. The shared JS stayed at 103 kB, and the home First Load is 154 kB (one small server component added). The new pages ship no new client JS beyond the existing reveal components. OG images are generated at build time. Image handling was already strong and was left as it was.
**Not measured:** real-user Core Web Vitals (LCP/INP/CLS). These need field data from the Search Console CWV report or PageSpeed Insights once deployed. One candidate to watch: GSAP, SplitText and Lenis load on every page, so INP on low-end mobile is the metric most at risk.

## 12. Build & validation results (actually executed)

| Check | Result |
|---|---|
| `npx tsc --noEmit` | ✅ pass |
| `npm run lint` (ESLint) | ✅ pass, no warnings |
| `npm run build` | ✅ pass, 35 static pages |
| Rendered-HTML audit of all 15 sitemap URLs on the local production server | ✅ 0 problems: status 200, canonical correct, og:url correct, og:image and twitter:image present, exactly 1 H1, no noindex, unique titles and descriptions |
| JSON-LD parse on every page | ✅ all valid JSON; types as listed in §6 |
| Internal link check (17 unique internal links) | ✅ all 200 |
| All 11 OG image URLs, `/logo.png`, `/apple-icon.png`, `/robots.txt`, `/llms.txt` | ✅ 200 with correct content types |
| 404 page | ✅ 404 status and `noindex` |
| Visual check (headless Edge, desktop) | ✅ service and article layouts consistent with the existing design |
| **Not done** | Google Rich Results Test and Schema.org validator (need public URLs). Real phone check: headless capture can't emulate 390px. Lighthouse and field CWV. |

---

## 13. Manual actions required (priority order)

1. **Deploy**, then check the live `view-source:` canonical on the homepage. It must be `https://www.yoohtechnologies.com`.
2. **Vercel env:** remove `NEXT_PUBLIC_SITE_URL` if it's set (it's no longer used). Optionally add `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`.
3. **Vercel domains:** make the apex redirect to www in a single 308 hop (§8).
4. **Fill in the remaining business details** in `src/lib/site.ts`: phone and social URLs (LinkedIn, Instagram, Facebook). The email and country are done. These flow automatically into the footer, the contact page and the Organization schema.
5. **Verify or replace the stats** (120+ / 85+ / 94% / 8 years).
6. **Review the three articles** before deploying. Ideally add a named author with a short bio, then change `author` in `src/app/blog/[slug]/page.tsx` to a Person.
7. **Privacy Policy and Terms:** the contact form collects personal data, so a privacy policy is needed. It requires your legal entity and jurisdiction, so I didn't write it. Add `/privacy` and `/terms` and link them in the footer and sitemap.
8. Decide whether the old service redirects should be permanent (§8).
9. Check on a real phone that the longer home H1 subline wraps well at 360–414px widths.

## 14. Google Search Console

1. Go to https://search.google.com/search-console → **Add property** → **Domain** → `yoohtechnologies.com`. Add the TXT record at your DNS provider. This covers all variants. Alternatively, use a URL-prefix property with the HTML tag set via `GOOGLE_SITE_VERIFICATION`.
2. **Sitemaps** → submit `https://www.yoohtechnologies.com/sitemap.xml`.
3. **URL Inspection** → inspect `/`, then click *Request indexing*. Repeat for the key service pages and the blog.
4. After 3–7 days, check **Pages** (indexed vs not indexed), **Enhancements** (breadcrumbs) and **Core Web Vitals**.
5. If the old `yooh.tech` canonical caused "Duplicate, Google chose different canonical", re-inspect those URLs after deploying.

## 15. Bing Webmaster Tools

1. https://www.bing.com/webmasters → **Import from Google Search Console** (fastest), or add the site and verify with `BING_SITE_VERIFICATION` or DNS.
2. Submit the sitemap. Optionally enable **IndexNow**.
3. Bing's index powers ChatGPT search and Copilot results, so this matters for GEO.

### Monitoring: what to watch
| Metric | Where | Why |
|---|---|---|
| Organic clicks, impressions, CTR, average position | GSC → Performance | Filter by page (service URLs) and by query (brand vs non-brand) |
| Indexed URLs | GSC → Pages | Should approach 15. Investigate any "Crawled – not indexed". |
| Search queries | GSC → Queries | Find questions to answer in new FAQs and articles |
| Organic conversions | GA4 → mark `generate_lead` (contact form submit) as a key event; filter by Session default channel group = Organic Search | The real business outcome |
| Core Web Vitals | GSC → CWV, PageSpeed Insights | Target LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 |
| AI referrals | GA4 → Traffic acquisition, referrers chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com | GEO signal |

GA4 sends a page_view on load and on client-side navigation through enhanced measurement. Don't add manual page_view events, or views will be double-counted. A `generate_lead` event on form success hasn't been wired yet. Add it in `ContactForm.tsx` once GA is live.

### Citation and brand-profile checklist
Use exactly the same **name** (YOOH Technologies), **URL** (https://www.yoohtechnologies.com/), **logo** (`/logo.png`), **one-line description** and **contact details** everywhere:
- [ ] LinkedIn company page
- [ ] Facebook page
- [ ] Instagram
- [ ] Google Business Profile (only if you have an eligible address or service area)
- [ ] Clutch (needs verified client reviews; ask real clients)
- [ ] GoodFirms, DesignRush, Sortlist (genuine profiles only)
- [ ] P@SHA / relevant Pakistani tech directories (if a member)
- [ ] GitHub organisation (if you publish code)
- [ ] Then add every live profile URL to `site.socials`

Never buy links or post fake reviews. Earn links through guest articles, partner pages, open-source work and case studies.

---

## 16. Recommended next 30 days

| Week | Work |
|---|---|
| 1 | Deploy; complete §13 items 1–5; set up GSC and Bing and submit sitemaps; create LinkedIn and other profiles with consistent NAP |
| 2 | Publish 2–3 **real case studies** (the WhatsApp testimonials show real real-estate and SaaS projects; ask those clients for permission). This is the strongest E-E-A-T lever. Add a `/work` route and link it from services. |
| 2 | Privacy Policy + Terms pages |
| 3 | Decide on a **Custom Software / SaaS Development** service page and write it with genuine examples; add it to `services.ts` |
| 3 | Write 2 more articles from real client questions (suggested: "How Much Does Website Development Cost?" with *your* actual price ranges; "How to Choose a Web Development Company") |
| 4 | Review GSC queries; refine titles with low CTR; add FAQs that answer the queries you see; request Clutch reviews from 2–3 clients |
| 4 | Run PageSpeed Insights on home and two service pages; if mobile INP is above 200 ms, profile the GSAP/Lenis start-up cost |

---

## 17. Checklist

### Completed and verified
- [x] Canonical domain bug fixed (yooh.tech → www.yoohtechnologies.com)
- [x] Unique titles and descriptions on all 15 pages
- [x] Self-referencing canonicals
- [x] Complete Open Graph and Twitter tags plus generated OG images
- [x] One keyword-relevant H1 per page
- [x] Sitemap with real lastmod dates
- [x] robots.txt fixed, crawler policy documented
- [x] Organization / WebSite / WebPage / Service / Breadcrumb / FAQ / Blog / BlogPosting JSON-LD
- [x] Blog architecture plus 3 articles
- [x] Home FAQ and 6 new service FAQs
- [x] llms.txt
- [x] GA4 and Search Console / Bing verification hooks (env-driven)
- [x] Raster logo and apple-touch icon
- [x] Invalid heading HTML fixed
- [x] tsc, lint, build, rendered-HTML audit and link check pass

### Pending (needs the owner)
- [ ] Deploy and confirm the live canonical
- [ ] Single-hop apex redirect in Vercel
- [x] Email and country (Pakistan) added
- [ ] Phone number and social URLs
- [ ] Verify or replace the stats
- [ ] Review articles; named author
- [ ] Privacy Policy and Terms
- [ ] Case studies / portfolio
- [ ] Custom software / SaaS page decision
- [ ] Permanent vs temporary legacy redirects
- [ ] GSC, Bing and GA4 set up
- [ ] Directory and citation profiles

### Unverified (can only be checked after deploying)
- [ ] Google Rich Results Test and Schema.org validator on live URLs
- [ ] Real-user Core Web Vitals
- [ ] Real mobile device rendering of the updated hero
- [ ] Indexing status in Google and Bing
- [ ] Any AI-assistant citation of the site
