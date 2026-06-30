# Curio — Digital Course Marketplace

Curio is a web marketplace for digital courses: courses from major platforms (Udemy, Coursera) and
independent tutors are all listed, compared and purchased in one place, like an e-commerce store
built specifically for learning.

Brand: mint `#27F5D6` on white, `Sora` for display type, `Inter` for body text — matching the
provided brand guideline.

## Tech stack

- **React 18 + TypeScript + Vite** — frontend
- **Tailwind CSS** — styling, with brand tokens in `tailwind.config.ts`
- **React Router** — client-side routing
- **Supabase** — auth (email/password) + Postgres database for courses, profiles, reviews,
  enrollments and cart
- **lucide-react** — icon set

The app runs in **live development mode** connected to a real Supabase project for auth and data
storage. Course catalogue, user profiles, enrollments, and cart all sync with Supabase tables
(`categories`, `instructors`, `courses`, `cart_items`, `enrollments`). When Supabase credentials
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
6. Restart the dev server. Sign-up/login now create real Supabase Auth users, cart items sync
   to the `cart_items` table, and purchases insert rows into `enrollments`.

## Project structure

```
src/
  components/
    layout/      Navbar, Footer, page Layout
    ui/           CourseCard, Rating, Badge, Logo, CourseThumb, Swoosh (shared primitives)
    home/         Landing page sections (Hero, CategoryGrid, CourseRail, etc.)
  context/
    AuthContext.tsx   Supabase auth + demo-mode fallback
    CartContext.tsx   Cart state, persisted to localStorage
  data/
    mockData.ts        Demo catalogue (categories, instructors, courses)
  lib/
    supabase.ts         Supabase client + isSupabaseConfigured flag
    enrollment.ts        Enrollment writes (Supabase or local demo)
    types.ts              Shared TypeScript types
    utils.ts                Formatting helpers
  pages/
    Home, Marketplace, CourseDetail, Cart, Checkout, Login, Signup, Dashboard, NotFound
supabase/
  schema.sql      Full Postgres schema + RLS policies
```

## What's intentionally simplified

This is a complete, production-shaped starting point, not a finished marketplace. A few things
are deliberately stubbed so you can wire in your own choices:

- **Payments**: the checkout form simulates a successful charge. Swap the `setTimeout` in
  `src/pages/Checkout.tsx` for a real Stripe/Paystack/Flutterwave integration.
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
