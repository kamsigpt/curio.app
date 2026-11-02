# Curio system audit

Audit date: 2026-11-02

## Existing system

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, and React Router in hash-router mode. The established mint/turquoise visual identity and shared course-card components are reusable.
- **Data and authentication:** Supabase JS is used for authentication and reads from `courses`, `instructors`, and `categories`. There is a local-storage fallback and a bundled mock catalogue. The schema also defines `profiles`, `reviews`, `enrollments`, and `cart_items`.
- **Course relationships:** `courses` has provider text, one external URL, instructor and category foreign keys, numeric price fields, tags, and course detail JSON. It has no source provenance, publication state, canonical/affiliate URL separation, expiry, currency, or verification metadata. Public course reads currently expose all rows.
- **Learning and saves:** `enrollments` stores user progress; `cart_items` is used by `WishlistContext` as a saved-course list. Both are per-user under RLS. Progress is client-written and therefore personal, not provider-verified.
- **Admin and publishing:** The current admin view creates courses in browser local storage, stores approvals, admin lists, and pricing in local storage, and calculates overview revenue from mock data. Public publishing also adds locally stored course records. Those workflows are not durable shared curation tools.
- **Payments:** `src/lib/paystack.ts` opens Paystack's browser popup and treats its success callback as success. There is no server-side payment verification, webhook, transaction ledger, idempotency, or purchase record. `enrollInCourses` can write an enrollment without payment verification. Course Boost is the only visible use of this flow.
- **Outbound/affiliate:** Course buttons link directly to `external_url`. No affiliate URL field, redirect endpoint, click-event storage, validation, or affiliate disclosure was found. The project cannot identify an existing affiliate-link failure because it contains no affiliate implementation/configuration to test.
- **Sourcing:** A Telegram polling script fetches updates, parses course details, uploads photos, and inserts directly into `courses`; it can publish without an approval state. The Python `telegram_scraper` separately scrapes a configured URL and posts to Telegram. Its current config has a local uncommitted change and was not modified. Neither is a configured provider API/feed adapter system. No provider API credentials or official integrations were present in the inspected app configuration.
- **Search and discovery:** The homepage has a search hero and one latest-course rail, with several legacy marketplace/instructor promotional sections. The marketplace searches title, subtitle, category, and tags and offers price and sort controls, but provider/instructor/level/discount filters and pagination are missing. Course listing and detail pages display price as if it were one currency; the detail page's warning implies coupon expiry even where none is recorded.
- **Security and data preservation:** Supabase RLS protects user saves and enrollments, but the client-side admin identity/permissions are not a server authorization boundary. Course reads are public with no publication filter. Existing tables can be extended additively; no migration directory was present at audit time.

## Product and implementation plan

1. Keep the current app and visual system; move the public language and navigation toward discovery, free courses, and provider access.
2. Add discovery filters and deal/pricing states using only recorded course data; omit unsupported claims and dates.
3. Add additive, non-destructive database migrations for canonical and affiliate destinations, currency, offer expiry, verification/publication states, source provenance, and outbound events, preserving current course rows.
4. Make external-provider access distinct from Curio checkout. Keep Curio checkout unavailable until a server-side verified payment and fulfilment flow exists.
5. Turn imported/public submissions into reviewable records before public publication, subject to the available deployment backend.
6. Add provider adapters only for documented, authorised feeds/APIs with credentials and terms in place; keep unsupported sources explicitly unconnected.

## Confirmed limitations

The repository does not establish a working Supabase project schema, provider credentials, affiliate approvals, a server runtime for secure redirects or payment webhooks, or real conversion reporting. These require deployment configuration and partner access and must not be represented as completed integrations. No database migration has been applied to a live database during this audit.

## Implemented in this change

- Repositioned the homepage and navigation around course discovery, free listings, and provider access; homepage rails only use records present in the catalogue.
- Added Explore filters for category, provider, level, rating, price, and offer type; search now includes instructor/provider and sorts title/topic matches above broader description matches. Results are paginated in groups of 18.
- Added a dedicated Free & Deals route. Expired offers are excluded from active deal results and labelled on course cards/details.
- Added additive course metadata and outbound-event schema plus migration. Existing records are retained and receive a canonical URL from the old external URL, a legacy USD currency, and a best-effort pricing classification.
- Course links now accept safe HTTPS affiliate destinations when available, fall back to the provider URL, no longer require a Curio account, and record low-detail click events when the database migration is installed. Affiliate disclosure appears only when the affiliate destination is actually used.
- Replaced the misleading mock-revenue admin metric with the actual number of free/deal listings.

## Verification in this change

- `npm run build`: passed; Vite emitted its existing large-bundle advisory (566.92 kB JS before gzip).
- `npm run lint`: failed across the existing repository with 135 `no-undef` errors, mostly because the ESLint configuration does not define browser or Node globals. The new changes did not introduce other lint rule categories in the reported output.
- `git diff --check`: passed.

## Still outstanding

No provider API/feed, scheduled import/verification, Telegram review queue, server-side admin authorization, secure redirect endpoint, verified payment flow, partner agreements, learning paths, or reliable provider progress/conversion integration was added. The existing local-storage instructor publish/review flow is still not a shared administrator curation workflow. The migration is prepared but has not been applied to a live Supabase project.
