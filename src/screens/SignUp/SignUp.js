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

const { height, width } = Dimensions.get('window');

const SignUp = ({ navigation }) => {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    repassword: '',
    secureTextEntry: true,
    isValidEsername: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidRePassword: true,
  });

  const {
    authContext,
    messageEmailError,
    setMessageEmailError,
    messagePasswordError,
    setMessagePasswordError,
  } = useContext(AuthContext);

  const [messageUsernameError, setMessageUsernameError] = useState('');
  const [messageRePasswordError, setMessageRePasswordError] = useState('');

  const signUpHanle = (username, email, password, repassword) => {
    if (!data.isValidEsername) {
      setMessageUsernameError('* Please enter a least 6 character');
    }

    if (!data.isValidEmail && messageEmailError != '* Email is already exist') {
      setMessageEmailError('* Wrong email format');
    }

    if (!data.isValidPassword) {
      setMessagePasswordError('* Please enter a least 3 character');
    }

    if (!data.isValidRePassword) {
      setMessageRePasswordError('* Password is not match');
    }

    if (
      data.isValidEsername &&
      data.isValidEmail &&
      data.isValidPassword &&
      data.isValidRePassword
    ) {
      authContext.signUp(username, email, password, repassword);
      setMessageUsernameError('');
      setMessageEmailError('');
      setMessagePasswordError('');
      setMessageRePasswordError('');
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

  const handleOnChangeUsername = (text) => {
    if (text.trim().length >= 6) {
      setData({
        ...data,
        username: text,
        isValidEsername: true,
      });
      setMessageUsernameError('');
    } else {
      setData({
        ...data,
        username: text,
        isValidEsername: false,
      });
    }
  };

  const handleOnblurUsername = () => {
    if (!data.isValidEsername) {
      setMessageUsernameError('* Please enter a least 6 character');
    } else {
      setMessageUsernameError('');
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
      setMessagePasswordError('* Please enter least 3 character');
    } else {
      setMessagePasswordError('');
    }
  };

  const handleOnChangeRePassword = (text) => {
    if (data.password == text) {
      setData({
        ...data,
        repassword: text,
        isValidRePassword: true,
      });
      setMessageRePasswordError('');
    } else {
      setData({
        ...data,
        repassword: text,
        isValidRePassword: false,
      });
    }
  };

  const handleOnblurRePassword = () => {
    if (!data.isValidRePassword) {
      setMessageRePasswordError('* Password is not match');
    } else {
      setMessageRePasswordError('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.View
          animation="fadeInDown"
          //   duration="1500"
          //   iterationCount="infinite"
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: Fonts.EXTRA_BOLD,
              color: Colors.RED,
            }}
          >
            Create an account
          </Text>
        </Animatable.View>
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
            Your name
          </Text>
          <View
            style={
              !data.isValidEsername && messageUsernameError !== ''
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
              placeholder="Username"
              placeholderTextColor={Colors.GRAY}
              onChangeText={(text) => handleOnChangeUsername(text)}
              onBlur={handleOnblurUsername}
            />
          </View>
          {!data.isValidEsername && messageUsernameError !== '' ? (
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.REGULAR,
                color: Colors.LIGHT_RED,
              }}
            >
              {messageUsernameError}
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
            Email
          </Text>
          <View
            style={
              (!data.isValidEmail && messageEmailError !== '') ||
              messageEmailError == '* Email is already exist'
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
              onChangeText={(text) => handleOnChangeEmail(text)}
              onBlur={handleOnblurEmail}
            />
          </View>
          {(!data.isValidEmail && messageEmailError !== '') ||
          messageEmailError == '* Email is already exist' ? (
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
              !data.isValidPassword && messagePasswordError !== ''
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
              onChangeText={(text) => handleOnChangePassword(text)}
              onBlur={handleOnblurPassword}
            />
          </View>
          {!data.isValidPassword && messagePasswordError !== '' ? (
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

        <View>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Fonts.REGULAR,
              marginBottom: 5,
              marginTop: 20,
            }}
          >
            Confirm password
          </Text>
          <View
            style={
              !data.isValidRePassword && messageRePasswordError !== ''
                ? {
                    ...styles.inputContainer,
                    ...{
                      borderBottomColor: Colors.RED,
                    },
                  }
                : {
                    ...styles.inputContainer,
                    ...{
                      marginBottom: 25,
                    },
                  }
            }
          >
            <Feather name="lock" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Your Password"
              placeholderTextColor={Colors.GRAY}
              secureTextEntry={true}
              onChangeText={(text) => handleOnChangeRePassword(text)}
              onBlur={handleOnblurRePassword}
            />
          </View>
          {!data.isValidRePassword && messageRePasswordError !== '' ? (
            <Text
              style={{
                marginTop: 10,
                fontFamily: Fonts.REGULAR,
                color: Colors.LIGHT_RED,
                marginBottom: 25,
              }}
            >
              {messageRePasswordError}
            </Text>
          ) : null}
        </View>

        <Animatable.View animation="fadeInUp">
          <TouchableOpacity
            style={{ ...styles.button, marginBottom: 23 }}
            onPress={() => {
              signUpHanle(
                data.username,
                data.email,
                data.password,
                data.repassword
              );
            }}
          >
            <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 16 }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* <TouchableOpacity>
          <Text style={{ alignSelf: 'center', marginVertical: 25 }}>
            Forgot password?
          </Text>
        </TouchableOpacity> */}

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
            marginTop: 15,
          }}
        >
          <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 15 }}>
            Have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('signin');
            }}
          >
            <Text style={{ fontFamily: Fonts.REGULAR, color: Colors.ACTIVE }}>
              Sign in now
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
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 2.5,
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
export default SignUp;
