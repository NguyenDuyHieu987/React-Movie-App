import React, { useContext, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../HomeScreen';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from '../Search';
import List from '../List';
import Setting from '../Setting/Setting';
import Animated from 'react-native-reanimated';
import { AuthContext } from '../../store/AuthProvider';
import Header from '../HomeScreen/Header';

const BottomTab = createBottomTabNavigator();
const BottomTabNavigator = ({ navigation }) => {
  const { scrolly } = useContext(AuthContext);

  const diffClamp = useRef(Animated.diffClamp(scrolly, 0, 90)).current;

  const header_translateY = Animated.interpolateNode(diffClamp, {
    inputRange: [0, 90],
    outputRange: [0, -90],
    extrapolate: 'clamp',
  });

  const header_opacity = Animated.interpolateNode(diffClamp, {
    inputRange: [0, 90],
    outputRange: [1, 0.2],
    extrapolate: 'clamp',
  });

  const header_color = Animated.interpolateColors(diffClamp, {
    inputRange: [0, 1],
    outputColorRange: ['red', 'black'],
  });

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
            borderTopColor: '#dfe4ea',
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
        options={{
          headerShown: false,
          header: ({ navigation }) => (
            <Animated.View
              style={{
                transform: [{ translateY: header_translateY }],
                zIndex: 10,
                backgroundColor: header_color,
                opacity: header_opacity,
              }}
            >
              <Header navigation={navigation} />
            </Animated.View>
          ),
        }}
      />
      <BottomTab.Screen name="Search" component={Search} />
      <BottomTab.Screen name="List" component={List} />
      <BottomTab.Screen name="Setting" component={Setting} />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
