"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHORUS_CHORDS = getProgression("myChorus").chordIds.map(getChord);
const BRIDGE_CHORDS = getProgression("myBridge").chordIds.map(getChord);

function playChords(chords: ReturnType<typeof getChord>[], startAt: number) {
  chords.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), startAt + i * 700);
  });
  return startAt + chords.length * 700;
}

function playChorusRepeatsAgain() {
  playChords(CHORUS_CHORDS, 0);
  playChords(CHORUS_CHORDS, CHORUS_CHORDS.length * 700 + 200);
}

function playBridgeThenChorus() {
  const afterBridge = playChords(BRIDGE_CHORDS, 0);
  playChords(CHORUS_CHORDS, afterBridge + 200);
}

const OPTIONS = [
  { id: "chorus-repeats", label: "Chorus Repeats Again", play: playChorusRepeatsAgain },
  { id: "bridge-then-chorus", label: "Bridge Then Chorus", play: playBridgeThenChorus },
];

export function BridgeIntoChorusInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare looping your chorus a second time to letting the bridge lead into it instead."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
