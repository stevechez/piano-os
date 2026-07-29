"use client";

import { ChordChartInteraction } from "./ChordChartInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHART = ["fMajor", "gMajor", "cMajor", "dMajor", "gMajor"];

export function ReadingAKeyChangeInteraction({ onComplete }: LessonInteractionProps) {
  return <ChordChartInteraction chart={CHART} onComplete={onComplete} />;
}
