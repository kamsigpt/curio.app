# Curio — Course Discovery

Curio helps learners discover and compare free, discounted, and affordable courses from external
providers. Learners enrol and study with the provider. Curio does not host third-party course content.

Brand: mint `#27F5D6` on white, `Sora` for display type, `Inter` for body text — matching the
provided brand guideline.

## Tech stack

- **React 18 + TypeScript + Vite** — frontend
- **Tailwind CSS** — styling, with brand tokens in `tailwind.config.ts`
- **React Router** — client-side routing
- **Supabase** — auth (email/password) + Postgres database for courses, profiles, reviews,
  enrollments and cart
- **lucide-react** — icon set

When configured, authentication, the course catalogue, saved courses, and personal learning
progress use Supabase tables (`categories`, `instructors`, `courses`, `cart_items`, `enrollments`). When Supabase credentials
are not present, the app falls back to a local mock catalogue (`src/data/mockData.ts`) and
"fake" auth in `localStorage` (see `src/lib/supabase.ts` → `isSupabaseConfigured`).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Supabase setup (required for auth & data)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run **`supabase/schema.sql`** — creates all tables, RLS policies, and a
   trigger that auto-creates a `profiles` row on sign-up.
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key
   (Supabase dashboard → Settings → API).
4. (Optional) Run **`supabase/seed.sql`** in the SQL editor to populate categories, instructors,
   and courses with sample data.
5. Enable **Google OAuth** in Supabase dashboard → Authentication → Providers → Google, and add
   your OAuth Client ID + Secret from Google Cloud Console. Add this redirect URI to your
   Google Cloud Console:
   ```
   https://<your-project>.supabase.co/auth/v1/callback
   ```
6. Restart the dev server. Sign-up/login use Supabase Auth and saved courses sync to `cart_items`.

## Project structure

```
src/
  components/
    layout/      Navbar, Footer, page Layout
    ui/           CourseCard, Rating, Badge, Logo, CourseThumb, Swoosh (shared primitives)
    home/         Landing page sections (Hero, CategoryGrid, CourseRail, etc.)
  context/
    AuthContext.tsx   Supabase auth + demo-mode fallback
    WishlistContext.tsx Saved courses, synced through cart_items
  data/
    mockData.ts        Demo catalogue (categories, instructors, courses)
  lib/
    supabase.ts         Supabase client + isSupabaseConfigured flag
    enrollment.ts        Personal progress writes (Supabase or local demo)
    types.ts              Shared TypeScript types
    utils.ts                Formatting helpers
  pages/
    Home, Marketplace, CourseDetail, Cart, Checkout, Login, Signup, Dashboard, NotFound
supabase/
  schema.sql      Full Postgres schema + RLS policies
  migrations/     Additive schema updates
```

## Discovery data and outbound links

Run `supabase/migrations/202611020001_discovery_fields.sql` against an existing project to add
currency, pricing/offer state, separate canonical and affiliate destinations, source provenance,
and outbound click records. New Supabase installations can use the updated `supabase/schema.sql`.
The migration is additive and preserves existing course records.

Course access uses a valid stored affiliate destination when present, then falls back to the
provider URL. No provider API/feed adapter, secure redirect server, affiliate conversion feed, or
verified Curio checkout is configured in this repository. Outbound click counts are browser-originated
events and are directional analytics, not proof of enrolment or commission. See
[`docs/SYSTEM_AUDIT.md`](docs/SYSTEM_AUDIT.md) for the system audit and remaining limitations.

## What's intentionally simplified

This is a complete, production-shaped starting point, not a finished marketplace. A few things
are deliberately stubbed so you can wire in your own choices:

- **Payments**: the existing Paystack popup callback is not server-verified and must not be used as
  proof of payment. This repository does not provide a verified Curio course checkout.
- **Instructor uploads**: there's no course-authoring UI yet — courses are seeded directly into
  the `courses` table. The "Teach on Curio" entry point in the navbar/marketplace is in place for
  when you build that flow.
- **Course thumbnails** are generated on-brand gradients (no stock photography), so the catalogue
  looks cohesive without external image hosting. Swap `CourseThumb` for real uploaded images
  whenever you're ready (e.g. Supabase Storage).

## Build

```bash
npm run build      # type-checks and produces a production build in dist/
npm run preview     # preview the production build locally
```
