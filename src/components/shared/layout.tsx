import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Menu, Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../style';

type AppLayoutProps = {
  title?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  showHeader?: boolean;
  rightIcon?: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({
  title = '',
  children,
  scrollable = true,
  showHeader = true,
  rightIcon,
}) => {
  return (
    <SafeAreaView style={styles.safe}>
      {/* HEADER */}
      {showHeader && (
        <View style={styles.topNav}>
          <Menu color="#1A3B5D" size={24} />
          <Text style={styles.navTitle}>{title}</Text>
          {rightIcon ?? <Bell color="#1A3B5D" size={24} />}
        </View>
      )}

      {/* CONTENT */}
      {scrollable ? (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.nonScrollContent}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default AppLayout;
