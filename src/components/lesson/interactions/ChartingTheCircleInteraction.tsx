"use client";

import { ChordChartInteraction } from "./ChordChartInteraction";

export interface LessonInteractionProps {
  onComplete: () => void;
}

const CHART = ["cMajor", "gMajor", "dMajor"];

export function ChartingTheCircleInteraction({ onComplete }: LessonInteractionProps) {
  return <ChordChartInteraction chart={CHART} onComplete={onComplete} />;
}
