import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// For use inside Server Components, for public/anonymous reads only.
// This client has no session — it's stateless, same anon key as the
// browser client. Phase 12 (Admin) will add a cookie-aware client (via
// @supabase/ssr) for authenticated routes; that's a separate module so
// public pages don't pay for auth machinery they don't use.
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
