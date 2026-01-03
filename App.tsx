import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './src/pages/login';
import { OnboardingScreen } from './src/pages/onBoarding';
import { MainTabs } from './src/components/shared/mainTabs';
import { ArticleDetailScreen } from './src/components/library/libraryDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="ArticleDetails" component={ArticleDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
