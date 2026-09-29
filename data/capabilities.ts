/**
 * Capabilities are shown as a typographic matrix. `core` means used in shipped products,
 * `working` means comfortable but less central. `used` maps a tech to the work that proves it
 * (keys match `capabilityWork`).
 */

export const capabilityWork = [
  { id: "campus-connect", label: "Campus Connect" },
  { id: "qr-platform", label: "QR Platform" },
  { id: "boweneats", label: "BowenEats" },
  { id: "intplus", label: "IntPlus" },
  { id: "j3", label: "J3 Rentals" },
  { id: "lss", label: "LSS research" },
] as const;

export type WorkId = (typeof capabilityWork)[number]["id"];

export type Capability = { name: string; core?: boolean; used?: WorkId[] };
export type CapabilityGroup = { label: string; blurb: string; items: Capability[] };

export const capabilities: CapabilityGroup[] = [
  {
    label: "Frontend",
    blurb: "Interfaces that are fast, accessible and hold up on a phone.",
    items: [
      { name: "Next.js", core: true, used: ["campus-connect", "qr-platform", "j3"] },
      { name: "React", core: true, used: ["campus-connect", "qr-platform", "boweneats", "intplus"] },
      { name: "TypeScript", core: true, used: ["campus-connect", "intplus"] },
      { name: "Tailwind CSS", core: true, used: ["campus-connect", "intplus"] },
      { name: "shadcn/ui", used: ["intplus"] },
      { name: "JavaScript (ES6+)", core: true },
      { name: "Motion" },
      { name: "Responsive design", core: true, used: ["campus-connect", "intplus"] },
      { name: "PWAs" },
    ],
  },
  {
    label: "Backend",
    blurb: "APIs and access control that other people can build on.",
    items: [
      { name: "Node.js", core: true, used: ["campus-connect", "boweneats", "j3"] },
      { name: "Express.js", core: true, used: ["campus-connect", "boweneats", "j3"] },
      { name: "REST API design", core: true, used: ["campus-connect", "boweneats", "intplus", "j3"] },
      { name: "JWT authentication", used: ["j3"] },
      { name: "Role-based access control" },
      { name: "Clerk" },
      { name: "Python", used: ["lss"] },
      { name: "Flask" },
      { name: "FastAPI" },
    ],
  },
  {
    label: "Data & infrastructure",
    blurb: "Storing things sensibly and getting them online.",
    items: [
      { name: "MongoDB", core: true, used: ["campus-connect", "boweneats", "j3"] },
      { name: "Mongoose", used: ["boweneats", "j3"] },
      { name: "Firebase" },
      { name: "Vercel", used: ["j3"] },
      { name: "Render", used: ["j3"] },
      { name: "Cloudinary" },
    ],
  },
  {
    label: "Product & tooling",
    blurb: "The parts around the code that make a product a product.",
    items: [
      { name: "Paystack", core: true, used: ["qr-platform"] },
      { name: "Stripe" },
      { name: "Analytics", used: ["qr-platform"] },
      { name: "Figma to code", used: ["intplus"] },
      { name: "Git & GitHub", core: true },
      { name: "Agile / Scrum", used: ["intplus"] },
      { name: "Code review", used: ["intplus"] },
    ],
  },
  {
    label: "Additional engineering",
    blurb: "Curiosity that goes past conventional web development.",
    items: [
      { name: "Deep learning", used: ["lss"] },
      { name: "Computer vision", used: ["lss"] },
      { name: "Machine learning", used: ["lss"] },
      { name: "QR technology", used: ["qr-platform"] },
      { name: "Push notifications" },
      { name: "Performance optimisation", used: ["intplus", "j3"] },
    ],
  },
];
