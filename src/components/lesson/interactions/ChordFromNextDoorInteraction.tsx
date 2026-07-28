"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const F_MAJOR = getChord("fMajor");
const F_MINOR = getChord("fMinor");

const OPTIONS = [
  { id: "f-major", label: "F Major", play: () => playChord(F_MAJOR.notes) },
  { id: "f-minor", label: "F Minor", play: () => playChord(F_MINOR.notes) },
];

export function ChordFromNextDoorInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="F Major belongs to C major's key. Compare it to F Minor, which doesn't — but gets borrowed anyway."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
