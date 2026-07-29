"use client";

import { ChordChartInteraction } from "./ChordChartInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHART = ["dMinor", "bDiminished", "cMajor"];

export function ReadingADiminishedChordInteraction({ onComplete }: LessonInteractionProps) {
  return <ChordChartInteraction chart={CHART} onComplete={onComplete} />;
}
