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
import { AuthContext } from './src/store/AuthProvider';
import RootStackScreen from './src/screens/RootScreen';
import DrawerNavigator from './src/screens/DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native';
import Animated from 'react-native-reanimated';
import md5 from 'md5';
import { getUserToken, signIn, signUp } from './src/services/MovieService';
import { Alert } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Fonts from './src/constants/Fonts';

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
        }, 3700);
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
    userToken: AsyncStorage.getItem('userToken'),
  };

  const [user, setUser] = useState();
  const [messageEmailError, setMessageEmailError] = useState('');
  const [messagePasswordError, setMessagePasswordError] = useState('');

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
    signIn: (userName, password) => {
      // setUserToken('123');
      let userToken;
      userToken = null;

      // if (userName == 'vaicut6941@gmail.com' && password == 'Pass') {
      //   try {
      //     userToken = '123';
      //     await AsyncStorage.setItem('userToken', userToken);
      //   } catch (e) {
      //     console.log(e);
      //   }
      // }

      signIn({
        email: userName,
        password: md5(password),
        user_token: token(),
      })
        .then((response) => {
          if (response.data?.success === false) {
            setMessageEmailError('* Email is not exist');
          } else {
            if (response.data.isLogin === true) {
              setUser(response?.data.result);
              AsyncStorage.setItem(
                'userToken',
                response?.data.result.user_token
              );
              AsyncStorage.setItem('isLoggedIn', 'true');
              setMessagePasswordError('');
            } else {
              setMessagePasswordError('* Wrong password');
            }
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    },
    signOut: async () => {
      try {
        setUser();
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('isLoggedIn');
      } catch (e) {
        console.log(e);
      }
      // dispatch({ type: 'LOGOUT' });
    },
    signUp: (username, email, password, repassword) => {
      // console.log(username, email, password, repassword);
      signUp({
        id: Date.now(),
        user_name: username,
        email: email,
        password: md5(repassword),
        created_by: username,
        avatar: `${Math.floor(Math.random() * 10) + 1}`,
        user_token: token(),
      })
        .then((response) => {
          if (response.data.isSignUp === true) {
            setMessageEmailError('');
            // setToastMessage({
            //   title: 'Thành công!',
            //   message: 'Bạn đã đăng ký thành công tài khoản tại PhimHay247.',
            //   type: 'success',
            //   duration: 7000,
            // });
            // Alert.alert(`Notification`, `Sign Up Successfully`);
            Toast.show({
              type: 'success',
              text1: 'Success',
              text2:
                'You have successfully registered an account in Netflix 2.0',
            });
          } else {
            setMessageEmailError('* Email is already exist');
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    },
  }));

  const rand = function () {
    return Math.random().toString(36).substring(2); // remove `0.`
  };

  const token = function () {
    return rand() + rand() + rand() + rand(); // to make it longer
  };

  const scrolly = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LogBox.ignoreLogs([
      'expo-app-loading is deprecated in favor of expo-splash-screen',
    ]);
    LogBox.ignoreLogs(['Require cycle:']);
  }, []);

  useEffect(() => {
    (async () => {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null && loggedIn === 'true') {
        getUserToken({ user_token: userToken }).then((accountResponse) => {
          if (accountResponse.data.isLogin === true) {
            setUser(accountResponse.data.result);
          }
        });
      }
    })();
  }, []);

  if (!appIsReady) {
    SplashScreen.hideAsync();
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.BLACK,
        }}
      >
        <Lottie
          // source={require('./assets/animations/29313-netflix-logo-swoop.json')}
          source={require('./assets/animations/50097-netflix-logo.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  return appIsReady ? (
    <>
      <AuthContext.Provider
        value={{
          scrolly,
          authContext,
          messageEmailError,
          setMessageEmailError,
          messagePasswordError,
          setMessagePasswordError,
          user,
        }}
      >
        <NavigationContainer onReady={onLayoutRootView}>
          {user?.user_token != undefined ? (
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
                  cardStyleInterpolator:
                    CardStyleInterpolators.forFadeFromCenter,
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
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
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
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                })}
              />

              <Stack.Screen
                name="video"
                component={VideoPlayer}
                options={{
                  headerShown: false,
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                }}
              />
            </Stack.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
      <Toast
        config={{
          success: (props) => (
            <BaseToast
              {...props}
              style={{ borderLeftColor: Colors.GREEN, height: 70 }}
              contentContainerStyle={{
                paddingHorizontal: 15,
              }}
              text1Style={{
                fontSize: 16,
                fontWeight: '400',
                fontFamily: Fonts.SEMI_BOLD,
              }}
              text2Style={{
                fontSize: 13,
                fontWeight: '400',
                fontFamily: Fonts.REGULAR,
              }}
            />
          ),
        }}
      />
    </>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.BLACK,
      }}
    >
      <Lottie
        // source={require('./assets/animations/29313-netflix-logo-swoop.json')}
        source={require('./assets/animations/50097-netflix-logo.json')}
        autoPlay
        loop
      />
    </View>
    // <AppLoading />
  );
};

const styles = StyleSheet.create({});

export default App;
