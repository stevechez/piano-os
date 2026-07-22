"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, type AuthActionState } from "@/lib/auth/actions";

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-gold/60";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign In"}
    </button>
  );
}

export interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, formAction] = useActionState<AuthActionState | null, FormData>(
    signIn,
    null
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo ?? "/learn"} />

      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          className={inputClass}
        />
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
