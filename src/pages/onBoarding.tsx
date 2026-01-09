import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  Dimensions,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Progress from 'react-native-progress';

import {Baby, Calendar, Cloud, Droplet} from 'lucide-react-native';

import {styles} from '../style';
import {RootState} from '../redux';
import {
  AppMode,
  completeOnboarding,
  resetData,
  setCycleSettings,
  setMode,
  setPregnancyLMP,
  toggleSync,
  addLastPeriosdDate,
} from '../redux/common.slice';
import DateInput from '../components/shared/datePicker';
// import DatePicker from 'react-native-date-picker';

/* ---------------- Utils ---------------- */

const toStartOfDayISO = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
};

/* ---------------- Screen ---------------- */

export const OnboardingScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  /* ---------- Redux ---------- */
  const reduxMode = useSelector((state: RootState) => state.reproductive.mode);

  const lastPeriodDate = useSelector(
    (state: RootState) => state.reproductive.lastPeriodDate,
  );
  const pregnancyLMP = useSelector(
    (state: RootState) => state.reproductive.pregnancyLMP,
  );

  /* ---------- Local State ---------- */
  const [step, setStep] = useState(1);
  const [mode, setLocalMode] = useState<AppMode>(reduxMode);

  const [cycleLength, setCycleLength] = useState('28');
  const [cycleLPD, setCycleLPD] = useState<Date | null>(null);

  const [syncEnabled, setSyncEnabled] = useState(false);

  const {width} = Dimensions.get('window');

  /* ---------- Handlers ---------- */

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
      return;
    }

    /* ---------- Persist to Redux ---------- */
    dispatch(setMode(mode));

    if (mode === AppMode.CYCLE) {
      dispatch(
        setCycleSettings({
          avgCycleLength: Number(cycleLength),
        }),
      );
    }

    if (mode === AppMode.PREGNANCY) {
      dispatch(setPregnancyLMP(pregnancyLMP));
    }

    dispatch(toggleSync(syncEnabled));
    dispatch(completeOnboarding());

    /* ---------- Navigation ---------- */
    if (syncEnabled) {
      navigation.replace('Login');
    } else {
      navigation.replace('MainTabs', {firstTime: true});
    }
  };

  /* ---------------- Render ---------------- */

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 30, flex: 1}}>
        {/* Progress */}
        <Progress.Bar
          progress={step / 3}
          width={width - 60}
          color="#FF7E67"
          unfilledColor="#EEE"
          borderWidth={0}
          height={6}
          borderRadius={10}
        />

        {/* ---------- STEP 1 : MODE ---------- */}
        {step === 1 && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.onboardTitle}>Choose your mode</Text>
            <Text style={styles.onboardSub}>
              Select how you want to use Cycle Tracker.
            </Text>

            <TouchableOpacity
              style={[
                styles.modeCard,
                mode === AppMode.CYCLE && styles.modeCardActive,
              ]}
              onPress={() => setLocalMode(AppMode.CYCLE)}>
              <Droplet
                size={32}
                color={mode === AppMode.CYCLE ? '#FFF' : '#FF8E8E'}
              />
              <Text
                style={[
                  styles.modeCardText,
                  mode === AppMode.CYCLE && {color: '#FFF'},
                ]}>
                Track My Cycle
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeCard,
                mode === AppMode.PREGNANCY && styles.modeCardActive,
              ]}
              onPress={() => setLocalMode(AppMode.PREGNANCY)}>
              <Baby
                size={32}
                color={mode === AppMode.PREGNANCY ? '#FFF' : '#FF8E8E'}
              />
              <Text
                style={[
                  styles.modeCardText,
                  mode === AppMode.PREGNANCY && {color: '#FFF'},
                ]}>
                Pregnancy Mode
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ---------- STEP 2 : CYCLE ---------- */}
        {step === 2 && mode === AppMode.CYCLE && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Calendar size={48} color="#FF8E8E" style={{alignSelf: 'center'}} />

            <Text style={styles.onboardTitle}>Cycle Details</Text>
            <Text style={styles.onboardSub}>
              Select last period date & cycle length.
            </Text>

            <DateInput
              value={lastPeriodDate}
              onChange={date => dispatch(addLastPeriosdDate(date))}
            />

            <View style={[styles.onboardInputContainer, {marginTop: 16}]}>
              <TextInput
                style={styles.onboardValueInput}
                value={cycleLength}
                onChangeText={setCycleLength}
                keyboardType="numeric"
                maxLength={2}
              />
              <Text style={styles.onboardUnit}>Days</Text>
            </View>
          </View>
        )}

        {/* ---------- STEP 2 : PREGNANCY ---------- */}
        {step === 2 && mode === AppMode.PREGNANCY && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Calendar size={48} color="#FF8E8E" style={{alignSelf: 'center'}} />

            <Text style={styles.onboardTitle}>Last Period Date</Text>
            <Text style={styles.onboardSub}>
              First day of your last menstrual period.
            </Text>

            <DateInput
              value={pregnancyLMP}
              onChange={date => dispatch(setPregnancyLMP(date))}
            />
          </View>
        )}

        {/* ---------- STEP 3 : SYNC ---------- */}
        {step === 3 && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Cloud size={48} color="#FF8E8E" style={{alignSelf: 'center'}} />

            <Text style={[styles.onboardTitle, {textAlign: 'center'}]}>
              Sync Your Data?
            </Text>

            <Text style={[styles.onboardSub, {textAlign: 'center'}]}>
              Secure cloud backup across devices.
            </Text>

            <View style={styles.syncToggleRow}>
              <Text style={styles.syncLabel}>Enable Cloud Backup</Text>
              <Switch
                value={syncEnabled}
                onValueChange={setSyncEnabled}
                trackColor={{false: '#DDD', true: '#FF8E8E'}}
                thumbColor="#FFF"
              />
            </View>
          </View>
        )}

        {/* ---------- CTA ---------- */}
        <TouchableOpacity style={styles.authBtn} onPress={handleNext}>
          <Text style={styles.authBtnText}>
            {step === 3 ? 'Complete' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
