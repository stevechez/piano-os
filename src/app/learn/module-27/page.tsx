import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MODULE_27, MODULE_27_ID } from "@/features/curriculum/modules";
import { LessonList } from "@/components/lesson/LessonList";

export default async function Module27Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/learn/module-27");
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14 sm:px-6 md:py-20">
      <span className="text-xs font-medium tracking-[0.14em] text-gold uppercase">
        Module 27
      </span>
      <h1 className="mt-2 font-serif text-3xl leading-[1.15] font-medium tracking-tight md:text-4xl">
        {MODULE_27.title}
      </h1>
      <p className="mt-1 text-muted-foreground">{MODULE_27.subtitle}</p>

      <div className="mt-10">
        <LessonList
          lessons={MODULE_27.lessons}
          moduleId={MODULE_27_ID}
          basePath="/learn/module-27"
          completionCopy={{
            heading: "You've completed Module 27.",
            body: "You can roll in six now — a second meter, felt as deeply as the first.",
          }}
        />
      </div>
    </div>
  );
}
