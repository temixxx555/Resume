# Adebayo Liberty — portfolio

A multi-page portfolio for a full-stack software engineer, built with Next.js (App Router), React, TypeScript,
Tailwind CSS v4 and Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # also regenerates the project sketches (see below)
npm start
npm run lint
```

> This repo uses a recent Next.js with breaking changes. Read `node_modules/next/dist/docs/` before changing framework
> behaviour (see `AGENTS.md`).

## Routes

| Route                                                     | Purpose                                                                                                         |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/`                                                       | Overview: hero, selected work, experience, capabilities, about, research, writing, contact                      |
| `/work`, `/work/[slug]`                                   | Case-study index and detailed case studies (`campus-connect`, `qr-platform`, `boweneats`, `lss-classification`) |
| `/about`, `/experience`                                   | Background, principles; roles, impact, education                                                                |
| `/blog`, `/blog/[slug]`                                   | MDX articles with TOC, progress bar, code highlighting, related posts                                           |
| `/contact`                                                | Email, links and a validated form (`/api/contact`)                                                              |
| `/resume`                                                 | Web résumé with PDF download and print styles                                                                   |
| `sitemap.xml`, `robots.txt`, `rss.xml`, `opengraph-image` | SEO and social                                                                                                  |

`Cmd/Ctrl + K` opens a command palette. The console has a small greeting.

## Where to edit things

| To change                                            | Edit                                                                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Name, email, links, availability, portrait, site URL | `data/site.ts`                                                                                             |
| Projects and case studies                            | `data/projects.ts` (one object per project; empty fields render nothing)                                   |
| Roles, education, certifications                     | `data/experience.ts`                                                                                       |
| Skills matrix                                        | `data/capabilities.ts`                                                                                     |
| Articles                                             | `content/blog/*.mdx` (frontmatter: `title description date updated category tags featured draft projects`) |
| Colours, type, spacing, motion tokens                | `app/globals.css`                                                                                          |
| Résumé PDF                                           | `public/adebayo-liberty-resume.pdf`                                                                        |

See `CONTENT-TODO.md` for everything that still needs your confirmation.

## Design system

- Warm near-black (`#0e0d0b`) and off-white "paper" sections; one ember accent (`#ff5b2e`) used for status, active state,
  numerals and focus.
- Geist (sans), Geist Mono (metadata), Instrument Serif italic (a single emphasised word per headline).
- Fluid type with `clamp()`. Tokens are CSS variables; `.paper` inverts a section.
- Motion: a small vocabulary. CSS keyframes for the hero entrance, Motion (`motion/react`, `LazyMotion` + `m`) for
  scroll reveals, mask reveals, the magnetic CTA and the mobile menu, and React `<ViewTransition>` for page transitions.
  Everything respects `prefers-reduced-motion`.

## Project sketches

Until you add screenshots, each project shows an original SVG interface sketch. The source is
`components/work/art-source.tsx`. `scripts/generate-art.tsx` renders it to static markup
(`components/work/art-markup.generated.ts`) so React does not hydrate hundreds of SVG nodes. `npm run build` runs it
automatically; run `npm run art` after editing the source.

## Contact form

`POST /api/contact` validates input, applies a honeypot, a minimum-fill-time check, same-origin check and a per-IP rate
limit (in-memory: use a shared store on serverless). Delivery goes through `lib/mailer.ts` (Resend by default; swap
`deliver()` for Postmark etc.). With no provider configured the form opens a prefilled `mailto:`. Copy `.env.example` to
`.env.local` to configure it.
