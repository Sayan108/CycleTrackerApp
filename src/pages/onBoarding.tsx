import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../style';
import {Baby, Cloud, Droplet} from 'lucide-react-native';
import {
  View,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';

export const OnboardingScreen = ({navigation}: any) => {
  const [step, setStep] = useState<number>(1);
  const [mode, setMode] = useState<'cycle' | 'pregnancy'>('cycle');
  const [cycle, setCycle] = useState('28');
  const [syncEnabled, setSyncEnabled] = useState(false);

  const {width} = Dimensions.get('window');

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      if (syncEnabled) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('MainTabs', {firstTime: true});
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{padding: 30, flex: 1}}>
        {/* Progress */}
        <View style={styles.stepIndicator}>
          <Progress.Bar
            progress={step / 3}
            width={width - 60}
            color="#FF7E67"
            unfilledColor="#EEE"
            borderWidth={0}
            height={6}
            borderRadius={10}
          />
        </View>

        {/* STEP 1 */}
        {step === 1 && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.onboardTitle}>Choose your mode</Text>
            <Text style={styles.onboardSub}>
              Select how you want to use Cycle Tracker.
            </Text>

            <TouchableOpacity
              style={[
                styles.modeCard,
                mode === 'cycle' && styles.modeCardActive,
              ]}
              onPress={() => setMode('cycle')}
              activeOpacity={0.8}>
              <Droplet
                color={mode === 'cycle' ? '#FFF' : '#FF8E8E'}
                size={32}
              />
              <Text
                style={[
                  styles.modeCardText,
                  mode === 'cycle' && {color: '#FFF'},
                ]}>
                Track My Cycle
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modeCard,
                mode === 'pregnancy' && styles.modeCardActive,
              ]}
              onPress={() => setMode('pregnancy')}
              activeOpacity={0.8}>
              <Baby
                color={mode === 'pregnancy' ? '#FFF' : '#FF8E8E'}
                size={32}
              />
              <Text
                style={[
                  styles.modeCardText,
                  mode === 'pregnancy' && {color: '#FFF'},
                ]}>
                Pregnancy Mode
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.onboardTitle}>Cycle Details</Text>
            <Text style={styles.onboardSub}>
              Average cycle length (usually 21–35 days).
            </Text>

            <View style={styles.onboardInputContainer}>
              <TextInput
                style={styles.onboardValueInput}
                value={cycle}
                onChangeText={setCycle}
                keyboardType="numeric"
                maxLength={2}
                autoFocus
              />
              <Text style={styles.onboardUnit}>Days</Text>
            </View>
          </View>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Cloud
              color="#FF8E8E"
              size={48}
              style={{alignSelf: 'center', marginBottom: 16}}
            />

            <Text style={[styles.onboardTitle, {textAlign: 'center'}]}>
              Sync Your Data?
            </Text>

            <Text style={[styles.onboardSub, {textAlign: 'center'}]}>
              Enable cloud sync to back up your data and access it from any
              device.
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

        {/* CTA */}
        <TouchableOpacity
          style={styles.authBtn}
          onPress={handleNext}
          activeOpacity={0.85}>
          <Text style={styles.authBtnText}>
            {step === 3 ? 'Complete' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
