import { Text, View } from 'react-native';
import { styles } from '../../style';

export const PredictionCard = ({
  icon: Icon,
  title,
  sub,
  date,
  days,
  color,
}: any) => (
  <View style={styles.whiteCardRow}>
    <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
      <Icon color={color} size={20} />
    </View>
    <View style={{ flex: 1, marginLeft: 12 }}>
      <Text style={styles.cardMainText}>{title}</Text>
      <Text style={styles.cardSubText}>{sub}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={styles.cardDate}>{date}</Text>
      <Text style={[styles.cardDays, days === 'Today' && { color: '#1CB0A8' }]}>
        {days}
      </Text>
    </View>
  </View>
);
