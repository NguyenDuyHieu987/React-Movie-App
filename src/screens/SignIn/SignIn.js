import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  Alert,
  Button,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../constants/Images';
// import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Feather, Entypo } from '@expo/vector-icons';
import Fonts from '../../constants/Fonts';
import { AuthContext } from '../../store/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

const SignIn = ({ navigation }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
  });

  const {
    authContext,
    messageEmailError,
    setMessageEmailError,
    messagePasswordError,
    setMessagePasswordError,
  } = useContext(AuthContext);

  const loginHanle = (email, password) => {
    if (!data.isValidEmail && messageEmailError != '* Email is not exist') {
      setMessageEmailError('* Wrong email format');
    }

    if (!data.isValidPassword) {
      setMessagePasswordError('* Please enter a valid password');
    }

    if (data.isValidEmail && data.isValidPassword) {
      authContext.signIn(email, password);
      setMessagePasswordError('');
      setMessageEmailError('');
    }

    if (messageEmailError != '') {
      setData({
        ...data,
        isValidEmail: false,
      });
    }

    if (messagePasswordError != '') {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };

  const handleOnChangeEmail = (text) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(text) && text.trim().length >= 0) {
      setData({
        ...data,
        email: text,
        isValidEmail: true,
      });
      setMessageEmailError('');
    } else {
      setData({
        ...data,
        email: text,
        isValidEmail: false,
      });
    }
  };

  const handleOnblurEmail = () => {
    if (!data.isValidEmail) {
      setMessageEmailError('* Wrong email format');
    } else {
      setMessageEmailError('');
    }
  };

  const handleOnChangePassword = (text) => {
    if (text.trim().length >= 3) {
      setData({
        ...data,
        password: text,
        isValidPassword: true,
      });
      setMessagePasswordError('');
    } else {
      setData({
        ...data,
        password: text,
        isValidPassword: false,
      });
    }
  };

  const handleOnblurPassword = () => {
    if (!data.isValidPassword) {
      setMessagePasswordError('* Please enter a valid password');
    } else {
      setMessagePasswordError('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="fadeInDown"
          //   duration="1500"
          //   iterationCount="infinite"
          source={Images.NETFLIXLOGO}
        />
      </View>
      <View style={styles.body}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.REGULAR,
              marginBottom: 5,
            }}
          >
            Email
          </Text>

          <View
            style={
              (!data.isValidEmail && messageEmailError !== '') ||
              messageEmailError == '* Email is not exist'
                ? {
                    ...styles.inputContainer,
                    ...{ borderBottomColor: Colors.RED },
                  }
                : styles.inputContainer
            }
          >
            <Entypo name="email" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor={Colors.GRAY}
              onChangeText={(text) => {
                handleOnChangeEmail(text);
              }}
              onBlur={handleOnblurEmail}
            />
          </View>
          {(!data.isValidEmail && messageEmailError !== '') ||
          messageEmailError == '* Email is not exist' ? (
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.REGULAR,
                color: Colors.LIGHT_RED,
              }}
            >
              {messageEmailError}
            </Text>
          ) : null}
        </View>

        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.REGULAR,
              marginBottom: 5,
              marginTop: 20,
            }}
          >
            Password
          </Text>
          <View
            style={
              (!data.isValidPassword && messagePasswordError !== '') ||
              messagePasswordError == '* Wrong password'
                ? {
                    ...styles.inputContainer,
                    ...{ borderBottomColor: Colors.RED },
                  }
                : styles.inputContainer
            }
          >
            <Feather name="lock" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Your Password"
              placeholderTextColor={Colors.GRAY}
              secureTextEntry={true}
              onChangeText={(text) => {
                handleOnChangePassword(text);
              }}
              onBlur={handleOnblurPassword}
            />
          </View>
          {(!data.isValidPassword && messagePasswordError !== '') ||
          messagePasswordError == '* Wrong password' ? (
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.REGULAR,
                color: Colors.LIGHT_RED,
              }}
            >
              {messagePasswordError}
            </Text>
          ) : null}
        </View>

        <Animatable.View animation="fadeInUp">
          <TouchableOpacity
            style={{ ...styles.button, marginTop: 35 }}
            onPress={() => {
              loginHanle(data.email, data.password);
              //   navigation.navigate('home');
            }}
          >
            <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 16 }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <TouchableOpacity>
          <Text
            style={{ alignSelf: 'center', marginBottom: 25, marginTop: 15 }}
          >
            Forgot password?
          </Text>
        </TouchableOpacity>

        <Animatable.View animation="fadeInUpBig">
          <TouchableOpacity
            style={{
              ...styles.button,
              ...{ backgroundColor: Colors.LIGHT_BLUE },
            }}
          >
            <FontAwesome
              name="facebook"
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 16 }}>
              Sign in with Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.button,
              ...{ backgroundColor: Colors.LIGHT_RED },
            }}
          >
            <FontAwesome
              name="google-plus"
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 16 }}>
              Sign in with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.button, ...{ backgroundColor: Colors.GRAY } }}
          >
            <FontAwesome name="apple" size={20} style={{ marginRight: 10 }} />
            <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 16 }}>
              Sign in with Apple
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}
        >
          <Text style={{ fontFamily: Fonts.REGULAR }}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('signup');
            }}
          >
            <Text style={{ fontFamily: Fonts.REGULAR, color: Colors.ACTIVE }}>
              Create one
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 2.3,
    paddingHorizontal: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  input: {
    marginLeft: 10,
    width: width,
  },
  button: {
    backgroundColor: Colors.LIGHT_BLACK,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    borderRadius: 5,
    marginBottom: 10,
  },
});
export default SignIn;
