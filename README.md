# AnnaEliseJohnson.com

This is a Next.js website built with React, TypeScript, Tailwind CSS, Framer Motion, and the Next.js App Router (Next 15).

Originally created with the Pages Router, it was migrated to the App Router in September 2025 for improved data/loading patterns, metadata handling, and layout composition.

## Getting Started

This project targets Node.js 22 (see `package.json` engines). If you use nvm or fnm, make sure you're on Node 22 before installing dependencies.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the root page by modifying `app/page.tsx`.

### App Router Structure

Key directories:

```
app/
	layout.tsx          // Root layout with providers & global styles
	page.tsx            // Home (featured works)
	about/page.tsx
	contact/page.tsx
	press/page.tsx
	history/page.tsx    // Full history (noindex)
	works/[id]/page.tsx // Featured project detail
	history/[id]/page.tsx // Historical project detail (noindex)
	api/send-email/route.ts // Route handler for contact form email
```

### Email Sending
The contact form posts to `/api/send-email` which lazily loads `nodemailer` and sends a plain HTML email template.

### Metadata
Per-route SEO metadata is defined via `export const metadata` and dynamic metadata functions in dynamic routes.

### Theming & Animation
Dark/light mode via `next-themes`. Page fade-in animations use a small client component wrapper (`components/AnimatedFade.tsx`).

### Scroll To Top
`hooks/useScrollToTop.tsx` was converted into a client component and injected at the root via `app/providers.tsx`.

### Migration Notes
- Legacy `pages/` directory removed (except for API which was converted to a route handler).
- Replaced `next/router` with `next/navigation` in interactive components.
- Dynamic routes use `generateStaticParams` for static pre-rendering.

### Future Enhancements
- Use `next/font` for Montserrat instead of external stylesheet.
- Add `app/sitemap.ts` & `app/robots.ts` for native sitemap / robots control (currently using `next-sitemap`).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
