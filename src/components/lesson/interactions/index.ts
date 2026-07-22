import type { ComponentType } from "react";
import type { LessonInteractionProps } from "./WelcomeInteraction";
import { WelcomeInteraction } from "./WelcomeInteraction";
import { PatternMachineInteraction } from "./PatternMachineInteraction";
import { FirstChordInteraction } from "./FirstChordInteraction";
import { ChordsCreateSongsInteraction } from "./ChordsCreateSongsInteraction";
import { FirstSongInteraction } from "./FirstSongInteraction";

export type { LessonInteractionProps };

/** Registry mapping each lesson id to its bespoke interaction component. */
export const LESSON_INTERACTIONS: Record<
  string,
  ComponentType<LessonInteractionProps>
> = {
  "welcome-to-pianoos": WelcomeInteraction,
  "pattern-machine": PatternMachineInteraction,
  "your-first-chord": FirstChordInteraction,
  "chords-create-songs": ChordsCreateSongsInteraction,
  "play-your-first-song": FirstSongInteraction,
};
