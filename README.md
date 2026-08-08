# Ink Studio

A premium tattoo studio website — a demo/concept project built as a portfolio
piece. Bilingual (EN/RU), fully functional booking flow with real-time
availability, an authenticated admin dashboard, and a production deployment.

**Live demo:** https://ink-studio-swart.vercel.app

> This is a fictional studio built to demonstrate full-stack development —
> not a real business. See [`PROJECT_SPEC.md`](./PROJECT_SPEC.md) for the
> original brief this was built against.

## Screenshots

|  |  |
|---|---|
| ![Homepage](./docs/screenshots/01-hero-en.png) | ![Homepage — Russian](./docs/screenshots/02-hero-ru.png) |
| ![Portfolio gallery](./docs/screenshots/04-works-gallery.png) | ![Booking wizard — live time slots](./docs/screenshots/07-booking-wizard.png) |
| ![Mobile view](./docs/screenshots/08-mobile-home.png) | ![Admin sign-in](./docs/screenshots/10-admin-login.png) |

More in [`docs/screenshots/`](./docs/screenshots/).

## Features

- **Bilingual site** (English/Russian) with locale-aware routing, SEO
  metadata, and hreflang alternates
- **6-step booking wizard** — service, artist, date, time (live availability
  from the database), contact details, confirmation — with double-booking
  prevention at the database level
- **Admin dashboard** — authenticated CRUD for artists, services, and
  bookings, protected by Supabase Auth + Row Level Security
- **Telegram notifications** on new bookings
- **Programmatically generated** favicon and Open Graph images (no external
  design tools)
- Dark, motion-forward design system (Tailwind v4 + Motion), with full
  `prefers-reduced-motion` support

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| i18n | next-intl |
| Forms/validation | React Hook Form + Zod |
| Backend | Supabase (Postgres, Auth, Row Level Security) |
| Testing | Vitest (unit), Playwright (E2E + accessibility) |
| Deployment | Vercel |

## Architecture notes

A few decisions worth calling out for anyone reading the code:

- **Two independent root layouts.** The public bilingual site
  (`src/app/[locale]/`) and the English-only admin panel (`src/app/admin/`)
  each have their own root `layout.tsx` — there's no shared top-level
  `app/layout.tsx`, which Next.js explicitly supports.
- **Static generation + ISR, not SSR-on-every-request.** The public pages
  are statically generated and revalidate hourly, with on-demand
  `revalidatePath()` calls from admin mutations for instant updates —
  see [`src/lib/admin/revalidate-public.ts`](./src/lib/admin/revalidate-public.ts).
- **No Supabase client ships to the browser.** All database access happens
  in Server Components and Server Actions; the one feature that used to run
  client-side (checking booked time slots) was moved to a Server Action
  specifically to avoid shipping the Supabase SDK to visitors.
- **RLS does the real access control**, not just the admin route guard —
  every admin Server Action uses the same cookie-scoped, RLS-enforced
  client a logged-out request would get, so authorization isn't just a
  redirect in `proxy.ts`.
- **A `SECURITY DEFINER` Postgres function** (`get_booked_times`) exposes
  only booked time slots to anonymous visitors — never names, phone
  numbers, or comments — with `search_path` explicitly pinned.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in your own Supabase/Telegram values
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database setup

Apply the migrations in `supabase/migrations/` (in order) via the Supabase
SQL Editor, then optionally run `supabase/seed.sql` and
`supabase/seed-reviews.sql` for sample data.

### Environment variables

See [`.env.example`](./.env.example) for the full list. `SUPABASE_SERVICE_ROLE_KEY`
is listed there but not currently used by the app — every query goes through
the anon key and RLS.

## Testing

```bash
pnpm test        # Vitest unit tests
pnpm test:e2e     # Playwright E2E — booking flow, admin auth, a11y, etc.
```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run a production build locally |
| `pnpm lint` | ESLint |
| `pnpm test` / `pnpm test:watch` | Unit tests |
| `pnpm test:e2e` | End-to-end tests |

## License

MIT
