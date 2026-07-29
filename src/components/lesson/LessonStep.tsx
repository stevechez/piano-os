"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import type { Lesson, LessonStepConfig } from "@/features/curriculum/types";
import { cn } from "@/lib/utils";

export interface LessonStepProps {
  lesson: Lesson;
  step: LessonStepConfig;
  /** Every lesson in this module/onboarding sequence, in order — each renders as a clickable jump-to-lesson segment. */
  lessons: Lesson[];
  /** Route prefix this lesson's siblings live under, e.g. "/learn/lessons" or "/learn/module-1". */
  basePath: string;
  /** 1-based position of this step within the lesson. */
  stepNumber: number;
  totalStepsInLesson: number;
  /** Whether this step's interaction goal has been met yet. */
  completed: boolean;
  /**
   * How much weight this completion deserves — computed by LessonPlayer.
   * "step": a plain intermediate step, unchanged treatment. "lesson":
   * finished a lesson's last step. "final": finished the last lesson
   * currently available — the biggest moment in the sequence.
   */
  moment: "step" | "lesson" | "final";
  /** Label for the continue button — computed by LessonPlayer. */
  continueLabel: string;
  onContinue: () => void;
  /** The Visual + Interaction zone — a bespoke component per step. */
  children: ReactNode;
}

/**
 * Renders a single lesson step's four zones: Concept -> Visual/Interaction
 * (children) -> Discovery. Purely presentational — sequencing across
 * multiple steps and lessons is LessonPlayer's job. See
 * docs/39-lesson-engine.md.
 */
const MOMENT_EYEBROW: Record<LessonStepProps["moment"], string | null> = {
  step: null,
  lesson: "Lesson complete",
  final: "Milestone",
};

export function LessonStep({
  lesson,
  step,
  lessons,
  basePath,
  stepNumber,
  totalStepsInLesson,
  completed,
  moment,
  continueLabel,
  onContinue,
  children,
}: LessonStepProps) {
  const eyebrow = MOMENT_EYEBROW[moment];
  const MomentIcon = moment === "final" ? Sparkles : Check;
  const totalLessons = lessons.length;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      {/* Progress — each segment jumps straight to that lesson. */}
      <div className="flex items-center gap-2">
        {lessons.map((l, i) => (
          <Link
            key={l.id}
            href={`${basePath}/${l.id}`}
            aria-label={`Jump to Lesson ${i + 1}: ${l.title}`}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < lesson.index ? "bg-gold hover:bg-gold/80" : "bg-border hover:bg-border/60"
            )}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase">
        <span>
          Lesson {lesson.index} of {totalLessons}
        </span>
        {totalStepsInLesson > 1 && (
          <>
            <span className="text-border">·</span>
            <span>
              Step {stepNumber} of {totalStepsInLesson}
            </span>
          </>
        )}
      </div>

      {/* 1. Concept */}
      <h1 className="mt-4 font-serif text-3xl leading-[1.15] font-medium tracking-tight text-balance md:text-4xl">
        {step.concept.heading}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        {step.concept.body}
      </p>

      {/* 2 & 3. Visual + Interaction */}
      <div className="mt-10">{children}</div>

      {/* 4. Discovery */}
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
          <span
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold",
              completed && moment !== "step" && "animate-moment-settle"
            )}
          >
            <MomentIcon className="h-4 w-4" strokeWidth={2.25} />
          </span>

          {eyebrow && (
            <p className="mt-3 text-xs font-medium tracking-[0.14em] text-gold uppercase">
              {eyebrow}
            </p>
          )}

          <h2 className="mt-4 font-serif text-2xl leading-[1.2] text-foreground">
            {step.discovery.heading}
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {step.discovery.body}
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-medium text-gold-foreground transition-transform hover:scale-[1.02]"
          >
            {continueLabel} →
          </button>
        </div>
      </div>
    </div>
  );
}
