"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthActionState {
  error?: string;
  /** Set once a magic-link sign-in email has been sent. */
  magicLinkSent?: boolean;
}

/**
 * There is no free password signup — see docs/43-commerce-and-checkout.md.
 * Accounts are created passwordlessly, either right after a Stripe
 * purchase (/checkout/confirm) or via this magic-link flow for a
 * returning customer signing in on a new device/session.
 *
 * Note: this relies on the Supabase "Magic Link" email template pointing
 * at `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
 * instead of Supabase's default hosted verify URL — a one-time dashboard
 * setting (Authentication -> Email Templates).
 */
export async function sendMagicLink(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const redirectTo = String(formData.get("redirectTo") ?? "/learn");

  if (!email) {
    return { error: "Enter your email." };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${appUrl}/auth/confirm?next=${encodeURIComponent(redirectTo)}`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { magicLinkSent: true };
}

export async function signIn(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/learn");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect(redirectTo || "/learn");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
