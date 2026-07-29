"use client";

import { ChordChartInteraction } from "./ChordChartInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHART = ["dMinor", "eMinor", "fMajor", "bDiminished"];

export function ReadingTheWholeFamilyInteraction({ onComplete }: LessonInteractionProps) {
  return <ChordChartInteraction chart={CHART} onComplete={onComplete} />;
}
