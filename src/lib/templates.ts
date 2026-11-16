/**
 * Website template shop.
 *
 * PRICES AND CURRENCY BELOW ARE PLACEHOLDERS — edit them here; every
 * part of the site reads from this file. There is no checkout yet: "Buy"
 * buttons open the contact form with the template pre-filled.
 */
export const CURRENCY = "$";

export type Template = {
  slug: string;
  name: string;
  category: string;
  url: string;
  /** One-off price for a single template licence. */
  price: number;
  /** Tall full-page screenshot — must be 900×3375 (TemplateShowcase relies on that ratio); the card scrolls through it on hover. */
  image: { src: string; alt: string };
};

export const templates: Template[] = [
  {
    slug: "pearls",
    name: "Pearls",
    category: "Jewellery store",
    url: "https://pearls-jewelry-website.vercel.app/",
    price: 99,
    image: { src: "/images/templates/pearls-full.webp", alt: "Pearls jewellery website template home page" },
  },
  {
    slug: "skin-aesthetics",
    name: "Skin Aesthetics",
    category: "Clinic & beauty",
    url: "https://aesthetic-clinic-black.vercel.app/",
    price: 99,
    image: {
      src: "/images/templates/skin-aesthetics-full.webp",
      alt: "Skin Aesthetics clinic website template with the headline Your skin, thoughtfully perfected",
    },
  },
  {
    slug: "orelle",
    name: "Orelle",
    category: "Fashion & clothing",
    url: "https://clothing-website-gamma-nine.vercel.app/",
    price: 99,
    image: {
      src: "/images/templates/orelle-full.webp",
      alt: "Orelle clothing website template with the headline Quiet form, lasting presence",
    },
  },
  {
    slug: "trueline",
    name: "TrueLine",
    category: "Plumbing & local services",
    url: "https://true-line-plumbing-service-website.vercel.app/",
    price: 99,
    image: {
      src: "/images/templates/trueline-full.webp",
      alt: "TrueLine plumbing website template with the headline Dependable Plumbing, Done Right Every Time",
    },
  },
  {
    slug: "noctra",
    name: "Noctra",
    category: "Car dealership",
    url: "https://noctra-cars.vercel.app/",
    price: 99,
    image: {
      src: "/images/templates/noctra-full.webp",
      alt: "Noctra car dealership website template with the headline Find Your Next Drive",
    },
  },
];

/** Contact-form link with the template pre-filled. */
export function enquiryHref(subject: string) {
  const message = `Hi YOOH, I'm interested in ${subject}. Please send me the next steps.`;
  return `/contact?topic=templates&message=${encodeURIComponent(message)}`;
}
