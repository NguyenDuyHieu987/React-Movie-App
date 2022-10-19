import React, { useContext, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import HomeScreen from '../HomeScreen';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Ionicons from '@expo/vector-icons/Ionicons';
import Search from '../Search';
import List from '../List';
import Setting from '../Setting/Setting';
import BottomTabNavigator from '../BottomTabNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated from 'react-native-reanimated';
import Header from '../HomeScreen/Header';
import { AuthContext } from '../../store/AuthProvider';
import Images from '../../constants/Images';

const DrawerStack = createDrawerNavigator();
const DrawerContent = (props, { navigation }) => {
  const { authContext } = useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.BLACK }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image source={Images.ACCOUNT} size={50} />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>DuyHieu987</Title>
                <Caption style={styles.caption}>@d_hieu</Caption>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('S');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="List"
              onPress={() => {
                props.navigation.navigate('List');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Setting');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('support');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                // toggleTheme();
                setIsSwitchOn(!isSwitchOn);
              }}
            >
              <View style={styles.preference}>
                <Text style={{ fontFamily: Fonts.REGULAR, marginTop: 15 }}>
                  Dark Theme
                </Text>
                <View pointerEvents="none">
                  <Switch color={Colors.ACTIVE} value={isSwitchOn} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            authContext.signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

const DrawerNavigator = () => {
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
    <DrawerStack.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
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
    >
      <DrawerStack.Screen name="HomeDrawer" component={BottomTabNavigator} />
      <DrawerStack.Screen name="SearchDrawer" component={Search} />
      <DrawerStack.Screen name="ListDrawer" component={List} />
      <DrawerStack.Screen name="SettingDrawer" component={Setting} />
    </DrawerStack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    fontFamily: Fonts.REGULAR,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontFamily: Fonts.REGULAR,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerNavigator;
