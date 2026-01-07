// src/hooks/useReproductiveTracker/useReproductiveTracker.ts

import { useMemo } from 'react';
import {
  AppMode,
  CycleInput,
  DayStatus,
  PregnancyInput,
  pregnancyMilestones,
} from './types';
import { analyzeCycleHistory } from './irreguler';
import { addDays, diffDays, isBetween } from './utils';

export function useReproductiveTracker(
  mode: AppMode,
  cycleInput?: CycleInput,
  pregnancyInput?: PregnancyInput,
) {
  const today = new Date();

  /* ================== CYCLE ================== */

  const cycle = useMemo(() => {
    if (mode !== 'cycle' || !cycleInput) return null;

    const lpd = new Date(cycleInput.lastPeriodDate);
    const historyAnalysis = analyzeCycleHistory(cycleInput.history);

    const cycleLength =
      historyAnalysis.predictedCycleLength || cycleInput.averageCycleLength;

    const ovulation = addDays(lpd, cycleLength - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const nextPeriod = addDays(lpd, cycleLength);

    const dayStatus = (date: Date): DayStatus => {
      const day = diffDays(lpd, date) + 1;

      if (day >= 1 && day <= cycleInput.periodLength) return 'period';

      if (isBetween(date, fertileStart, fertileEnd))
        return date.getTime() === ovulation.getTime() ? 'ovulation' : 'fertile';

      if (isBetween(date, nextPeriod, addDays(nextPeriod, 2)))
        return 'predicted-period';

      return 'safe';
    };

    return {
      cycleLength,
      ovulation,
      nextPeriod,
      irregularityScore: historyAnalysis.irregularityScore,
      dayStatus,
    };
  }, [mode, cycleInput]);

  /* ================== PREGNANCY ================== */

  const pregnancy = useMemo(() => {
    if (mode !== 'pregnancy' || !pregnancyInput) return null;

    const lmp = new Date(pregnancyInput.lmpDate);
    const daysPregnant = diffDays(lmp, today);
    const weeks = Math.floor(daysPregnant / 7);
    const dueDate = addDays(lmp, 280);

    const trimester = weeks < 13 ? 1 : weeks < 27 ? 2 : 3;

    const dayStatus = (): DayStatus => {
      if (trimester === 1) return 'trimester-1';
      if (trimester === 2) return 'trimester-2';
      return 'trimester-3';
    };

    const activeMilestones = pregnancyMilestones.filter(m => m.week <= weeks);

    return {
      weeks,
      daysPregnant,
      trimester,
      dueDate,
      milestones: activeMilestones,
      dayStatus,
    };
  }, [mode, pregnancyInput]);

  return {
    today,
    cycle,
    pregnancy,
  };
}
