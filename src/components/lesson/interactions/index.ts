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
import { BrokenChordsInteraction } from "./BrokenChordsInteraction";
import { AlternatingBassInteraction } from "./AlternatingBassInteraction";
import { VerseAndChorusInteraction } from "./VerseAndChorusInteraction";
import { HarmonizingMelodyInteraction } from "./HarmonizingMelodyInteraction";
import { OomPahPatternInteraction } from "./OomPahPatternInteraction";
import { FillingTheSpaceInteraction } from "./FillingTheSpaceInteraction";
import { FullArrangementInteraction } from "./FullArrangementInteraction";
import { AccompanyAnyoneInteraction } from "./AccompanyAnyoneInteraction";
import { CallAndResponseInteraction } from "./CallAndResponseInteraction";
import { SafetyNetScaleInteraction } from "./SafetyNetScaleInteraction";
import { QuestionAndAnswerInteraction } from "./QuestionAndAnswerInteraction";
import { RhythmicVariationInteraction } from "./RhythmicVariationInteraction";
import { AddingAnOrnamentInteraction } from "./AddingAnOrnamentInteraction";
import { ImprovisingOverProgressionInteraction } from "./ImprovisingOverProgressionInteraction";
import { TwoIdeasBackToBackInteraction } from "./TwoIdeasBackToBackInteraction";
import { YouAreAlreadyImprovisingInteraction } from "./YouAreAlreadyImprovisingInteraction";
import { ChoosingYourChordsInteraction } from "./ChoosingYourChordsInteraction";
import { YourVerseInteraction } from "./YourVerseInteraction";
import { YourChorusInteraction } from "./YourChorusInteraction";
import { AddingAMelodyInteraction } from "./AddingAMelodyInteraction";
import { ASimpleEndingInteraction } from "./ASimpleEndingInteraction";
import { VerseIntoChorusInteraction } from "./VerseIntoChorusInteraction";
import { NamingYourSoundInteraction } from "./NamingYourSoundInteraction";
import { YouWroteASongInteraction } from "./YouWroteASongInteraction";
import { ChordFromNextDoorInteraction } from "./ChordFromNextDoorInteraction";
import { HearingTheDifferenceInteraction } from "./HearingTheDifferenceInteraction";
import { ChordFromFurtherAwayInteraction } from "./ChordFromFurtherAwayInteraction";
import { BuildingBorrowedChordInteraction } from "./BuildingBorrowedChordInteraction";
import { BorrowingInProgressionInteraction } from "./BorrowingInProgressionInteraction";
import { ReharmonizingYourEndingInteraction } from "./ReharmonizingYourEndingInteraction";
import { WhenToBorrowInteraction } from "./WhenToBorrowInteraction";
import { HearOutsideKeyNowInteraction } from "./HearOutsideKeyNowInteraction";
import { OneNoteChangesEverythingInteraction } from "./OneNoteChangesEverythingInteraction";
import { BuildingMixolydianScaleInteraction } from "./BuildingMixolydianScaleInteraction";
import { MixolydianVampInteraction } from "./MixolydianVampInteraction";
import { NewSafetyNetInteraction } from "./NewSafetyNetInteraction";
import { SameChordsDifferentMoodInteraction } from "./SameChordsDifferentMoodInteraction";
import { GroovingInMixolydianInteraction } from "./GroovingInMixolydianInteraction";
import { EndingOnTheRootInteraction } from "./EndingOnTheRootInteraction";
import { HearInMoreThanOneColorInteraction } from "./HearInMoreThanOneColorInteraction";
import { ThirdSectionBridgeInteraction } from "./ThirdSectionBridgeInteraction";
import { BridgeIntoChorusInteraction } from "./BridgeIntoChorusInteraction";
import { ColorForBridgeInteraction } from "./ColorForBridgeInteraction";
import { YourSoloSectionInteraction } from "./YourSoloSectionInteraction";
import { VerseIntoBridgeInteraction } from "./VerseIntoBridgeInteraction";
import { LandingSomewhereUnexpectedInteraction } from "./LandingSomewhereUnexpectedInteraction";
import { PerformingWithIntentionInteraction } from "./PerformingWithIntentionInteraction";
import { CompletePerformanceInteraction } from "./CompletePerformanceInteraction";
import { WhichIntervalIsItInteraction } from "./WhichIntervalIsItInteraction";
import { WiderIntervalsInteraction } from "./WiderIntervalsInteraction";
import { TriadOrSuspendedInteraction } from "./TriadOrSuspendedInteraction";
import { BorrowedOrDiatonicInteraction } from "./BorrowedOrDiatonicInteraction";
import { MajorOrMixolydianInteraction } from "./MajorOrMixolydianInteraction";
import { SteadyOrSyncopatedInteraction } from "./SteadyOrSyncopatedInteraction";
import { YourOwnChordByEarInteraction } from "./YourOwnChordByEarInteraction";
import { YouCanHearItNowInteraction } from "./YouCanHearItNowInteraction";
import { SameShapeNewStartingPointInteraction } from "./SameShapeNewStartingPointInteraction";
import { BuildingInGMajorInteraction } from "./BuildingInGMajorInteraction";
import { ProgressionMovedInteraction } from "./ProgressionMovedInteraction";
import { WhichKeyFitsYourVoiceInteraction } from "./WhichKeyFitsYourVoiceInteraction";
import { SamePatternNewKeyInteraction } from "./SamePatternNewKeyInteraction";
import { BorrowedChordTransposedInteraction } from "./BorrowedChordTransposedInteraction";
import { SongInNewKeyInteraction } from "./SongInNewKeyInteraction";
import { PlayAnywhereNowInteraction } from "./PlayAnywhereNowInteraction";
import { SameFourChordsNewHomeInteraction } from "./SameFourChordsNewHomeInteraction";
import { MinorHomeProgressionInteraction } from "./MinorHomeProgressionInteraction";
import { MinorIvChordInteraction } from "./MinorIvChordInteraction";
import { BuildingNaturalVInteraction } from "./BuildingNaturalVInteraction";
import { StrongerPullInteraction } from "./StrongerPullInteraction";
import { SoloInMinorKeyInteraction } from "./SoloInMinorKeyInteraction";
import { ChoosingYourHomeInteraction } from "./ChoosingYourHomeInteraction";
import { TwoHomesNowInteraction } from "./TwoHomesNowInteraction";
import { ChoosingMinorChordsInteraction } from "./ChoosingMinorChordsInteraction";
import { MinorVerseInteraction } from "./MinorVerseInteraction";
import { MinorChorusInteraction } from "./MinorChorusInteraction";
import { MelodyInMinorInteraction } from "./MelodyInMinorInteraction";
import { MinorEndingInteraction } from "./MinorEndingInteraction";
import { VerseIntoMinorChorusInteraction } from "./VerseIntoMinorChorusInteraction";
import { NamingMinorSoundInteraction } from "./NamingMinorSoundInteraction";
import { WroteSecondSongInteraction } from "./WroteSecondSongInteraction";
import { WhatAChartLooksLikeInteraction } from "./WhatAChartLooksLikeInteraction";
import { RepeatedChordsInteraction } from "./RepeatedChordsInteraction";
import { ReadingSeventhsSuspensionsInteraction } from "./ReadingSeventhsSuspensionsInteraction";
import { SightReadingNewChartInteraction } from "./SightReadingNewChartInteraction";
import { ChartInNewKeyInteraction } from "./ChartInNewKeyInteraction";
import { ReadingOwnSongChartInteraction } from "./ReadingOwnSongChartInteraction";
import { MinorChartInteraction } from "./MinorChartInteraction";
import { ReadAnythingNowInteraction } from "./ReadAnythingNowInteraction";
import { ChordBunchedTogetherInteraction } from "./ChordBunchedTogetherInteraction";
import { BuildingSpreadVoicingInteraction } from "./BuildingSpreadVoicingInteraction";
import { SpreadingMinorChordInteraction } from "./SpreadingMinorChordInteraction";
import { EndingOnSpreadChordInteraction } from "./EndingOnSpreadChordInteraction";
import { SpreadingOwnChorusInteraction } from "./SpreadingOwnChorusInteraction";
import { SpreadVoicingByEarInteraction } from "./SpreadVoicingByEarInteraction";
import { PlayingSpreadChordInteraction } from "./PlayingSpreadChordInteraction";
import { FillTheRoomNowInteraction } from "./FillTheRoomNowInteraction";
import { SteadierBeatInteraction } from "./SteadierBeatInteraction";
import { FasterBeatInteraction } from "./FasterBeatInteraction";
import { CountingYourselfInInteraction } from "./CountingYourselfInInteraction";
import { SteadyOrRushedInteraction } from "./SteadyOrRushedInteraction";
import { PracticingSlowInteraction } from "./PracticingSlowInteraction";
import { YourTempoYourChoiceInteraction } from "./YourTempoYourChoiceInteraction";
import { KeepingTimeOwnSongInteraction } from "./KeepingTimeOwnSongInteraction";
import { CanKeepTimeNowInteraction } from "./CanKeepTimeNowInteraction";

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
  // Module 5: Accompanying a Song
  "broken-chords": BrokenChordsInteraction,
  "alternating-bass": AlternatingBassInteraction,
  "verse-and-chorus": VerseAndChorusInteraction,
  "harmonizing-melody": HarmonizingMelodyInteraction,
  "oom-pah-pattern": OomPahPatternInteraction,
  "filling-the-space": FillingTheSpaceInteraction,
  "full-arrangement": FullArrangementInteraction,
  "accompany-anyone": AccompanyAnyoneInteraction,
  // Module 6: Improvising Your Own Ideas
  "call-and-response": CallAndResponseInteraction,
  "safety-net-scale": SafetyNetScaleInteraction,
  "question-and-answer": QuestionAndAnswerInteraction,
  "rhythmic-variation": RhythmicVariationInteraction,
  "adding-an-ornament": AddingAnOrnamentInteraction,
  "improvising-over-progression": ImprovisingOverProgressionInteraction,
  "two-ideas-back-to-back": TwoIdeasBackToBackInteraction,
  "you-are-already-improvising": YouAreAlreadyImprovisingInteraction,
  // Module 7: Writing Your Own Song
  "choosing-your-chords": ChoosingYourChordsInteraction,
  "your-verse": YourVerseInteraction,
  "your-chorus": YourChorusInteraction,
  "adding-a-melody": AddingAMelodyInteraction,
  "a-simple-ending": ASimpleEndingInteraction,
  "verse-into-chorus": VerseIntoChorusInteraction,
  "naming-your-sound": NamingYourSoundInteraction,
  "you-wrote-a-song": YouWroteASongInteraction,
  // Module 8: Borrowed Chords
  "chord-from-next-door": ChordFromNextDoorInteraction,
  "hearing-the-difference": HearingTheDifferenceInteraction,
  "chord-from-further-away": ChordFromFurtherAwayInteraction,
  "building-borrowed-chord": BuildingBorrowedChordInteraction,
  "borrowing-in-progression": BorrowingInProgressionInteraction,
  "reharmonizing-your-ending": ReharmonizingYourEndingInteraction,
  "when-to-borrow": WhenToBorrowInteraction,
  "hear-outside-key-now": HearOutsideKeyNowInteraction,
  // Module 9: A New Color: Playing in Mixolydian
  "one-note-changes-everything": OneNoteChangesEverythingInteraction,
  "building-mixolydian-scale": BuildingMixolydianScaleInteraction,
  "mixolydian-vamp": MixolydianVampInteraction,
  "new-safety-net": NewSafetyNetInteraction,
  "same-chords-different-mood": SameChordsDifferentMoodInteraction,
  "grooving-in-mixolydian": GroovingInMixolydianInteraction,
  "ending-on-the-root": EndingOnTheRootInteraction,
  "hear-in-more-than-one-color": HearInMoreThanOneColorInteraction,
  // Module 10: Putting It All Together
  "third-section-bridge": ThirdSectionBridgeInteraction,
  "bridge-into-chorus": BridgeIntoChorusInteraction,
  "color-for-bridge": ColorForBridgeInteraction,
  "your-solo-section": YourSoloSectionInteraction,
  "verse-into-bridge": VerseIntoBridgeInteraction,
  "landing-somewhere-unexpected": LandingSomewhereUnexpectedInteraction,
  "performing-with-intention": PerformingWithIntentionInteraction,
  "complete-performance": CompletePerformanceInteraction,
  // Module 11: Training Your Ear
  "which-interval-is-it": WhichIntervalIsItInteraction,
  "wider-intervals": WiderIntervalsInteraction,
  "triad-or-suspended": TriadOrSuspendedInteraction,
  "borrowed-or-diatonic": BorrowedOrDiatonicInteraction,
  "major-or-mixolydian": MajorOrMixolydianInteraction,
  "steady-or-syncopated": SteadyOrSyncopatedInteraction,
  "your-own-chord-by-ear": YourOwnChordByEarInteraction,
  "you-can-hear-it-now": YouCanHearItNowInteraction,
  // Module 12: Playing In Any Key
  "same-shape-new-starting-point": SameShapeNewStartingPointInteraction,
  "building-in-g-major": BuildingInGMajorInteraction,
  "progression-moved": ProgressionMovedInteraction,
  "which-key-fits-your-voice": WhichKeyFitsYourVoiceInteraction,
  "same-pattern-new-key": SamePatternNewKeyInteraction,
  "borrowed-chord-transposed": BorrowedChordTransposedInteraction,
  "song-in-new-key": SongInNewKeyInteraction,
  "play-anywhere-now": PlayAnywhereNowInteraction,
  // Module 13: Playing in a Minor Key
  "same-four-chords-new-home": SameFourChordsNewHomeInteraction,
  "minor-home-progression": MinorHomeProgressionInteraction,
  "minor-iv-chord": MinorIvChordInteraction,
  "building-natural-v": BuildingNaturalVInteraction,
  "stronger-pull": StrongerPullInteraction,
  "solo-in-minor-key": SoloInMinorKeyInteraction,
  "choosing-your-home": ChoosingYourHomeInteraction,
  "two-homes-now": TwoHomesNowInteraction,
  // Module 14: Writing a Minor Key Song
  "choosing-minor-chords": ChoosingMinorChordsInteraction,
  "minor-verse": MinorVerseInteraction,
  "minor-chorus": MinorChorusInteraction,
  "melody-in-minor": MelodyInMinorInteraction,
  "minor-ending": MinorEndingInteraction,
  "verse-into-minor-chorus": VerseIntoMinorChorusInteraction,
  "naming-minor-sound": NamingMinorSoundInteraction,
  "wrote-second-song": WroteSecondSongInteraction,
  // Module 15: Reading a Chord Chart
  "what-a-chart-looks-like": WhatAChartLooksLikeInteraction,
  "repeated-chords": RepeatedChordsInteraction,
  "reading-sevenths-suspensions": ReadingSeventhsSuspensionsInteraction,
  "sight-reading-new-chart": SightReadingNewChartInteraction,
  "chart-in-new-key": ChartInNewKeyInteraction,
  "reading-own-song-chart": ReadingOwnSongChartInteraction,
  "minor-chart": MinorChartInteraction,
  "read-anything-now": ReadAnythingNowInteraction,
  // Module 16: Spreading Your Sound
  "chord-bunched-together": ChordBunchedTogetherInteraction,
  "building-spread-voicing": BuildingSpreadVoicingInteraction,
  "spreading-minor-chord": SpreadingMinorChordInteraction,
  "ending-on-spread-chord": EndingOnSpreadChordInteraction,
  "spreading-own-chorus": SpreadingOwnChorusInteraction,
  "spread-voicing-by-ear": SpreadVoicingByEarInteraction,
  "playing-spread-chord": PlayingSpreadChordInteraction,
  "fill-the-room-now": FillTheRoomNowInteraction,
  // Module 17: Keeping Steady Time
  "steadier-beat": SteadierBeatInteraction,
  "faster-beat": FasterBeatInteraction,
  "counting-yourself-in": CountingYourselfInInteraction,
  "steady-or-rushed": SteadyOrRushedInteraction,
  "practicing-slow": PracticingSlowInteraction,
  "your-tempo-your-choice": YourTempoYourChoiceInteraction,
  "keeping-time-own-song": KeepingTimeOwnSongInteraction,
  "can-keep-time-now": CanKeepTimeNowInteraction,
};
