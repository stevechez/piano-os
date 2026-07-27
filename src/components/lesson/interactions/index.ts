import type { ComponentType } from "react";
import type { LessonInteractionProps } from "./WelcomeInteraction";
import { WelcomeInteraction } from "./WelcomeInteraction";
import { PatternMachineInteraction } from "./PatternMachineInteraction";
import { FirstChordInteraction } from "./FirstChordInteraction";
import { ChordsCreateSongsInteraction } from "./ChordsCreateSongsInteraction";
import { FirstSongInteraction } from "./FirstSongInteraction";
import { BlackKeyPairsInteraction } from "./BlackKeyPairsInteraction";
import { BlackKeyTripletsInteraction } from "./BlackKeyTripletsInteraction";
import { FindingNotesInteraction } from "./FindingNotesInteraction";

export type { LessonInteractionProps };

/** Registry mapping each step id to its bespoke interaction component. */
export const LESSON_INTERACTIONS: Record<
  string,
  ComponentType<LessonInteractionProps>
> = {
  // Onboarding
  "welcome-to-pianoos": WelcomeInteraction,
  "pattern-machine": PatternMachineInteraction,
  "your-first-chord": FirstChordInteraction,
  "chords-create-songs": ChordsCreateSongsInteraction,
  "play-your-first-song": FirstSongInteraction,
  // Module 1: Piano Foundations
  "keyboard-patterns-pairs": BlackKeyPairsInteraction,
  "keyboard-patterns-triplets": BlackKeyTripletsInteraction,
  "finding-notes": FindingNotesInteraction,
};
