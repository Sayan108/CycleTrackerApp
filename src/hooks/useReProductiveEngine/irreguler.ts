// src/hooks/useReproductiveTracker/irregular.ts

import { CycleHistory } from './types';

export function analyzeCycleHistory(history: CycleHistory[] = []) {
  if (history.length < 3) {
    return {
      irregularityScore: 0,
      predictedCycleLength: 28,
    };
  }

  const lengths = history.map(h => h.cycleLength);
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;

  const variance =
    lengths.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / lengths.length;

  return {
    irregularityScore: Math.round(Math.sqrt(variance)),
    predictedCycleLength: Math.round(avg),
  };
}
