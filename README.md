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

The app runs in a fully working **demo mode** with no setup: a local mock catalogue
(`src/data/mockData.ts`) and a local "fake" auth/session in `localStorage` let you click through
every page immediately. Once you add real Supabase credentials, auth and enrollments switch
automatically to the real backend (see `src/lib/supabase.ts` → `isSupabaseConfigured`).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Connecting Supabase (optional, for production)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`. It creates `profiles`, `categories`,
   `instructors`, `courses`, `reviews`, `enrollments`, `cart_items`, row-level security
   policies, and a trigger that creates a `profiles` row on sign-up.
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key
   (Supabase dashboard → Settings → API).
4. Seed `categories`, `instructors` and `courses` with your real catalogue (the shape of each
   row matches the types in `src/lib/types.ts` and the mock data in `src/data/mockData.ts` —
   you can adapt that file into seed SQL or a one-off script).
5. Restart the dev server. Sign-up/login now create real Supabase Auth users, and purchases
   insert rows into `enrollments`.

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
