import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../style';
import { ChevronRight } from 'lucide-react-native';

export const LogItem = ({ icon: Icon, title, status, color }: any) => (
  <TouchableOpacity style={styles.logItem}>
    <View style={[styles.logIconBg, { backgroundColor: color + '20' }]}>
      <Icon color={color} size={20} />
    </View>
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.logTitle}>{title}</Text>
      <Text style={styles.logStatus}>{status}</Text>
    </View>
    <ChevronRight color="#CCC" size={18} />
  </TouchableOpacity>
);
