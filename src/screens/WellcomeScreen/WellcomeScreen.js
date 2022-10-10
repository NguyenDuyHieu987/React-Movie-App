import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Images from "../../constants/Images";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";

const WellcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 50 }}>
        <Image source={Images.NETFLIXWELLCOME} />
        <Text
          style={{
            marginVertical: 20,
            fontSize: 22,
            fontFamily: Fonts.BOLD,
            textTransform: "uppercase",
          }}
        >
          Wellcome to Netflix !
        </Text>
      </View>

      <View style={{marginTop:50}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("signup");
          }}
        >
          <Text style={{ fontSize: 18 }}>Register</Text>
        </TouchableOpacity>
        <Text style={{alignSelf:'center',marginVertical:20, fontFamily:Fonts.REGULAR, fontSize:16}}> Already Have An Account ?</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate("signin");
          }}
        >
          <Text style={{ fontSize: 18 }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WellcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  btn: {
    marginVertical: 20,
    backgroundColor: Colors.RED,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: 10,
    paddingHorizontal: 75,
    borderRadius:5,
  },
});
