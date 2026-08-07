import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

// Cookie-aware client for /admin Server Components and Server Actions.
// Reading the session works everywhere; writing (setAll) only actually
// succeeds from a Server Action or Route Handler — Server Components
// can't set cookies, so that branch is wrapped in try/catch and silently
// ignored there (the proxy's session refresh already covers that case).
export async function createAdminClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a Server Component during render — expected,
            // the proxy already refreshes the session on every request.
          }
        },
      },
    },
  );
}
