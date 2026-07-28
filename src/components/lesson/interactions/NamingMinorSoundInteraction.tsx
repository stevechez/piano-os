"use client";

import { playChord, playNote } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const SONG_CHORDS = getProgression("myMinorSong").chordIds.map(getChord);

function playSimple() {
  SONG_CHORDS.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.9 }), i * 700);
  });
}

function playFullArrangement() {
  SONG_CHORDS.forEach((chord, i) => {
    const bassNote = chord.notes[0];
    window.setTimeout(() => playNote(bassNote, { duration: 0.3 }), i * 700);
    window.setTimeout(() => playChord(chord.notes, { duration: 0.4 }), i * 700 + 350);
  });
}

const OPTIONS = [
  { id: "simple", label: "Simple Arrangement", play: playSimple },
  { id: "full", label: "Full Arrangement", play: playFullArrangement },
];

export function NamingMinorSoundInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="The same song, played two ways."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
