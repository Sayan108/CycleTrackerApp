import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  User,
  Settings,
  Baby,
  Droplet,
  Lock,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react-native';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppLayout from '../components/shared/layout';
import {RootState} from '../redux';
import {AppMode, updateSettings as updateConfig} from '../redux/common.slice';

const {width} = Dimensions.get('window');

const COLORS = {
  bg: '#F9F9FB',
  card: '#FFFFFF',
  primary: '#FF8E8E',
  secondary: '#9D71FD',
  teal: '#1CB0A8',
  text: '#1C1C1E',
  sub: '#6B6B6B',
  border: '#EFEFF4',
};

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const reproductive = useSelector((state: RootState) => state.reproductive);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isPregnancy = reproductive.mode === AppMode.PREGNANCY;
  const themeColor = isPregnancy ? COLORS.secondary : COLORS.primary;

  const updateVal = (key: string, val: any) => {
    dispatch(updateConfig({[key]: val}));
  };

  return (
    <AppLayout title="My Profile" scrollable={true} showHeader={true}>
      {/* --- USER HEADER --- */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={[themeColor, isPregnancy ? '#7B4DFF' : '#FF5B99']}
            style={styles.avatarGradient}>
            <User color="white" size={40} />
          </LinearGradient>
          <TouchableOpacity style={styles.editBadge}>
            <Settings color="white" size={12} />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Sarah Jenkins</Text>
        <Text style={styles.userEmail}>Premium Member</Text>
      </View>

      {/* --- HEALTH SUMMARY CARD --- */}
      <View style={styles.summaryCard}>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>{reproductive.avgCycleLength}</Text>
          <Text style={styles.statLabel}>Avg Cycle</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statVal}>{reproductive.avgPeriodLength}</Text>
          <Text style={styles.statLabel}>Avg Period</Text>
        </View>
        <View style={styles.statItem}>
          {isPregnancy ? (
            <Baby color={COLORS.secondary} size={22} />
          ) : (
            <Droplet color={COLORS.primary} size={22} />
          )}
          <Text style={styles.statLabel}>Active Mode</Text>
        </View>
      </View>

      {/* --- DYNAMIC SETTINGS --- */}
      <View style={styles.card}>
        <Text style={styles.labelCaps}>
          {isPregnancy ? 'PREGNANCY DETAILS' : 'CYCLE CONFIGURATION'}
        </Text>

        {!isPregnancy ? (
          <>
            <View style={styles.inputRow}>
              <Text style={styles.rowLabel}>Cycle Length (Days)</Text>
              <TextInput
                value={String(reproductive.avgCycleLength)}
                onChangeText={v => updateVal('avgCycleLength', Number(v) || 0)}
                keyboardType="number-pad"
                style={styles.smallInput}
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.rowLabel}>Period Length (Days)</Text>
              <TextInput
                value={String(reproductive.avgPeriodLength)}
                onChangeText={v => updateVal('avgPeriodLength', Number(v) || 0)}
                keyboardType="number-pad"
                style={styles.smallInput}
              />
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={styles.lmpButton}
            onPress={() => setShowDatePicker(true)}>
            <View>
              <Text style={styles.rowLabel}>Last Period Start (LMP)</Text>
              <Text style={styles.lmpValue}>
                {reproductive.pregnancyLMP
                  ? new Date(reproductive.pregnancyLMP).toDateString()
                  : 'Tap to set date'}
              </Text>
            </View>
            <ChevronRight size={20} color={COLORS.sub} />
          </TouchableOpacity>
        )}
      </View>

      {/* --- GENERAL SETTINGS --- */}
      <View style={styles.card}>
        <Text style={styles.labelCaps}>APP SETTINGS</Text>
        <View style={styles.inputRow}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={[styles.iconBg, {backgroundColor: '#4facfe15'}]}>
              <Lock size={18} color="#4facfe" />
            </View>
            <Text style={[styles.rowLabel, {marginLeft: 12}]}>
              Passcode Lock
            </Text>
          </View>
          <Switch value={false} trackColor={{false: '#DDD', true: '#4facfe'}} />
        </View>
      </View>

      {/* --- FOOTER --- */}
      <View style={styles.footerInfo}>
        <ShieldCheck color={COLORS.teal} size={20} />
        <Text style={styles.footerText}>
          Your health data is encrypted and stored locally on your device.
        </Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={
            reproductive.pregnancyLMP
              ? new Date(reproductive.pregnancyLMP)
              : new Date()
          }
          mode="date"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) updateVal('pregnancyLMP', date.toISOString());
          }}
        />
      )}

      <View style={{height: 40}} />
    </AppLayout>
  );
};

/* ================== STYLES ================== */
const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatarGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.text,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: -0.5,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.sub,
    marginTop: 4,
    fontWeight: '600',
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 24,
    paddingVertical: 20,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.sub,
    fontWeight: '700',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelCaps: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.sub,
    letterSpacing: 1,
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  smallInput: {
    backgroundColor: '#F5F5F7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    fontWeight: '800',
    color: COLORS.text,
    minWidth: 65,
    textAlign: 'center',
  },
  lmpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lmpValue: {
    fontSize: 14,
    color: COLORS.sub,
    fontWeight: '600',
    marginTop: 4,
  },
  footerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.sub,
    textAlign: 'center',
    marginLeft: 8,
    fontWeight: '600',
  },
});

export default ProfileScreen;
