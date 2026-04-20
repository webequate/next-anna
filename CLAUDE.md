# Project: next-anna (Anna Elise Johnson — annaelisejohnson.com)

This is one of a family of 9 similar Next.js projects managed by Webequate. The projects share the same stack and architecture but are not identical.

**Purpose:** Portfolio and professional site for visual artist Anna Elise Johnson. Visitors can browse artworks organized by featured works (`/works`) and archive (`/history`), read an artist bio and full CV (`/about`), view press coverage (`/press`), and contact via a form that sends email through Gmail SMTP. All content is static — no database or CMS. Artwork data lives in `data/projects.json` and images in `public/images/`.

---

## Stack

| Layer | Version | Notes |
|---|---|---|
| Node.js | 24 LTS (24.15.0) | Pinned in `.nvmrc` and `vercel.json` |
| Next.js | 16 | App Router only; Turbopack enabled |
| React | 19 | Automatic JSX runtime (`react-jsx`) |
| TypeScript | 5.x | strict mode, `moduleResolution: bundler` |
| Tailwind CSS | 3.x | PostCSS pipeline |
| ESLint | 9 | Flat config (`eslint.config.mjs`) |
| Prettier | 3.x | Integrated via `eslint-plugin-prettier` |
| Nodemailer | 8 | Contact form email (Gmail SMTP) |
| Deployment | Vercel | Node 24, no custom build command |

---

## Architecture

- **App Router only.** There is no `pages/` directory (excluded in `tsconfig.json`). All routes live under `app/`.
- **Turbopack** is the bundler for both dev and build. Do not add webpack configuration — it will be ignored and may cause errors.
- **SVG imports** are handled natively by Turbopack via `resolveExtensions` in `next.config.js`. No `@svgr/webpack` loader needed.
- **CSS `@import`** statements must appear before all `@tailwind` directives in `globals.css` — Turbopack enforces this. This project loads Montserrat via `next/font/google` (not a CSS `@import`), so this constraint is not currently triggered.
- **Email** is sent via `nodemailer` (Gmail SMTP) through an App Router API route at `app/api/send-email/route.ts`.
- **Two-tier project routing.** Projects are split by the `featured` flag in `data/projects.json`. Featured projects are accessible at `/works/[id]` (indexed by search engines); archive projects are at `/history/[id]` (noindex). The `/history` listing page is also excluded from the sitemap.
- **Physical artwork metadata.** Every project carries `dimensions` (e.g. `"36 × 36 in."`) and `media` (e.g. `"acrylic on canvas"`) displayed in `ProjectFooter`. Some history projects also carry `year`. No other project in the family has this structure.
- **CV-driven About page.** `data/experience.json` drives a structured academic CV with sections for education, professional experience, residencies, collections, solo exhibitions, and group exhibitions. This data file is unique to this project.
- **Press page.** `data/press.json` holds curated press links with images, displayed as a clickable image grid on `/press`. Unique to this project.

---

## Directory structure

```
next-anna/
├── app/                          # All routes (App Router)
│   ├── layout.tsx                # Root layout: HTML shell, Montserrat font, providers
│   ├── page.tsx                  # Home page: featured projects grid
│   ├── providers.tsx             # Client-side providers (ThemeProvider + ScrollToTop)
│   ├── about/
│   │   └── page.tsx              # Artist bio + full CV from experience.json
│   ├── contact/
│   │   └── page.tsx              # Two-column: ContactForm + ContactDetails
│   ├── press/
│   │   └── page.tsx              # Press coverage: image grid from press.json
│   ├── history/
│   │   ├── page.tsx              # Archive: all projects grid (robots: noindex)
│   │   └── [id]/
│   │       └── page.tsx          # Archive project detail (noindex, generateStaticParams)
│   ├── works/
│   │   └── [id]/
│   │       └── page.tsx          # Featured project detail (indexed, generateStaticParams)
│   └── api/
│       └── send-email/
│           └── route.ts          # POST: contact form → Nodemailer. GET: health ping
│
├── components/                   # Shared UI components
│   ├── AnnaEliseJohnson.tsx      # SVG text logo "ANNA ELISE JOHNSON"
│   ├── ContactDetails.tsx        # Contact info block with icons + CV download link
│   ├── ContactForm.tsx           # Contact form: validation, honeypot, submit state
│   ├── Copyright.tsx             # Footer copyright with dynamic year
│   ├── DownloadCV.tsx            # CV download icon button (links to public PDF)
│   ├── Footer.tsx                # Footer nav, social links, copyright, WebEquate link
│   ├── FormInput.tsx             # Reusable labeled input/textarea field
│   ├── Hamburger.tsx             # Mobile menu toggle (FiMenu / FiX icons)
│   ├── Header.tsx                # Responsive nav: logo, links, hamburger, theme switcher
│   ├── Heading.tsx               # Section heading with accent-color text
│   ├── PageFade.tsx              # Page transition animation (sessionStorage-backed)
│   ├── ProjectFooter.tsx         # Project metadata: dimensions, media, optional year
│   ├── ProjectGrid.tsx           # 2-col/3-col responsive image grid with hover overlay
│   ├── ProjectHeader.tsx         # Project title + prev/next navigation arrows
│   ├── ProjectViewer.tsx         # Project detail: image + swipe nav (react-swipeable)
│   ├── Social.tsx                # Maps socialLinks array → SocialButton list
│   ├── SocialButton.tsx          # Individual social icon link (opens new tab)
│   ├── ThemeSwitcher.tsx         # Moon/Sun toggle using next-themes
│   └── WebEquate.tsx             # "Website by WebEquate" attribution link
│
├── hooks/
│   ├── useScrollToTop.tsx        # Returns scroll-to-top button JSX; shows after 400px scroll
│   └── useThemeSwitcher.tsx      # Legacy manual theme hook (not used by ThemeSwitcher.tsx)
│
├── interfaces/
│   └── ContactForm.ts            # ContactForm interface (name, email, subject, message, website)
│
├── lib/                          # Empty — no shared utilities in this project currently
│
├── types/
│   ├── basics.ts                 # Basics and SocialLink types (matches data/basics.json shape)
│   ├── experience.ts             # Experience and ExperienceSection types (matches experience.json)
│   ├── press.ts                  # PressLink type (matches data/press.json shape)
│   └── project.ts                # Project type (matches data/projects.json shape)
│
├── data/                         # Static JSON content (source of truth for all site content)
│   ├── basics.json               # Site identity: name, email, location, social links, contact intro
│   ├── experience.json           # CV data: education, professional experience, exhibitions (~2700 lines)
│   ├── press.json                # Press links with images and display order (3 entries)
│   └── projects.json             # All artworks: 100+ projects with metadata (~2700 lines)
│
├── styles/
│   └── globals.css               # Tailwind directives, nav classes, fade animation, scroll-to-top
│
├── public/
│   ├── anna.png                  # Favicon
│   ├── anna.jpg                  # About page portrait photo
│   ├── AnnaEliseJohnsonCV2024.pdf  # Current CV (linked from ContactDetails + DownloadCV)
│   ├── AnnaEliseJohnsonCV2023.pdf  # Previous CV
│   ├── robots.txt                # Generated by next-sitemap
│   ├── sitemap.xml               # Generated by next-sitemap
│   ├── sitemap-0.xml             # Generated by next-sitemap (post-processed to sort URLs)
│   ├── assets/                   # Logos and static brand images
│   │   ├── logo-webequate-light.png
│   │   ├── logo-webequate.png
│   │   ├── facebook.png
│   │   └── instagram.png
│   ├── fonts/                    # Self-hosted GeneralSans variable font (eot/ttf/woff/woff2)
│   └── images/                   # All artwork images, organized by year
│       ├── 2025/                 # Latest works (Waves series, Geological Force series, Klee Mountain)
│       ├── 2024/
│       ├── 2023/
│       ├── 2022/
│       ├── 2015/                 # Subdirs: acrylic-collages/, drawings/, installations/
│       ├── 2014/
│       ├── 2013/
│       ├── 2012/
│       ├── collages/
│       ├── drawings/
│       ├── press/                # Press coverage thumbnail images (logo-*.jpg)
│       └── anna-og.jpg           # OG image for social sharing
│
├── next.config.js                # Turbopack extensions, AVIF/WebP formats, strict mode
├── tsconfig.json                 # Target ES2022, react-jsx, @/* alias, bundler resolution
├── tailwind.config.js            # Custom palette (blue accents), dark mode: class, forms plugin
├── eslint.config.mjs             # ESLint v9 flat config
├── postcss.config.js             # PostCSS for Tailwind
├── .prettierrc.json              # Formatting rules
├── next-sitemap.config.js        # Sitemap: excludes /history, sorts URLs alphabetically
├── vercel.json                   # NODE_VERSION: 24.15.0
├── .nvmrc                        # Node 24
└── .env.template                 # Environment variable reference
```

---

## Key files

| File | Purpose |
|---|---|
| `next.config.js` | Turbopack extensions, AVIF/WebP image formats, strict mode |
| `tsconfig.json` | `jsx: react-jsx`, no `baseUrl`, `moduleResolution: bundler` |
| `eslint.config.mjs` | ESLint v9 flat config with native `@typescript-eslint` rules |
| `styles/globals.css` | Tailwind directives, nav class hierarchy, fade-in keyframes |
| `.nvmrc` | Node 24 |
| `vercel.json` | `NODE_VERSION: 24.15.0` |
| `app/api/send-email/route.ts` | Contact form API handler |
| `data/basics.json` | Site identity and contact config |
| `data/projects.json` | All artwork content (single source of truth) |
| `data/experience.json` | CV data: education, experience, exhibitions |
| `data/press.json` | Press coverage links and images |

---

## Environment variables

All variables are required in production unless marked optional. Copy `.env.template` to `.env.local` for local development.

| Variable | Required | Description |
|---|---|---|
| `GMAIL_USER` | Yes | Gmail account used as the SMTP sender |
| `GMAIL_APP_PASS` | Yes | Gmail app-specific password (not the account password) |
| `EMAIL_FROM` | Yes | `From:` address in outgoing emails |
| `EMAIL_TO` | Yes | Recipient address for contact form submissions |
| `EMAIL_CC` | No | CC address for contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (`https://annaelisejohnson.com`) — used for metadata and sitemaps |
| `NEXT_PUBLIC_ASSET_URL` | Yes | Base URL for public assets |
| `NEXT_PUBLIC_GTM_ID` | No | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

`NEXT_PUBLIC_*` variables are embedded at build time and exposed to the browser. Never put secrets in `NEXT_PUBLIC_*` variables.

---

## Third-party services

| Service | How used |
|---|---|
| **Gmail SMTP** | Nodemailer connects on port 465 (TLS) using `GMAIL_USER` + `GMAIL_APP_PASS`. Configure a Gmail App Password — standard account passwords are rejected. |
| **Google Fonts (Montserrat)** | Loaded via `next/font/google` in `app/layout.tsx` — not a CSS `@import`. This is the correct Turbopack-compatible approach. |
| **Vercel** | Deployment platform. No custom build command — Vercel auto-detects Next.js. Node version set in `vercel.json`. |
| **next-sitemap** | Generates `sitemap.xml` and `robots.txt` at build time via `npm run build:sitemap`. Config in `next-sitemap.config.js`. Post-processes the output to sort URLs alphabetically. |
| **react-swipeable** | Mobile swipe gesture navigation in `ProjectViewer.tsx`. Swipe left/right to go to next/prev project. Touch only — mouse swipe disabled. |

---

## Data model

### `data/basics.json` → `types/basics.ts`

Single object with site-wide identity and contact info. Imported directly in server components.

```ts
type SocialLink = {
  name: string;
  handle: string;
  url: string;
};

type Basics = {
  _id: string;
  name: string;
  titles: string[];
  email: string;
  resumeLink: string;       // Path to current CV PDF in public/
  socialLinks: SocialLink[];
  location: string;
  website: string;
  contactIntro: string;     // Intro paragraph for the contact page
};
```

### `data/projects.json` → `types/project.ts`

Array of 100+ artworks. This is the single source of truth for all artwork pages. Split by the `featured` flag at render time — never maintain a separate list.

```ts
type Project = {
  id: string;           // URL-safe slug used as the route [id] param
  title: string;
  dimensions: string;   // Physical size, e.g. "36 × 36 in."
  media: string;        // Medium, e.g. "acrylic on canvas"
  year?: string;        // Optional year string (shown in ProjectFooter for history projects)
  image: string;        // Path relative to public/images/, e.g. "2025/waves-chinatown-1.jpg"
  featured: boolean;    // true → /works/[id] (indexed); false → /history/[id] (noindex)
  order: number;        // Sort order for display (descending = newest first)
};
```

Artwork images live at `/public/images/[year]/[filename].jpg`. The `image` field contains the full subpath including year directory (e.g. `"2025/waves-chinatown-1-missing-waves.jpg"`).

### `data/experience.json` → `types/experience.ts`

Array of CV sections rendered on the About page. Each top-level entry is a major CV group.

```ts
type ExperienceSection = {
  name: string;         // Subsection heading, e.g. "Residencies"
  items: string[];      // Line items within that subsection
};

type Experience = {
  title: string;        // Top-level group heading, e.g. "Related Professional Experience"
  sections: ExperienceSection[];
};
```

Current CV groups: education/timeline (untitled), Related Professional Experience, Work in Museum Collections, Solo Exhibitions (2024–2011), Group Exhibitions (2022–2004).

### `data/press.json` → `types/press.ts`

Array of press coverage entries displayed on `/press` as a clickable image grid.

```ts
type PressLink = {
  name: string;         // Publication name
  url: string;          // Link to the article
  text: string;         // Article title or description
  image: string;        // Path to logo/image relative to public/images/press/
  order: number;        // Display order (ascending)
};
```

### `interfaces/ContactForm.ts`

```ts
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;   // Honeypot — must be empty on legitimate submissions; bots fill it in
}
```

---

## Routing

| URL pattern | Source file | Indexed | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Yes | Featured projects grid, sorted by `order` desc |
| `/about` | `app/about/page.tsx` | Yes | Artist bio + CV from `experience.json` |
| `/press` | `app/press/page.tsx` | Yes | Press links grid from `press.json`, sorted by `order` asc |
| `/contact` | `app/contact/page.tsx` | Yes | Two-column: form + contact details |
| `/history` | `app/history/page.tsx` | **No** | All projects archive grid (excluded from sitemap) |
| `/history/[id]` | `app/history/[id]/page.tsx` | **No** | Archive project detail; `generateStaticParams` over non-featured projects |
| `/works/[id]` | `app/works/[id]/page.tsx` | Yes | Featured project detail; `generateStaticParams` over featured projects |
| `/api/send-email` | `app/api/send-email/route.ts` | N/A | POST: send email; GET: health ping |

**Routing split logic:** Pages import `projects.json` and filter by `project.featured`. Featured projects populate `/works/[id]` with prev/next navigation across featured works only. Archive projects populate `/history/[id]` with prev/next navigation across all projects. The home page (`/`) shows only featured projects.

Dynamic detail pages use `generateStaticParams` to pre-render all slugs at build time. Both use `revalidate = 60` (ISR).

---

## Theming

Dark mode is class-based (set on `<html>`). `next-themes` manages persistence to `localStorage` and hydration safety. The root layout sets `suppressHydrationWarning` and `defaultTheme="dark"` with `enableSystem={false}`.

**Custom Tailwind palette (this project uses blue accents, not orange):**

| Token | Value | Usage |
|---|---|---|
| `light-1` | `#f5f5f5` | Backgrounds, nav pill background |
| `light-2` | `#a3a3a3` | Secondary text |
| `light-3` | `#404040` | Borders, dividers |
| `dark-1` | `#262626` | Dark mode backgrounds |
| `dark-2` | `#525252` | Dark mode secondary text |
| `dark-3` | `#d4d4d4` | Dark mode borders |
| `accent-light` | `#4996e5` | Accent in light mode (blue) |
| `accent-dark` | `#2972d1` | Accent in dark mode (blue) |

Use `dark:` prefix variants for dark-mode styles. `ThemeSwitcher` renders a Moon icon in light mode and a Sun icon in dark mode.

**Typography:** Montserrat is the body font, loaded via `next/font/google` in `app/layout.tsx`. The CSS variable `--font-montserrat` is applied to `<body>` and the `.montserrat` class is defined in `globals.css` for explicit use. The `public/fonts/` directory contains a self-hosted GeneralSans variable font — it is present but not currently wired into the CSS or layout.

---

## Coding conventions

### Imports

All imports use the `@/` alias (maps to project root). No relative imports.

```ts
import basics from "@/data/basics.json";
import { Project } from "@/types/project";
import Header from "@/components/Header";
```

### Server vs client components

The default is server component. Add `"use client"` only when the component needs browser APIs, event handlers, or React hooks. Components that must be client: `PageFade` (sessionStorage, `useLayoutEffect`), `ProjectViewer` (swipe, `useState`/`useEffect`), `ContactForm`, `Header`, `ThemeSwitcher`, `Hamburger`, `useScrollToTop`.

### TypeScript

- Strict mode is on. Avoid `any` — the ESLint config allows it only in `**/api/**/*.ts` files.
- Prefix intentionally unused parameters with `_` (e.g. `_name`, `_config`) — the lint rule suppresses warnings for `^_` patterns.
- Type data shapes in `types/` (matching JSON structure). Put component prop interfaces inline in the same file. Put cross-component interfaces in `interfaces/`.
- JSON data is imported directly and cast to typed arrays: `basics.socialLinks as SocialLink[]`, `experiences as Experience[]`.

### Styling

- Tailwind utility classes only — no CSS Modules, no styled-components.
- Dark mode via `dark:` prefix on every element that needs it.
- The `.fade-in` animation class is defined in `globals.css` — use it via `className`; don't recreate the keyframe.
- Nav class hierarchy defined in `globals.css` under `@layer components`:
  - `.nav-primary` — desktop horizontal pill nav
  - `.nav-secondary` — footer pill nav
  - `.nav-mobile` — collapsible hamburger drawer (animated via `max-h` transition)
- The `scrollbar-gutter: stable both-edges` rule on `html` prevents layout shift when a scrollbar appears.
- Images should always include `style={{ height: "auto" }}` alongside explicit `width`/`height` props to prevent the Next.js aspect-ratio warning when CSS constrains one dimension.

### Forms

- All form state lives in client components with `useState`.
- Submit handler POSTs JSON to `/api/send-email`, reads `{ success, message }` response.
- Always include the honeypot `website` field (hidden via CSS, not `type="hidden"` — bots ignore CSS).
- Reset form fields on successful submission.
- Show loading state ("Sending…") on the submit button during the request.
- Display validation errors as a list; display success/error status as a banner.

### Email API route

Server-side validation mirrors client validation. The route:
1. Rejects requests with a filled honeypot field silently (returns success to confuse bots).
2. Validates all required fields and email format.
3. Escapes HTML in all user-supplied strings before embedding in the HTML email body.
4. Sends both an HTML version and a plain-text fallback via Nodemailer (Gmail SMTP, port 465).

### Page transitions

Wrap page content in `<PageFade>` to get the fade-in animation. `PageFade` uses `sessionStorage` to track which pages have already been animated in the current browser session — navigating back to a page skips the re-animation. Three modes:

- `mode="pathname"` (default) — animate on every unique full-path change
- `mode="root"` — animate only when the root path segment changes (used in project detail pages so `/works/a` → `/works/b` doesn't re-animate)
- `mode="mount"` — animate only once on first mount (skips sessionStorage check)

### Project data

- `data/projects.json` is the single source of truth. Never add artwork data anywhere else.
- Filter by `project.featured` to separate works (`/works`) from history (`/history`).
- Sort by `project.order` descending (highest order = newest).
- The `image` field is a subpath relative to `/public/images/` — prefix with `/images/` when constructing `<Image src>`.
- Physical metadata (`dimensions`, `media`) is displayed by `ProjectFooter`. Format dimensions strings consistently: `"W × H in."`.
- `year` is optional and only shown in `ProjectFooter` for history-path views.

### SEO / metadata

Every route exports a `metadata` object. Required fields:

```ts
export const metadata = {
  title: "Page Title",          // Appended to template: "Page Title | Anna Elise Johnson"
  description: "...",
  robots: { index: true, follow: true },   // or { index: false } for history pages
  alternates: { canonical: "/route" },
  openGraph: {
    title: "...",
    description: "...",
    url: "https://annaelisejohnson.com/route",
    siteName: "Anna Elise Johnson",
    images: [{ url: "...", alt: "..." }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "...", description: "...", images: ["..."] },
};
```

History pages must set `robots: { index: false }`. The root layout sets `metadataBase` so relative canonical URLs work. Default `revalidate = 60` (ISR) is set in `app/layout.tsx`; individual pages may override.

---

## Component conventions

- **File names:** PascalCase matching the exported component name (`ProjectGrid.tsx`, not `project-grid.tsx`).
- **Hook files:** camelCase prefixed with `use`, in `hooks/` (`useScrollToTop.tsx`).
- **One component per file.**
- **Props:** Inline interface or type at the top of the file. No separate props files.
- **Export pattern:** `export default function ComponentName` — no wrapper HOCs.
- **Icons:** Use `react-icons` subpackages: `fi` (Feather Icons), `fa` (Font Awesome). Import only what's used.
- **Note on `@headlessui/react` and `@heroicons/react`:** These are present in `package.json` but are not currently used in any component. Do not add new usage without confirming the dependency is still installed.
- **Note on `useThemeSwitcher.tsx`:** This is a legacy custom hook that manually manages `localStorage`. The current `ThemeSwitcher.tsx` uses `next-themes` directly via `useTheme()`. Do not use `useThemeSwitcher` for new work.

---

## Sitemap

The sitemap excludes `/history` and all `/history/[id]` routes. These are artist archive pages that should not appear in search results. The `next-sitemap.config.js` post-processes `sitemap-0.xml` after generation, sorting all `<url>` entries alphabetically by `<loc>` using natural numeric sorting (so `work-10` sorts after `work-9`). Run `npm run build:sitemap` after `npm run build` to regenerate.

```
/history     → excluded from sitemap, robots: noindex
/history/[id] → robots: noindex (set per-page in metadata)
```

---

## Testing

**Stack:** Vitest 4.x + React Testing Library + jsdom. Config in `vitest.config.ts`; setup file is `vitest.setup.ts` (imports `@testing-library/jest-dom` matchers). Globals are enabled — `describe`, `it`, `expect`, `vi` are available without explicit imports, though explicit imports also work.

**Test location:** `__tests__/components/` and `__tests__/hooks/`. Mirror the source directory structure.

**What is tested:** Components and hooks with meaningful logic, interactivity, or conditional rendering. Purely presentational components with no logic are skipped.

Current test coverage:
- `__tests__/hooks/useThemeSwitcher.test.ts` — theme default, localStorage read on mount, class application, no-loop invariant
- `__tests__/components/ContactForm.test.tsx` — submit states, success/error responses, network failure, request body shape
- `__tests__/components/Header.test.tsx` — active link logic (`isActive()`), mobile menu toggle
- `__tests__/components/Hamburger.test.tsx` — toggle callback, icon rendering
- `__tests__/components/ThemeSwitcher.test.tsx` — light↔dark toggle via `next-themes`
- `__tests__/components/ProjectHeader.test.tsx` — prev/next link conditionals, path prop
- `__tests__/components/ProjectFooter.test.tsx` — inch-mark regex, optional year/dimensions/media
- `__tests__/components/ProjectGrid.test.tsx` — links, `priority` prop on first 3 images, empty state
- `__tests__/components/SocialButton.test.tsx` — all 6 network icons, fallback, new-tab target
- `__tests__/components/Copyright.test.tsx` — current year, name, copyright symbol
- `__tests__/components/PageFade.test.tsx` — fade modes (`pathname`, `root`, `mount`), sessionStorage caching

**Mocking conventions:**
- `next/link` → passthrough `<a href={href}>` with forwarded props
- `next/image` → `<img>` with `data-priority` attribute
- `next/navigation` → `usePathname: vi.fn()` returning a controllable value
- `next-themes` → `useTheme: vi.fn()` returning `{ theme, setTheme }`
- Sub-components are mocked in `Header.test.tsx` to isolate `isActive()` logic
- `FormInput` and `Heading` are mocked in `ContactForm.test.tsx` to isolate form behavior
- `global.fetch` is assigned a `vi.fn()` mock per test for API call tests
- `localStorage` / `sessionStorage` are replaced with in-memory mock objects via `vi.stubGlobal`

**ESLint:** Test files are exempt from `@typescript-eslint/no-explicit-any` (needed for mock typing).

**Note on `useThemeSwitcher`:** Tests spy on `document.documentElement.classList.add/remove` via `vi.spyOn` — do not use `vi.stubGlobal("document", ...)` as that breaks RTL's DOM rendering.

## Commands

```bash
npm run dev            # dev server on port 4444 (Turbopack)
npm run build          # production build
npm run lint           # eslint . (ESLint v9 flat config)
npm run format         # prettier --write on all source files
npm run build:sitemap  # next-sitemap + sorts sitemap-0.xml alphabetically
npm run test           # vitest watch mode
npm run test:run       # vitest run (CI / single pass)
```

---

## What to avoid

- Do not add a `webpack()` function to `next.config.js` — Turbopack is active.
- Do not add `baseUrl` to `tsconfig.json` — deprecated in TS 6.0.
- Do not use `next/head` or `next/router` — App Router uses `export const metadata` and `next/navigation`.
- Do not use `.eslintrc.*` files — ESLint v9 reads only `eslint.config.mjs`.
- Do not use `next lint` in scripts — replaced by `eslint .`.
- Do not downgrade Node below 24 — `package.json` `engines` enforces `>=24.0.0`.
- Do not use relative imports — use the `@/` alias.
- Do not create a separate featured-projects list — filter `data/projects.json` by `featured: true`.
- Do not add artwork data anywhere other than `data/projects.json`.
- Do not put secrets in `NEXT_PUBLIC_*` environment variables — they are embedded in the client bundle.
- Do not load Google Fonts via CSS `@import` — use `next/font/google` as the root layout already does for Montserrat.
- Do not add `<Image>` components without `style={{ height: "auto" }}` — Next.js 16 warns when CSS constrains one dimension of an image without the other.
- Do not make `/history` or `/history/[id]` routes indexable — these are archive pages that must stay noindex.

---

## Upgrade history (condensed)

The following changes were made to reach the current state from a Next.js 15 / Node 22 baseline:

1. **Next.js 16 + Turbopack** — removed webpack SVG loader (`@svgr/webpack` removed from deps), added `turbopack.resolveExtensions`, set `jsx: react-jsx`.
2. **ESLint v9 flat config** — deleted `.eslintrc.json`, created `eslint.config.mjs`, changed lint script from `next lint` to `eslint .`.
3. **Security audit pass** — `nodemailer` already at 8; audit cleared to 0 vulnerabilities.
4. **Dependency refresh** — next/react/react-dom/sharp/postcss/prettier/autoprefixer bumped to current stable; `@typescript-eslint` parser + plugin added; `@svgr/webpack`, `eslint-config-prettier`, `eslint-plugin-prettier`, `eslint-plugin-react-hooks` removed.
5. **Dead code removal** — deleted `components/Layout.tsx` (Pages Router component using `next/head`) and `components/LayoutWidget.tsx` (unused widget).
6. **tsconfig cleanup** — target `es2020` → `es2022`, `jsx: preserve` → `react-jsx`, added `.next/dev/types/**/*.ts` to include, added `.next`, `.mailing`, `.backup-pages`, `pages` to exclude.
7. **Node.js 24 LTS** — `.nvmrc`, `vercel.json`, `engines` all updated; `eslint-config-next` and `next`/`@next/third-parties` bumped to ^16.0.0.
8. **Lint fixes** — replaced `as any` casts with typed assertions (`as SocialLink[]`, `as Experience[]`); unused params prefixed `_`; `catch (e: any)` → `catch`; added `sessionStorage` and timer globals to ESLint config.
9. **Image aspect-ratio fix** — added `style={{ height: "auto" }}` to `ProjectViewer` and `ProjectGrid` images to eliminate Next.js 16 aspect-ratio warnings.
