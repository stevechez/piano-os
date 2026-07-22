"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import type { Lesson } from "@/features/curriculum/types";
import { cn } from "@/lib/utils";

export interface LessonShellProps {
  lesson: Lesson;
  totalLessons: number;
  /** Whether this lesson's interaction goal has been met yet. */
  completed: boolean;
  isLastLesson: boolean;
  onContinue: () => void;
  /** The Visual + Interaction zone — a bespoke component per lesson. */
  children: ReactNode;
}

export function LessonShell({
  lesson,
  totalLessons,
  completed,
  isLastLesson,
  onContinue,
  children,
}: LessonShellProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalLessons }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full",
              i < lesson.index ? "bg-gold" : "bg-border"
            )}
          />
        ))}
      </div>
      <div className="mt-4 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        Lesson {lesson.index} of {totalLessons}
      </div>

      {/* 1. Concept */}
      <h1 className="mt-4 font-serif text-3xl leading-[1.15] font-medium tracking-tight text-balance md:text-4xl">
        {lesson.concept.heading}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {lesson.concept.body}
      </p>

      {/* 2 & 3. Visual + Interaction */}
      <div className="mt-10">{children}</div>

      {/* 4. Reflection */}
      <div
        className={cn(
          "mt-10 overflow-hidden rounded-3xl border transition-all duration-300",
          completed
            ? "max-h-96 border-gold/30 bg-gold/[0.06] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        )}
        aria-hidden={!completed}
      >
        <div className="p-7 sm:p-8">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold">
            <Check className="h-4 w-4" strokeWidth={2.25} />
          </span>

          <h2 className="mt-4 font-serif text-2xl leading-[1.2] text-foreground">
            {lesson.reflection.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {lesson.reflection.body}
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
          >
            {isLastLesson ? "Finish Module" : "Continue"} →
          </button>
        </div>
      </div>
    </div>
  );
}
