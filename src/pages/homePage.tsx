import React from 'react';
import AppLayout from '../components/shared/layout';
import { View, Text } from 'react-native';
import { QuickAction } from '../components/homescreen/quickAction';
import { styles } from '../style';

import {
  CalendarIcon,
  Droplet,
  Dumbbell,
  Moon,
  PlusSquare,
  Smile,
  Zap,
} from 'lucide-react-native';

import { SectionHeader } from '../components/shared/sectionHeader';
import { PredictionCard } from '../components/homescreen/prediction';
import { LogItem } from '../components/homescreen/logItem';
import { WellnessRow } from '../components/homescreen/wellnessItem';
import FirstStat from '../components/homescreen/firstStat';

const HomePage = () => {
  return (
    <AppLayout title="Home">
      <FirstStat />
      {/* <QuickAction /> */}

      {/* Predictions */}
      <View style={styles.section}>
        <SectionHeader title="Predictions" />
        <PredictionCard
          icon={CalendarIcon}
          title="Next Period"
          sub="Expected arrival"
          date="Jan 29"
          days="14 days"
          color="#FF8E8E"
        />
        <PredictionCard
          icon={Zap}
          title="Ovulation"
          sub="Peak fertility window"
          date="Jan 15"
          days="Today"
          color="#1CB0A8"
        />
      </View>

      {/* Logs */}
      <View style={styles.section}>
        <SectionHeader title="Today's Log" showSeeAll />
        <View style={styles.whiteCard}>
          <LogItem
            icon={Smile}
            title="Mood"
            status="Happy, Energetic"
            color="#F1C40F"
          />
          <LogItem icon={Droplet} title="Flow" status="None" color="#3498DB" />
          <LogItem
            icon={PlusSquare}
            title="Symptoms"
            status="Mild cramps, Increased energy"
            color="#2ECC71"
          />
        </View>
      </View>

      {/* Wellness */}
      <View style={styles.section}>
        <SectionHeader title="Wellness Tracker" />
        <View style={styles.whiteCard}>
          <WellnessRow
            label="Water Intake"
            value="6/8 glasses"
            progress={0.75}
            color="#4A90E2"
            icon={Droplet}
          />
          <WellnessRow
            label="Sleep"
            value="7.5 hours"
            progress={0.8}
            color="#9D71FD"
            icon={Moon}
          />
          <WellnessRow
            label="Exercise"
            value="30 min"
            progress={0.5}
            color="#1CB0A8"
            icon={Dumbbell}
          />
        </View>
      </View>
    </AppLayout>
  );
};

export default HomePage;
