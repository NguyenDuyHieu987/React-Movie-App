import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { StyleSheet, LogBox } from 'react-native';
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
import AppLoading from 'expo-app-loading';
import Colors from './src/constants/Colors';
import Search from './src/screens/Search';
import VideoPlayer from './src/screens/VideoPlayer';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import SignIn from './src/screens/SignIn/SignIn';
import SignUp from './src/screens/SignUp/SignUp';
import { AuthContext, AuthProvider } from './src/AuthProvider';
import MainStackNavigator from './src/screens/MainStackNavigator/MainStackNavigator';
import RootStackScreen from './src/screens/RootScreen/RootScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

const App = ({ navigation }) => {
  const [fontLoaded] = useFonts({
    Regular: require('./assets/fonts/NunitoSans-Regular.ttf'),
    Bold: require('./assets/fonts/NunitoSans-Bold.ttf'),
    Black: require('./assets/fonts/NunitoSans-Black.ttf'),
    ExtraBold: require('./assets/fonts/NunitoSans-ExtraBold.ttf'),
    ExtraLight: require('./assets/fonts/NunitoSans-ExtraLight.ttf'),
    Light: require('./assets/fonts/NunitoSans-Light.ttf'),
    SemiBold: require('./assets/fonts/NunitoSans-SemiBold.ttf'),
  });

  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // await SplashScreen.preventAutoHideAsync();
  //       await Font.loadAsync(fontLoaded);
  //       await new Promise((resolve) => setTimeout(resolve, 2000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Tell the application to render
  //       setAppIsReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

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
  }, []);

  return fontLoaded ? (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <Stack.Navigator
          // onLayout={onLayoutRootView}

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
              component={MainStackNavigator}
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
              component={Search}
              options={{
                headerShown: false,
              }}
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
    <AppLoading />
  );
};

const styles = StyleSheet.create({});

export default App;
