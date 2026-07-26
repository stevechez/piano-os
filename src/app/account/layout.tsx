import type { ReactNode } from "react";
import { AppShell } from "@/components/app/AppShell";
import { createClient } from "@/lib/supabase/server";

export default async function AccountLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AppShell isAuthenticated={!!user}>{children}</AppShell>;
}
