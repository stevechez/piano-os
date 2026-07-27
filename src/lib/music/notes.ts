/**
 * Note utilities: scientific pitch notation ("C4", "F#3") <-> MIDI number <->
 * frequency, plus generation of a keyboard's worth of notes for a given
 * octave range. Shared by the PianoKeyboard component and any lesson/chord
 * data that needs to reason about pitch.
 */

export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
] as const;

export type NoteName = (typeof NOTE_NAMES)[number];

export const WHITE_NOTE_NAMES: NoteName[] = ["C", "D", "E", "F", "G", "A", "B"];

export interface KeyboardNote {
  /** Scientific pitch notation, e.g. "C#4" */
  id: string;
  pitch: NoteName;
  octave: number;
  isSharp: boolean;
}

export function isSharpPitch(pitch: string): boolean {
  return pitch.includes("#");
}

export function noteId(pitch: NoteName, octave: number): string {
  return `${pitch}${octave}`;
}

export function parseNote(note: string): { pitch: NoteName; octave: number } {
  const match = /^([A-G]#?)(-?\d+)$/.exec(note);
  if (!match) {
    throw new Error(`Invalid note: "${note}"`);
  }
  return { pitch: match[1] as NoteName, octave: Number(match[2]) };
}

/** MIDI number, where C4 (middle C) = 60. */
export function midiNumber(note: string): number {
  const { pitch, octave } = parseNote(note);
  const index = NOTE_NAMES.indexOf(pitch);
  return (octave + 1) * 12 + index;
}

/** Equal-temperament frequency in Hz, relative to A4 = 440Hz. */
export function noteToFrequency(note: string): number {
  const midi = midiNumber(note);
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Generates every note (white and black) from the C at `startOctave` up to
 * and including the C at `endOctave`. e.g. generateNoteRange(3, 5) yields
 * C3..B4, C5.
 */
export function generateNoteRange(
  startOctave: number,
  endOctave: number
): KeyboardNote[] {
  const notes: KeyboardNote[] = [];

  for (let octave = startOctave; octave < endOctave; octave++) {
    for (const pitch of NOTE_NAMES) {
      notes.push({
        id: noteId(pitch, octave),
        pitch,
        octave,
        isSharp: isSharpPitch(pitch),
      });
    }
  }

  notes.push({
    id: noteId("C", endOctave),
    pitch: "C",
    octave: endOctave,
    isSharp: false,
  });

  return notes;
}

export function notesOfPitchClass(
  notes: KeyboardNote[],
  pitch: NoteName
): string[] {
  return notes.filter((n) => n.pitch === pitch).map((n) => n.id);
}

/**
 * Black keys cluster into two repeating shapes per octave: a group of two
 * (C#, D#) and a group of three (F#, G#, A#). This landmark — not counting
 * up from C — is how musicians actually find notes on the keyboard; Module
 * 1's "Keyboard Patterns" lesson teaches it directly.
 */
const BLACK_KEY_GROUP_SIZE: Partial<Record<NoteName, 2 | 3>> = {
  "C#": 2,
  "D#": 2,
  "F#": 3,
  "G#": 3,
  "A#": 3,
};

export function notesInBlackKeyGroup(
  notes: KeyboardNote[],
  groupSize: 2 | 3
): string[] {
  return notes
    .filter((n) => BLACK_KEY_GROUP_SIZE[n.pitch] === groupSize)
    .map((n) => n.id);
}
