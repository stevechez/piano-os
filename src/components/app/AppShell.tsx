import type { ReactNode } from "react";
import Link from "next/link";
import { Piano } from "lucide-react";
import { signOut } from "@/lib/auth/actions";

export interface AppShellProps {
  isAuthenticated: boolean;
  children: ReactNode;
}

/**
 * Minimal persistent chrome shared by /learn, /learn/module-1, and /account.
 * The same shell serves anonymous and signed-in visitors — /learn itself is
 * intentionally not gated, see docs/39-lesson-engine.md and
 * docs/42-mvp-user-flow.md — with an Account link added only once signed in.
 * Deliberately not a full nav rack (Home/Learn/Practice/Profile/Settings):
 * most of those have nothing behind them yet, and this product never shows
 * an empty screen.
 */
export function AppShell({ isAuthenticated, children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-2xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/learn"
            className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-foreground"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-gold">
              <Piano className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="font-serif text-lg">PianoOS</span>
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              <Link
                href="/account"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Account
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sign out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/learn/complete"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Unlock PianoOS
            </Link>
          )}
        </div>
      </header>

      {children}
    </div>
  );
}
