import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from '../Search';
import List from '../List';
import Setting from '../Setting/Setting';

const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = ({ navigation }) => {
  return (
    <BottomTab.Navigator
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
      <BottomTab.Screen
        name="Home"
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            navigation.navigate('home');
          },
        })}
        component={HomeScreen}
      />
      <BottomTab.Screen name="Search" component={Search} />
      <BottomTab.Screen name="List" component={List} />
      <BottomTab.Screen name="Setting" component={Setting} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
