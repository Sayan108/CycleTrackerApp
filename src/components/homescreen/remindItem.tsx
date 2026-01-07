import { useState } from 'react';
import { Switch, Text, View } from 'react-native';
import { styles } from '../../style';

export const ReminderRow = ({ icon: Icon, title, sub, color }: any) => {
  const [isEnabled, setIsEnabled] = useState(true);
  return (
    <View style={styles.whiteCardRow}>
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <Icon color={color} size={20} />
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.cardMainText}>{title}</Text>
        <Text style={styles.cardSubText}>{sub}</Text>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={setIsEnabled}
        trackColor={{ false: '#DDD', true: '#FF8E8E' }}
        thumbColor="white"
      />
    </View>
  );
};
