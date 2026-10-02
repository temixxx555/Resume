# Content to confirm or replace

Everything here is drafted from your résumé and your brief. Nothing below is invented as fact, but a few items are
_framing_ that only you can verify. Search the repo for `todos:` in `data/projects.ts` to see the per-project notes.

## Needed before you publish

| Item                      | Where                                                    | Notes                                                                                                        |
| ------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Real domain               | `NEXT_PUBLIC_SITE_URL` (`.env`)                          | Fallback is the placeholder `adebayoliberty.dev`. Canonical URLs, sitemap and OG tags use it.                |
| LinkedIn URL              | `data/site.ts` → `personal.linkedin`                     | Built from the handle `temi-adebayo` in your résumé. Confirm it opens your profile.                          |
| Live and GitHub links     | `data/projects.ts` → `liveUrl`, `githubUrl`              | All unset, so nothing is shown. Add per project.                                                             |
| Real screenshots          | `data/projects.ts` → `thumbnail`, `heroImage`, `gallery` | Drop images in `public/`. Until then each project shows an original interface sketch, captioned as a sketch. |
| Project years             | `data/projects.ts` → `year`                              | Only LSS (2026) is set. Others are hidden until you add them.                                                |
| Portrait (optional)       | `data/site.ts` → `personal.portrait`                     | The About page uses a typographic panel until you add one.                                                   |
| Email delivery (optional) | `.env` → `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`          | Without them the contact form opens a prefilled `mailto:`.                                                   |

## Copy that is framing, not fact. Please read and rewrite in your own words

- **Campus Connect**: the "problem" paragraphs, the four "engineering decisions" and the two "challenges". They follow
  from the features you listed, but they describe intent. Confirm how anonymous posts, streaks and leaderboards are
  actually implemented before keeping the "challenges" section.
- **QR Platform**: the dynamic-redirect description, the stack (auth provider, database, hosting are not named), the
  list of QR types, and the "In development: enterprise and rewards" note.
- **BowenEats**: I only know it is a MERN app. Describe what it does, and replace the two stack-level decisions.
- **LSS classification**: no dataset, architecture, metrics or class labels are stated. Add them, plus any report link.
- **About page**: the four "How I work" principles and the biography are written in a first-person voice from your
  résumé. Adjust anything that does not sound like you.
- **Résumé vs brief**: the résumé lists 25% higher client satisfaction and a 95%+ review approval rate for IntPlus (both
  are on the experience page). It also lists "45% more mobile engagement" and "30% lower bounce rates" in the summary
  without naming a project, so those are deliberately **not** used.

## Blog

The three articles in `content/blog/` are marked `draft: true`. They are technical explainers plus one clearly
flagged outline; none claims results. While `draft: true` they show a "Draft" label, are `noindex`, and are left out of
the sitemap and RSS. Remove `draft: true` from an article (or set `showDraftsInProduction: false` in `data/site.ts`
to hide them) once you approve it.

## Privacy

The PDF at `public/adebayo-liberty-resume.pdf` is a copy of your résumé and includes your phone number. The site pages
never print the number, but the PDF is publicly downloadable. Replace it with a version without the number if you prefer.
