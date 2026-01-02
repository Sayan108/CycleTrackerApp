import { styles } from '../../style';
import { Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { LegendItem } from './legend';

const DAY = 1000 * 60 * 60 * 24;
type PeriodEntry = {
  start: Date;
  end: Date;
};

const daysBetween = (a: Date, b: Date) =>
  Math.round((b.getTime() - a.getTime()) / DAY);

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

export const CalendarDashboard = () => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const today = new Date();

  /* ---------- CALENDAR STATE ---------- */

  const [currentDate, setCurrentDate] = React.useState(new Date());

  /* ---------- PERIOD STATE ---------- */

  const [periodHistory, setPeriodHistory] = React.useState<PeriodEntry[]>([]);
  const [avgCycleLength, setAvgCycleLength] = React.useState(28);
  const [avgPeriodLength, setAvgPeriodLength] = React.useState(5);

  const [selectingStart, setSelectingStart] = React.useState<Date | null>(null);

  /* ---------- DATE HELPERS ---------- */

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) =>
    new Date(y, m + 1, 0).getDate();

  const getStartDay = (y: number, m: number) => new Date(y, m, 1).getDay();

  /* ---------- PERIOD LOGIC ---------- */

  const isDateInPeriod = (date: Date) =>
    periodHistory.some(p => date >= p.start && date <= p.end);

  const getNextPeriodRange = () => {
    if (periodHistory.length === 0) return null;

    const last = periodHistory[periodHistory.length - 1];
    const start = new Date(last.start);
    start.setDate(start.getDate() + avgCycleLength);

    const end = new Date(start);
    end.setDate(end.getDate() + avgPeriodLength - 1);

    return { start, end };
  };

  const getFertileWindow = () => {
    const next = getNextPeriodRange();
    if (!next) return null;

    const ovulation = new Date(next.start);
    ovulation.setDate(ovulation.getDate() - 14);

    return {
      from: new Date(ovulation.getTime() - 4 * DAY),
      to: new Date(ovulation.getTime() + DAY),
    };
  };

  const recalcCycleLength = (history: PeriodEntry[]) => {
    if (history.length < 2) return avgCycleLength;

    let total = 0;
    for (let i = 1; i < history.length; i++) {
      total += daysBetween(history[i - 1].start, history[i].start);
    }
    return Math.round(total / (history.length - 1));
  };

  /* ---------- DAY TYPE ---------- */

  const resolveDayType = (date: Date) => {
    const nextPeriod = getNextPeriodRange();
    const fertile = getFertileWindow();

    if (isSameDay(date, today)) return 'today';
    if (isDateInPeriod(date)) return 'period';

    if (nextPeriod && date >= nextPeriod.start && date <= nextPeriod.end)
      return 'period-light';

    if (fertile && date >= fertile.from && date <= fertile.to) return 'fertile';

    return 'none';
  };

  /* ---------- CALENDAR GENERATION ---------- */

  const generateCalendarDays = () => {
    const days: any[] = [];
    const totalDays = getDaysInMonth(year, month);
    const startDay = getStartDay(year, month);

    const prevMonthDays = getDaysInMonth(year, month - 1);

    // Prev month fillers
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        date: new Date(year, month - 1, prevMonthDays - i),
        type: 'prev',
      });
    }

    // Current month
    for (let d = 1; d <= totalDays; d++) {
      const dateObj = new Date(year, month, d);
      days.push({
        day: d,
        date: dateObj,
        type: resolveDayType(dateObj),
      });
    }

    // Next month fillers
    while (days.length % 7 !== 0) {
      const nextDay = days.length - (startDay + totalDays) + 1;
      days.push({
        day: nextDay,
        date: new Date(year, month + 1, nextDay),
        type: 'next',
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  /* ---------- DATE TAP UX ---------- */

  const onDatePress = (date: Date) => {
    if (!selectingStart) {
      setSelectingStart(date);
    } else {
      const start = selectingStart < date ? selectingStart : date;
      const end = selectingStart < date ? date : selectingStart;

      const newEntry = { start, end };

      const updated = [...periodHistory, newEntry].sort(
        (a, b) => a.start.getTime() - b.start.getTime(),
      );

      setPeriodHistory(updated);
      setAvgCycleLength(recalcCycleLength(updated));
      setAvgPeriodLength(daysBetween(start, end) + 1);
      setSelectingStart(null);
    }
  };

  /* ---------- MONTH NAV ---------- */

  const goPrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));

  const goNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthLabel = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  /* ---------- UI ---------- */

  return (
    <View style={styles.calendarContainerCard}>
      <View style={styles.calendarHeaderRow}>
        <Text style={styles.monthLabel}>{monthLabel}</Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={goPrevMonth}>
            <ChevronRight
              size={20}
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>

          <View style={{ width: 24 }} />

          <TouchableOpacity onPress={goNextMonth}>
            <ChevronRight size={20} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Week */}
      <View style={styles.weekLabelsRow}>
        {daysOfWeek.map(d => (
          <Text key={d} style={styles.weekDayText}>
            {d}
          </Text>
        ))}
      </View>

      {/* Grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.dayCellContainer}
            onPress={() => onDatePress(item.date)}
          >
            <View
              style={[
                styles.dayCircleBase,
                item.type === 'period' && styles.dayPeriod,
                item.type === 'period-light' && styles.dayPeriodLight,
                item.type === 'fertile' && styles.dayFertile,
                item.type === 'today' && styles.dayTodayBorder,
              ]}
            >
              <Text
                style={[
                  styles.dayNumberText,
                  (item.type === 'prev' || item.type === 'next') && {
                    color: '#CCC',
                  },
                  item.type === 'period' && { color: '#FFF' },
                  item.type === 'today' && { color: '#008B8B' },
                ]}
              >
                {item.day}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <LegendItem color="#FF7E67" label="Period" />
        <LegendItem color="#FFD6D1" label="Predicted" />
        <LegendItem color="#C5E6E3" label="Fertile" />
        <LegendItem color="#008B8B" label="Today" isOutline />
      </View>
    </View>
  );
};
