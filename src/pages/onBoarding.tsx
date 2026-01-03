import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Baby, Cloud, Droplet } from 'lucide-react-native';
import {
  View,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { useAppDispatch } from '../redux';
import { AppMode, reproductiveSlice } from '../redux/common.slice';
import { styles } from '../style';

export const OnboardingScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(1);

  /* ---------- SHARED ---------- */
  const [mode, setMode] = useState<AppMode>(AppMode.CYCLE);

  /* ---------- CYCLE MODE STATE ---------- */
  const [cycleLength, setCycleLength] = useState('28');
  const [periodLength, setPeriodLength] = useState('5');
  const [goal, setGoal] = useState<'avoid' | 'conceive'>('avoid');
  const [regularCycle, setRegularCycle] = useState(true);

  /* ---------- PREGNANCY MODE STATE ---------- */
  const [pregnancyStartType, setPregnancyStartType] = useState<
    'lmp' | 'duedate'
  >('lmp');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());

  const dispatch = useAppDispatch();

  const handleNext = () => {
    if (step < 4) {
      setStep(s => s + 1);
    } else {
      // Consolidate data based on mode
      const onboardingData = {
        mode,
        isFirstLaunch: false,
        ...(mode === AppMode.CYCLE
          ? {
              cycleLength: Number(cycleLength),
              periodLength: Number(periodLength),
              goal,
              regularCycle,
            }
          : { lmpDate: selectedDate }), // Hook handles trimester calculation from here
      };

      dispatch(reproductiveSlice.actions.updateSettings(onboardingData));
      navigation.navigate('MainTabs');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ padding: 30, flex: 1 }}>
        {/* PROGRESS BAR */}
        <Progress.Bar progress={step / 4} width={null} color="#FF7E67" />

        {/* STEP 1: MODE SELECTION (Shared) */}
        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.onboardTitle}>Choose your path</Text>
            {/* Mode Selection buttons as you had them... */}
          </View>
        )}

        {/* STEP 2: MODE-SPECIFIC QUESTIONS */}
        {step === 2 && (
          <View style={styles.stepContainer}>
            {mode === AppMode.CYCLE ? (
              <>
                <Text style={styles.onboardTitle}>Cycle Basics</Text>
                <View style={styles.onboardInputContainer}>
                  <TextInput
                    value={cycleLength}
                    onChangeText={setCycleLength}
                    keyboardType="numeric"
                    style={styles.onboardValueInput}
                  />
                  <Text style={styles.onboardUnit}>Cycle Days</Text>
                </View>
                <View style={styles.onboardInputContainer}>
                  <TextInput
                    value={periodLength}
                    onChangeText={setPeriodLength}
                    keyboardType="numeric"
                    style={styles.onboardValueInput}
                  />
                  <Text style={styles.onboardUnit}>Period Days</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.onboardTitle}>Pregnancy Start</Text>
                <Text style={styles.onboardSub}>
                  When was the first day of your last period?
                </Text>
                {/* Date Picker Component would go here */}
                <TouchableOpacity style={styles.datePickerPlaceholder}>
                  <Text>{new Date(selectedDate).toDateString()}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {/* STEP 3: MODE-SPECIFIC PREFERENCES */}
        {step === 3 && (
          <View style={styles.stepContainer}>
            {mode === AppMode.CYCLE ? (
              <>
                <Text style={styles.onboardTitle}>Cycle Goals</Text>
                <View style={styles.syncToggleRow}>
                  <Text style={styles.syncLabel}>Trying to conceive?</Text>
                  <Switch
                    value={goal === 'conceive'}
                    onValueChange={v => setGoal(v ? 'conceive' : 'avoid')}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.onboardTitle}>First Pregnancy?</Text>
                <Text style={styles.onboardSub}>
                  We'll tailor your daily tips based on your experience.
                </Text>
                {/* Toggle for first-time pregnancy */}
              </>
            )}
          </View>
        )}

        {/* STEP 4: SYNC / FINISH (Shared) */}
        {step === 4 && <View>{/* Cloud Backup UI */}</View>}

        <TouchableOpacity style={styles.authBtn} onPress={handleNext}>
          <Text style={styles.authBtnText}>
            {step === 4 ? "Let's Start" : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
