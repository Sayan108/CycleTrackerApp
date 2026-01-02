import { Text, View } from 'react-native';
import { styles } from '../../style';
import * as Progress from 'react-native-progress';

export const WellnessRow = ({
  label,
  value,
  progress,
  color,
  icon: Icon,
}: any) => (
  <View style={styles.wellnessMargin}>
    <View style={styles.wellnessTextRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={16} color={color} style={{ marginRight: 6 }} />
        <Text style={styles.wellnessLabel}>{label}</Text>
      </View>
      <Text style={styles.wellnessVal}>{value}</Text>
    </View>
    <Progress.Bar
      progress={progress}
      width={null}
      color={color}
      unfilledColor="#F0F0F0"
      borderWidth={0}
      height={6}
    />
  </View>
);
