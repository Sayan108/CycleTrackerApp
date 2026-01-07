import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import {
  ChevronLeft,
  Bookmark,
  Share2,
  Clock,
  MessageCircle,
  Heart,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export const ArticleDetailScreen = ({ route, navigation }: any) => {
  // In a real app, 'item' would be passed via navigation
  const item = route?.params?.item || {
    title: 'Balancing Hormones: A Guide to Your Follicular Phase',
    tag: 'WELLNESS',
    readTime: '8 min read',
    author: 'Dr. Elena Rossi',
    date: 'Oct 24, 2023',
  };

  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const progress =
      contentOffset.y / (contentSize.height - layoutMeasurement.height);
    setReadingProgress(Math.min(Math.max(progress, 0), 1));
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this article on Cycle Tracker: ${item.title}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Sticky Header --- */}
      <View style={styles.headerNav}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <ChevronLeft color="#1A3B5D" size={24} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => setIsBookmarked(!isBookmarked)}
            style={styles.iconBtn}
          >
            <Bookmark
              color={isBookmarked ? '#FF7E67' : '#1A3B5D'}
              fill={isBookmarked ? '#FF7E67' : 'transparent'}
              size={22}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.iconBtn}>
            <Share2 color="#1A3B5D" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Reading Progress Bar */}
      <Progress.Bar
        progress={readingProgress}
        width={width}
        height={3}
        color="#FF7E67"
        borderWidth={0}
        borderRadius={0}
      />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* --- Hero Image/Cover --- */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={['#EADCF7', '#FFD6D6']}
            style={styles.heroPlaceholder}
          />
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        </View>

        <View style={styles.contentPadding}>
          <Text style={styles.articleTitle}>{item.title}</Text>

          <View style={styles.metaRow}>
            <View style={styles.authorGroup}>
              <View style={styles.authorAvatar} />
              <View>
                <Text style={styles.authorName}>{item.author}</Text>
                <Text style={styles.publishDate}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.timeGroup}>
              <Clock size={14} color="#999" />
              <Text style={styles.readTimeText}>{item.readTime}</Text>
            </View>
          </View>

          {/* --- Article Body --- */}
          <Text style={styles.paragraph}>
            Your hormones act as the body's chemical messengers. During the
            follicular phase, which begins on the first day of your period and
            ends with ovulation, estrogen levels gradually rise to prepare an
            egg for release.
          </Text>

          <Text style={styles.subHeading}>Nutrition for Balance</Text>
          <Text style={styles.paragraph}>
            Incorporate fermented foods like kimchi or sauerkraut to support
            estrogen metabolism. Focusing on complex carbohydrates will help
            maintain steady energy levels as your body builds the uterine
            lining.
          </Text>

          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>
              "Understanding your cycle isn't just about reproduction; it's
              about optimizing your daily vitality."
            </Text>
          </View>

          <Text style={styles.paragraph}>
            Studies suggest that magnesium-rich foods like spinach and pumpkin
            seeds can significantly reduce the intensity of pre-follicular
            headaches.
          </Text>

          {/* --- Footer Engagement --- */}
          <View style={styles.articleFooter}>
            <TouchableOpacity style={styles.interactionBtn}>
              <Heart size={20} color="#666" />
              <Text style={styles.interactionText}>1.2k</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionBtn}>
              <MessageCircle size={20} color="#666" />
              <Text style={styles.interactionText}>48 Comments</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Related Section --- */}
        <View style={styles.relatedSection}>
          <Text style={styles.relatedTitle}>Related Reading</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ paddingLeft: 20 }}
          >
            {[1, 2].map(i => (
              <TouchableOpacity key={i} style={styles.smallCard}>
                <View style={styles.smallCardImg} />
                <Text style={styles.smallCardTitle} numberOfLines={2}>
                  Essential Minerals for Cycle Health
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerActions: { flexDirection: 'row' },
  iconBtn: { padding: 8, marginLeft: 5 },
  heroContainer: { height: 250, width: '100%', position: 'relative' },
  heroPlaceholder: { flex: 1 },
  tagBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FF7E67',
    letterSpacing: 1,
  },
  contentPadding: { padding: 25 },
  articleTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A3B5D',
    lineHeight: 34,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  authorGroup: { flexDirection: 'row', alignItems: 'center' },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEE',
    marginRight: 12,
  },
  authorName: { fontSize: 15, fontWeight: '700', color: '#333' },
  publishDate: { fontSize: 12, color: '#999', marginTop: 2 },
  timeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 6,
    borderRadius: 8,
  },
  readTimeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
    fontWeight: '600',
  },
  paragraph: { fontSize: 17, color: '#444', lineHeight: 28, marginBottom: 20 },
  subHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3B5D',
    marginTop: 15,
    marginBottom: 15,
  },
  quoteCard: {
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 4,
    borderLeftColor: '#FF7E67',
    padding: 20,
    marginVertical: 20,
    borderRadius: 8,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#FF7E67',
    lineHeight: 26,
  },
  articleFooter: {
    flexDirection: 'row',
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  interactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  interactionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  relatedSection: { marginTop: 20 },
  relatedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A3B5D',
    marginLeft: 25,
    marginBottom: 15,
  },
  smallCard: { width: 160, marginRight: 15, marginBottom: 20 },
  smallCardImg: {
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    marginBottom: 10,
  },
  smallCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    lineHeight: 20,
  },
});
