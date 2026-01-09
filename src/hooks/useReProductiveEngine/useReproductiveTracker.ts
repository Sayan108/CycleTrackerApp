import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
  CycleHistory,
  DayStatus,
  pregnancyMilestones,
  ReproductiveTrackerReturn,
} from './types';
import {addDays, diffDays, isBetween, startOfDay} from './utils';
import {AppMode} from '../../redux/common.slice';
import {RootState} from '../../redux';
import {analyzeCycleHistory} from './irreguler';

const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

export function useReproductiveTracker(): ReproductiveTrackerReturn {
  const today = startOfDay(new Date());

  const {
    mode,
    goal,
    regularCycle,
    lastPeriodDate,
    pregnancyLMP,
    history,
    avgCycleLength,
    avgPeriodLength,
  } = useSelector((state: RootState) => state.reproductive);

  /* =======================================================
      CYCLE MODE (Predictive Projection)
  ======================================================= */
  const cycle = useMemo(() => {
    if (mode !== AppMode.CYCLE || !lastPeriodDate) return null;

    const lpd = startOfDay(new Date(lastPeriodDate));
    const historyAnalysis = regularCycle
      ? null
      : analyzeCycleHistory(history as CycleHistory[]);
    const cycleLength = historyAnalysis?.predictedCycleLength ?? avgCycleLength;

    // Standard calculations for the CURRENT cycle
    const ovulation = addDays(lpd, cycleLength - 14);
    const fertileStart = addDays(ovulation, -5);
    const fertileEnd = addDays(ovulation, 1);
    const nextPeriod = addDays(lpd, cycleLength);

    const dayStatus = (date: Date): DayStatus => {
      const targetDate = startOfDay(date);

      // 1. Calculate the total days difference from the anchor point (last period)
      const totalDaysDiff = diffDays(lpd, targetDate);

      // If the date is before the last period, we can't accurately predict without past history
      if (totalDaysDiff < 0) return 'safe';

      // 2. MODULO LOGIC: Find which day of the cycle this date falls on (1 to cycleLength)
      // This is what allows February, March, etc., to work.
      const dayOfCycle = (totalDaysDiff % cycleLength) + 1;

      // 3. Status based on the day of the cycle
      // Period days
      if (dayOfCycle <= avgPeriodLength) {
        return totalDaysDiff < cycleLength ? 'period' : 'predicted-period';
      }

      // Ovulation & Fertile window (Ovulation is usually cycleLength - 14)
      const ovulationDay = cycleLength - 14;
      const fStartDay = ovulationDay - 5;
      const fEndDay = ovulationDay + 1;

      if (dayOfCycle >= fStartDay && dayOfCycle <= fEndDay) {
        if (dayOfCycle === ovulationDay) return 'ovulation';
        return goal === 'conceive' ? 'fertile-focus' : 'fertile';
      }

      return 'safe';
    };

    return {
      cycleLength,
      ovulation,
      nextPeriod,
      fertileWindow: {start: fertileStart, end: fertileEnd},
      irregularityScore: historyAnalysis?.irregularityScore ?? 0,
      goal,
      ovulationFormatted: formatDate(ovulation),
      nextPeriodFormatted: formatDate(nextPeriod),
      daysUntilNextPeriod:
        diffDays(today, nextPeriod) <= 0
          ? 'Today'
          : `In ${diffDays(today, nextPeriod)} days`,
      daysUntilOvulation:
        diffDays(today, ovulation) <= 0
          ? 'Today'
          : `In ${diffDays(today, ovulation)} days`,
      isOvulationToday: startOfDay(ovulation).getTime() === today.getTime(),
      dayStatus,
    };
  }, [
    mode,
    goal,
    regularCycle,
    lastPeriodDate,
    history,
    avgCycleLength,
    avgPeriodLength,
    today,
  ]);

  /* =======================================================
      PREGNANCY MODE (Date-Aware Status)
  ======================================================= */
  const pregnancy = useMemo(() => {
    if (mode !== AppMode.PREGNANCY || !pregnancyLMP) return null;

    const lmp = startOfDay(new Date(pregnancyLMP));
    const dueDate = addDays(lmp, 280);

    // Stats for "Today"
    const daysPregnantToday = Math.max(0, diffDays(lmp, today));
    const weeksToday = Math.floor(daysPregnantToday / 7);

    const getTrimester = (weeks: number) =>
      weeks < 13 ? 1 : weeks < 27 ? 2 : 3;

    // Dynamic status for the Calendar (takes a date)
    const dayStatus = (date: Date): DayStatus => {
      const d = startOfDay(date);
      const daysSinceLMP = diffDays(lmp, d);

      // If date is before pregnancy or after due date
      if (daysSinceLMP < 0 || daysSinceLMP > 280) return 'safe';

      const weeksAtDate = Math.floor(daysSinceLMP / 7);
      const trimester = getTrimester(weeksAtDate);

      return `trimester-${trimester}` as DayStatus;
    };

    const milestones = pregnancyMilestones.filter(m => m.week <= weeksToday);
    const latestMilestone =
      milestones.length > 0 ? milestones[milestones.length - 1].title : null;

    return {
      weeks: weeksToday,
      daysPregnant: daysPregnantToday,
      trimester: getTrimester(weeksToday),
      trimesterLabel:
        getTrimester(weeksToday) === 1
          ? '1st'
          : getTrimester(weeksToday) === 2
          ? '2nd'
          : '3rd',
      dueDate,
      dueDateFormatted: formatDate(dueDate),
      milestones,
      latestMilestone,
      dayStatus,
    };
  }, [mode, pregnancyLMP, today]);

  return {today, mode, goal, cycle, pregnancy};
}
