"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, sendMagicLink, type AuthActionState } from "@/lib/auth/actions";

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-gold/60";

function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [mode, setMode] = useState<"password" | "magic-link">("magic-link");
  const [passwordState, passwordAction] = useActionState<AuthActionState | null, FormData>(
    signIn,
    null
  );
  const [linkState, linkAction] = useActionState<AuthActionState | null, FormData>(
    sendMagicLink,
    null
  );

  if (linkState?.magicLinkSent) {
    return (
      <div className="space-y-2 text-sm">
        <p className="text-foreground">Check your email for a sign-in link.</p>
        <p className="text-muted-foreground">
          Click it and you&rsquo;ll land right back in PianoOS.
        </p>
      </div>
    );
  }

  if (mode === "magic-link") {
    return (
      <div className="space-y-4">
        <form action={linkAction} className="space-y-4">
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

          {linkState?.error && (
            <p className="text-sm text-destructive">{linkState.error}</p>
          )}

          <SubmitButton label="Email me a sign-in link" pendingLabel="Sending…" />
        </form>

        <button
          type="button"
          onClick={() => setMode("password")}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Use a password instead
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form action={passwordAction} className="space-y-4">
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

        {passwordState?.error && (
          <p className="text-sm text-destructive">{passwordState.error}</p>
        )}

        <SubmitButton label="Sign In" pendingLabel="Signing in…" />
      </form>

      <button
        type="button"
        onClick={() => setMode("magic-link")}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        Email me a sign-in link instead
      </button>
    </div>
  );
}
