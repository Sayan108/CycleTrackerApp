import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../style';

export const QuickAction = ({ icon: Icon, label, color }: any) => (
  <View style={styles.qaItem}>
    <TouchableOpacity style={[styles.qaIconBox, { backgroundColor: color }]}>
      <Icon color="white" size={24} />
    </TouchableOpacity>
    <Text style={styles.qaLabel}>{label}</Text>
  </View>
);
