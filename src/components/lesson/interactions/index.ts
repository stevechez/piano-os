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
import { OctavePairInteraction } from "./OctavePairInteraction";
import { FifthPairInteraction } from "./FifthPairInteraction";
import { MajorScaleInteraction } from "./MajorScaleInteraction";
import { BuildGMajorInteraction } from "./BuildGMajorInteraction";
import { BuildAMajorInteraction } from "./BuildAMajorInteraction";
import { BuildAMinorInteraction } from "./BuildAMinorInteraction";
import { PracticeDMajorInteraction } from "./PracticeDMajorInteraction";
import { PracticeEMinorInteraction } from "./PracticeEMinorInteraction";
import { PracticeCMinorInteraction } from "./PracticeCMinorInteraction";

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
  octaves: OctavePairInteraction,
  intervals: FifthPairInteraction,
  "major-scale": MajorScaleInteraction,
  "building-major-chord": BuildGMajorInteraction,
  "major-vs-minor-major": BuildAMajorInteraction,
  "major-vs-minor-minor": BuildAMinorInteraction,
  "practice-d-major": PracticeDMajorInteraction,
  "practice-e-minor": PracticeEMinorInteraction,
  "practice-c-minor": PracticeCMinorInteraction,
};
