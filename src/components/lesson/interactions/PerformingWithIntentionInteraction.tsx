"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const BRIDGE_CHORDS = getProgression("myBridge").chordIds.map(getChord);

function playBridge(velocity: number) {
  BRIDGE_CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8, velocity }), i * 700);
  });
}

const OPTIONS = [
  { id: "quiet", label: "Quiet Build", play: () => playBridge(0.18) },
  { id: "loud", label: "Immediate Climax", play: () => playBridge(0.5) },
];

export function PerformingWithIntentionInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The same bridge, played two different ways dynamically."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
