import type { Metadata } from "next";
import { personal, site } from "@/data/site";

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMeta = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
  /** Absolute title used for social cards; defaults to `title`. */
  socialTitle?: string;
};

/**
 * Consistent page metadata. Open Graph / Twitter images come from the nearest
 * `opengraph-image.tsx` file convention, so they are intentionally not set here.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
  noindex,
  socialTitle,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = socialTitle ?? `${title} — ${site.displayName}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title: ogTitle,
      description,
      siteName: site.displayName,
      locale: site.locale,
      ...(type === "article" ? { publishedTime, modifiedTime, tags, authors: [site.name] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

/** Escape `<` so JSON-LD can never close its own <script> tag. */
export function jsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  alternateName: site.displayName,
  url: site.url,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${personal.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Bowen University" },
  knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "REST APIs", "Machine learning"],
  sameAs: [personal.github, personal.linkedin],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.displayName,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#person` },
};
