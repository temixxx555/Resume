/**
 * Single place to update identity, contact details and site-wide switches.
 * Anything marked `null` is intentionally unknown and is simply not rendered.
 */

export const site = {
  name: "Adebayo Oluwamotemi Liberty",
  displayName: "Adebayo Temi",
  initials: "AT",
  role: "Full-Stack Software Engineer",
  // Set NEXT_PUBLIC_SITE_URL in production. The fallback is a placeholder domain.
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://adebayoliberty.dev"
  ).replace(/\/$/, ""),
  title: "Adebayo Temi — Full-Stack Software Engineer",
  description:
    "Adebayo Oluwamotemi Liberty is a full-stack software engineer in Lagos, Nigeria. He builds products end to end with Next.js, React, TypeScript, Node.js and MongoDB.",
  locale: "en_NG",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  /**
   * Blog posts with `draft: true` are the sample articles awaiting your review.
   * true  → shown with a "Draft" label, marked noindex, and left out of the sitemap/RSS.
   * false → drafts are hidden entirely in production.
   */
  showDraftsInProduction: true,
} as const;

export const personal = {
  email: "temiq3@gmail.com",
  github: "https://github.com/temixxx555",
  whatsapp: "https://wa.me/2349138721435",
  githubHandle: "temixxx555",
  // Handle taken from the resume ("temi-adebayo"). Verify the exact profile URL.
  linkedin: "https://www.linkedin.com/in/temi-adebayo-822458289",
  linkedinHandle: "temi-adebayo",
  x: null as string | null,
  previousSite: "https://temiq3.vercel.app",
  resumePdf: "/adebayo-liberty-resume.pdf",
  availability: {
    open: true,
    label: "Open to full-time roles",
    detail: "Also considering select contract work",
  },
  /** Drop a real photo in /public and fill this in. The About page is designed to work without it. */
  portrait: { src: "/avatar.png", alt: "avatar", width: 100, height: 100 },
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Writing" },
] as const;

export const contactHref = "/contact";

export const socials = [
  {
    label: "GitHub",
    href: personal.github,
    handle: `@${personal.githubHandle}`,
  },
  {
    label: "LinkedIn",
    href: personal.linkedin,
    handle: personal.linkedinHandle,
  },
] as const;
