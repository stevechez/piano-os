import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LessonList } from "@/components/lesson/LessonList";
import { ONBOARDING_ID, ONBOARDING_LESSONS } from "@/features/curriculum/onboarding";

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

      {user && (
        <div className="mt-10 rounded-3xl border border-gold/30 bg-gold/[0.05] p-7 sm:p-8">
          <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
            Module 1
          </span>
          <h2 className="mt-2 font-serif text-2xl leading-[1.2] text-foreground">
            Piano Foundations
          </h2>
          <p className="mt-1 text-muted-foreground">Continue your musical journey.</p>
          <Link
            href="/learn/module-1"
            className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
          >
            Continue Learning →
          </Link>
        </div>
      )}

      <div className="mt-10 rounded-3xl border border-border/80 bg-card/40 p-7 sm:p-8">
        <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Onboarding
        </span>
        <h2 className="mt-2 font-serif text-2xl leading-[1.2] text-foreground">
          Five Free Lessons
        </h2>
        <p className="mt-1 text-muted-foreground">See how PianoOS teaches, in five minutes.</p>

        <div className="mt-8">
          <LessonList
            lessons={ONBOARDING_LESSONS}
            moduleId={ONBOARDING_ID}
            basePath="/learn/lessons"
            completionCopy={{
              heading: "You've completed onboarding.",
              body: "The rest of PianoOS builds on exactly what you just learned.",
            }}
          />
        </div>
      </div>
    </div>
  );
}
