import React, { useState } from 'react';
import AppLayout from '../components/shared/layout';
import { View, ScrollView } from 'react-native';
import { styles } from '../style';

import {
  CalendarIcon,
  Droplet,
  Dumbbell,
  Moon,
  PlusSquare,
  Smile,
  Zap,
  Baby,
} from 'lucide-react-native';

import { SectionHeader } from '../components/shared/sectionHeader';
import { PredictionCard } from '../components/homescreen/prediction';
import { LogItem } from '../components/homescreen/logItem';
import { WellnessRow } from '../components/homescreen/wellnessItem';
import FirstStat from '../components/homescreen/firstStat';
import { useReproductiveTracker } from '../hooks/useReProductiveEngine/useReproductiveTracker';

// Import your hook

const HomePage: React.FC = () => {
  // 2. Initialize Hook with actual data (Replace with your actual state/database values)
  const {  cycle, pregnancy, today } = useReproductiveTracker();

  return (
    <AppLayout title="Home">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* HERO STAT (Pass dynamic mode) */}
        <FirstStat mode={mode} />

        {/* PREDICTIONS / PROGRESS */}
        <View style={styles.section}>
          <SectionHeader
            title={mode === 'cycle' ? 'Predictions' : 'Pregnancy Progress'}
          />

          {mode === 'cycle' && cycle ? (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <PredictionCard
                icon={CalendarIcon}
                title="Next Period"
                sub="Expected arrival"
                date={cycle.nextPeriod.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                days="In 14 days" // You could calculate this with diffDays(today, nextPeriod)
                color="#FF8E8E"
              />
              <PredictionCard
                icon={Zap}
                title="Ovulation"
                sub="Peak fertility"
                date={cycle.ovulation.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                days={
                  cycle.ovulation.toDateString() === today.toDateString()
                    ? 'Today'
                    : 'Coming up'
                }
                color="#1CB0A8"
              />
            </View>
          ) : pregnancy ? (
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <PredictionCard
                icon={Baby}
                title="Pregnancy"
                sub="Current stage"
                date={`Week ${pregnancy.weeks}`}
                days={`${pregnancy.trimester}${
                  pregnancy.trimester === 1
                    ? 'st'
                    : pregnancy.trimester === 2
                    ? 'nd'
                    : 'rd'
                } Trimester`}
                color="#FF8E8E"
              />
              <PredictionCard
                icon={CalendarIcon}
                title="Due Date"
                sub="Est. delivery"
                date={pregnancy.dueDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
                days={`${Math.floor(pregnancy.daysPregnant / 7)} weeks in`}
                color="#9D71FD"
              />
            </View>
          ) : null}
        </View>

        {/* TODAY'S LOGS */}
        <View style={styles.section}>
          <SectionHeader title="Today's Log" showSeeAll />
          <View style={styles.whiteCard}>
            {mode === 'cycle' ? (
              <>
                <LogItem
                  icon={Smile}
                  title="Mood"
                  status="Happy"
                  color="#F1C40F"
                />
                <LogItem
                  icon={Droplet}
                  title="Flow"
                  status="None"
                  color="#3498DB"
                />
                <LogItem
                  icon={PlusSquare}
                  title="Symptoms"
                  status="Mild cramps"
                  color="#2ECC71"
                />
              </>
            ) : (
              <>
                {/* Dynamically show latest pregnancy milestone if available */}
                {pregnancy?.milestones.length ? (
                  <LogItem
                    icon={Baby}
                    title="Latest Milestone"
                    status={
                      pregnancy.milestones[pregnancy.milestones.length - 1]
                        .title
                    }
                    color="#FF8E8E"
                  />
                ) : null}
                <LogItem
                  icon={PlusSquare}
                  title="Symptoms"
                  status="Morning Sickness"
                  color="#FF8E8E"
                />
                <LogItem
                  icon={Smile}
                  title="Mood"
                  status="Calm"
                  color="#F1C40F"
                />
              </>
            )}
          </View>
        </View>

        {/* WELLNESS TRACKER */}
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
            {/* Conditional Exercise: Important for Cycle, careful in late Pregnancy */}
            <WellnessRow
              label="Exercise"
              value={mode === 'cycle' ? '30 min' : '15 min walk'}
              progress={0.5}
              color="#1CB0A8"
              icon={Dumbbell}
            />
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default HomePage;
