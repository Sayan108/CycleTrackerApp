import React, { useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  Droplet,
  Star,
  Heart,
  Baby,
  Info,
} from 'lucide-react-native';
import { useReproductiveTracker } from '../../hooks/useReProductiveEngine/useReproductiveTracker';

const { width } = Dimensions.get('window');
const CELL_SIZE = (width - 72) / 7;

export const CalendarDashboard = () => {
  const [mode, setMode] = React.useState<'cycle' | 'pregnancy'>('cycle');
  const [currentDate, setCurrentDate] = React.useState(new Date());

  // Integration with your Hook
  const tracker = useReproductiveTracker(
    mode,
    {
      lastPeriodDate: '2023-10-01', // Example data
      periodLength: 5,
      averageCycleLength: 28,
      history: [],
    },
    { lmpDate: '2023-08-01' },
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Fillers for previous month
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        current: false,
      });
    }
    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ date: new Date(year, month, d), current: true });
    }
    // Fillers for next month to keep grid 6x7
    while (days.length < 42) {
      const nextD: any = days.length - (firstDay + daysInMonth) + 1;
      days.push({ date: new Date(year, month + 1, nextD), current: false });
    }
    return days;
  }, [year, month]);

  const renderIcon = (status: string) => {
    const size = 12;
    switch (status) {
      case 'period':
        return <Droplet size={size} color="#FF7E67" fill="#FF7E67" />;
      case 'ovulation':
        return <Star size={size} color="#8E7AB5" fill="#8E7AB5" />;
      case 'fertile':
        return <Heart size={size} color="#61B15A" fill="#61B15A" />;
      case 'trimester-1':
      case 'trimester-2':
      case 'trimester-3':
        return <Baby size={size} color="#FF9AA2" />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. TOP SUMMARY CARD (Hook Data) */}
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryTitle}>
            {mode === 'cycle' ? 'Cycle Status' : 'Pregnancy Progress'}
          </Text>
          <Text style={styles.summaryValue}>
            {mode === 'cycle'
              ? `Next period: ${tracker.cycle?.nextPeriod.toLocaleDateString()}`
              : `${tracker.pregnancy?.weeks} Weeks, ${tracker.pregnancy?.trimester} Trimester`}
          </Text>
        </View>
        <View style={styles.summaryBadge}>
          <Info size={16} color="#FFF" />
        </View>
      </View>

      {/* 2. MODE SWITCHER */}
      <View style={styles.tabBar}>
        {['cycle', 'pregnancy'].map(t => (
          <TouchableOpacity
            key={t}
            onPress={() => setMode(t as any)}
            style={[styles.tabItem, mode === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, mode === t && styles.tabTextActive]}>
              {t.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. CALENDAR CARD */}
      <View style={styles.calendarCard}>
        <View style={styles.header}>
          <Text style={styles.monthLabel}>
            {currentDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <View style={styles.navGroup}>
            <TouchableOpacity
              onPress={() => setCurrentDate(new Date(year, month - 1, 1))}
            >
              <ChevronLeft size={20} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentDate(new Date(year, month + 1, 1))}
            >
              <ChevronRight size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.weekRow}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
            <Text key={d} style={styles.weekLetter}>
              {d}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {calendarDays.map((item, i) => {
            const status =
              mode === 'cycle'
                ? tracker.cycle?.dayStatus(item.date)
                : tracker.pregnancy?.dayStatus();

            const isToday =
              item.date.toDateString() === tracker.today.toDateString();

            return (
              <View key={i} style={styles.cell}>
                <TouchableOpacity
                  style={[
                    styles.dayCircle,
                    status === 'period' && styles.bgPeriod,
                    status === 'fertile' && styles.bgFertile,
                    isToday && styles.todayBorder,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      !item.current && styles.nonMonthText,
                      isToday && styles.todayText,
                    ]}
                  >
                    {item.date.getDate()}
                  </Text>
                  <View style={styles.iconPos}>
                    {item.current && renderIcon(status || '')}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFBFE', padding: 16 },

  // Summary Card
  summaryCard: {
    backgroundColor: '#ee9f9fff', // Dark mode accent for contrast
    padding: 20,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    color: '#0c0c0cff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  summaryBadge: { backgroundColor: '#e9babaff', padding: 8, borderRadius: 12 },

  // Tabs
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#EEE',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabActive: { backgroundColor: '#FFF', elevation: 2 },
  tabText: { color: '#888', fontWeight: '700', fontSize: 12 },
  tabTextActive: { color: '#000' },

  // Calendar
  calendarCard: {
    backgroundColor: '#FFF',
    borderRadius: 32,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthLabel: { fontSize: 18, fontWeight: '800', color: '#2D3436' },
  navGroup: { flexDirection: 'row', gap: 15 },

  weekRow: { flexDirection: 'row', marginBottom: 10 },
  weekLetter: {
    flex: 1,
    textAlign: 'center',
    color: '#BDC3C7',
    fontSize: 12,
    fontWeight: '700',
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: `${100 / 7}%`, aspectRatio: 1, padding: 2 },
  dayCircle: {
    flex: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: { fontSize: 14, fontWeight: '600', color: '#2D3436' },
  nonMonthText: { color: '#E0E0E0' },

  // Status Colors
  bgPeriod: { backgroundColor: '#FFF0EE' },
  bgFertile: { backgroundColor: '#F0F9EF' },
  todayBorder: { borderWidth: 2, borderColor: '#FF7E67' },
  todayText: { color: '#FF7E67', fontWeight: '800' },

  iconPos: { height: 12, marginTop: 2 },
});
