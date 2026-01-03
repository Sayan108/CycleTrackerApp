import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../style';
import { Text, View } from 'react-native';

type CycleData = {
  currentDay: number;
  phase: string;
  nextPeriodInDays: number;
  fertility: 'Low' | 'Medium' | 'High';
};

type PregnancyData = {
  week: number;
  trimester: '1st Trimester' | '2nd Trimester' | '3rd Trimester';
  dueInWeeks: number;
  babySize: string;
};

type Props = {
  mode: 'cycle' | 'pregnancy';
  cycleData?: CycleData;
  pregnancyData?: PregnancyData;
};

const FirstStat: React.FC<Props> = ({ mode, cycleData, pregnancyData }) => {
  const gradient =
    mode === 'cycle' ? ['#FF8E8E', '#FF5B99'] : ['#9D71FD', '#6A5AE0'];

  return (
    <LinearGradient colors={gradient} style={styles.gradientCard}>
      {/* HEADER */}
      <Text style={styles.gradHeader}>
        {mode === 'cycle' ? 'Current Cycle' : 'Pregnancy Progress'}
      </Text>

      {/* MAIN STAT */}
      <View style={{ alignItems: 'center' }}>
        {mode === 'cycle' && cycleData && (
          <>
            <Text style={styles.dayText}>Day {cycleData.currentDay}</Text>
            <Text style={styles.phaseText}>{cycleData.phase}</Text>
          </>
        )}

        {mode === 'pregnancy' && pregnancyData && (
          <>
            <Text style={styles.dayText}>Week {pregnancyData.week}</Text>
            <Text style={styles.phaseText}>
              {pregnancyData.trimester} • Baby is {pregnancyData.babySize}
            </Text>
          </>
        )}
      </View>

      {/* STATS */}
      <View style={styles.gradStatsRow}>
        {mode === 'cycle' && cycleData && (
          <>
            <View style={styles.gradStatBox}>
              <Text style={styles.statLabel}>Next Period</Text>
              <Text style={styles.statVal}>
                In {cycleData.nextPeriodInDays} days
              </Text>
            </View>
            <View style={styles.gradStatBox}>
              <Text style={styles.statLabel}>Fertility</Text>
              <Text style={styles.statVal}>{cycleData.fertility}</Text>
            </View>
          </>
        )}

        {mode === 'pregnancy' && pregnancyData && (
          <>
            <View style={styles.gradStatBox}>
              <Text style={styles.statLabel}>Due In</Text>
              <Text style={styles.statVal}>
                {pregnancyData.dueInWeeks} weeks
              </Text>
            </View>
            <View style={styles.gradStatBox}>
              <Text style={styles.statLabel}>Trimester</Text>
              <Text style={styles.statVal}>{pregnancyData.trimester}</Text>
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

export default FirstStat;
