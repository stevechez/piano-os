import { createClient } from "@/lib/supabase/server";
import { LessonList } from "@/components/lesson/LessonList";

export default async function LearnPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let displayName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("display_name")
      .eq("user_id", user.id)
      .maybeSingle();
    displayName = profile?.display_name ?? null;
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <p className="text-sm text-muted-foreground">
        {user
          ? `Welcome back${displayName ? `, ${displayName}` : ""}`
          : "Five short lessons. No account needed to start."}
      </p>
      <h1 className="mt-1 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        Your PianoOS Journey
      </h1>

      <div className="mt-10 rounded-3xl border border-border/80 bg-card/40 p-7 sm:p-8">
        <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
          Module 1
        </span>
        <h2 className="mt-2 font-serif text-2xl leading-[1.2] text-foreground">
          Piano Foundations
        </h2>
        <p className="mt-1 text-muted-foreground">See Music Differently</p>

        <div className="mt-8">
          <LessonList />
        </div>
      </div>
    </div>
  );
}
