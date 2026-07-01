-- ============================================================================
-- Curio — Supabase schema
-- Run this in your Supabase project's SQL editor (or via the CLI) once you've
-- created a project. After running it, copy your project URL + anon key into
-- a local .env.local (see .env.example) and the app will use real data
-- instead of the bundled demo catalogue.
-- ============================================================================

-- Extensions -----------------------------------------------------------------
create extension if not exists "uuid-ossp";

-- Profiles --------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default 'Curio Learner',
  avatar_url text,
  headline text,
  is_instructor boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are readable by everyone" on public.profiles;
create policy "Profiles are readable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Categories -------------------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  icon text not null,
  course_count int not null default 0
);

alter table public.categories enable row level security;
drop policy if exists "Categories are public" on public.categories;
create policy "Categories are public" on public.categories for select using (true);

-- Instructors -------------------------------------------------------------------
create table if not exists public.instructors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  name text not null,
  headline text,
  avatar_url text,
  bio text,
  rating numeric(3, 2) default 0,
  student_count int default 0,
  course_count int default 0
);

alter table public.instructors enable row level security;
drop policy if exists "Instructors are public" on public.instructors;
create policy "Instructors are public" on public.instructors for select using (true);
drop policy if exists "Instructors manage their own profile" on public.instructors;
create policy "Instructors manage their own profile"
  on public.instructors for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Courses -------------------------------------------------------------------
create table if not exists public.courses (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  subtitle text,
  description text,
  thumbnail_url text,
  provider text not null default 'Curio Original',
  instructor_id uuid references public.instructors(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  level text not null default 'All Levels' check (level in ('Beginner', 'Intermediate', 'Advanced', 'All Levels')),
  language text not null default 'English',
  price numeric(10, 2) not null default 0,
  original_price numeric(10, 2),
  rating numeric(3, 2) not null default 0,
  rating_count int not null default 0,
  student_count int not null default 0,
  duration_hours numeric(6, 1) not null default 0,
  lecture_count int not null default 0,
  bestseller boolean not null default false,
  is_new boolean not null default false,
  tags text[] not null default '{}',
  what_you_will_learn text[] not null default '{}',
  requirements text[] not null default '{}',
  curriculum jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists courses_category_idx on public.courses(category_id);
create index if not exists courses_provider_idx on public.courses(provider);
create index if not exists courses_slug_idx on public.courses(slug);

alter table public.courses enable row level security;
drop policy if exists "Courses are public" on public.courses;
create policy "Courses are public" on public.courses for select using (true);
drop policy if exists "Instructors manage their own courses" on public.courses;
create policy "Instructors manage their own courses"
  on public.courses for all
  using (
    instructor_id in (select id from public.instructors where user_id = auth.uid())
  )
  with check (
    instructor_id in (select id from public.instructors where user_id = auth.uid())
  );

-- Reviews -------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references public.courses(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  user_name text not null,
  rating int not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

create index if not exists reviews_course_idx on public.reviews(course_id);

alter table public.reviews enable row level security;
drop policy if exists "Reviews are public" on public.reviews;
create policy "Reviews are public" on public.reviews for select using (true);
drop policy if exists "Users can write their own reviews" on public.reviews;
create policy "Users can write their own reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);
drop policy if exists "Users can update their own reviews" on public.reviews;
create policy "Users can update their own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

-- Enrollments -------------------------------------------------------------------
create table if not exists public.enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  progress_percent int not null default 0 check (progress_percent between 0 and 100),
  enrolled_at timestamptz not null default now(),
  last_accessed timestamptz,
  is_featured boolean not null default false,
  unique (user_id, course_id)
);

alter table public.enrollments enable row level security;
drop policy if exists "Users see their own enrollments" on public.enrollments;
create policy "Users see their own enrollments"
  on public.enrollments for select
  using (auth.uid() = user_id);
drop policy if exists "Users create their own enrollments" on public.enrollments;
create policy "Users create their own enrollments"
  on public.enrollments for insert
  with check (auth.uid() = user_id);
drop policy if exists "Users update their own enrollment progress" on public.enrollments;
create policy "Users update their own enrollment progress"
  on public.enrollments for update
  using (auth.uid() = user_id);

-- Cart items --------------------------------------------------------------------
create table if not exists public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  added_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.cart_items enable row level security;
drop policy if exists "Users manage their own cart" on public.cart_items;
create policy "Users manage their own cart"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Helper: keep updated_at fresh on courses ----------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists courses_set_updated_at on public.courses;
create trigger courses_set_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- Helper: auto-create a profile row when a user signs up --------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email))
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();