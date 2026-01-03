import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  User,
  Settings,
  Baby,
  Droplet,
  Calendar as CalIcon,
  Lock,
  ShieldCheck,
} from 'lucide-react-native';
import AppLayout from '../components/shared/layout'; // Using your layout
import { styles } from '../style';

const { width } = Dimensions.get('window');

type Mode = 'cycle' | 'pregnancy';

export const ProfileScreen = () => {
  const [profile, setProfile] = React.useState({
    name: 'Sarah Jenkins',
    mode: 'cycle' as Mode,
    avgCycleLength: 28,
    avgPeriodLength: 5,
    pregnancyLMP: undefined as Date | undefined,
    syncEnabled: true,
  });

  const update = (key: string, value: any) =>
    setProfile(p => ({ ...p, [key]: value }));

  return (
    <AppLayout title="My Profile" scrollable={true} showHeader={true}>
      {/* --- USER HEADER SECTION --- */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#FF8E8E', '#FF5B99']}
            style={styles.avatarGradient}
          >
            <User color="white" size={40} />
          </LinearGradient>
          <View style={styles.editBadge}>
            <Settings color="white" size={12} />
          </View>
        </View>
        <TextInput
          style={styles.userNameInput}
          value={profile.name}
          onChangeText={v => update('name', v)}
          placeholder="Enter Name"
        />
        <Text style={styles.userEmail}>Premium Member</Text>
      </View>

      {/* --- HEALTH SUMMARY CARD --- */}
      <View style={styles.summaryCard}>
        <View style={styles.statItem}>
          <Text style={styles.statVal}>{profile.avgCycleLength}</Text>
          <Text style={styles.statLabel}>Avg Cycle</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statVal}>{profile.avgPeriodLength}</Text>
          <Text style={styles.statLabel}>Avg Period</Text>
        </View>
        <View style={styles.statItem}>
          <Baby
            color={profile.mode === 'pregnancy' ? '#FF8E8E' : '#CCC'}
            size={20}
          />
          <Text style={styles.statLabel}>Mode</Text>
        </View>
      </View>

      {/* --- TRACKING MODE SWITCH --- */}
      <View style={styles.card}>
        <View style={styles.rowHeader}>
          <View style={[styles.iconBg, { backgroundColor: '#FF8E8E15' }]}>
            <CalIcon color="#FF8E8E" size={18} />
          </View>
          <Text style={styles.sectionTitle}>Tracking Mode</Text>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            onPress={() => update('mode', 'cycle')}
            style={[styles.tBtn, profile.mode === 'cycle' && styles.tBtnActive]}
          >
            <Droplet
              size={16}
              color={profile.mode === 'cycle' ? 'white' : '#666'}
            />
            <Text
              style={[
                styles.tText,
                profile.mode === 'cycle' && styles.tTextActive,
              ]}
            >
              Cycle
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => update('mode', 'pregnancy')}
            style={[
              styles.tBtn,
              profile.mode === 'pregnancy' && styles.tBtnActive,
            ]}
          >
            <Baby
              size={16}
              color={profile.mode === 'pregnancy' ? 'white' : '#666'}
            />
            <Text
              style={[
                styles.tText,
                profile.mode === 'pregnancy' && styles.tTextActive,
              ]}
            >
              Pregnancy
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* --- DYNAMIC SETTINGS SECTION --- */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          {profile.mode === 'cycle'
            ? 'Cycle Configuration'
            : 'Pregnancy Details'}
        </Text>

        {profile.mode === 'cycle' ? (
          <>
            <View style={styles.inputRow}>
              <Text style={styles.rowLabel}>Cycle Length</Text>
              <TextInput
                value={String(profile.avgCycleLength)}
                onChangeText={v => update('avgCycleLength', Number(v) || 28)}
                keyboardType="number-pad"
                style={styles.smallInput}
              />
            </View>
            <View style={styles.inputRow}>
              <Text style={styles.rowLabel}>Period Length</Text>
              <TextInput
                value={String(profile.avgPeriodLength)}
                onChangeText={v => update('avgPeriodLength', Number(v) || 5)}
                keyboardType="number-pad"
                style={styles.smallInput}
              />
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={styles.lmpButton}
            onPress={() => update('pregnancyLMP', new Date())}
          >
            <Text style={styles.lmpLabel}>Last Period (LMP)</Text>
            <Text style={styles.lmpValue}>
              {profile.pregnancyLMP
                ? profile.pregnancyLMP.toDateString()
                : 'Set Date'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* --- PRIVACY & SECURITY --- */}
      <View style={styles.card}>
        <View style={styles.inputRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Lock size={18} color="#4facfe" style={{ marginRight: 10 }} />
            <Text style={styles.rowLabel}>Biometric Lock</Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: '#DDD', true: '#4facfe' }}
          />
        </View>
      </View>

      {/* --- PRIVACY FOOTER --- */}
      <View style={styles.footerInfo}>
        <ShieldCheck color="#1CB0A8" size={20} />
        <Text style={styles.footerText}>
          Your data is encrypted and stored locally.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </AppLayout>
  );
};
