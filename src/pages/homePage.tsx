import React, {useState, useMemo} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  CalendarIcon,
  Droplet,
  Dumbbell,
  PlusSquare,
  Smile,
  Zap,
  Baby,
  ChevronRight,
  Plus,
  Minus,
  Info,
  Activity,
  Heart,
} from 'lucide-react-native';

import AppLayout from '../components/shared/layout';
import {SectionHeader} from '../components/shared/sectionHeader';
import FirstStat from '../components/homescreen/firstStat';
import {useReproductiveTracker} from '../hooks/useReProductiveEngine/useReproductiveTracker';
import {RootState} from '../redux';
import {addLastPeriosdDate, AppMode} from '../redux/common.slice';
import {saveStatus, updateMetric} from '../redux/log.slice';
import {pregnancyMilestones} from '../hooks/useReProductiveEngine/types';

const {width} = Dimensions.get('window');
const COLORS = {
  bg: '#F9F9FB',
  card: '#FFF',
  primary: '#FF8E8E',
  secondary: '#9D71FD',
  teal: '#1CB0A8',
  text: '#1C1C1E',
  sub: '#6B6B6B',
  border: '#EFEFF4',
};

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const {mode, cycle, pregnancy, today} = useReproductiveTracker();

  const history = useSelector((state: RootState) => state.logs.history);
  const todayKey = (today || new Date(), 'yyyy-MM-dd');

  const log = history[todayKey] || {
    mood: 'Not Logged',
    flow: 'None',
    pregSymptoms: [],
    water: 0,
    exercise: 0,
    kicks: 0,
  };

  const isPregnancy = mode === AppMode.PREGNANCY;
  const themeColor = isPregnancy ? COLORS.secondary : COLORS.primary;

  // --- PREGNANCY DATA LOGIC ---
  const currentMilestone = useMemo(() => {
    if (!isPregnancy || !pregnancy) return null;
    return [...pregnancyMilestones]
      .reverse()
      .find(m => m.week <= pregnancy.weeks);
  }, [isPregnancy, pregnancy]);

  // --- CYCLE PHASE LOGIC ---
  const cyclePhase = useMemo(() => {
    if (!cycle || isPregnancy) return null;
    const daysUntilNext = parseInt(
      cycle.daysUntilNextPeriod.replace(/[^0-9]/g, ''),
      10,
    );
    if (daysUntilNext > 21)
      return {name: 'Menstrual', desc: 'Body is shedding uterine lining.'};
    if (daysUntilNext > 15)
      return {name: 'Follicular', desc: 'Estrogen is rising.'};
    if (cycle.isOvulationToday)
      return {name: 'Ovulation', desc: 'Peak fertility window.'};
    return {name: 'Luteal', desc: 'Progesterone is rising.'};
  }, [cycle, isPregnancy]);

  const WellnessBox = ({label, val, target, color, icon: Icon, field}: any) => (
    <View style={styles.wellnessRow}>
      <View style={styles.wellnessTop}>
        <View style={styles.wellnessInfo}>
          <View style={[styles.iconCircle, {backgroundColor: color + '15'}]}>
            <Icon size={18} color={color} />
          </View>
          <View>
            <Text style={styles.wellnessLabel}>{label}</Text>
            <Text style={styles.wellnessVal}>
              {val} / {target}
            </Text>
          </View>
        </View>
        <View style={styles.counter}>
          <TouchableOpacity
            onPress={() =>
              dispatch(updateMetric({date: todayKey, field, value: -1}))
            }
            style={styles.countBtn}>
            <Minus size={14} color={COLORS.sub} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              dispatch(updateMetric({date: todayKey, field, value: 1}))
            }
            style={[styles.countBtn, {backgroundColor: color + '15'}]}>
            <Plus size={14} color={color} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min((val / target) * 100, 100)}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <AppLayout title="Home">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 40}}>
        <FirstStat mode={mode as AppMode} cycle={cycle} pregnancy={pregnancy} />

        {/* 1. TOP ACTION / INSIGHT CARD */}
        <View style={styles.section}>
          {isPregnancy ? (
            <View
              style={[
                styles.insightCard,
                {
                  borderLeftColor: COLORS.secondary,
                  backgroundColor: COLORS.secondary + '10',
                },
              ]}>
              <View style={styles.insightHeader}>
                <Baby size={18} color={COLORS.secondary} />
                <Text style={[styles.insightTitle, {color: COLORS.secondary}]}>
                  Week {pregnancy?.weeks} Journey
                </Text>
              </View>
              <Text style={styles.insightText}>
                Baby is the size of a{' '}
                <Text style={{fontWeight: '700'}}>
                  {currentMilestone?.fetalSize || 'Tiny Seed'}
                </Text>
                . {currentMilestone?.description}
              </Text>
              {/* Visual Trimester Tracker */}
              <View style={styles.triTrack}>
                <View
                  style={[
                    styles.triSegment,
                    // pregnancy?.trimester >= 1 && {
                    //   backgroundColor: COLORS.secondary,
                    // },
                  ]}
                />
                <View
                  style={[
                    styles.triSegment,
                    // pregnancy?.trimester >= 2 && {
                    //   backgroundColor: COLORS.secondary,
                    // },
                  ]}
                />
                <View
                  style={[
                    styles.triSegment,
                    // pregnancy?.trimester >= 3 && {
                    //   backgroundColor: COLORS.secondary,
                    // },
                  ]}
                />
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.periodStartCard}
              onPress={() =>
                Alert.alert('Period Started', 'Log start date?', [
                  {text: 'No'},
                  {
                    text: 'Yes',
                    onPress: () => dispatch(addLastPeriosdDate(todayKey)),
                  },
                ])
              }>
              <View style={styles.periodStartInner}>
                <Droplet size={20} color="#FFF" fill="#FFF" />
                <Text style={styles.periodStartText}>
                  My period started today
                </Text>
              </View>
              <ChevronRight size={20} color="#FFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* 2. TODAY'S SUMMARY */}
        <View style={styles.section}>
          <SectionHeader title="Current Status" />
          <TouchableOpacity
            style={styles.whiteCard}
            onPress={() => setModalVisible(true)}>
            <View style={styles.logItem}>
              <Smile size={20} color="#F1C40F" />
              <Text style={styles.logText}>
                Mood: <Text style={{fontWeight: '700'}}>{log.mood}</Text>
              </Text>
              <ChevronRight size={16} color={COLORS.border} />
            </View>
            <View style={styles.divider} />
            <View style={styles.logItem}>
              {isPregnancy ? (
                <PlusSquare size={20} color={COLORS.secondary} />
              ) : (
                <Droplet size={20} color="#3498DB" />
              )}
              <Text style={styles.logText}>
                {isPregnancy
                  ? `Symptoms: ${log.pregSymptoms?.join(', ') || 'None'}`
                  : `Flow: ${log.flow}`}
              </Text>
              <ChevronRight size={16} color={COLORS.border} />
            </View>
          </TouchableOpacity>
        </View>

        {/* 3. DAILY GOALS */}
        <View style={styles.section}>
          <SectionHeader title="Daily Progress" />
          <View style={styles.whiteCard}>
            <WellnessBox
              label="Hydration"
              val={log.water}
              target={isPregnancy ? 10 : 8}
              color="#4A90E2"
              icon={Droplet}
              field="water"
            />
            <View style={styles.divider} />
            {isPregnancy ? (
              <WellnessBox
                label="Fetal Kicks"
                val={log.kicks}
                target={10}
                color={COLORS.secondary}
                icon={Baby}
                field="kicks"
              />
            ) : (
              <WellnessBox
                label="Exercise"
                val={log.exercise}
                target={30}
                color={COLORS.teal}
                icon={Dumbbell}
                field="exercise"
              />
            )}
          </View>
        </View>

        {/* 4. PREGNANCY MEDICAL NOTES (Exclusive Data) */}
        {isPregnancy && currentMilestone?.medicalNote && (
          <View style={styles.section}>
            <View style={styles.medicalCard}>
              <View style={styles.medicalHeader}>
                <Info size={16} color={COLORS.secondary} />
                <Text style={styles.medicalTitle}>
                  Medical Note for Week {pregnancy?.weeks}
                </Text>
              </View>
              <Text style={styles.medicalBody}>
                {currentMilestone.medicalNote}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Log Today's Body</Text>

            <Text style={styles.label}>Mood</Text>
            <View style={styles.chipRow}>
              {['Happy', 'Calm', 'Tired', 'Moody'].map(m => (
                <TouchableOpacity
                  key={m}
                  onPress={() =>
                    dispatch(saveStatus({date: todayKey, data: {mood: m}}))
                  }
                  style={[
                    styles.chip,
                    log.mood === m
                      ? {backgroundColor: themeColor}
                      : styles.unselectedChip,
                  ]}>
                  <Text
                    style={[
                      styles.chipText,
                      log.mood === m && {color: '#FFF'},
                    ]}>
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>
              {isPregnancy ? 'Symptoms' : 'Flow'}
            </Text>
            <View style={styles.chipRow}>
              {(isPregnancy
                ? ['Nausea', 'Heartburn', 'Back Pain', 'Cravings']
                : ['None', 'Light', 'Medium', 'Heavy']
              ).map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() =>
                    dispatch(
                      saveStatus({
                        date: todayKey,
                        data: isPregnancy
                          ? {pregSymptoms: [item]}
                          : {flow: item},
                      }),
                    )
                  }
                  style={[
                    styles.chip,
                    log.flow === item || log.pregSymptoms?.includes(item)
                      ? {backgroundColor: themeColor}
                      : styles.unselectedChip,
                  ]}>
                  <Text
                    style={[
                      styles.chipText,
                      (log.flow === item ||
                        log.pregSymptoms?.includes(item)) && {color: '#FFF'},
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.closeBtn, {backgroundColor: themeColor}]}
              onPress={() => setModalVisible(false)}>
              <Text style={{color: '#FFF', fontWeight: '700'}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  section: {paddingHorizontal: 20, marginTop: 24},
  whiteCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 4,
    elevation: 2,
  },
  divider: {height: 1, backgroundColor: COLORS.border, marginHorizontal: 16},

  // Pregnancy Themed Items
  insightCard: {padding: 20, borderRadius: 24, borderLeftWidth: 5},
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  insightTitle: {fontWeight: '800', fontSize: 16},
  insightText: {fontSize: 14, color: COLORS.text, lineHeight: 20},
  triTrack: {flexDirection: 'row', gap: 8, marginTop: 15},
  triSegment: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },

  medicalCard: {
    backgroundColor: '#F0F0F7',
    padding: 20,
    borderRadius: 24,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  medicalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  medicalTitle: {fontSize: 14, fontWeight: '700', color: COLORS.secondary},
  medicalBody: {fontSize: 13, color: COLORS.sub, lineHeight: 18},

  // Shared Items
  periodStartCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodStartInner: {flexDirection: 'row', alignItems: 'center', gap: 12},
  periodStartText: {color: '#FFF', fontWeight: '700', fontSize: 15},
  wellnessRow: {padding: 16},
  wellnessTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wellnessInfo: {flexDirection: 'row', alignItems: 'center', gap: 12},
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wellnessLabel: {fontSize: 14, fontWeight: '600'},
  wellnessVal: {fontSize: 12, color: COLORS.sub},
  counter: {flexDirection: 'row', gap: 10},
  countBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBg: {
    height: 8,
    backgroundColor: COLORS.bg,
    borderRadius: 4,
    marginTop: 12,
  },
  progressFill: {height: '100%', borderRadius: 4},
  logItem: {flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12},
  logText: {flex: 1, fontSize: 14, color: COLORS.text},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  modalHeader: {fontSize: 20, fontWeight: '800', marginBottom: 20},
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.sub,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 15,
  },
  chipRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
  chip: {paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20},
  unselectedChip: {
    backgroundColor: '#F5F5F7',
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  chipText: {fontSize: 14, color: '#444', fontWeight: '500'},
  closeBtn: {
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 30,
  },
});

export default HomePage;
