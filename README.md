# YOOH Technologies — Website

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText · Lenis · Lucide

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit content

| What | File |
| --- | --- |
| Site name, URL, contact details, social links | `src/lib/site.ts` |
| Services (6) and their detail-page content | `src/lib/services.ts` |
| Portfolio projects | `src/lib/projects.ts` |
| Brand colours, fonts, textures | `src/app/globals.css` (`@theme`) |
| Images | `public/images/` (cropped from `../gallery`) |

Contact details and social URLs are empty on purpose — anything left blank is hidden.
The portfolio only contains YOOH's own brand work from the gallery plus one
"next case study" placeholder; no clients, testimonials or statistics are invented.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL used for canonical links, sitemap and Open Graph (default `https://yooh.tech`) |
| `RESEND_API_KEY` | Enables contact-form email delivery via resend.com |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | Verified sender (optional) |

Without the Resend variables the form validates and logs enquiries in development,
and returns a clear "being set up" message in production so no lead is silently lost.

## Brand palette (sampled from the gallery artwork)

Pink `#FC90B5` · Forest green `#305429` · Moss `#4A7236` · Lime `#D7F841` ·
Ink `#050505` · Concrete `#9C9A95` · Paper `#EDE9DC` · Signal orange `#E4572E` (tiny accents only)
