import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_12, MODULE_12_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module12Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-12");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 12
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_12.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_12.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_12.lessons}
          moduleId={MODULE_12_ID}
          basePath="/learn/module-12"
          completionCopy={{
            heading: "You've completed Module 12.",
            body: "Your song, your chords, your safety net — all of it, moved to a new key. You can play anywhere now.",
          }}
        />
      </div>
    </div>
  );
}
