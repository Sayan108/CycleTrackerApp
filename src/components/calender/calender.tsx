import React, {useMemo, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  Droplet,
  Heart,
  Baby,
  Info,
  Zap,
  Calendar as CalendarIcon,
} from 'lucide-react-native';
import {useReproductiveTracker} from '../../hooks/useReProductiveEngine/useReproductiveTracker';
import {RootState, useAppSelector} from '../../redux';
import {SectionHeader} from '../shared/sectionHeader';

const {width} = Dimensions.get('window');

const THEME = {
  t1: '#FF9AA2', // 1st Tri
  t2: '#B583FF', // 2nd Tri
  t3: '#74C0FC', // 3rd Tri
  period: '#FF4D4D',
  fertile: '#4CAF50',
  ovulation: '#9C27B0',
  bg: '#F8F9FD',
};

const COLORS = {
  text: '#1A1A1A',
  sub: '#999',
  card: '#FFF',
  border: '#EEE',
};

export const CalendarDashboard = () => {
  const {mode} = useAppSelector((state: RootState) => state.reproductive);
  const tracker = useReproductiveTracker();

  // Navigation State
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const isPregnancy = mode === 'pregnancy';

  // --- 1. CALENDAR GRID LOGIC ---
  const monthsData = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  }, [viewDate]);

  // --- 2. PREDICTIVE HIGHLIGHT LOGIC ---
  const getDayStatus = (date: Date) => {
    if (!date) return null;

    // Always use the tracker hook to determine status for specific dates
    // This enables future month predictions (February, March, etc.)
    const status = isPregnancy
      ? tracker.pregnancy?.dayStatus(date)
      : tracker.cycle?.dayStatus(date);

    return status;
  };

  const activeStatus = getDayStatus(selectedDate);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. STATUS SUMMARY CARD */}
      <View
        style={[styles.heroCard, isPregnancy && {backgroundColor: THEME.t2}]}>
        <View>
          <Text style={styles.heroLabel}>
            {isPregnancy ? 'PREGNANCY TIMELINE' : 'CYCLE STATUS'}
          </Text>
          <Text style={styles.heroMain}>
            {isPregnancy
              ? `Week ${tracker.pregnancy?.weeks}`
              : tracker.cycle?.daysUntilNextPeriod}
          </Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {isPregnancy
                ? tracker.pregnancy?.trimesterLabel + ' Trimester'
                : 'Predicted Window'}
            </Text>
          </View>
        </View>
        <CalendarIcon
          color="#FFF"
          size={60}
          style={styles.heroBgIcon}
          opacity={0.15}
        />
      </View>

      {/* 2. CALENDAR CARD */}
      <View style={styles.calendarWrapper}>
        <View style={styles.monthHeader}>
          <View>
            <Text style={styles.monthTitle}>
              {viewDate.toLocaleString('default', {month: 'long'})}
            </Text>
            <Text style={styles.yearTitle}>{viewDate.getFullYear()}</Text>
          </View>
          <View style={styles.navButtons}>
            <TouchableOpacity
              onPress={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
                )
              }
              style={styles.navBtn}>
              <ChevronLeft size={22} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
                )
              }
              style={styles.navBtn}>
              <ChevronRight size={22} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.weekLabels}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
            <Text key={d} style={styles.weekText}>
              {d}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {monthsData.map((date, index) => {
            if (!date)
              return <View key={`p-${index}`} style={styles.dayCell} />;

            const status = getDayStatus(date);
            const isToday =
              date.toDateString() === tracker.today.toDateString();
            const isSelected =
              date.toDateString() === selectedDate.toDateString();

            return (
              <TouchableOpacity
                key={date.toISOString()}
                onPress={() => setSelectedDate(date)}
                style={styles.dayCell}>
                <View
                  style={[
                    styles.dayCircle,
                    status === 'period' || status === 'predicted-period'
                      ? styles.bgPeriod
                      : null,
                    status === 'ovulation' ? styles.bgOvulation : null,
                    status === 'fertile' || status === 'fertile-focus'
                      ? styles.bgFertile
                      : null,
                    isToday && styles.todayCircle,
                    isSelected && styles.selectedCircle,
                  ]}>
                  <Text
                    style={[
                      styles.dayNumber,
                      (status === 'period' ||
                        status === 'predicted-period') && {color: THEME.period},
                      status === 'ovulation' && {color: THEME.ovulation},
                      isSelected && {color: '#FFF'},
                      isToday &&
                        !isSelected && {color: THEME.period, fontWeight: '900'},
                    ]}>
                    {date.getDate()}
                  </Text>

                  {/* Small visual dot for trimesters or predicted periods */}
                  <View style={styles.indicatorRow}>
                    {status === 'ovulation' && (
                      <Zap
                        size={6}
                        color={THEME.ovulation}
                        fill={THEME.ovulation}
                      />
                    )}
                    {status === 'predicted-period' && (
                      <View style={styles.predictiveDot} />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 3. SELECTION INSIGHT (Intuitive UX) */}
      <View style={styles.insightSection}>
        <SectionHeader
          title={selectedDate.toLocaleDateString('default', {
            month: 'short',
            day: 'numeric',
          })}
        />
        <View style={styles.insightCard}>
          <Text style={styles.insightStatus}>
            {activeStatus === 'period' || activeStatus === 'predicted-period'
              ? 'Predicted Period'
              : activeStatus === 'ovulation'
              ? 'Peak Ovulation Day'
              : activeStatus === 'fertile'
              ? 'High Fertility Window'
              : 'Low Fertility Day'}
          </Text>
          <Text style={styles.insightDesc}>
            {isPregnancy
              ? 'Your baby is developing rapidly this week.'
              : 'Based on your average cycle, this day is part of your regular patterns.'}
          </Text>
        </View>
      </View>

      {/* 4. LEGEND */}
      <View style={styles.legendWrapper}>
        <Text style={styles.legendTitle}>Guide</Text>
        <View style={styles.legendGrid}>
          {isPregnancy ? (
            <>
              <LegendItem color={THEME.t1} label="1st Tri" />
              <LegendItem color={THEME.t2} label="2nd Tri" />
              <LegendItem color={THEME.t3} label="3rd Tri" />
            </>
          ) : (
            <>
              <LegendItem color={THEME.period} label="Period" icon={Droplet} />
              <LegendItem
                color={THEME.ovulation}
                label="Ovulation"
                icon={Zap}
              />
              <LegendItem color={THEME.fertile} label="Fertile" icon={Heart} />
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const LegendItem = ({color, label, icon: Icon}: any) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendBox, {backgroundColor: color}]}>
      {Icon && <Icon size={10} color="#FFF" />}
    </View>
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

// ... Styles
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: THEME.bg},
  heroCard: {
    margin: 20,
    padding: 25,
    borderRadius: 30,
    backgroundColor: THEME.period,
    overflow: 'hidden',
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroMain: {color: '#FFF', fontSize: 26, fontWeight: '900', marginTop: 5},
  pill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  pillText: {color: '#FFF', fontSize: 11, fontWeight: '700'},
  heroBgIcon: {position: 'absolute', right: -10, bottom: -10},

  calendarWrapper: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 35,
    padding: 20,
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthTitle: {fontSize: 22, fontWeight: '900', color: COLORS.text},
  yearTitle: {fontSize: 14, color: COLORS.sub, fontWeight: '600'},
  navButtons: {flexDirection: 'row', gap: 10},
  navBtn: {padding: 8, backgroundColor: '#F5F5F5', borderRadius: 12},

  weekLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  weekText: {
    width: (width - 80) / 7,
    textAlign: 'center',
    color: '#CCC',
    fontWeight: '800',
    fontSize: 11,
  },

  calendarGrid: {flexDirection: 'row', flexWrap: 'wrap'},
  dayCell: {width: `${100 / 7}%`, aspectRatio: 1, padding: 4},
  dayCircle: {
    flex: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  dayNumber: {fontSize: 15, fontWeight: '700', color: '#444'},

  bgPeriod: {backgroundColor: THEME.period + '15'},
  bgOvulation: {backgroundColor: THEME.ovulation + '15'},
  bgFertile: {backgroundColor: THEME.fertile + '15'},
  todayCircle: {borderWidth: 2, borderColor: THEME.period},
  selectedCircle: {backgroundColor: COLORS.text, elevation: 4},

  indicatorRow: {height: 8, marginTop: 2},
  predictiveDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: THEME.period,
  },

  insightSection: {padding: 20},
  insightCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  insightStatus: {fontSize: 16, fontWeight: '800', color: COLORS.text},
  insightDesc: {fontSize: 13, color: COLORS.sub, marginTop: 5},

  legendWrapper: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 15,
  },
  legendGrid: {flexDirection: 'row', justifyContent: 'space-between'},
  legendItem: {flexDirection: 'row', alignItems: 'center', gap: 6},
  legendBox: {
    width: 22,
    height: 22,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendLabel: {fontSize: 12, fontWeight: '600', color: '#666'},
});
