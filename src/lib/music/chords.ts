/**
 * Chord and progression data used across Module 1's lessons. Kept small and
 * explicit rather than generated, since the whole module deliberately
 * revolves around a single, well-known chord family (C Major and its
 * relatives in the classic C-G-Am-F progression).
 */

export interface Chord {
  id: string;
  name: string;
  /** Notes in scientific pitch notation, low to high. */
  notes: string[];
}

export const CHORDS: Record<string, Chord> = {
  cMajor: { id: "cMajor", name: "C Major", notes: ["C4", "E4", "G4"] },
  gMajor: { id: "gMajor", name: "G Major", notes: ["G3", "B3", "D4"] },
  aMinor: { id: "aMinor", name: "A Minor", notes: ["A3", "C4", "E4"] },
  fMajor: { id: "fMajor", name: "F Major", notes: ["F3", "A3", "C4"] },
  // Lessons 6-8 (Building Any Major Chord / Major vs Minor / Every Chord
  // You Need) — deliberately different roots than the onboarding
  // progression above, so the student applies the chord formula to keys
  // they haven't already memorized by rote.
  aMajor: { id: "aMajor", name: "A Major", notes: ["A3", "C#4", "E4"] },
  dMajor: { id: "dMajor", name: "D Major", notes: ["D4", "F#4", "A4"] },
  eMinor: { id: "eMinor", name: "E Minor", notes: ["E4", "G4", "B4"] },
  cMinor: { id: "cMinor", name: "C Minor", notes: ["C4", "D#4", "G4"] },
};

export interface Progression {
  id: string;
  label: string;
  chordIds: string[];
  /** A well-known song this progression is associated with (chords only, no lyrics/notation reproduced). */
  songReference?: { title: string; artist: string };
}

export const PROGRESSIONS: Record<string, Progression> = {
  classicPop: {
    id: "classicPop",
    label: "C → G → Am → F",
    chordIds: ["cMajor", "gMajor", "aMinor", "fMajor"],
    songReference: { title: "Let It Be", artist: "The Beatles" },
  },
};

export function getChord(chordId: string): Chord {
  const chord = CHORDS[chordId];
  if (!chord) throw new Error(`Unknown chord: "${chordId}"`);
  return chord;
}

export function getProgression(progressionId: string): Progression {
  const progression = PROGRESSIONS[progressionId];
  if (!progression) throw new Error(`Unknown progression: "${progressionId}"`);
  return progression;
}
