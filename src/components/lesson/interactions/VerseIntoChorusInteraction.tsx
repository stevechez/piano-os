"use client";

import { playChord } from "@/lib/audio/piano-synth";
import { getChord, getProgression } from "@/lib/music/chords";
import { ChoiceInteraction } from "./ChoiceInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const VERSE_CHORDS = getProgression("myVerse").chordIds.map(getChord);
const CHORUS_CHORDS = getProgression("myChorus").chordIds.map(getChord);

function playChords(chords: ReturnType<typeof getChord>[], startAt: number) {
  chords.forEach((chord, i) => {
    window.setTimeout(() => playChord(chord.notes, { duration: 0.8 }), startAt + i * 700);
  });
  return startAt + chords.length * 700;
}

function playVerseAlone() {
  playChords(VERSE_CHORDS, 0);
  playChords(VERSE_CHORDS, VERSE_CHORDS.length * 700 + 200);
}

function playVerseIntoChorus() {
  const afterVerse = playChords(VERSE_CHORDS, 0);
  playChords(CHORUS_CHORDS, afterVerse + 200);
}

const OPTIONS = [
  { id: "verse-alone", label: "Verse Alone", play: playVerseAlone },
  { id: "verse-into-chorus", label: "Verse Into Chorus", play: playVerseIntoChorus },
];

export function VerseIntoChorusInteraction({ onComplete }: LessonInteractionProps) {
  return (
    <ChoiceInteraction
      prompt="Compare looping the verse by itself to letting it move into the chorus."
      options={OPTIONS}
      onComplete={onComplete}
    />
  );
}
