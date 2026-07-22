"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { LESSONS } from "@/features/curriculum/lessons";
import { useLessonProgress } from "@/features/curriculum/progress";
import { cn } from "@/lib/utils";

export function LessonList() {
  const { isComplete, completedLessonIds } = useLessonProgress();
  const allComplete = completedLessonIds.length === LESSONS.length;
  const nextLesson = LESSONS.find((lesson) => !isComplete(lesson.id));

  return (
    <div>
      <div className="space-y-3">
        {LESSONS.map((lesson) => {
          const done = isComplete(lesson.id);
          const isNext = !allComplete && lesson.id === nextLesson?.id;

          return (
            <Link
              key={lesson.id}
              href={`/learn/lessons/${lesson.id}`}
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
                  {lesson.concept.heading}
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

      {allComplete && (
        <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/[0.06] p-6 text-center">
          <p className="font-serif text-lg text-foreground">
            You&rsquo;ve completed Module 1.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            The rest of PianoOS builds on exactly what you just learned.
          </p>
        </div>
      )}
    </div>
  );
}
