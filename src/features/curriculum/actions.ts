"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Best-effort sync of a completed lesson to Supabase for signed-in users.
 * localStorage (see progress.ts) remains the source of truth for the
 * current session/device, so this failing silently doesn't break the
 * lesson flow.
 */
export async function saveLessonProgress(
  moduleId: string,
  lessonId: string
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("learning_progress").upsert(
    {
      user_id: user.id,
      module_id: moduleId,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,module_id,lesson_id" }
  );
}
