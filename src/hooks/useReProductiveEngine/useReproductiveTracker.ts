// src/hooks/useReproductiveTracker/useReproductiveTracker.ts

import {useMemo} from 'react';
import {useSelector} from 'react-redux';
// adjust path if needed

import {CycleHistory, DayStatus, pregnancyMilestones} from './types';

import {analyzeCycleHistory} from './irreguler';
import {addDays, diffDays, isBetween} from './utils';
import {AppMode} from '../../redux/common.slice';
import {RootState} from '../../redux';

export function useReproductiveTracker() {
  const today = new Date();

  const {
    mode,
    lastPeriodDate,
    lmpDate,
    history,
    averageCycleLength,
    periodLength,
  } = useSelector((state: RootState) => state.reproductive);

  /* ================== CYCLE ================== */

  const cycle = useMemo(() => {
    if (mode !== AppMode.CYCLE) return null;

    const lpd = new Date(lastPeriodDate);
    const historyAnalysis = analyzeCycleHistory(history as CycleHistory[]);

    const cycleLength =
      historyAnalysis.predictedCycleLength || averageCycleLength;

    const ovulation = addDays(lpd, cycleLength - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const nextPeriod = addDays(lpd, cycleLength);

    const dayStatus = (date: Date): DayStatus => {
      const day = diffDays(lpd, date) + 1;

      if (day >= 1 && day <= periodLength) return 'period';

      if (isBetween(date, fertileStart, fertileEnd)) {
        return date.getTime() === ovulation.getTime() ? 'ovulation' : 'fertile';
      }

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
  }, [mode, lastPeriodDate, history, averageCycleLength, periodLength]);

  /* ================== PREGNANCY ================== */

  const pregnancy = useMemo(() => {
    if (mode !== AppMode.PREGNANCY) return null;

    const lmp = new Date(lmpDate);
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
  }, [mode, lmpDate, today]);

  return {
    today,
    cycle,
    pregnancy,
  };
}
