import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_22, MODULE_22_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module22Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-22");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 22
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_22.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_22.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_22.lessons}
          moduleId={MODULE_22_ID}
          basePath="/learn/module-22"
          completionCopy={{
            heading: "You've completed Module 22.",
            body: "C/Am, G/Em, D/Bm — every major key's minor twin. You know the whole circle now.",
          }}
        />
      </div>
    </div>
  );
}
