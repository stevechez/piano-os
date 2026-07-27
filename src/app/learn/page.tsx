import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LessonList } from "@/components/lesson/LessonList";
import { ONBOARDING_ID, ONBOARDING_LESSONS } from "@/features/curriculum/onboarding";
import { MODULE_1, MODULE_1_ID } from "@/features/curriculum/modules";

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const { welcome } = await searchParams;
  const justPurchased = welcome === "1";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let displayName: string | null = null;
  let nextLesson: (typeof MODULE_1.lessons)[number] | undefined;
  let completedCount = 0;

  if (user) {
    const [{ data: profile }, { data: progressRows }] = await Promise.all([
      supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("learning_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .eq("module_id", MODULE_1_ID)
        .eq("completed", true),
    ]);

    displayName = profile?.display_name ?? null;

    const completedIds = new Set((progressRows ?? []).map((row) => row.lesson_id));
    completedCount = completedIds.size;
    nextLesson = MODULE_1.lessons.find((lesson) => !completedIds.has(lesson.id));
  }

  const allComplete = !!user && !nextLesson;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <p className="text-sm text-muted-foreground">
        {!user
          ? "Five short lessons. No account needed to start."
          : justPurchased
            ? "You're in."
            : `Welcome back${displayName ? `, ${displayName}` : ""}`}
      </p>
      <h1 className="mt-1 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {justPurchased ? "Welcome to PianoOS." : "Your PianoOS Journey"}
      </h1>

      {user && (
        <div className="mt-10 rounded-3xl border border-gold/30 bg-gold/[0.05] p-7 sm:p-8">
          <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
            Module 1
          </span>
          <h2 className="mt-2 font-serif text-2xl leading-[1.2] text-foreground">
            {MODULE_1.title}
          </h2>
          <p className="mt-1 text-muted-foreground">
            {justPurchased
              ? "Your first lesson is ready when you are."
              : allComplete
                ? "You're caught up — more lessons are on the way."
                : `Lesson ${nextLesson!.index} of ${MODULE_1.lessons.length}: ${nextLesson!.title}`}
          </p>

          <Link
            href={allComplete ? "/learn/module-1" : `/learn/module-1/${nextLesson!.id}`}
            className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
          >
            {allComplete
              ? "Review Module 1 →"
              : justPurchased
                ? "Begin Module 1 →"
                : "Continue Learning →"}
          </Link>

          {!justPurchased && completedCount > 0 && (
            <p className="mt-4 text-xs text-muted-foreground">
              {completedCount} of {MODULE_1.lessons.length} lessons complete
            </p>
          )}
        </div>
      )}

      {user ? (
        <div className="mt-10">
          <Link
            href={`/learn/lessons/${ONBOARDING_LESSONS[0].id}`}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Revisit the five free onboarding lessons →
          </Link>
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-border/80 bg-card/40 p-7 sm:p-8">
          <span className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Onboarding
          </span>
          <h2 className="mt-2 font-serif text-2xl leading-[1.2] text-foreground">
            Five Free Lessons
          </h2>
          <p className="mt-1 text-muted-foreground">
            See how PianoOS teaches, in five minutes.
          </p>

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
      )}
    </div>
  );
}
