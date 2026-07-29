"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useLessonProgress } from "@/features/curriculum/progress";
import { getNextModule } from "@/features/curriculum/modules";
import type { Lesson } from "@/features/curriculum/types";
import { cn } from "@/lib/utils";

export interface LessonListProps {
  lessons: Lesson[];
  /** Scopes progress tracking — the onboarding id, or a curriculum module id. */
  moduleId: string;
  /** Route prefix each lesson lives under, e.g. "/learn/lessons" or "/learn/module-1". */
  basePath: string;
  /** Shown once every listed lesson is complete. Omit to show nothing (e.g. a slice that isn't the whole module yet). */
  completionCopy?: { heading: string; body: string };
}

export function LessonList({ lessons, moduleId, basePath, completionCopy }: LessonListProps) {
  const { isComplete, completedLessonIds } = useLessonProgress(moduleId);
  const allComplete = completedLessonIds.length === lessons.length;
  const nextLesson = lessons.find((lesson) => !isComplete(lesson.id));
  const nextModule = allComplete ? getNextModule(moduleId) : undefined;

  return (
    <div>
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const done = isComplete(lesson.id);
          const isNext = !allComplete && lesson.id === nextLesson?.id;

          return (
            <Link
              key={lesson.id}
              href={`${basePath}/${lesson.id}`}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-5 transition-colors",
                done
                  ? "border-gold/30 bg-gold/[0.05]"
                  : isNext
                    ? "border-gold/50 bg-gold/[0.08] hover:bg-gold/[0.12]"
                    : "border-border/80 hover:bg-card/50"
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-serif text-sm",
                  done
                    ? "border-gold/50 bg-gold/15 text-gold"
                    : "border-border text-muted-foreground"
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" strokeWidth={2.25} />
                ) : (
                  lesson.index
                )}
              </span>

              <div className="flex-1">
                <div className="font-serif text-lg text-foreground">
                  {lesson.title}
                </div>
                <div className="mt-0.5 text-sm text-muted-foreground">
                  {lesson.steps[0].concept.heading}
                </div>
              </div>

              {isNext && (
                <span className="rounded-full bg-gold px-4 py-2 text-xs font-medium text-gold-foreground">
                  Begin Lesson
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {allComplete && completionCopy && (
        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/[0.06] p-6 text-center">
          <p className="font-serif text-lg text-foreground">{completionCopy.heading}</p>
          <p className="mt-1 text-sm text-muted-foreground">{completionCopy.body}</p>

          {nextModule && (
            <Link
              href={`/learn/${nextModule.id}`}
              className="mt-5 inline-block rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
            >
              Continue to Module {nextModule.index}: {nextModule.title} →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
