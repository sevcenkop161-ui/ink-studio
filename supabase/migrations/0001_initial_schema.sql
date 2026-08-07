-- Ink Studio — initial schema
-- Tables: artists, services, works, reviews, bookings
--
-- Translatable text uses explicit _en/_ru column pairs (not JSONB or a
-- separate translations table) — simplest option for two fixed locales,
-- and keeps future admin forms straightforward (two plain fields per
-- attribute). Proper nouns (people's names, artwork titles) are not
-- translated and have a single column.

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- artists
-- ─────────────────────────────────────────────────────────────
create table artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  bio_en text,
  bio_ru text,
  specialization_en text,
  specialization_ru text,
  experience_years integer,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- services
-- ─────────────────────────────────────────────────────────────
create table services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ru text not null,
  description_en text,
  description_ru text,
  duration_display_en text,
  duration_display_ru text,
  price_from numeric,
  duration_minutes integer,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- works
-- ─────────────────────────────────────────────────────────────
create table works (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text,
  artist_id uuid not null references artists (id) on delete restrict,
  category text not null check (
    category in ('blackwork', 'fine-line', 'realism', 'minimal', 'color')
  ),
  description_en text,
  description_ru text,
  created_at timestamptz not null default now()
);

create index works_artist_id_idx on works (artist_id);
create index works_category_idx on works (category);

-- ─────────────────────────────────────────────────────────────
-- reviews
-- ─────────────────────────────────────────────────────────────
create table reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text_en text not null,
  text_ru text not null,
  rating integer not null check (rating between 1 and 5),
  avatar_url text,
  artist_id uuid references artists (id) on delete set null,
  created_at timestamptz not null default now()
);

create index reviews_artist_id_idx on reviews (artist_id);

-- ─────────────────────────────────────────────────────────────
-- bookings
-- ─────────────────────────────────────────────────────────────
create table bookings (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  phone text,
  telegram text,
  artist_id uuid not null references artists (id) on delete restrict,
  service_id uuid not null references services (id) on delete restrict,
  booking_date date not null,
  booking_time time not null,
  comment text,
  status text not null default 'new' check (
    status in ('new', 'confirmed', 'completed', 'cancelled')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_contact_required check (
    phone is not null or telegram is not null
  )
);

create index bookings_artist_id_idx on bookings (artist_id);
create index bookings_service_id_idx on bookings (service_id);
create index bookings_status_idx on bookings (status);

-- Prevents two active bookings for the same artist at the same date/time.
-- Cancelled bookings are excluded so a freed-up slot can be re-booked.
create unique index bookings_unique_active_slot
  on bookings (artist_id, booking_date, booking_time)
  where status != 'cancelled';

-- Keep updated_at current on every row update.
create function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_set_updated_at
  before update on bookings
  for each row
  execute function set_updated_at();
