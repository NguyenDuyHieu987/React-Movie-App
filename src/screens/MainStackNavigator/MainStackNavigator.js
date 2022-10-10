import React, { useEffect, useState, useCallback, useContext } from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from '../../screens/Search';
import List from '../../screens/List';
import Setting from '../../screens/Setting/Setting';
import * as SplashScreen from 'expo-splash-screen';

const Tab = createBottomTabNavigator();
const MainStackNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Setting') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'List') {
            iconName = 'list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={20} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: Colors.ACTIVE,
        tabBarInactiveTintColor: Colors.GRAY,
        //Tab bar styles can be added here

        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 14,
          fontFamily: Fonts.BOLD,
        },
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            borderWidth: 0.5,
            paddingVertical: 5,
            borderTopColor: Colors.GRAY,
            backgroundColor: Colors.BLACK,
            height: 60,
          },
        ],
      })}
    >
      <Tab.Screen
        name="Home"
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            navigation.navigate('home');
          },
        })}
        component={HomeScreen}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default MainStackNavigator;

const styles = StyleSheet.create({});
