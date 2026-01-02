import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../style';
import { Text, View } from 'react-native';

const FirstStat = () => {
  return (
    <LinearGradient colors={['#FF8E8E', '#FF5B99']} style={styles.gradientCard}>
      <Text style={styles.gradHeader}>Current Cycle</Text>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.dayText}>Day 14</Text>
        <Text style={styles.phaseText}>Follicular Phase</Text>
      </View>
      <View style={styles.gradStatsRow}>
        <View style={styles.gradStatBox}>
          <Text style={styles.statLabel}>Next Period</Text>
          <Text style={styles.statVal}>In 14 days</Text>
        </View>
        <View style={styles.gradStatBox}>
          <Text style={styles.statLabel}>Fertility</Text>
          <Text style={styles.statVal}>High</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default FirstStat;
