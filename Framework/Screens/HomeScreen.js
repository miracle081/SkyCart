import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../Components/globalVariables';

function Home() {
  const { } = useContext(AppContext)
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

const Tab = createBottomTabNavigator();

export function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          let size;
          if (route.name === 'Home') {
            size = focused ? 35 : 23
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name === 'Assets') {
            size = focused ? 35 : 23
            iconName = focused ? 'diamond' : 'diamond-outline';
          }
          if (route.name === 'PeerToPeer') {
            size = focused ? 35 : 23
            iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
          }
          if (route.name === 'MyShareUnit') {
            size = focused ? 35 : 23
            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
          }
          else if (route.name === 'Profile') {
            size = focused ? 35 : 23
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.blueMedium,
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}