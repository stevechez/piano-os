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
import { SmoothChangeCMajorInteraction } from "./SmoothChangeCMajorInteraction";
import { SmoothChangeAMinorInteraction } from "./SmoothChangeAMinorInteraction";
import { RhythmTapInteraction } from "./RhythmTapInteraction";
import { RecognizingPatternInteraction } from "./RecognizingPatternInteraction";
import { TwoHandsInteraction } from "./TwoHandsInteraction";
import { DynamicsInteraction } from "./DynamicsInteraction";
import { FirstCompleteSongInteraction } from "./FirstCompleteSongInteraction";
import { LandmarkRecallInteraction } from "./LandmarkRecallInteraction";
import { ModuleReviewInteraction } from "./ModuleReviewInteraction";
import { ChordInversionsInteraction } from "./ChordInversionsInteraction";
import { AddingAFillInteraction } from "./AddingAFillInteraction";
import { CreateYourIntroInteraction } from "./CreateYourIntroInteraction";
import { ChooseYourRhythmInteraction } from "./ChooseYourRhythmInteraction";
import { MajorOrMinorEarInteraction } from "./MajorOrMinorEarInteraction";
import { PlayByEarInteraction } from "./PlayByEarInteraction";
import { ArrangeItYourWayInteraction } from "./ArrangeItYourWayInteraction";
import { YourMusicalVoiceInteraction } from "./YourMusicalVoiceInteraction";
import { BuildG7Interaction } from "./BuildG7Interaction";
import { ResolveToCMajorInteraction } from "./ResolveToCMajorInteraction";
import { BuildCSus4Interaction } from "./BuildCSus4Interaction";
import { DiatonicChordsInteraction } from "./DiatonicChordsInteraction";
import { TwoFiveOneInteraction } from "./TwoFiveOneInteraction";
import { SeventhInversionsInteraction } from "./SeventhInversionsInteraction";
import { ViChordInteraction } from "./ViChordInteraction";
import { RicherArrangementInteraction } from "./RicherArrangementInteraction";
import { NewHarmonicVocabularyInteraction } from "./NewHarmonicVocabularyInteraction";

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
  // Module 2: Playing Real Music
  "smooth-change-cmajor": SmoothChangeCMajorInteraction,
  "smooth-change-aminor": SmoothChangeAMinorInteraction,
  "rhythm-tap": RhythmTapInteraction,
  "recognizing-pattern": RecognizingPatternInteraction,
  "two-hands": TwoHandsInteraction,
  dynamics: DynamicsInteraction,
  "first-complete-song": FirstCompleteSongInteraction,
  "landmark-recall": LandmarkRecallInteraction,
  "module-review": ModuleReviewInteraction,
  // Module 3: Expressing Yourself
  "chord-inversions": ChordInversionsInteraction,
  "adding-a-fill": AddingAFillInteraction,
  "create-your-intro": CreateYourIntroInteraction,
  "choose-your-rhythm": ChooseYourRhythmInteraction,
  "major-or-minor-ear": MajorOrMinorEarInteraction,
  "play-by-ear": PlayByEarInteraction,
  "arrange-it-your-way": ArrangeItYourWayInteraction,
  "your-musical-voice": YourMusicalVoiceInteraction,
  // Module 4: Beyond Major and Minor
  "seventh-chord-build": BuildG7Interaction,
  "seventh-chord-resolve": ResolveToCMajorInteraction,
  "suspended-chord-build": BuildCSus4Interaction,
  "suspended-chord-resolve": ResolveToCMajorInteraction,
  "diatonic-chords": DiatonicChordsInteraction,
  "two-five-one": TwoFiveOneInteraction,
  "seventh-inversions": SeventhInversionsInteraction,
  "vi-chord": ViChordInteraction,
  "richer-arrangement": RicherArrangementInteraction,
  "new-harmonic-vocabulary": NewHarmonicVocabularyInteraction,
};
