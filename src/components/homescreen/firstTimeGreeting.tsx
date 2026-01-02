import { PlusSquare } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../style';

const FirstTimeGreeting = () => (
  <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.welcomeBanner}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <Text style={styles.welcomeTitle}>Welcome aboard!</Text>
        <Text style={styles.welcomeSub}>
          Let's log your first symptoms to give you accurate predictions.
        </Text>
      </View>
      <PlusSquare color="white" size={40} />
    </View>
    <TouchableOpacity style={styles.welcomeBtn}>
      <Text style={styles.welcomeBtnText}>Start Logging</Text>
    </TouchableOpacity>
  </LinearGradient>
);
