import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_8, MODULE_8_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module8Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-8");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 8
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_8.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_8.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_8.lessons}
          moduleId={MODULE_8_ID}
          basePath="/learn/module-8"
          completionCopy={{
            heading: "You've completed Module 8.",
            body: "F Minor, B♭ Major — you can now reach outside a key on purpose, whenever a moment calls for it.",
          }}
        />
      </div>
    </div>
  );
}
