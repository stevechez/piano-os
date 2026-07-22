"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp, type AuthActionState } from "@/lib/auth/actions";

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
      {pending ? "Creating account…" : "Create Account"}
    </button>
  );
}

export interface SignupFormProps {
  redirectTo?: string;
}

export function SignupForm({ redirectTo }: SignupFormProps) {
  const [state, formAction] = useActionState<AuthActionState | null, FormData>(
    signUp,
    null
  );

  if (state?.awaitingConfirmation) {
    return (
      <div className="space-y-4 text-sm">
        <p className="text-foreground">
          Check your email to confirm your account.
        </p>
        <p className="text-muted-foreground">
          Once confirmed, sign in to pick up right where you left off.
        </p>
        <Link
          href={
            redirectTo
              ? `/login?redirectTo=${encodeURIComponent(redirectTo)}`
              : "/login"
          }
          className="inline-block text-sm font-medium text-gold hover:opacity-80"
        >
          Go to sign in →
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="redirectTo" value={redirectTo ?? "/learn"} />

      <div>
        <label htmlFor="displayName" className="sr-only">
          Name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={inputClass}
        />
      </div>

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
          minLength={6}
          autoComplete="new-password"
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
