import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';


import Jogadores from './screens/Jogadores';
import Titulos from './screens/Titulos';
import Escudo from './screens/Escudo';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#A30000' },
            headerTintColor: 'black',
            tabBarStyle: { backgroundColor: '#A30000' },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'black',
          }}
        >
          <Tab.Screen
            name="Jogadores"
            component={Jogadores}
            options={{
              headerTintColor: 'black',
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
              },
              title: 'Jogadores',
              headerTitleAlign: 'center',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="beer" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Titulos"
            component={Titulos}
            options={{
              headerTintColor: 'black',
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="trophy-outline" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Escudo"
            component={Escudo}
            options={{
              headerTintColor: 'black',
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
              },
              headerTitleAlign: 'center',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="shield-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}