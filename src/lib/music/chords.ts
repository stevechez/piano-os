/**
 * Chord and progression data used across onboarding, Module 1, and Module
 * 2's lessons. Kept small and explicit rather than generated. Module 2
 * deliberately introduces a second, distinct progression (classicRock)
 * rather than reusing onboarding's classicPop progression a third time —
 * see docs/46-curriculum-authoring-guide.md.
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
  // Module 4: beyond plain major/minor triads. G7 and Csus4 are voiced as
  // simple 3-4 note additions to chords already in this file (G Major +
  // a minor 7th; C Major with the third swapped for a fourth).
  g7: { id: "g7", name: "G7", notes: ["G3", "B3", "D4", "F4"] },
  cSus4: { id: "cSus4", name: "Csus4", notes: ["C4", "F4", "G4"] },
  dMinor: { id: "dMinor", name: "D Minor", notes: ["D4", "F4", "A4"] },
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
  // Module 2: a second, equally common progression (I-IV-V) so the module
  // has its own musical identity instead of replaying onboarding's C-G-Am-F.
  classicRock: {
    id: "classicRock",
    label: "C → F → G",
    chordIds: ["cMajor", "fMajor", "gMajor"],
    songReference: { title: "Twist and Shout", artist: "The Beatles" },
  },
  // Module 4: the ii-V-I -- harmony's most common move, across genres.
  // No songReference: it's ubiquitous enough not to need one example, and
  // guessing a specific attribution here wasn't a claim worth making.
  twoFiveOne: {
    id: "twoFiveOne",
    label: "Dm → G7 → C",
    chordIds: ["dMinor", "g7", "cMajor"],
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
