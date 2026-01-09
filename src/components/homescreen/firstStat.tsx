import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';

import {AppMode} from '../../redux/common.slice';
import {
  CycleTrackerData,
  PregnancyTrackerData,
} from '../../hooks/useReProductiveEngine/types';

const {width} = Dimensions.get('window');

type Props = {
  mode: AppMode;
  cycle: CycleTrackerData | null;
  pregnancy: PregnancyTrackerData | null;
};

const FirstStat: React.FC<Props> = ({mode, cycle, pregnancy}) => {
  const isCycle = mode === AppMode.CYCLE;
  const gradient = isCycle ? ['#FF8E8E', '#FF6B95'] : ['#9D71FD', '#7B4DFF'];

  // Logic for the visual progress bar percentage
  const getProgress = () => {
    if (isCycle && cycle) {
      const dayCount = parseInt(cycle.daysUntilNextPeriod) || 0;
      return Math.max(10, 100 - (dayCount / cycle.cycleLength) * 100);
    }
    if (!isCycle && pregnancy) {
      return (pregnancy.weeks / 40) * 100;
    }
    return 0;
  };

  return (
    <LinearGradient
      colors={gradient}
      style={styles.heroCard}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      {/* HEADER SECTION */}
      <View style={styles.headerRow}>
        <View style={styles.pill}>
          <Text style={styles.pillText}>
            {isCycle ? 'Active Cycle' : 'Growth Phase'}
          </Text>
        </View>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>

      {/* CENTER STAT: THE BIG NUMBER */}
      <View style={styles.mainStatContainer}>
        <Text style={styles.heroValue}>
          {isCycle ? cycle?.daysUntilNextPeriod : `Week ${pregnancy?.weeks}`}
        </Text>
        <Text style={styles.heroSub}>
          {isCycle
            ? 'Days until next period'
            : pregnancy?.trimesterLabel + ' Trimester'}
        </Text>

        {/* METER BAR: Visual representation of progress */}
        <View style={styles.meterTrack}>
          <View style={[styles.meterFill, {width: `${getProgress()}%`}]} />
        </View>
      </View>

      {/* BOTTOM STATS: GLASS CARDS */}
      <View style={styles.bottomRow}>
        <View style={styles.glassStat}>
          <Text style={styles.statLabel}>
            {isCycle ? 'Next Period' : 'Due Date'}
          </Text>
          <Text style={styles.statValue}>
            {isCycle ? cycle?.nextPeriodFormatted : pregnancy?.dueDateFormatted}
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.glassStat}>
          <Text style={styles.statLabel}>{isCycle ? 'Goal' : 'Progress'}</Text>
          <Text style={styles.statValue}>
            {isCycle
              ? cycle?.goal === 'conceive'
                ? 'Conceive'
                : 'Track'
              : `${Math.round(getProgress())}%`}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 32,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B95',
        shadowOpacity: 0.3,
        shadowRadius: 15,
        shadowOffset: {width: 0, height: 10},
      },
      android: {elevation: 10},
    }),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pillText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  dateText: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.8,
    fontWeight: '600',
  },
  mainStatContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  heroValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  heroSub: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  meterTrack: {
    height: 6,
    width: '60%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    marginTop: 15,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  bottomRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  glassStat: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#FFF',
    opacity: 0.7,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});

export default FirstStat;
