import { Piano } from "lucide-react";

/**
 * Shown instantly while page.tsx awaits Stripe/Supabase provisioning —
 * see the comment there. Kept minimal and unchromed on purpose: this is a
 * few-second transitional screen, not a page anyone lingers on.
 */
export default function CheckoutConfirmLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-gold">
        <Piano className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <p className="mt-5 text-sm text-muted-foreground">
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold align-middle" />
        Setting up your account…
      </p>
    </div>
  );
}
