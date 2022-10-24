import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { Component, useContext } from 'react';
import Colors from '../../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import Images from '../../constants/Images';
import Fonts from '../../constants/Fonts';
import { Feather, Ionicons } from '@expo/vector-icons';
import ItemSetting from './ItemSetting';
import { AuthContext } from '../../store/AuthProvider';
import { getAvatar } from '../../services/MovieService';

const Setting = ({ navigation }) => {
  const { authContext, user } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="auto"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={
            user?.avatar?.length <= 3
              ? {
                  uri: `https://the-movie-node.onrender.com/image/account/${user?.avatar}?api=hieu987`,
                }
              : { uri: user?.avatar }
          }
          resizeMode="cover"
        />
        <Text style={styles.userName} numberOfLines={2}>
          {user.user_name}
        </Text>
      </View>
      <View style={styles.itemSettingContainer}>
        <ItemSetting icon="settings-outline" name="Setting app" />
        <ItemSetting icon="user" name="Account" />
        <ItemSetting icon="help-circle" name="Help" />
      </View>

      <View style={styles.logOutContainer}>
        <TouchableHighlight
          activeOpacity={111}
          underlayColor={Colors.GRAY}
          onPress={() => {
            Alert.alert('Thông Báo', 'Bạn có chắc chắn muốn đăng xuất không?', [
              {
                text: 'Cancel',
                onPress: () => {
                  return;
                },
              },
              {
                text: 'OK',
                onPress: () => {
                  authContext.signOut();
                },
              },
            ]);
          }}
          style={{
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: Fonts.REGULAR,
              paddingVertical: 8,
              paddingHorizontal: 15,
            }}
          >
            Log out
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  avatarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.ACTIVE,
  },
  userName: {
    textAlign: 'center',
    width: 90,
    marginTop: 15,
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
  },
  itemSettingContainer: {
    marginTop: 50,
    paddingHorizontal: 15,
  },

  logOutContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Setting;
