import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_9, MODULE_9_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module9Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-9");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 9
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_9.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_9.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_9.lessons}
          moduleId={MODULE_9_ID}
          basePath="/learn/module-9"
          completionCopy={{
            heading: "You've completed Module 9.",
            body: "The Mixolydian mode, a new safety net, a new vamp — you can hear the same key in more than one color now.",
          }}
        />
      </div>
    </div>
  );
}
