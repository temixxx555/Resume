export type ArtKind = "campus-connect" | "qr-platform" | "boweneats" | "lss";

export type Project = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string[];
  /** Optional: hidden when unknown. */
  year?: string;
  status: string;
  role: string;
  kind: "flagship" | "research";
  featured: boolean;
  art: ArtKind;
  /** Optional real screenshots. When provided they replace the drawn interface sketch. */
  thumbnail?: { src: string; alt: string; width: number; height: number };
  heroImage?: { src: string; alt: string; width: number; height: number };
  liveUrl?: string;
  githubUrl?: string;
  stack: { label: string; items: string[] }[];
  problem: string[];
  solution: { intro?: string; features: string[] };
  architecture?: {
    summary?: string;
    layers: { label: string; items: string[] }[];
  };
  decisions: { title: string; body: string }[];
  challenges?: { title: string; body: string }[];
  results?: { label: string; detail: string }[];
  inProgress?: { title: string; body: string };
  gallery?: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  }[];
  related: { posts: string[]; projects: string[] };
  /** Owner-facing notes: things to confirm or replace with your own words. Never rendered. */
  todos: string[];
};

export const projects: Project[] = [
  {
    slug: "campus-connect",
    year: "2025",
    number: "01",
    thumbnail: {
      src: "/campusapp.png",
      alt: "Campus Connect dashboard",
      width: 100,
      height: 100,
    },

    heroImage: {
      src: "/campusapp.png",
      alt: "Campus Connect social platform",
      width: 100,
      height: 100,
    },
    gallery: [
      {
        src: "/campusapp.png",
        alt: "Home Screen ",
        caption: "Home Screen ",
        width: 1600,
        height: 1000,
      },
    ],
    title: "Campus Connect",
    tagline: "A social platform built for university communities.",
    shortDescription:
      "A full-stack community platform where students, alumni, companies and general users share posts, discover events, list student businesses and take part in campus discussions.",
    fullDescription: [
      "Campus Connect started with a simple observation about university life: the important things happen in disconnected places. Announcements live in group chats, events in flyers, and student businesses in word of mouth.",
      "I founded the project and lead its full-stack development, from the Next.js interface and the Express API to the MongoDB data model, authentication and deployment.",
    ],
    status: "Ongoing",
    role: "Founder & Lead Full-Stack Developer",
    kind: "flagship",
    featured: true,
    art: "campus-connect",
    stack: [
      {
        label: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      },
      { label: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
      { label: "Data", items: ["MongoDB"] },
    ],
    problem: [
      "General-purpose social networks do not understand campus context. They cannot tell a student from an alumnus from a business owner, and they have no notion of a campus community.",
      "A university platform has a harder job than a feed. It has to serve several kinds of people with different needs, keep identity trustworthy enough that a verified badge means something, and stay light enough to use on a phone between lectures.",
    ],
    solution: {
      intro:
        "A single product with role-aware experiences on top of one shared API. What it covers today:",
      features: [
        "Social posts and comments, plus longer-form content",
        "Messaging and campus groups",
        "Events and event discovery",
        "Anonymous discussions alongside verified identities",
        "Student business listings",
        "Leaderboards, streaks and verified badges",
        "Onboarding, account verification and profile management",
        "Notifications",
        "Distinct flows for students, alumni, companies and general users",
      ],
    },
    architecture: {
      summary:
        "A conventional, deliberately boring split: a Next.js client, a REST API, and a document database. The interesting work is in the domain model rather than the plumbing.",
      layers: [
        {
          label: "Client",
          items: [
            "Next.js + React",
            "Responsive, mobile-first UI",
            "Reusable components",
          ],
        },
        {
          label: "API",
          items: [
            "Express.js REST endpoints",
            "Users, posts, comments",
            "Events, listings, engagement",
          ],
        },
        {
          label: "Access",
          items: [
            "Authentication",
            "Account verification",
            "Role-aware permissions",
          ],
        },
        {
          label: "Data",
          items: ["MongoDB", "Users and profiles", "Content and activity"],
        },
      ],
    },
    decisions: [
      {
        title: "Roles are a core concept, not an afterthought",
        body: "Students, alumni, companies and general users onboard differently and can do different things. Treating the user type as part of the data model, not a UI toggle, keeps the API and the interface consistent about who is allowed to see and do what.",
      },
      {
        title: "One REST surface for every feature",
        body: "User management, posts, comments, events, business listings and engagement features all sit behind the same conventions. A predictable API keeps the frontend simple and makes new features cheap to add.",
      },
      {
        title: "Verification as part of the account lifecycle",
        body: "A verified badge is only worth something if verification is a real state an account moves through. Modelling it explicitly is what lets the badge, the leaderboard and the role flows build on top of it.",
      },
      {
        title: "Designed for the phone first",
        body: "Most campus traffic is mobile, so layouts, tap targets and loading states were designed for small screens and then expanded for desktop, not the other way round.",
      },
    ],
    challenges: [
      {
        title: "Anonymity next to identity",
        body: "Anonymous discussions and verified profiles live in the same product. Both need to feel safe to use, which puts real constraints on how authorship is stored and displayed.",
      },
      {
        title: "Engagement without gimmicks",
        body: "Streaks and leaderboards can drive habits or become noise. Keeping them tied to genuine activity is a product decision as much as an engineering one.",
      },
    ],
    related: {
      posts: [
        "campus-connect-role-aware-social-platform",
        "auth-tokens-refresh-cookies-nextjs",
      ],
      projects: ["qr-platform", "boweneats"],
    },
    todos: [
      "Add liveUrl and githubUrl when you want them shown.",
      "Add year (start year) and real screenshots (thumbnail / heroImage / gallery).",
      "Replace the problem framing and the four decisions with your own account of what you actually did.",
      "Confirm how anonymous posts are stored and how streaks/leaderboards are computed before publishing the 'challenges' section.",
      "Add results if you have real numbers (users, campuses, retention). None are invented here.",
    ],
  },
  {
    slug: "qr-platform",
    number: "02",
    title: "QR Platform",
    thumbnail: {
      src: "/qr.jpg",
      alt: "Campus Connect dashboard",
      width: 100,
      height: 100,
    },

    heroImage: {
      src: "/qr.jpg",
      alt: "Campus Connect social platform",
      width: 100,
      height: 100,
    },
    tagline: "A QR-code SaaS with billing and analytics.",
    shortDescription:
      "A Next.js platform for creating, customising and managing QR codes, with authentication, dashboards, subscription billing through Paystack, and scan analytics.",
    fullDescription: [
      "QR Platform is a product-shaped project: users sign in, create QR codes of several types, customise how they look, manage them from a dashboard, and pay for a plan when they need more.",
      "It is where I practised the parts of software that sit around the feature: accounts, billing, analytics and production deployment.",
    ],
    status: "Live · evolving",
    role: "Full-Stack Developer",
    kind: "flagship",
    featured: true,
    art: "qr-platform",
    stack: [
      { label: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
      { label: "Payments", items: ["Paystack"] },
      {
        label: "Platform",
        items: ["Authentication", "Analytics", "Production deployment"],
      },
    ],
    problem: [
      "A QR code is a printed commitment. Once it is on a poster, a menu or a product box, it cannot be edited, so a code that points at the wrong place is expensive to fix.",
      "Businesses also want to know whether their codes are being scanned at all. A useful QR product needs to solve for both: change a destination later, and show what happened.",
    ],
    solution: {
      intro: "A SaaS product covering the full lifecycle of a QR code:",
      features: [
        "Multiple QR code types",
        "A customisation experience for the look of each code",
        "Authentication and a personal dashboard",
        "QR management: create, edit, organise",
        "Subscription billing with Paystack",
        "Scan analytics",
        "Referral concepts for growth",
        "Production deployment",
      ],
    },
    architecture: {
      summary:
        "A Next.js application organised around the QR code as the central entity, with billing and analytics as first-class neighbours.",
      layers: [
        { label: "Interface", items: ["Generator", "Customiser", "Dashboard"] },
        {
          label: "Application",
          items: ["Authentication", "QR management", "Plans and limits"],
        },
        {
          label: "Redirect",
          items: ["Short links", "Destination lookup", "Scan capture"],
        },
        {
          label: "Services",
          items: ["Paystack billing", "Analytics", "Hosting"],
        },
      ],
    },
    decisions: [
      {
        title: "Encode a link you control, not the destination",
        body: "A dynamic QR code encodes a short link that resolves to the real destination. That single indirection is what makes destinations editable after printing, and what makes scans countable.",
      },
      {
        title: "Billing designed around plan limits",
        body: "Subscriptions are only useful if the product knows what each plan allows. Keeping plan rules in one place lets the dashboard, the generator and the billing flow agree with each other.",
      },
      {
        title: "Customisation is a separate concern from content",
        body: "What a code says and how it looks change independently. Keeping styling separate from the encoded data means a rebrand does not touch destinations, and an edit does not touch the design.",
      },
      {
        title: "Local payments matter",
        body: "Paystack was the right fit for the market I am building in. Supporting the payment rails your users actually have is a product decision, not a technical footnote.",
      },
    ],
    inProgress: {
      title: "Currently in development: enterprise and rewards",
      body: "I am exploring an enterprise direction that ties QR codes to reward workflows. This is in active development and is not part of the live product described above.",
    },
    related: {
      posts: ["dynamic-qr-codes-without-breaking-printed-codes"],
      projects: ["campus-connect", "boweneats"],
    },
    liveUrl: "https://qrcode-nine-pied.vercel.app/",
    year: "2026",
    todos: [
      "Add liveUrl / githubUrl / year and real screenshots.",
      "Confirm the full stack (auth provider, database, hosting) and list it under 'stack'.",
      "Confirm the dynamic-redirect description matches how scans are actually resolved and recorded.",
      "Confirm which QR types are supported and name them.",
      "Rewrite 'inProgress' with accurate status once the enterprise/rewards work is further along.",
    ],
  },
  {
    slug: "boweneats",
    number: "03",
    title: "BowenEats",
    year: "2024",
    tagline: "An early MERN build, end to end.",
    shortDescription:
      "A MERN-stack application: React on the front, an Express and Node.js API, and MongoDB for storage.",
    fullDescription: [
      "BowenEats is an earlier project, and a meaningful one. It brought the whole path together: a React client, a REST API, a database and a deployment.",
      "Later projects are larger, but the habits here (clear API contracts, honest loading and error states, simple data models) carry straight through to them.",
    ],
    status: "Earlier project",
    role: "Full-Stack Developer",
    kind: "flagship",
    featured: true,
    art: "boweneats",
    stack: [
      { label: "Frontend", items: ["React"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST APIs"] },
      { label: "Data", items: ["MongoDB", "Mongoose"] },
    ],
    problem: [
      "Building something real teaches what tutorials skip: what happens between the button and the database, and what the user sees while they wait.",
    ],
    solution: {
      intro: "A complete MERN application with:",
      features: [
        "A React client talking to a REST API",
        "An Express and Node.js backend",
        "MongoDB models managed with Mongoose",
        "Loading, validation and error states on the client",
      ],
    },
    architecture: {
      layers: [
        { label: "Client", items: ["React"] },
        { label: "API", items: ["Express.js", "REST endpoints"] },
        { label: "Logic", items: ["Node.js", "Validation"] },
        { label: "Data", items: ["MongoDB", "Mongoose models"] },
      ],
    },
    decisions: [
      {
        title: "A thin client and a clear API",
        body: "Keeping business rules on the server and the client focused on presentation made the app easier to reason about, and made the API reusable.",
      },
      {
        title: "Model the data before building the screens",
        body: "Getting the Mongoose models right first meant the UI followed the data instead of fighting it.",
      },
    ],
    related: {
      posts: [],
      projects: ["campus-connect", "qr-platform"],
    },
    todos: [
      "Describe what BowenEats actually does (menu, ordering, vendors?) and rewrite the problem and features accordingly.",
      "Add year, liveUrl, githubUrl and screenshots.",
      "Add specific decisions you made; the two here are stack-level placeholders.",
    ],
  },
  {
    slug: "lss-classification",
    number: "04",
    thumbnail: {
      src: "/mri.jpg",
      alt: "Campus Connect dashboard",
      width: 100,
      height: 100,
    },

    heroImage: {
      src: "/mri.jpg",
      alt: "Campus Connect social platform",
      width: 100,
      height: 100,
    },
    title: "Lumbar Spinal Stenosis Classification",
    tagline: "Attention-based deep learning on lumbar MRI.",
    shortDescription:
      "My final-year research project: a deep-learning model with attention mechanisms that classifies lumbar spinal stenosis from MRI data.",
    fullDescription: [
      "For my final-year project at Bowen University I built an attention-based deep learning model for classifying lumbar spinal stenosis from medical imaging data.",
      "It was completed in 2026 and awarded Grade A. It sits outside my day-to-day web work, and it is a large part of why I am comfortable reading papers, wrangling data and reasoning about model behaviour.",
    ],
    year: "2026",
    status: "Completed · Grade A",
    role: "Researcher & Developer",
    kind: "research",
    featured: true,
    art: "lss",
    stack: [
      { label: "Language", items: ["Python"] },
      {
        label: "Method",
        items: [
          "Deep learning",
          "Attention mechanisms",
          "Image classification",
        ],
      },
      { label: "Domain", items: ["Medical imaging", "MRI"] },
    ],
    problem: [
      "Lumbar spinal stenosis is a narrowing of the spinal canal that is assessed from MRI. Reading those scans is skilled, time-consuming work, which makes it a natural candidate for decision-support tooling.",
      "Attention mechanisms let a model weigh some parts of an image more than others. In medical imaging that matters, because the signal is usually small and localised.",
    ],
    solution: {
      intro: "The project covers the full research loop:",
      features: [
        "Preparing and structuring MRI data for training",
        "An attention-based deep learning classifier",
        "Evaluation of the model on held-out data",
        "A written final-year report, graded A",
      ],
    },
    architecture: {
      layers: [
        { label: "Data", items: ["MRI slices", "Labels"] },
        {
          label: "Preparation",
          items: ["Preprocessing", "Train / test split"],
        },
        { label: "Model", items: ["Deep network", "Attention mechanism"] },
        { label: "Output", items: ["Classification", "Evaluation"] },
      ],
    },
    decisions: [
      {
        title: "Why attention",
        body: "The clinically relevant region is a small part of a large image. Attention gives the model a way to focus on it, and gives the researcher a way to inspect where the model was looking.",
      },
      {
        title: "Evaluate honestly",
        body: "In a medical setting, an accuracy number without context is not enough. The project treats evaluation as part of the design, not a final table.",
      },
    ],
    results: [
      {
        label: "Final Year Project",
        detail: "Awarded Grade A at Bowen University, July 2026.",
      },
    ],
    related: { posts: [], projects: ["campus-connect", "qr-platform"] },
    todos: [
      "Add dataset name and size, model architecture, metrics and comparison to baselines. None are stated here on purpose.",
      "Add class labels, figures and any paper/report link.",
      "Add githubUrl if the repository can be public.",
      "Rewrite 'decisions' with the actual modelling choices you made.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

/** Smaller pieces of work: shown as an index, without dedicated case studies. */
export type ArchiveEntry = {
  name: string;
  context: string;
  role: string;
  summary: string;
  tech: string[];
  year?: string;
};

export const archive: ArchiveEntry[] = [
  {
    name: "Ampersand",
    context: "Client project",
    role: "Full-Stack Developer",
    summary:
      "A client-facing rental-management dashboard for managing 50+ rental services and tracking real-time availability, with booking and availability workflows on a Node.js, Express and MongoDB backend.",
    tech: ["Node.js", "Express.js", "MongoDB"],
  },
  {
    name: "LockSec",
    context: "Client project",
    role: "Led full-stack development",
    summary:
      "An 8-page security platform. I led implementation across frontend and backend, designed the MongoDB schemas and established type-safe API contracts in TypeScript.",
    tech: ["TypeScript", "MongoDB", "REST APIs"],
  },
  {
    name: "Antlias Merchant",
    context: "Client project",
    role: "Full-Stack Developer",
    summary:
      "A 10+ page merchant platform covering product listings, inventory and orders, secured with JWT authentication and role-based access control.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "RBAC"],
  },
  {
    name: "J3 Rentals",
    context: "Contract · Remote",
    role: "Full-Stack Developer",
    year: "2023",
    summary:
      "A rental e-commerce platform supporting 200+ products, with search, filtering, authentication, rental workflows and a custom REST API of 12+ endpoints. Deployed on Vercel and Render at roughly 99.5% uptime.",
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB"],
  },
];

/** Work delivered at IntPlus Nigeria. Names only: no descriptions beyond what I can state. */
export const intplusWork = [
  { name: "RCCG Strongtower", note: "Client project" },
  { name: "LockSec", note: "Security platform" },
  { name: "Ampersand Tech", note: "Rental-management dashboard" },
  { name: "Kings & Queen", note: "Chess administration tools" },
  {
    name: "Blueprint",
    note: "Frontend and backend collaboration and leadership",
  },
];
