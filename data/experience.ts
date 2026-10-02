export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type?: string;
  summary?: string;
  highlights: string[];
  tech: string[];
  /** Highlighted numbers, taken directly from the resume. */
  metrics?: { value: string; label: string }[];
  /** Slugs from data/projects.ts */
  projects?: string[];
  /** Names of work shipped in this role. */
  shipped?: string[];
  featured?: boolean;
};

export const experience: Role[] = [
  {
    id: "anvil",
    company: "Anvil Build Cycle",
    role: "Backend Developer",
    period: "Jun 2026 — Present",
    location: "Nigeria",
    type: "Team project",
    highlights: [
      "Working with a multidisciplinary team of students through a six-week MVP cycle, turning a real-world problem into a functional software product.",
    ],
    tech: ["Backend development", "Team delivery"],
  },
  {
    id: "easyspend",
    company: "EasySpend",
    role: "Frontend Engineer",
    period: "Apr 2026 — May 2026",
    
    location: "Lagos, Nigeria",
    summary: "Fintech interfaces, shipped in short sprints with a fully remote team.",
    highlights: [
      "Shipped production-ready fintech interfaces in React, TypeScript and Tailwind CSS, translating Figma designs into responsive, reusable components.",
      "Integrated features with RESTful backend services, with proper loading, error, validation and empty states.",
      "Delivered within short sprint cycles alongside a fully remote engineering team.",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "REST APIs", "Figma"],
  },
  {
    id: "intplus",
    company: "IntPlus Nigeria",
    role: "Frontend Engineer",
    period: "Mar 2025 — Aug 2025",
    location: "Lagos, Nigeria",
    summary:
      "A technology startup in Lagos. I built interfaces for enterprise clients and took on full-stack work when projects needed it.",
    metrics: [
      { value: "15+", label: "responsive interfaces shipped" },
      { value: "40%", label: "faster data loading" },
      { value: "30%", label: "less time to build new features" },
    ],
    highlights: [
      "Built and shipped 15+ responsive interfaces for enterprise clients in React, TypeScript and Tailwind CSS.",
      "Reduced data loading times by 40% by integrating with REST APIs and optimising data-fetching and caching strategies.",
      "Designed and implemented a reusable shadcn/ui component system that cut development time for new features by 30%.",
      "Worked in Agile cycles with 5+ cross-functional teammates across planning, implementation, testing and code review, and kept a 95%+ code-review approval rate.",
      "Led or collaborated on frontend and backend development for client products, including Blueprint.",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "REST APIs", "Figma"],
    shipped: ["RCCG Strongtower", "LockSec", "Ampersand Tech", "Kings & Queen", "Blueprint"],
    featured: true,
  },
  {
    id: "j3",
    company: "J3 Rentals",
    role: "Full-Stack Developer",
    period: "Aug 2023 — Sep 2023",
    location: "Remote",
    highlights: [
      "Architected a full-stack rental e-commerce platform supporting 200+ products: a Next.js frontend and a Node.js/Express backend.",
      "Built search, filtering, authentication and rental workflows, backed by a custom REST API of 12+ endpoints.",
      "Designed the MongoDB models with Mongoose, and deployed to Vercel and Render at roughly 99.5% uptime and about 2 seconds average page load.",
    ],
    tech: ["Next.js", "Node.js", "Express.js", "MongoDB", "Vercel", "Render"],
    metrics: [
      { value: "200+", label: "products supported" },
      { value: "12+", label: "API endpoints" },
    ],
  },
];

export const volunteering = [
  {
    title: "Bowen Tech Week — Volunteer",
    period: "May — Jun 2026",
    detail: "Helped plan and run technical events and activities for participating students.",
  },
];

export const education = {
  school: "Bowen University",
  degree: "B.Sc. Software Engineering",
  location: "Osun State, Nigeria",
  period: "2022 — 2026",
  gpa: "4.43 GPA",
  focus: "Concentration in Software Development",
  coursework: [
    "Software Architecture",
    "Computer Graphics",
    "Artificial Intelligence",
    "Requirements Engineering",
    "Data Structures & Algorithms",
  ],
};

export const award = {
  title: "Final Year Project — Grade A",
  org: "Bowen University",
  date: "Jul 2026",
  detail:
    "An attention-based deep learning model for lumbar spinal stenosis classification from medical imaging data.",
  project: "lss-classification",
};

export const certifications = [
  { name: "Global Enterprise Experience", issuer: "Victoria University of Wellington", date: "Jun 2026" },
  { name: "Career Essentials in Generative AI", issuer: "Microsoft and LinkedIn", date: "Apr 2026" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "Aug 2023" },
  { name: "Web Development Certification", issuer: "APTECH", date: "Aug 2020" },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "French", level: "Beginner" },
];
