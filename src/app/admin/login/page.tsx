"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/auth-actions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(signIn, undefined);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm tracking-[0.2em] text-text-secondary uppercase">
            Ink Studio
          </p>
          <h1 className="font-display text-3xl">Admin sign in</h1>
        </div>

        <form action={formAction} className="space-y-4">
          <Input label="Email" type="email" name="email" required autoFocus />
          <Input label="Password" type="password" name="password" required />

          {state?.error && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
