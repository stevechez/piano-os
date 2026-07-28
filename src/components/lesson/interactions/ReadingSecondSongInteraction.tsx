"use client";

import { ChordChartInteraction } from "./ChordChartInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHART = ["aMinor", "fMajor", "dMinor", "eMajor", "dMinor", "eMajor", "aMinor"];

export function ReadingSecondSongInteraction({ onComplete }: LessonInteractionProps) {
  return <ChordChartInteraction chart={CHART} onComplete={onComplete} />;
}
