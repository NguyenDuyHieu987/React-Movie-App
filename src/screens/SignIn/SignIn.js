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
import { AuthContext } from '../../AuthProvider';

const { height, width } = Dimensions.get('window');

const SignIn = ({ navigation }) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
  });

  const { signIn } = useContext(AuthContext);

  const loginHanle = (username, password) => {
    if (!data.isValidEmail || !data.isValidPassword) {
      Alert.alert('Tài khoản hoặc mật khẩu không chính xác');
    } else {
      signIn(username, password);
    }
  };

  handleOnChangeEmail = (text) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(text) && text.trim().length >= 0) {
      setData({
        ...data,
        username: text,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        username: text,
        isValidEmail: false,
      });
    }
  };

  handleOnChangePassword = (text) => {
    if (text.trim().length >= 0) {
      setData({
        ...data,
        password: text,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: text,
        isValidPassword: false,
      });
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
              data.isValidEmail
                ? styles.inputContainer
                : {
                    ...styles.inputContainer,
                    ...{ borderBottomColor: Colors.RED },
                  }
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
            />
          </View>
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
            style={{
              ...styles.inputContainer,
              ...{
                marginBottom: 25,
              },
            }}
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
            />
          </View>
        </View>

        <Animatable.View animation="fadeInUp">
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              loginHanle(data.username, data.password);
              //   navigation.navigate('home');
            }}
          >
            <Text style={{ fontFamily: Fonts.REGULAR, fontSize: 16 }}>
              Sign in
            </Text>
          </TouchableOpacity>
        </Animatable.View>

        <TouchableOpacity>
          <Text style={{ alignSelf: 'center', marginVertical: 25 }}>
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
        </Animatable.View>

        <Animatable.View animation="fadeInUpBig">
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
        </Animatable.View>

        <Animatable.View animation="fadeInUpBig">
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
