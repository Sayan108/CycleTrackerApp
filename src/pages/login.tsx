import { TouchableOpacity, Text, View, TextInput } from 'react-native';
import { styles } from '../style';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';

export const LoginScreen = ({ navigation }: any) => (
  <View style={styles.authContainer}>
    <LinearGradient
      colors={['#FF8E8E', '#FF5B99']}
      style={styles.gradientCard}
    />
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Heart color="white" size={80} style={{ marginBottom: 40 }} />
      <View style={styles.loginCard}>
        <Text style={styles.authTitle}>Welcome Back</Text>

        {/* Google Auth Option */}
        <TouchableOpacity
          style={styles.googleBtn}
          onPress={() => navigation.navigate('MainTabs')}
        >
          {/* <GoogleIcon color="#444" size={20} /> */}
          <Text style={styles.googleBtnText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.orDivider}>
          <View style={styles.dividerLine} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TextInput
          placeholder="Email Address"
          style={styles.authInput}
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.authInput}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.authBtn}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text style={styles.authBtnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </View>
);
