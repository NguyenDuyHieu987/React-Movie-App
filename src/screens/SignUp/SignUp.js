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
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Animatable from 'react-native-animatable';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../constants/Images';
// import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Feather, Entypo } from '@expo/vector-icons';
import Fonts from '../../constants/Fonts';

const { height, width } = Dimensions.get('window');

const SignUp = ({ navigation }) => {
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
          <View style={styles.inputContainer}>
            <Entypo name="email" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor={Colors.GRAY}
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
            Email
          </Text>
          <View style={styles.inputContainer}>
            <Entypo name="email" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor={Colors.GRAY}
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
          <View style={styles.inputContainer}>
            <Feather name="lock" size={16} color="black" />
            <TextInput
              style={styles.input}
              placeholder="Your Password"
              placeholderTextColor={Colors.GRAY}
              secureTextEntry={true}
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
            Confirm password
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
              placeholder="Confirm Your Password"
              placeholderTextColor={Colors.GRAY}
              secureTextEntry={true}
            />
          </View>
        </View>

        <Animatable.View animation="fadeInUp">
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('home');
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
          <Text style={{ fontFamily: Fonts.REGULAR }}>Have an account?</Text>
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
