"use client";

/**
 * Local-first progress tracking, shared by onboarding and the paid
 * curriculum alike — see docs/39-lesson-engine.md Decision 002 (why
 * localStorage-first) and docs/44-learning-curriculum-architecture.md
 * (why one hook serves both). Stored as a single JSON blob in localStorage,
 * keyed per module so onboarding and each curriculum module get independent
 * local caches.
 */

import { useCallback, useEffect, useState } from "react";
import type { LessonProgressState } from "./types";
import { createClient } from "@/lib/supabase/client";
import { saveLessonProgress } from "./actions";
import { ONBOARDING_ID } from "./onboarding";

function storageKey(moduleId: string): string {
  return `pianoos:${moduleId}-progress`;
}

function readProgress(moduleId: string): LessonProgressState {
  if (typeof window === "undefined") return { completedLessonIds: [] };

  try {
    const raw = window.localStorage.getItem(storageKey(moduleId));
    if (!raw) return { completedLessonIds: [] };
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      Array.isArray((parsed as LessonProgressState).completedLessonIds)
    ) {
      return parsed as LessonProgressState;
    }
    return { completedLessonIds: [] };
  } catch {
    return { completedLessonIds: [] };
  }
}

function writeProgress(moduleId: string, state: LessonProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(moduleId), JSON.stringify(state));
}

export function markLessonComplete(
  moduleId: string,
  lessonId: string
): LessonProgressState {
  const current = readProgress(moduleId);
  if (current.completedLessonIds.includes(lessonId)) return current;

  const next: LessonProgressState = {
    completedLessonIds: [...current.completedLessonIds, lessonId],
  };
  writeProgress(moduleId, next);
  return next;
}

/** React hook wrapping the above for use in client components. */
export function useLessonProgress(moduleId: string = ONBOARDING_ID) {
  const [state, setState] = useState<LessonProgressState>({
    completedLessonIds: [],
  });

  useEffect(() => {
    const local = readProgress(moduleId);
    // One-time sync from localStorage on mount. This must run client-side
    // only (localStorage isn't available during SSR), so it can't be done
    // via a lazy useState initializer without risking a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(local);

    // Best-effort merge with Supabase for signed-in users, so progress
    // follows the account rather than just the browser. Silently no-ops
    // when signed out.
    async function syncFromSupabase() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data } = await supabase
          .from("learning_progress")
          .select("lesson_id")
          .eq("module_id", moduleId)
          .eq("completed", true);
        if (!data) return;

        const remoteIds = data.map(
          (row: { lesson_id: string }) => row.lesson_id
        );

        // Push anything completed locally (e.g. anonymously, before this
        // account existed) up to Supabase. This is the actual "save your
        // progress" moment from /learn/complete.
        const localOnlyIds = local.completedLessonIds.filter(
          (id) => !remoteIds.includes(id)
        );
        await Promise.all(
          localOnlyIds.map((id) => saveLessonProgress(moduleId, id))
        );

        const merged = Array.from(
          new Set([...local.completedLessonIds, ...remoteIds])
        );
        if (merged.length !== local.completedLessonIds.length) {
          const next = { completedLessonIds: merged };
          writeProgress(moduleId, next);
          setState(next);
        }
      } catch {
        // Local progress still works fully offline/signed-out.
      }
    }

    void syncFromSupabase();
  }, [moduleId]);

  const markComplete = useCallback(
    (lessonId: string) => {
      setState(markLessonComplete(moduleId, lessonId));
    },
    [moduleId]
  );

  const isComplete = useCallback(
    (lessonId: string) => state.completedLessonIds.includes(lessonId),
    [state.completedLessonIds]
  );

  return { completedLessonIds: state.completedLessonIds, markComplete, isComplete };
}
