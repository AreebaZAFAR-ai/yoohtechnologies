/**
 * Global site configuration.
 * Contact details and social URLs are intentionally empty until real
 * details are supplied — components hide anything that is not set.
 */
export const site = {
  name: "YOOH Technologies",
  shortName: "YOOH",
  tagline: "Software. Marketing. Growth.",
  message:
    "We build digital experiences, develop intelligent solutions, and help businesses grow.",
  description:
    "YOOH Technologies is a multidisciplinary technology, software, digital marketing and business growth agency. Software. Marketing. Growth.",
  /**
   * Canonical origin (HTTPS + www, no trailing slash). Every canonical URL, the sitemap,
   * robots.txt, Open Graph tags and JSON-LD are built from this, so it is deliberately
   * hard-coded: an env override on a preview deployment must never leak a non-production
   * domain into canonical tags (the old default, yooh.tech, did exactly that).
   */
  url: "https://www.yoohtechnologies.com",
  /** Markets the business serves — used for schema `areaServed`. */
  areaServed: ["Pakistan", "United States", "United Kingdom", "Canada", "Australia"],
  /** Fill these in when real details are available. */
  contact: {
    email: "yoohtechnologies@yoohtechnologies.com",
    phone: "",
    /** Shown in the footer and on the contact page. Add a city/street only if you want it public. */
    address: "Pakistan",
    /** ISO 3166-1 country code for schema PostalAddress. */
    country: "PK",
  },
  socials: [
    { label: "Instagram", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "Facebook", href: "" },
  ],
} as const;

/** Words in the lime scrolling belt (home hero + Why YOOH). */
export const disciplineBelt = [
  "Software",
  "Marketing",
  "Growth",
  "AI & Automation",
  "Branding",
  "Design",
];

/** Home stat bar (counts up from 0). Update these with the real figures. */
export const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 85, suffix: "+", label: "Happy Clients" },
  { value: 94, suffix: "%", label: "Retention Rate" },
  { value: 8, suffix: "", label: "Years Experience" },
];

/** "Working together" — engagement models (Services page, linked from each service). */
export const engagementModels = [
  {
    tag: "Project",
    title: "Fixed-scope project",
    text: "A defined scope, timeline and price — ideal for websites, apps, stores and launches.",
    points: ["Clear scope and milestones", "A fixed quote up front", "Handover and training"],
  },
  {
    tag: "Team",
    title: "Dedicated team",
    text: "A YOOH team working as an extension of yours, month to month.",
    points: ["Flexible monthly capacity", "Direct access to designers and developers", "Weekly progress check-ins"],
  },
  {
    tag: "Care",
    title: "Care & growth",
    text: "Ongoing support, improvements and marketing after launch.",
    points: ["Updates, backups and monitoring", "Priority fixes", "Monthly reporting"],
  },
];

/** General questions on the Services page. */
export const servicesFaqs = [
  {
    q: "How do we get started?",
    a: "Book a free call through the contact page. We will talk through your goals, suggest the right service and send a clear proposal.",
  },
  {
    q: "Can you handle several services at once?",
    a: "Yes. Many clients combine a website or app with marketing and Google Business Profile management — one team keeps it all consistent.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes. We work with startups, local businesses and growing companies, and scope every project to fit the budget and stage.",
  },
  {
    q: "How do you price projects?",
    a: "Fixed-scope work gets a fixed quote; ongoing work is billed monthly. You always see the cost before anything starts.",
  },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Home-page questions. Written as direct answers so search engines and AI assistants can
 * quote them; every answer reflects what is stated elsewhere on the site — keep it that way.
 */
export const homeFaqs = [
  {
    q: "What does YOOH Technologies do?",
    a: "YOOH Technologies is a software development and digital solutions agency. We build websites, mobile apps, online stores and custom software, automate business processes with AI, design user interfaces, and run digital marketing, SEO and Google Business Profile management — all with one team.",
  },
  {
    q: "Where is YOOH Technologies based, and who do you work with?",
    a: "YOOH Technologies is a software house based in Pakistan. We work with startups, local businesses and growing companies in Pakistan and internationally — projects run remotely with clear milestones and regular check-ins, so we can work with clients wherever they are.",
  },
  {
    q: "How much does website or app development cost?",
    a: "It depends on scope: the number of pages or screens, features, integrations and content. After a free call we send a fixed quote for fixed-scope work, so you see the cost before anything starts. Ready-made website templates are available for a faster, lower-cost launch.",
  },
  {
    q: "How long does a project take?",
    a: "A focused business website usually takes three to six weeks, and most AI automation pilots take two to four weeks. Apps and larger platforms are planned in phases. You get a timeline with your proposal.",
  },
  {
    q: "What is AI business automation?",
    a: "Using software — including AI models where they genuinely help — to handle repetitive work such as capturing and following up on leads, moving data between tools, drafting replies and producing reports, while people keep control of decisions that need judgment.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Our Care & growth plans cover updates, backups, monitoring, priority fixes and monthly reporting, and we can continue with marketing and SEO once you are live.",
  },
];

export const principles = [
  {
    title: "Strategic Thinking",
    text: "We align technology and creativity with business objectives.",
  },
  {
    title: "Creative Execution",
    text: "We turn ambitious ideas into distinctive digital experiences.",
  },
  {
    title: "Smart Technology",
    text: "We develop scalable, intelligent, and performance-driven solutions.",
  },
  {
    title: "Growth Mindset",
    text: "We focus on measurable outcomes and long-term business growth.",
  },
] as const;

export const processSteps = [
  {
    title: "Discover",
    text: "Understand the business, audience, and objectives.",
  },
  {
    title: "Strategize",
    text: "Develop the right creative and technical direction.",
  },
  { title: "Build", text: "Design, develop, and execute the solution." },
  { title: "Grow", text: "Optimize, measure, and improve performance." },
] as const;
