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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yooh.tech",
  /** Fill these in when real details are available. */
  contact: {
    email: "",
    phone: "",
    address: "",
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
  { label: "Contact", href: "/contact" },
] as const;

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
