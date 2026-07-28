"use client";

import { ChordChartInteraction } from "./ChordChartInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHART = ["c7", "f7", "c7", "c7", "f7", "f7", "c7", "c7", "g7", "f7", "c7", "g7"];

export function ReadingTheBluesInteraction({ onComplete }: LessonInteractionProps) {
  return <ChordChartInteraction chart={CHART} onComplete={onComplete} />;
}
