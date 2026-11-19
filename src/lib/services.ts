export type ServiceItem = { name: string; text: string };

export type Service = {
  slug: string;
  number: string;
  title: string;
  /** One-word poster tag, e.g. "BUILD" */
  tag: string;
  /** Short line for menus and related-service cards. */
  short: string;
  /** Detail-page hero headline: [plain, accent]. */
  headline: [string, string];
  /** "What we do" heading ([plain, accent]) and lead paragraph. */
  whatWeDo: { title: [string, string]; text: string };
  /** Closing line above the page end: [plain, accent]. */
  closing: [string, string];
  summary: string;
  intro: string;
  items: ServiceItem[];
  benefits: { title: string; text: string }[];
  process: { title: string; text: string }[];
  image: { src: string; alt: string; width: number; height: number };
  poster: { src: string; alt: string; width: number; height: number };
  /** Optional image for the home service carousel card (falls back to `image`). */
  card?: { src: string; alt: string; width: number; height: number };
  /** Four short labels shown on the home service card. */
  highlights: string[];
  /** Optional shorter text for the home service card (falls back to `summary`). */
  cardSummary?: string;
  /** "What you get" — concrete deliverables. */
  deliverables: string[];
  /** "Tools we often use" — shown as tags. */
  tools: string[];
  /** "Is it a fit?" — signs this service is right for the client. */
  fit: string[];
  faqs: { q: string; a: string }[];
  /** Slugs of related services (shown as cards). */
  related: string[];
  glyph: "grid" | "circle" | "node" | "cross" | "arrow" | "orbit";
  /** Varies the detail-page hero composition. */
  layout: "split" | "stack" | "poster";
};

export const services: Service[] = [
  {
    slug: "digital-marketing",
    number: "01",
    title: "Digital Marketing",
    tag: "Connect",
    short: "SEO, paid ads, social and content",
    headline: ["Marketing that reaches", "the people who buy."],
    whatWeDo: { title: ["One plan,", "every channel."], text: "We don't run channels in isolation. Search, ads, social and content share one strategy, one budget view and one report, so each one makes the others work harder." },
    closing: ["Ready to be", "found by the right people?"],
    summary:
      "Search, paid media, social and content working together to put your brand in front of the right people at the right moment.",
    intro:
      "We plan and run marketing that connects your brand with the people most likely to buy — combining search, paid media, social and content into one joined-up strategy with clear reporting.",
    items: [
      {
        name: "Search Engine Optimization",
        text: "Technical, on-page and content SEO that builds lasting organic visibility.",
      },
      {
        name: "Performance Marketing",
        text: "Campaigns planned around measurable goals and optimised continuously.",
      },
      {
        name: "Google Ads",
        text: "Search, display and shopping campaigns structured for efficient spend.",
      },
      {
        name: "Social Media Marketing",
        text: "Platform-native campaigns that build attention and community.",
      },
      {
        name: "Content Marketing",
        text: "Editorial content that earns trust, ranks and supports every stage of the funnel.",
      },
    ],
    benefits: [
      { title: "Right audience", text: "Targeting built on research, not guesswork." },
      { title: "Clear reporting", text: "Transparent dashboards tied to the metrics that matter to you." },
      { title: "Compounding reach", text: "Organic and paid channels that reinforce each other." },
      { title: "Consistent voice", text: "One brand story told well across every channel." },
    ],
    process: [
      { title: "Audit", text: "Channels, competitors and current performance reviewed." },
      { title: "Plan", text: "Audience, messaging and channel mix defined." },
      { title: "Launch", text: "Campaigns and content rolled out with tracking in place." },
      { title: "Optimise", text: "Test, learn and reallocate budget to what works." },
    ],
    image: {
      src: "/images/poster-marketing-wall.webp",
      alt: "Street poster reading Digital Marketing and Growth with a halftone green and pink growth chart, pasted on a weathered wooden pole",
      width: 1600,
      height: 893,
    },
    poster: {
      src: "/images/retro-marketing.webp",
      alt: "Retro illustration of a marketer with a megaphone beside a rising chart, captioned Connect — Digital Marketing and Growth",
      width: 700,
      height: 698,
    },
    card: {
      src: "/images/service-dm.webp",
      alt: "The words Digital Marketing in bold forest-green letters on textured off-white paper",
      width: 1400,
      height: 477,
    },
    highlights: ["SEO", "Paid ads", "Social media", "Content"],
    deliverables: [
      "A channel strategy and 90-day marketing plan",
      "Campaign setup with conversion tracking",
      "A monthly content calendar",
      "Ad creative and copy for every channel",
      "A monthly performance report with clear next steps",
    ],
    tools: ["Google Ads", "Meta Ads", "Google Analytics 4", "Search Console", "Semrush", "Mailchimp", "Canva"],
    fit: [
      "People would love your product — not enough of the right ones see it",
      "You spend on ads without clear reporting on what works",
      "Your social channels are quiet or inconsistent",
      "You want one team handling strategy, content and paid media",
    ],
    faqs: [
      {
        q: "How soon will we see results?",
        a: "Paid campaigns can drive traffic within days. SEO and content usually take three to six months to compound. We set expectations for each channel before we start.",
      },
      {
        q: "Is there a minimum ad budget?",
        a: "No fixed minimum. We recommend a budget based on your goals and market, and we will tell you honestly if it is too small to test properly.",
      },
      {
        q: "Who owns the ad accounts?",
        a: "You do. Campaigns run in accounts in your name, so your data and history always stay with you.",
      },
      {
        q: "What does your SEO service include?",
        a: "Technical SEO (speed, indexing and site structure), on-page optimisation of titles, headings and content, and new content planned around what your customers search for — with Google Search Console and Analytics reporting so you can see what changed.",
      },
    ],
    related: ["google-map-business", "website-development", "e-commerce"],
    glyph: "circle",
    layout: "stack",
  },
  {
    slug: "ai-automation",
    number: "02",
    title: "AI & Automation",
    tag: "Future",
    short: "AI assistants, workflows and integrations",
    headline: ["AI and automation that", "save real hours."],
    whatWeDo: { title: ["Less busywork,", "more real work."], text: "We look for the repetitive, rule-based tasks that slow your team down, then automate them with tools that fit your existing systems — and we measure the time saved." },
    closing: ["Curious what AI", "could do for you?"],
    summary:
      "Practical AI and automation that removes repetitive work, connects your tools and helps your team make faster decisions.",
    intro:
      "We help businesses put AI to work where it genuinely helps — automating repetitive processes, connecting disconnected tools and building intelligent workflows your team can trust.",
    items: [
      {
        name: "AI Integration",
        text: "Language models and AI services integrated into your products and internal tools.",
      },
      {
        name: "Business Process Automation",
        text: "Repetitive, manual tasks mapped and automated end to end.",
      },
      {
        name: "Intelligent Workflows",
        text: "Systems that route, summarise and act on information automatically.",
      },
      {
        name: "AI-Powered Solutions",
        text: "Custom assistants, classifiers and tools designed for a specific business problem.",
      },
    ],
    benefits: [
      { title: "Time back", text: "Teams freed from repetitive work to focus on higher-value tasks." },
      { title: "Fewer errors", text: "Consistent, rules-driven handling of routine processes." },
      { title: "Connected tools", text: "Data flowing between systems instead of being copied by hand." },
      { title: "Responsible by design", text: "Human review and clear guardrails built in from the start." },
    ],
    process: [
      { title: "Map", text: "Identify the processes where automation will have real impact." },
      { title: "Prototype", text: "Prove the approach quickly with a focused pilot." },
      { title: "Integrate", text: "Connect to your existing tools, data and permissions." },
      { title: "Refine", text: "Monitor results and improve accuracy over time." },
    ],
    image: {
      src: "/images/poster-ai.webp",
      alt: "Forest-green YOOH poster with oversized neon-lime letters reading AI Automation, surrounded by technical crosshairs and arrows",
      width: 800,
      height: 1146,
    },
    poster: {
      src: "/images/retro-ai.webp",
      alt: "Retro illustration of a person directing a robotic arm among gears, captioned Future — AI, Automation and Technology",
      width: 700,
      height: 679,
    },
    card: {
      src: "/images/service-ai.webp",
      alt: "The words AI Automation in bold forest-green letters on textured off-white paper",
      width: 1400,
      height: 476,
    },
    highlights: ["AI assistants", "Workflows", "Integrations", "Chatbots"],
    deliverables: [
      "An automation opportunity map ranked by impact",
      "A working pilot on one real process",
      "Integrations with the tools you already use",
      "Documentation and team training",
      "Monitoring, with human review where it matters",
    ],
    tools: ["LLM APIs", "Python", "Node.js", "Zapier", "Make", "n8n", "Google Workspace", "Microsoft 365"],
    fit: [
      "Your team loses hours to repetitive copy-and-paste work",
      "The same customer questions keep slowing down replies",
      "Your data lives in tools that do not talk to each other",
      "You want to try AI safely, starting small",
    ],
    faqs: [
      {
        q: "Will AI replace my team?",
        a: "Our aim is to remove repetitive tasks so your people can focus on work that needs judgment. Sensitive steps keep a human in the loop.",
      },
      {
        q: "Is our data safe?",
        a: "We use business-grade providers, limit each automation to the data it needs, and agree data-handling rules with you before anything goes live.",
      },
      {
        q: "How long does a pilot take?",
        a: "Most pilots take two to four weeks, depending on the process and the integrations involved.",
      },
      {
        q: "What is AI business automation?",
        a: "Using software — including AI models where they help — to handle repetitive work automatically: capturing and routing leads, moving data between tools, drafting replies, summarising documents and producing reports. People stay in control of decisions that need judgment.",
      },
      {
        q: "Can you automate lead generation and follow-up?",
        a: "Yes. A common first project captures enquiries from your website, ads or forms, adds them to your CRM or spreadsheet, sends an instant reply and alerts the right person — so no lead waits days for a response.",
      },
    ],
    related: ["app-development", "website-development", "digital-marketing"],
    glyph: "node",
    layout: "poster",
  },
  {
    slug: "ui-ux-design",
    number: "03",
    title: "UI/UX Design",
    tag: "Design",
    short: "Research, wireframes, UI and prototypes",
    headline: ["Design people", "enjoy using."],
    whatWeDo: { title: ["Clear journeys,", "no guesswork."], text: "Good design starts with how people actually behave. We research, sketch and test before we polish, so every screen has a reason to exist." },
    closing: ["Got a product that", "needs a better experience?"],
    summary:
      "Research-led interfaces and user journeys that make your product clear, intuitive and enjoyable to use.",
    intro:
      "We design digital products around the people who use them — mapping journeys, testing ideas early and crafting clean, accessible interfaces that turn visitors into loyal users.",
    items: [
      {
        name: "UX Research & Strategy",
        text: "User interviews, audits and journey mapping that ground every design decision in evidence.",
      },
      {
        name: "Wireframing & Prototyping",
        text: "Clickable prototypes that let you test flows before a single line of code is written.",
      },
      {
        name: "UI Design",
        text: "Polished, on-brand interfaces for web and mobile, designed pixel by pixel.",
      },
      {
        name: "Design Systems",
        text: "Reusable components and guidelines that keep products consistent as they grow.",
      },
      {
        name: "Usability Testing",
        text: "Real users, real tasks — friction found and fixed before launch.",
      },
    ],
    benefits: [
      { title: "Easier to use", text: "Clear flows that help users get things done without thinking twice." },
      { title: "Higher conversion", text: "Fewer drop-offs between first visit and signup or sale." },
      { title: "Faster builds", text: "Developers work from tested prototypes and a shared design system." },
      { title: "Accessible", text: "Inclusive design that works for every user on every device." },
    ],
    process: [
      { title: "Discover", text: "Users, goals and pain points researched and defined." },
      { title: "Wireframe", text: "Structure and journeys sketched and agreed." },
      { title: "Design", text: "High-fidelity UI and interactive prototypes created." },
      { title: "Test & hand off", text: "Validated with users, then delivered to development." },
    ],
    image: {
      src: "/images/issue-services.webp",
      alt: "Orange Agency Issue services poster listing Digital Marketing, Web and App Development, UI/UX and Creative Design, AI and Branding, framed by gears and a rocket",
      width: 1200,
      height: 663,
    },
    poster: {
      src: "/images/poster-editorial.webp",
      alt: "YOOH Technologies editorial poster with lime lettering on a forest-green panel over a dusty-pink background",
      width: 1600,
      height: 900,
    },
    card: {
      src: "/images/service-uiux.webp",
      alt: "The words UI/UX Designing in bold forest-green letters on textured off-white paper",
      width: 1400,
      height: 477,
    },
    highlights: ["UX research", "Wireframes", "UI design", "Prototypes"],
    deliverables: [
      "A user research summary and journey maps",
      "Wireframes for your key flows",
      "High-fidelity designs for mobile and desktop",
      "A clickable prototype",
      "A component library and developer handoff in Figma",
    ],
    tools: ["Figma", "FigJam", "Adobe Illustrator", "Adobe Photoshop", "Maze", "Hotjar"],
    fit: [
      "Users drop off before they sign up or buy",
      "Your product works but feels dated or confusing",
      "You want to test a new idea before paying for development",
      "Screens look different depending on who designed them",
    ],
    faqs: [
      {
        q: "Can you redesign just part of our product?",
        a: "Yes. We often start with the flow that matters most — such as onboarding or checkout — and expand from there.",
      },
      {
        q: "Do you also build what you design?",
        a: "Yes. Our development team can build it, or we hand clean, organised Figma files to your own developers.",
      },
      {
        q: "How do you test designs?",
        a: "With short usability sessions on prototypes, using real or representative users, before anything is built.",
      },
    ],
    related: ["website-development", "app-development", "e-commerce"],
    glyph: "circle",
    layout: "split",
  },
  {
    slug: "e-commerce",
    number: "04",
    title: "E-Commerce",
    tag: "Sell",
    short: "Online stores, payments and inventory",
    headline: ["Online stores built", "to sell."],
    whatWeDo: { title: ["From first click", "to checkout."], text: "We build stores around your products and customers — fast pages, simple checkout and stock that stays in sync — then help you bring in the traffic." },
    closing: ["Ready to sell", "online properly?"],
    summary:
      "Online stores built to sell — fast storefronts, smooth checkouts and the integrations that keep orders flowing.",
    intro:
      "We build and grow online stores end to end — from storefront design and product catalogues to secure payments, inventory integrations and the marketing that drives repeat sales.",
    items: [
      {
        name: "Online Store Development",
        text: "Custom or platform-based storefronts (Shopify, WooCommerce and more) tailored to your brand.",
      },
      {
        name: "Checkout & Payments",
        text: "Secure, low-friction checkout with the payment methods your customers expect.",
      },
      {
        name: "Product & Inventory Integration",
        text: "Catalogues, stock and orders synced with your existing systems.",
      },
      {
        name: "Store Optimisation",
        text: "Speed, search and conversion improvements that lift revenue per visitor.",
      },
      {
        name: "E-Commerce Marketing",
        text: "Campaigns, email flows and retargeting that bring shoppers back.",
      },
    ],
    benefits: [
      { title: "More sales", text: "Store experiences designed to convert browsers into buyers." },
      { title: "Less admin", text: "Orders, stock and payments connected instead of handled by hand." },
      { title: "Sell anywhere", text: "Mobile-first stores that perform on every screen." },
      { title: "Room to grow", text: "Platforms that scale with your catalogue and traffic." },
    ],
    process: [
      { title: "Plan", text: "Products, customers and platform requirements defined." },
      { title: "Design", text: "Storefront and checkout journeys designed to convert." },
      { title: "Build & integrate", text: "Store developed and connected to payments and inventory." },
      { title: "Launch & grow", text: "Go live, then optimise with data and marketing." },
    ],
    image: {
      src: "/images/retro-marketing.webp",
      alt: "Retro illustration of a marketer with a megaphone beside a rising sales chart, captioned Connect",
      width: 700,
      height: 698,
    },
    poster: {
      src: "/images/issue-services.webp",
      alt: "Orange Agency Issue services poster listing YOOH's digital services, framed by gears and a rocket",
      width: 1200,
      height: 663,
    },
    card: {
      src: "/images/service-ecommerce.webp",
      alt: "The word Ecommerce in bold forest-green letters on textured off-white paper",
      width: 1400,
      height: 477,
    },
    highlights: ["Online stores", "Payments", "Inventory sync", "Store marketing"],
    deliverables: [
      "A store on the right platform for your products",
      "A custom storefront that matches your brand",
      "Secure checkout with the payment options your customers use",
      "Product, shipping and tax setup",
      "Launch training so your team can manage orders",
    ],
    tools: ["Shopify", "WooCommerce", "WordPress", "Stripe", "PayPal", "Google Merchant Center", "Meta Commerce"],
    fit: [
      "You sell offline and want to start selling online",
      "Your current store is slow or hard to manage",
      "Shoppers abandon their carts at checkout",
      "You want social and marketplace sales connected to one store",
    ],
    faqs: [
      {
        q: "Shopify or WooCommerce — which is right for us?",
        a: "It depends on your catalogue, budget and how much control you need. We recommend a platform after a short discovery call.",
      },
      {
        q: "Can you move our existing store?",
        a: "Yes. We migrate products, customers and orders, and set up redirects so you keep your search rankings.",
      },
      {
        q: "Do you help after launch?",
        a: "Yes — with ongoing support, updates and e-commerce marketing to keep sales growing.",
      },
      {
        q: "How much does an online store cost?",
        a: "It depends on the platform, catalogue size, payment and shipping integrations, and any custom features. We scope it with you and give a fixed quote before building, so the cost is clear up front.",
      },
    ],
    related: ["website-development", "digital-marketing", "ui-ux-design"],
    glyph: "node",
    layout: "stack",
  },
  {
    slug: "website-development",
    number: "05",
    title: "Website Development",
    tag: "Launch",
    short: "Business sites, landing pages and CMS",
    headline: ["Websites that work", "as hard as you do."],
    whatWeDo: { title: ["Fast, clear", "and easy to update."], text: "We plan the content, design the layout and build on a stack you can manage yourself — quick to load, simple to edit and set up to be found in search." },
    closing: ["Need a website", "that actually performs?"],
    summary:
      "Fast, responsive, search-friendly websites that look sharp on every screen and turn visitors into enquiries.",
    intro:
      "We design and build websites that load fast, rank well and are easy to update — from company sites and landing pages to content-rich platforms, all built on a modern, maintainable stack.",
    items: [
      {
        name: "Business Websites",
        text: "Professional company sites that present your services clearly and build trust.",
      },
      {
        name: "Landing Pages",
        text: "Focused, high-converting pages for campaigns and product launches.",
      },
      {
        name: "CMS Websites",
        text: "Easy-to-edit sites so your team can update content without a developer.",
      },
      {
        name: "Website Redesigns",
        text: "Modernised design, structure and performance for an existing site.",
      },
      {
        name: "Maintenance & Hosting",
        text: "Updates, backups, security and monitoring handled for you.",
      },
    ],
    benefits: [
      { title: "Fast loading", text: "Optimised builds that keep visitors on the page." },
      { title: "Found on search", text: "SEO-ready structure and metadata from day one." },
      { title: "Every screen", text: "Responsive layouts that work on phones, tablets and desktops." },
      { title: "Easy to update", text: "Content you can change yourself, safely." },
    ],
    process: [
      { title: "Brief", text: "Goals, audience, pages and content planned." },
      { title: "Design", text: "Layouts and visual direction approved." },
      { title: "Develop", text: "Site built, tested and optimised for speed and SEO." },
      { title: "Launch", text: "Go live with analytics, training and ongoing support." },
    ],
    image: {
      src: "/images/retro-development.webp",
      alt: "Retro illustration of a developer typing code at a vintage computer, captioned Build — Web and App Development",
      width: 700,
      height: 698,
    },
    poster: {
      src: "/images/poster-webdev.webp",
      alt: "YOOH editorial poster for Web and App Development: a developer working on a tablet inside a forest-green panel on a dusty-pink background",
      width: 1600,
      height: 914,
    },
    card: {
      src: "/images/service-web.webp",
      alt: "Web development title in bold forest-green letters on textured off-white paper",
      width: 1400,
      height: 507,
    },
    cardSummary:
      "Fast, accessible websites and web platforms — from company sites and online stores to complex web applications.",
    highlights: ["Company websites", "E-commerce", "Web apps", "CMS"],
    deliverables: [
      "A responsive website designed around your brand",
      "An easy-to-use CMS for everyday updates",
      "On-page SEO and fast load times",
      "Contact forms, analytics and tracking set up",
      "Hosting, domain and launch handled for you",
    ],
    tools: ["Next.js", "React", "WordPress", "Tailwind CSS", "Node.js", "Vercel", "Google Analytics 4"],
    fit: [
      "You have no website, or the one you have is outdated",
      "Your site is slow, hard to update or not mobile-friendly",
      "Visitors arrive but rarely get in touch",
      "You are launching a new brand, product or campaign",
    ],
    faqs: [
      {
        q: "How long does a website take?",
        a: "A focused business website usually takes three to six weeks; larger sites take longer. You get a timeline before we start.",
      },
      {
        q: "Can I update the website myself?",
        a: "Yes. We build on an easy-to-use CMS and show your team how to edit pages, posts and images.",
      },
      {
        q: "Do you provide hosting and maintenance?",
        a: "Yes. We can host, update and back up your site, or hand it over to your own team.",
      },
      {
        q: "Will my website be SEO-friendly?",
        a: "Every site ships with clean structure, metadata, fast loading and a sitemap, ready for search engines.",
      },
      {
        q: "How much does a business website cost?",
        a: "It depends on the number of pages, features such as booking or online payments, and how much content we write for you. After a short call you get a fixed quote before any work starts. If you need to launch quickly on a smaller budget, a ready-made website template is a lower-cost starting point.",
      },
      {
        q: "Custom website or template — which do I need?",
        a: "A template suits a standard business site that needs to go live fast. A custom website is worth it when you need a distinctive design, specific features or integrations, or a structure planned around your services and search keywords.",
      },
    ],
    related: ["ui-ux-design", "e-commerce", "app-development"],
    glyph: "grid",
    layout: "split",
  },
  {
    slug: "app-development",
    number: "06",
    title: "App Development",
    tag: "Mobile",
    short: "iOS, Android, MVPs and backends",
    headline: ["Apps people", "keep opening."],
    whatWeDo: { title: ["Mobile apps", "and everything behind them."], text: "We design and build the app, the backend and the admin tools together, shipping in short sprints so you can review real progress every week." },
    closing: ["Have an app idea", "worth building?"],
    summary:
      "iOS and Android apps that feel native, perform smoothly and keep your customers coming back.",
    intro:
      "We design, build and launch mobile apps for iOS and Android — from MVPs that test a new idea to full-featured products, with the backend, analytics and support they need after launch.",
    items: [
      {
        name: "iOS & Android Apps",
        text: "Native-quality apps for both platforms from a single, maintainable codebase.",
      },
      {
        name: "MVP Development",
        text: "A focused first version to validate your idea with real users, fast.",
      },
      {
        name: "App UI/UX",
        text: "Mobile-first interfaces designed around thumbs, gestures and short sessions.",
      },
      {
        name: "Backend & APIs",
        text: "Secure APIs, databases and admin panels that power your app.",
      },
      {
        name: "App Store Launch & Support",
        text: "Store submission, updates, monitoring and new features over time.",
      },
    ],
    benefits: [
      { title: "Both platforms", text: "Reach iOS and Android users without doubling the cost." },
      { title: "Smooth performance", text: "Fast, stable apps that earn good reviews." },
      { title: "Direct channel", text: "Push notifications and in-app experiences that keep customers engaged." },
      { title: "Built to evolve", text: "Architecture ready for new features as you grow." },
    ],
    process: [
      { title: "Define", text: "Users, core features and success metrics agreed." },
      { title: "Prototype", text: "Key screens designed and tested on real devices." },
      { title: "Build", text: "App and backend developed in reviewable sprints." },
      { title: "Release", text: "Published to the stores, then monitored and improved." },
    ],
    image: {
      src: "/images/studio-photo.webp",
      alt: "Developer in a bright studio office reviewing an app on a tablet",
      width: 828,
      height: 723,
    },
    poster: {
      src: "/images/retro-development.webp",
      alt: "Retro illustration of a developer typing code at a vintage computer, captioned Build — Web and App Development",
      width: 700,
      height: 698,
    },
    card: {
      src: "/images/service-app.webp",
      alt: "The words App Development in bold forest-green letters on textured off-white paper",
      width: 1400,
      height: 507,
    },
    highlights: ["iOS & Android", "MVPs", "Backends & APIs", "Store launch"],
    deliverables: [
      "An app for iOS and Android from one codebase",
      "Backend, database and admin panel",
      "Push notifications and analytics",
      "App Store and Google Play submission",
      "Post-launch support and updates",
    ],
    tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Node.js", "PostgreSQL"],
    fit: [
      "You have an app idea and want to test it quickly",
      "Customers would use your service more with an app",
      "Your current app is slow, buggy or hard to update",
      "Your staff or field teams need an internal app",
    ],
    faqs: [
      {
        q: "Native or cross-platform?",
        a: "For most products, cross-platform (React Native or Flutter) gives native-quality apps on both platforms at lower cost. We recommend native when performance or device features require it.",
      },
      {
        q: "How much does an app cost?",
        a: "It depends on features and integrations. We start with a scoped first version so you can launch sooner and invest as you grow.",
      },
      {
        q: "Who publishes the app?",
        a: "We handle App Store and Google Play submission under your own developer accounts.",
      },
    ],
    related: ["ui-ux-design", "website-development", "ai-automation"],
    glyph: "cross",
    layout: "stack",
  },
  {
    slug: "google-map-business",
    number: "07",
    title: "Google Map Business",
    tag: "Local",
    short: "Profile setup, map ranking and reviews",
    headline: ["Get found on", "Google Maps."],
    whatWeDo: { title: ["Show up when", "locals search."], text: "We set up, optimise and manage your Google Business Profile so you appear in local searches and on the map — with reviews and posts that keep you there." },
    closing: ["Want more customers", "from local search?"],
    summary:
      "Google Business Profile setup and optimisation that puts you on the map — and in front of nearby customers ready to buy.",
    intro:
      "We set up, verify and optimise your Google Business Profile so your business shows up in Google Maps and local search, looks trustworthy at a glance and turns searches into calls, visits and directions.",
    items: [
      {
        name: "Profile Setup & Verification",
        text: "Your Google Business Profile created or claimed, verified and filled in completely.",
      },
      {
        name: "Profile Optimisation",
        text: "Categories, services, hours, photos and descriptions tuned to match how customers search.",
      },
      {
        name: "Local SEO & Map Ranking",
        text: "Citations, on-site signals and local keywords that lift your position in the map results.",
      },
      {
        name: "Reviews Management",
        text: "A steady flow of genuine reviews, with timely, professional replies.",
      },
      {
        name: "Posts & Insights",
        text: "Regular updates and offers, plus reporting on calls, clicks and direction requests.",
      },
    ],
    benefits: [
      { title: "Found locally", text: "Show up when nearby customers search for what you offer." },
      { title: "More calls & visits", text: "Direct actions from your listing — call, website and directions." },
      { title: "Trust at a glance", text: "Complete details, fresh photos and strong reviews." },
      { title: "Clear results", text: "Simple reporting on how customers find and contact you." },
    ],
    process: [
      { title: "Audit", text: "Current listing, competitors and local rankings reviewed." },
      { title: "Set up", text: "Profile claimed, verified and completed." },
      { title: "Optimise", text: "Content, categories, photos and citations improved." },
      { title: "Grow", text: "Reviews, posts and rankings managed every month." },
    ],
    image: {
      src: "/images/retro-agency.webp",
      alt: "Retro illustration of a team gathered around a vintage computer under the headline Agency Services, captioned Innovate",
      width: 900,
      height: 1184,
    },
    poster: {
      src: "/images/poster-marketing.webp",
      alt: "YOOH editorial poster for Digital Marketing: a team member using a tablet in a modern office, framed by a forest-green panel on dusty pink",
      width: 1600,
      height: 914,
    },
    card: {
      src: "/images/service-gmb.webp",
      alt: "The words Google Map Business in bold forest-green letters on textured off-white paper",
      width: 1400,
      height: 477,
    },
    highlights: ["Profile setup", "Map ranking", "Reviews", "Local SEO"],
    deliverables: [
      "A verified, fully completed Google Business Profile",
      "Optimised categories, services and description",
      "A photo set and regular Google posts",
      "A review-request process and reply templates",
      "A monthly report on calls, clicks and direction requests",
    ],
    tools: ["Google Business Profile", "Google Maps", "Google Analytics 4", "Search Console", "Local citations"],
    fit: [
      "Your business does not appear on Google Maps",
      "Competitors rank above you in local searches",
      "You have few reviews, or reviews left unanswered",
      "Your listing shows the wrong hours, photos or details",
    ],
    faqs: [
      {
        q: "How long until we rank higher on Maps?",
        a: "Many businesses see better visibility within one to three months, depending on local competition and how complete the profile was.",
      },
      {
        q: "Can you verify our listing?",
        a: "Yes. We guide you through Google's verification steps and handle the rest of the setup.",
      },
      {
        q: "Do you post fake reviews?",
        a: "Never. We help you ask real customers for reviews and reply to them professionally — fake reviews break Google's rules and put your listing at risk.",
      },
    ],
    related: ["digital-marketing", "website-development", "e-commerce"],
    glyph: "orbit",
    layout: "split",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/**
 * Search metadata per service (kept apart from display copy).
 * `title` is used as an absolute <title> (≤ 60 chars); `h1` is the keyword phrase
 * rendered in the page's H1 eyebrow; `updated` feeds the sitemap's lastmod —
 * change it only when the page content actually changes.
 */
export const serviceSeo: Record<string, { title: string; description: string; h1: string; updated: string }> = {
  "website-development": {
    title: "Website Development Services | YOOH Technologies",
    description:
      "Custom website development for businesses: fast, mobile-friendly, SEO-ready sites with an easy CMS. Business websites, landing pages, redesigns and hosting.",
    h1: "Website Development Services",
    updated: "2026-11-17",
  },
  "app-development": {
    title: "Mobile App Development – iOS & Android | YOOH Technologies",
    description:
      "Custom mobile app development for iOS and Android: MVPs, cross-platform apps with React Native or Flutter, backends and admin tools — from idea to app store.",
    h1: "Mobile App Development",
    updated: "2026-11-17",
  },
  "e-commerce": {
    title: "E-commerce Website Development | YOOH Technologies",
    description:
      "E-commerce website development on Shopify and WooCommerce: fast, mobile-first online stores with simple checkout, Stripe or PayPal payments and inventory sync.",
    h1: "E-commerce Website Development",
    updated: "2026-11-17",
  },
  "ui-ux-design": {
    title: "UI/UX Design Services for Web & Mobile | YOOH Technologies",
    description:
      "UI/UX design for websites and mobile apps: user research, wireframes, high-fidelity UI, interactive prototypes and usability testing, ready for development.",
    h1: "UI/UX Design Services",
    updated: "2026-11-17",
  },
  "digital-marketing": {
    title: "Digital Marketing & SEO Services | YOOH Technologies",
    description:
      "Digital marketing for growing businesses: SEO, Google Ads, social media marketing and content, run as one plan with conversion tracking and monthly reporting.",
    h1: "Digital Marketing & SEO Services",
    updated: "2026-11-17",
  },
  "ai-automation": {
    title: "AI Automation Services for Businesses | YOOH Technologies",
    description:
      "AI automation services: business process automation, AI integrations, intelligent workflows and custom AI assistants connected to the tools you already use.",
    h1: "AI Automation Services",
    updated: "2026-11-17",
  },
  "google-map-business": {
    title: "Google Business Profile Management | YOOH Technologies",
    description:
      "Google Business Profile (Google Maps) setup, verification and optimisation — categories, photos, posts and genuine review management for local search.",
    h1: "Google Business Profile Management",
    updated: "2026-11-17",
  },
};
