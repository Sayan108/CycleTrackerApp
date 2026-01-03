import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../style';
import { useNavigation } from '@react-navigation/native';
const HEALTH_ARTICLES = Array.from({ length: 57 }).map((_, i) => ({
  id: i.toString(),
  title: `Article ${i + 1}: ${
    [
      'Balancing Hormones',
      'Cycle Nutrition',
      'Optimizing Sleep',
      'Stress & Periods',
    ][i % 4]
  }`,
  tag: i % 3 === 0 ? 'WELLNESS' : 'FERTILITY',
  snippet:
    'Explore the deep connection between your lifestyle choices and your monthly cycle...',
  readTime: `${Math.floor(Math.random() * 10) + 3} min read`,
}));
export const LibraryListing = () => {
  const navigation = useNavigation<any>();
  return (
    <View>
      <FlatList
        data={HEALTH_ARTICLES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ArticleDetails', { item });
            }}
          >
            <View
              style={[
                styles.articleCard,
                { marginHorizontal: 20, marginBottom: 20 },
              ]}
            >
              <View style={styles.articleImg} />
              <View style={{ padding: 15 }}>
                <Text style={styles.articleTag}>{item.tag}</Text>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleSnippet}>{item.snippet}</Text>
                <View style={styles.articleFooter}>
                  <Text style={styles.readTime}>{item.readTime}</Text>
                  <Text style={styles.readMore}>Read More</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
