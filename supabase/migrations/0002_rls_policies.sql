-- Row Level Security: the anon key is public (used in the browser), so
-- every table needs explicit rules for what anonymous visitors can do.
-- Pattern: content tables are publicly readable and only writable by an
-- authenticated user (the single admin account created in Phase 12).
-- bookings is the exception: anyone can insert (that's the booking form),
-- but only an authenticated admin can read/update/delete.

alter table artists enable row level security;
alter table services enable row level security;
alter table works enable row level security;
alter table reviews enable row level security;
alter table bookings enable row level security;

-- ─────────────────────────────────────────────────────────────
-- artists
-- ─────────────────────────────────────────────────────────────
create policy "Public can view active artists"
  on artists for select
  using (is_active = true);

create policy "Authenticated can manage artists"
  on artists for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- services
-- ─────────────────────────────────────────────────────────────
create policy "Public can view services"
  on services for select
  using (true);

create policy "Authenticated can manage services"
  on services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- works
-- ─────────────────────────────────────────────────────────────
create policy "Public can view works"
  on works for select
  using (true);

create policy "Authenticated can manage works"
  on works for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- reviews
-- ─────────────────────────────────────────────────────────────
create policy "Public can view reviews"
  on reviews for select
  using (true);

create policy "Authenticated can manage reviews"
  on reviews for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- bookings
-- ─────────────────────────────────────────────────────────────
create policy "Public can create bookings"
  on bookings for insert
  with check (true);

create policy "Authenticated can view bookings"
  on bookings for select
  using (auth.role() = 'authenticated');

create policy "Authenticated can update bookings"
  on bookings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can delete bookings"
  on bookings for delete
  using (auth.role() = 'authenticated');
