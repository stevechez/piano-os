import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * The app's own base URL, for building absolute links (Stripe redirect
 * URLs, Supabase magic-link redirects) from server-side code. Prefers an
 * explicit NEXT_PUBLIC_APP_URL (e.g. a custom production domain), then
 * falls back to Vercel's own auto-provided deployment URL so preview and
 * production deployments work correctly without that var being set
 * manually — without this fallback, an unset NEXT_PUBLIC_APP_URL on
 * Vercel silently sends checkout/auth redirects to localhost.
 */
export function getAppUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
