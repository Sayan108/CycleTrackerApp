import { styles } from '../../style';
import { Text, View } from 'react-native';

export const SectionHeader = ({
  title,
  showSeeAll,
}: {
  title: string;
  showSeeAll?: boolean;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {showSeeAll && <Text style={styles.seeAllText}>See All</Text>}
  </View>
);
