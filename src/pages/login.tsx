import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {Heart} from 'lucide-react-native';
import {styles} from '../style';

export const LoginScreen = ({navigation}: any) => {
  return (
    <LinearGradient colors={['#FF8E8E', '#FF5B99']} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            {/* Top Branding */}
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Heart color="white" size={72} />
              <Text style={styles.loginHeroTitle}>Cycle Tracker</Text>
              <Text style={styles.loginHeroSub}>
                Your personal health companion
              </Text>
            </View>

            {/* Login Card */}
            <View style={styles.loginCardResponsive}>
              <Text style={styles.authTitle}>Welcome back</Text>

              {/* Google */}
              <TouchableOpacity
                style={styles.googleBtn}
                activeOpacity={0.85}
                onPress={() => navigation.replace('MainTabs')}>
                <Text style={styles.googleBtnText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.orDivider}>
                <View style={styles.dividerLine} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Inputs */}
              <TextInput
                placeholder="Email address"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
                style={styles.authInput}
              />

              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="#999"
                style={styles.authInput}
              />

              {/* CTA */}
              <TouchableOpacity
                style={styles.authBtn}
                activeOpacity={0.9}
                onPress={() => navigation.replace('MainTabs')}>
                <Text style={styles.authBtnText}>Sign in</Text>
              </TouchableOpacity>

              {/* Footer */}
              <TouchableOpacity style={{marginTop: 14}}>
                <Text style={styles.hintText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};
