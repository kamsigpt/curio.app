-- Additive course discovery fields. Existing course rows and relationships are kept.
alter table public.courses
  add column if not exists canonical_url text,
  add column if not exists affiliate_url text,
  add column if not exists currency text not null default 'USD',
  add column if not exists pricing_type text,
  add column if not exists offer_expires_at timestamptz,
  add column if not exists verified_at timestamptz,
  add column if not exists publication_status text not null default 'approved',
  add column if not exists source_name text,
  add column if not exists source_course_id text,
  add column if not exists access_type text not null default 'external';

update public.courses
set canonical_url = external_url
where canonical_url is null and external_url is not null;

update public.courses
set pricing_type = case
  when price = 0 and original_price is not null and original_price > 0 then 'temporarily_free'
  when price = 0 then 'free'
  when original_price is not null and original_price > price then 'discounted'
  else 'paid'
end
where pricing_type is null;

alter table public.courses
  drop constraint if exists courses_pricing_type_check,
  add constraint courses_pricing_type_check
    check (pricing_type in ('free', 'temporarily_free', 'discounted', 'paid', 'unavailable')),
  drop constraint if exists courses_publication_status_check,
  add constraint courses_publication_status_check
    check (publication_status in ('pending', 'approved', 'rejected', 'needs_review', 'expired', 'archived')),
  drop constraint if exists courses_access_type_check,
  add constraint courses_access_type_check
    check (access_type in ('external', 'curio_authorized', 'free')),
  drop constraint if exists courses_price_nonnegative_check,
  add constraint courses_price_nonnegative_check check (price >= 0);

create unique index if not exists courses_provider_source_uidx
  on public.courses (provider, source_course_id)
  where source_course_id is not null;

create index if not exists courses_publication_status_idx
  on public.courses (publication_status);
create index if not exists courses_offer_expiry_idx
  on public.courses (offer_expires_at)
  where offer_expires_at is not null;

-- Minimal outbound event data: no email, IP, or browser fingerprint is stored.
create table if not exists public.outbound_clicks (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references public.courses(id) on delete cascade,
  provider text not null,
  is_affiliate boolean not null default false,
  clicked_at timestamptz not null default now()
);

create index if not exists outbound_clicks_course_date_idx
  on public.outbound_clicks (course_id, clicked_at desc);
create index if not exists outbound_clicks_provider_date_idx
  on public.outbound_clicks (provider, clicked_at desc);

alter table public.outbound_clicks enable row level security;
drop policy if exists "Record outbound clicks" on public.outbound_clicks;
create policy "Record outbound clicks"
  on public.outbound_clicks for insert
  to anon, authenticated
  with check (true);
