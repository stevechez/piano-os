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
  // Module 8: borrowed chords from C major's parallel minor. Voiced with
  // sharps (G#3 for A♭, A#3 for B♭) since note names in this codebase are
  // sharp-only (see notes.ts) -- the display name still uses the flat
  // spelling a musician would actually read.
  fMinor: { id: "fMinor", name: "F Minor", notes: ["F3", "G#3", "C4"] },
  bFlatMajor: { id: "bFlatMajor", name: "B♭ Major", notes: ["A#3", "D4", "F4"] },
  // Module 13: A minor's raised leading tone -- the major V a minor key
  // borrows from its harmonic minor scale for a stronger cadence than the
  // natural minor's own (minor) v chord.
  eMajor: { id: "eMajor", name: "E Major", notes: ["E4", "G#4", "B4"] },
  // Module 16: open/spread voicings -- the same three notes as their
  // close-position counterparts, with exactly one note moved an octave
  // to give the chord room to breathe. Kept within C3-B4/C5 so they
  // still fit PlayProgressionInteraction's fixed keyboard range.
  cMajorSpread: { id: "cMajorSpread", name: "C Major (Spread)", notes: ["C3", "E4", "G4"] },
  fMajorSpread: { id: "fMajorSpread", name: "F Major (Spread)", notes: ["F3", "A3", "C5"] },
  gMajorSpread: { id: "gMajorSpread", name: "G Major (Spread)", notes: ["G3", "D4", "B4"] },
  // Module 18: the blues' I7 and IV7 -- dominant sevenths on C and F,
  // completing the I7-IV7-V7 set alongside Module 4's g7 (the blues' V7).
  c7: { id: "c7", name: "C7", notes: ["C4", "E4", "G4", "A#4"] },
  f7: { id: "f7", name: "F7", notes: ["F3", "A3", "C4", "D#4"] },
  // Module 22: D major's relative minor -- a third circle-of-fifths
  // major/minor pairing, alongside C/Am and G/Em.
  bMinor: { id: "bMinor", name: "B Minor", notes: ["B3", "D4", "F#4"] },
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
  // Module 7: the student's own song, built from four chords they already
  // know but in an order that belongs to no specific existing song --
  // deliberately no songReference, since the whole point is that this one
  // is theirs.
  myVerse: {
    id: "myVerse",
    label: "C → Am → F → G",
    chordIds: ["cMajor", "aMinor", "fMajor", "gMajor"],
  },
  myChorus: {
    id: "myChorus",
    label: "F → G → C",
    chordIds: ["fMajor", "gMajor", "cMajor"],
  },
  // The verse and chorus above, played back to back -- the finished song.
  mySong: {
    id: "mySong",
    label: "Your Verse → Your Chorus",
    chordIds: ["cMajor", "aMinor", "fMajor", "gMajor", "fMajor", "gMajor", "cMajor"],
  },
  // Module 8: a real progression that borrows a chord from outside the
  // key, and a capstone that borrows twice, back to back -- deliberately
  // invented for teaching, not attributed to a specific song.
  borrowedTurn: {
    id: "borrowedTurn",
    label: "C → Fm → G → C",
    chordIds: ["cMajor", "fMinor", "gMajor", "cMajor"],
  },
  borrowedCapstone: {
    id: "borrowedCapstone",
    label: "C → Fm → B♭ → C",
    chordIds: ["cMajor", "fMinor", "bFlatMajor", "cMajor"],
  },
  // Module 9: the I-bVII vamp that defines the Mixolydian mode's sound --
  // built from chords already in this file (cMajor, bFlatMajor from
  // Module 8). Deliberately ends on bVII, left unresolved, so Lesson 7
  // can contrast that against resolving back to the I chord.
  mixolydianVamp: {
    id: "mixolydianVamp",
    label: "C → B♭ → C → B♭",
    chordIds: ["cMajor", "bFlatMajor", "cMajor", "bFlatMajor"],
  },
  // Module 10: a bridge for the student's Module 7 song -- vi-IV-I-V,
  // built entirely from chords already in this file. myVerseIntoBridge
  // and myCompletePiece are myVerse/myBridge/myChorus concatenated, for
  // real play-throughs of increasingly complete song structure.
  myBridge: {
    id: "myBridge",
    label: "Am → F → C → G",
    chordIds: ["aMinor", "fMajor", "cMajor", "gMajor"],
  },
  myVerseIntoBridge: {
    id: "myVerseIntoBridge",
    label: "Your Verse → Your Bridge",
    chordIds: ["cMajor", "aMinor", "fMajor", "gMajor", "aMinor", "fMajor", "cMajor", "gMajor"],
  },
  myCompletePiece: {
    id: "myCompletePiece",
    label: "Your Verse → Your Bridge → Your Chorus",
    chordIds: [
      "cMajor", "aMinor", "fMajor", "gMajor",
      "aMinor", "fMajor", "cMajor", "gMajor",
      "fMajor", "gMajor", "cMajor",
    ],
  },
  // Module 12: the student's Module 7 song, transposed into G major.
  // I-vi-IV-V in C (C-Am-F-G) becomes I-vi-IV-V in G (G-Em-C-D); the
  // chorus's IV-V-I (F-G-C) becomes C-D-G. Every chord already exists in
  // this file -- transposition needs no new vocabulary, only a new
  // starting point.
  myVerseInG: {
    id: "myVerseInG",
    label: "G → Em → C → D",
    chordIds: ["gMajor", "eMinor", "cMajor", "dMajor"],
  },
  myChorusInG: {
    id: "myChorusInG",
    label: "C → D → G",
    chordIds: ["cMajor", "dMajor", "gMajor"],
  },
  myFullSongInG: {
    id: "myFullSongInG",
    label: "Your Verse → Your Chorus (In G)",
    chordIds: ["gMajor", "eMinor", "cMajor", "dMajor", "cMajor", "dMajor", "gMajor"],
  },
  // Module 13: the same four chords from Module 7's song (Am, F, C, G),
  // now centered on A minor as home instead of C major -- reordered to
  // start and end on the tonic. myMinorCadence is the classic i-iv-V-i
  // minor-key resolution, using the borrowed major V (eMajor) instead of
  // the natural minor's own (softer) v chord.
  myMinorHomeProgression: {
    id: "myMinorHomeProgression",
    label: "Am → F → C → G → Am",
    chordIds: ["aMinor", "fMajor", "cMajor", "gMajor", "aMinor"],
  },
  myMinorCadence: {
    id: "myMinorCadence",
    label: "Am → Dm → E → Am",
    chordIds: ["aMinor", "dMinor", "eMajor", "aMinor"],
  },
  // Module 14: a second original song, this one centered on A minor --
  // a different order than Module 13's cadence, giving this song its own
  // identity. Every chord (aMinor, fMajor, dMinor, eMajor) already
  // existed; no new chords needed.
  myMinorVerse: {
    id: "myMinorVerse",
    label: "Am → F → Dm → E",
    chordIds: ["aMinor", "fMajor", "dMinor", "eMajor"],
  },
  myMinorChorus: {
    id: "myMinorChorus",
    label: "Dm → E → Am",
    chordIds: ["dMinor", "eMajor", "aMinor"],
  },
  myMinorSong: {
    id: "myMinorSong",
    label: "Your Minor Verse → Your Minor Chorus",
    chordIds: ["aMinor", "fMajor", "dMinor", "eMajor", "dMinor", "eMajor", "aMinor"],
  },
  // Module 16: IV-V-I in spread voicings -- a satisfying, fuller-sounding
  // cadence built from the three spread chords above.
  spreadCadence: {
    id: "spreadCadence",
    label: "F (spread) → G (spread) → C (spread)",
    chordIds: ["fMajorSpread", "gMajorSpread", "cMajorSpread"],
  },
  // Module 18: the 12-bar blues, in three pieces -- the quick-change
  // opening (bars 1-4), the middle (bars 5-9), and the full form.
  bluesOpening: {
    id: "bluesOpening",
    label: "C7 → F7 → C7 → C7",
    chordIds: ["c7", "f7", "c7", "c7"],
  },
  bluesMiddle: {
    id: "bluesMiddle",
    label: "F7 → F7 → C7 → C7 → G7",
    chordIds: ["f7", "f7", "c7", "c7", "g7"],
  },
  twelveBarBlues: {
    id: "twelveBarBlues",
    label: "The 12-Bar Blues",
    chordIds: ["c7", "f7", "c7", "c7", "f7", "f7", "c7", "c7", "g7", "f7", "c7", "g7"],
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
