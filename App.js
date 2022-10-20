import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { StyleSheet, LogBox, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieScreen from './src/screens/MovieScreen';
import DefaultPage from './src/screens/DefaultPage';
import { useFonts } from 'expo-font';
import ActivityIndicator from 'expo-app-loading';
import Colors from './src/constants/Colors';
import VideoPlayer from './src/screens/VideoPlayer';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { AuthContext, AuthProvider } from './src/store/AuthProvider';
import RootStackScreen from './src/screens/RootScreen';
import DrawerNavigator from './src/screens/DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import Animated from 'react-native-reanimated';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  // const [fontLoaded] = useFonts({
  //   // Regular: require('./assets/fonts/NunitoSans/NunitoSans-Regular.ttf'),
  //   // Bold: require('./assets/fonts/NunitoSans/NunitoSans-Bold.ttf'),
  //   // Black: require('./assets/fonts/NunitoSans/NunitoSans-Black.ttf'),
  //   // ExtraBold: require('./assets/fonts/NunitoSans/NunitoSans-ExtraBold.ttf'),
  //   // ExtraLight: require('./assets/fonts/NunitoSans/NunitoSans-ExtraLight.ttf'),
  //   // Light: require('./assets/fonts/NunitoSans/NunitoSans-Light.ttf'),
  //   // SemiBold: require('./assets/fonts/NunitoSans/NunitoSans-SemiBold.ttf'),
  //   MaterialIcons: require('./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
  //   MaterialCommunityIcons: require('./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
  //   Regular: require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  //   Bold: require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
  //   Black: require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
  //   ExtraBold: require('./assets/fonts/OpenSans/OpenSans-ExtraBold.ttf'),
  //   ExtraLight: require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
  //   Light: require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
  //   SemiBold: require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),

  //   // Regular: require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  //   // Bold: require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  //   // Black: require('./assets/fonts/Roboto/Roboto-Black.ttf'),
  //   // ExtraBold: require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  //   // ExtraLight: require('./assets/fonts/Roboto/Roboto-Light.ttf'),
  //   // Light: require('./assets/fonts/Roboto/Roboto-Light.ttf'),
  //   // SemiBold: require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
  // });

  const [appIsReady, setAppIsReady] = useState(false);

  // const prepare = async () => {
  //   await Font.loadAsync({
  //     MaterialIcons,
  //     MaterialCommunityIcons,
  //   });
  //   setAppIsReady(true);
  // };

  // useEffect(() => {
  //   prepare();
  // }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          MaterialIcons: require('./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
          MaterialCommunityIcons: require('./node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
          Regular: require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
          Bold: require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
          Black: require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
          ExtraBold: require('./assets/fonts/OpenSans/OpenSans-ExtraBold.ttf'),
          ExtraLight: require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
          Light: require('./assets/fonts/OpenSans/OpenSans-Light.ttf'),
          SemiBold: require('./assets/fonts/OpenSans/OpenSans-SemiBold.ttf'),
        });
        // await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setTimeout(async () => {
          setAppIsReady(true);
        }, 3000);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: 1,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: async (userName, password) => {
      // setUserToken('123');
      let userToken;
      userToken = null;

      if (userName == 'vaicut6941@gmail.com' && password == 'Pass') {
        try {
          userToken = '123';
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
      }
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('123');
    },
  }));

  useEffect(() => {
    LogBox.ignoreLogs([
      'expo-app-loading is deprecated in favor of expo-splash-screen',
    ]);
    LogBox.ignoreLogs(['Require cycle:']);
  }, []);

  const scrolly = useRef(new Animated.Value(0)).current;

  if (!appIsReady) {
    SplashScreen.hideAsync();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Lottie
          source={require('./assets/animations/29313-netflix-logo-swoop.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return appIsReady ? (
    <AuthContext.Provider value={{ scrolly, authContext }}>
      <NavigationContainer onReady={onLayoutRootView}>
        {loginState.userToken !== null ? (
          <Stack.Navigator

          // screenOptions={{
          //   headerStyle: {
          //     backgroundColor: Colors.YELLOW,
          //   },
          //   headerTintColor: Colors.WHITE,
          //   headerTitleAlign: 'center',
          //   cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // }}
          >
            {/* <Stack.Screen
                  name="signin"
                  component={SignIn}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="signup"
                  component={SignUp}
                  options={{
                    headerShown: false,
                  }}
                /> */}

            <Stack.Screen
              name="home"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="movie"
              component={MovieScreen}
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
              }}
            />

            <Stack.Screen
              name="movieShow"
              component={DefaultPage}
              options={({ navigation, route }) => ({
                headerTitle: route.params.title,
                headerStyle: {
                  backgroundColor: Colors.LIGHT_BLACK,
                },
                headerTintColor: Colors.WHITE,
                headerTitleAlign: 'center',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              })}
            />

            <Stack.Screen
              name="search"
              component={DefaultPage}
              options={({ navigation, route }) => ({
                headerTitle: 'Results for: ' + route.params.title,
                headerStyle: {
                  backgroundColor: Colors.LIGHT_BLACK,
                },
                headerTintColor: Colors.WHITE,
                headerTitleAlign: 'left',
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              })}
            />

            <Stack.Screen
              name="video"
              component={VideoPlayer}
              options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
          </Stack.Navigator>
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Lottie
        source={require('./assets/animations/29313-netflix-logo-swoop.json')}
        autoPlay
        loop
      />
    </View>
    // <AppLoading />
  );
};

const styles = StyleSheet.create({});

export default App;
