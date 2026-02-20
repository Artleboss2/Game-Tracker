import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import HistoryScreen from './screens/HistoryScreen';
import GoalsScreen from './screens/GoalsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#0a0a0a', borderTopColor: '#1a1a1a' },
          tabBarActiveTintColor: '#4ade80',
          tabBarInactiveTintColor: '#888',
          headerStyle: { backgroundColor: '#0a0a0a' },
          headerTintColor: '#fff',
        }}>
        <Tab.Screen name="Accueil" component={HomeScreen} options={{ tabBarIcon: () => <Text>🏠</Text> }} />
        <Tab.Screen name="Recherche" component={SearchScreen} options={{ tabBarIcon: () => <Text>🔍</Text> }} />
        <Tab.Screen name="Historique" component={HistoryScreen} options={{ tabBarIcon: () => <Text>📊</Text> }} />
        <Tab.Screen name="Objectifs" component={GoalsScreen} options={{ tabBarIcon: () => <Text>🎯</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
