"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export interface AuthActionState {
  error?: string;
  /** Set when signup succeeded but requires email confirmation before login. */
  awaitingConfirmation?: boolean;
}

export async function signUp(
  _prevState: AuthActionState | null,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "").trim();
  const redirectTo = String(formData.get("redirectTo") ?? "/learn");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: displayName || null },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // If email confirmation is required, Supabase returns a user but no
  // session yet. Send the person to check their email instead of
  // redirecting into a route they aren't authenticated for yet.
  if (!data.session) {
    return { awaitingConfirmation: true };
  }

  redirect(redirectTo || "/learn");
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
