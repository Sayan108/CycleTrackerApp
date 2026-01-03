import { BarChart2, CalendarIcon, Home, Plus, User } from 'lucide-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from '../../pages/homePage';
import CalenderScreen from '../../pages/calender';
import { TouchableOpacity } from 'react-native';
import { styles } from '../../style';
import { LibraryScreen } from '../../pages/library';
import { ProfileScreen } from '../../pages/myprofile';

export function MainTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FF7E67',
        tabBarStyle: styles.tabStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalenderScreen}
        options={{
          tabBarIcon: ({ color }) => <CalendarIcon color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Add"
        component={HomePage}
        options={{
          tabBarButton: () => (
            <TouchableOpacity style={styles.fab}>
              <Plus color="white" size={32} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ color }) => <BarChart2 color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
