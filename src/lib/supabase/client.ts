import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

// For use inside Client Components. Uses the public anon key — safe to
// ship to the browser because every table is protected by RLS policies
// (see supabase/migrations/0002_rls_policies.sql).
export function createBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
