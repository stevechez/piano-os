"use client";

import { ChordChartInteraction } from "./ChordChartInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHART = ["cMajor", "aMinor", "fMajor", "gMajor", "fMajor", "gMajor", "cMajor"];

export function ReadingOwnSongChartInteraction({ onComplete }: LessonInteractionProps) {
  return <ChordChartInteraction chart={CHART} onComplete={onComplete} />;
}
