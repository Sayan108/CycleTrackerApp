import { Text, View } from 'react-native';
import { styles } from '../../style';

export const LegendItem = ({ color, label, isOutline }: any) => (
  <View style={styles.legendItem}>
    <View
      style={[
        styles.legendDot,
        {
          backgroundColor: isOutline ? 'transparent' : color,
          borderColor: color,
          borderWidth: isOutline ? 2 : 0,
        },
      ]}
    />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);
