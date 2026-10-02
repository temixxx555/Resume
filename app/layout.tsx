import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site, personal, nav } from "@/data/site";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";
import { jsonLdString, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SiteNav } from "@/components/layout/SiteNav";
import { Footer } from "@/components/layout/Footer";
import {
  PaletteMount,
  type PaletteItem,
} from "@/components/layout/PaletteMount";
import { ConsoleGreeting } from "@/components/layout/ConsoleGreeting";

const sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
const serif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.displayName}` },
  description: site.description,
  applicationName: site.displayName,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Adebayo Oluwamotemi Liberty",
    "Adebayo Liberty",
    "Full-Stack Software Engineer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "Full-Stack Developer",
    "Lagos",
    "Nigeria",
  ],
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/rss.xml` },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.displayName,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0d0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

function paletteItems(): PaletteItem[] {
  const pages: PaletteItem[] = [
    {
      id: "home",
      label: "Home",
      group: "Pages",
      action: { type: "route", href: "/" },
    },
    ...nav.map((n) => ({
      id: `nav-${n.label}`,
      label: n.label === "Writing" ? "Writing (blog)" : n.label,
      group: "Pages",
      action: { type: "route" as const, href: n.href },
    })),
    {
      id: "contact",
      label: "Contact",
      group: "Pages",
      action: { type: "route", href: "/contact" },
    },
    {
      id: "resume",
      label: "Résumé",
      group: "Pages",
      action: { type: "route", href: "/resume" },
    },
  ];
  const work: PaletteItem[] = projects.map((p) => ({
    id: `work-${p.slug}`,
    label: p.title,
    group: "Work",
    hint: p.kind === "research" ? "Research" : "Case study",
    action: { type: "route", href: `/work/${p.slug}` },
  }));
  const posts: PaletteItem[] = getAllPosts()
    .slice(0, 6)
    .map((p) => ({
      id: `post-${p.slug}`,
      label: p.title,
      group: "Writing",
      hint: p.category,
      action: { type: "route", href: `/blog/${p.slug}` },
    }));
  const links: PaletteItem[] = [
    {
      id: "copy-email",
      label: "Copy email address",
      group: "Actions",
      hint: personal.email,
      action: { type: "copy", text: personal.email },
    },
    {
      id: "pdf",
      label: "Open résumé PDF",
      group: "Actions",
      hint: "PDF",
      action: { type: "external", href: personal.resumePdf },
    },
    {
      id: "gh",
      label: "GitHub",
      group: "Elsewhere",
      hint: `@${personal.githubHandle}`,
      action: { type: "external", href: personal.github },
    },
    {
      id: "li",
      label: "LinkedIn",
      group: "Elsewhere",
      hint: personal.linkedinHandle,
      action: { type: "external", href: personal.linkedin },
    },
  ];
  return [...pages, ...work, ...posts, ...links];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        {/* If JS is unavailable, scroll-reveal starting states must not hide content. */}
        <noscript>
          <style>{`.js-reveal{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className='min-h-svh' cz-shortcut-listen='true'>
        <a
          href='#main'
          className='fixed top-3 left-3 z-[100] -translate-y-20 rounded-md bg-fg px-4 py-2.5 text-sm font-medium text-bg transition-transform focus:translate-y-0'
        >
          Skip to content
        </a>
        <MotionProvider>
          <SiteNav />
          <main id='main' className='flex min-h-svh flex-col'>
            {children}
          </main>
          <Footer />
          <CustomCursor />
          <PaletteMount items={paletteItems()} />
          <ConsoleGreeting />
        </MotionProvider>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: jsonLdString([personJsonLd, websiteJsonLd]),
          }}
        />
      </body>
    </html>
  );
}
