-- The public booking form needs to know which time slots are already
-- taken for a given artist/date, but anon has no SELECT policy on
-- bookings (it would expose other clients' names, phone numbers, and
-- comments). This function runs with the owner's privileges (bypassing
-- RLS internally) but its return type only exposes booking_time — no
-- other column is reachable through it.

create or replace function get_booked_times(p_artist_id uuid, p_date date)
returns table (booking_time time)
language sql
security definer
set search_path = public
as $$
  select booking_time
  from bookings
  where artist_id = p_artist_id
    and booking_date = p_date
    and status != 'cancelled';
$$;

grant execute on function get_booked_times(uuid, date) to anon, authenticated;
