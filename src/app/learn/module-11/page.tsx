import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_11, MODULE_11_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module11Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-11");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 11
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_11.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_11.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_11.lessons}
          moduleId={MODULE_11_ID}
          basePath="/learn/module-11"
          completionCopy={{
            heading: "You've completed Module 11.",
            body: "Intervals, chord qualities, borrowed color, a mode, rhythm, your own song — you can hear all of it now.",
          }}
        />
      </div>
    </div>
  );
}
