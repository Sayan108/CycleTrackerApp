import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Redux Imports
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {LoginScreen} from './src/pages/login';
import {OnboardingScreen} from './src/pages/onBoarding';
import {MainTabs} from './src/components/shared/mainTabs';
import {ArticleDetailScreen} from './src/components/library/libraryDetails';
import {persistor, store} from './src/redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen
              name="ArticleDetails"
              component={ArticleDetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
