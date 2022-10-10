import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Button,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TouchableNativeFeedback,
} from 'react-native';
import React, {
  useState,
  useEffect,
  Component,
  createContext,
  useCallback,
} from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import Slideshow from 'react-native-image-slider-show';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import Images from '../../constants/Images';
import Constants from 'expo-constants';
import ListsMovies from './ListsMovies';
import { useFocusEffect } from '@react-navigation/native';
import Animated, { Easing } from 'react-native-reanimated';

const { Value, timing } = Animated;
const { height, width } = Dimensions.get('window');

const Header = ({
  navigation,
  isVisibleYears,
  changeYearsVisbility,
  isVisibleGenres,
  changeGenresVisbility,
  setChooseGenre,
  setActiveGenre,
  years,
  chooseGenre,
  dataGenres,
  activeGenre,
}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          position: 'absolute',
          left: 0,
          right: 0,
          paddingTop: Constants.statusBarHeight + 5,
          zIndex: 2,
        }}
      >
        <LinearGradient
          colors={['rgba(217, 217, 217, 1)', 'rgba(0, 0, 0, 0)']}
          start={[1, 0]}
          end={[1, 1]}
          style={{
            width: width,
            height: 90,
            position: 'absolute',
            top: 0,
            backgroundColor: Colors.BLACK,
            opacity: 0.2,
          }}
        />
        <Image
          source={Images.NETFLIX}
          style={{
            transform: [{ scale: 1.1 }],
          }}
        />
        {/* <DropDownPicker
              open={open}
              value={null}
              items={dataGenres}
              multiple={true}
              setOpen={this.setOpen}
              setValue={this.setValue}
              setItems={this.setItems}
              key={(item, index) => index.toString()}
            /> */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SafeAreaView>
            <TouchableOpacity
              style={{ marginRight: 5, padding: 5 }}
              onPress={() => {
                changeYearsVisbility(!isVisibleYears);
              }}
            >
              <Ionicons name="filter" size={20} />
            </TouchableOpacity>

            <Modal
              transparent={true}
              animationType="fade"
              visible={isVisibleYears}
              onRequestClose={() => changeYearsVisbility(false)}
            >
              <TouchableOpacity
                onPress={() => changeYearsVisbility(false)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: width / 1.1,
                    height: height / 1.7,
                    borderRadius: 10,
                    backgroundColor: Colors.BLACK,
                    paddingHorizontal: 20,
                    top: -50,
                    alignSelf: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      paddingVertical: 10,
                      textAlign: 'center',
                    }}
                  >
                    Years
                  </Text>
                  <ScrollView>
                    {years.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          navigation.navigate('movieShow', {
                            currentMovies: 'year',
                            title: item,
                          });
                          changeYearsVisbility(false);
                        }}
                        activeOpacity={0.5}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: Fonts.REGULAR,
                            paddingVertical: 15,
                            borderTopColor: Colors.LIGHT_GRAY,
                            borderWidth: 0.2,
                          }}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>
          </SafeAreaView>
          <SafeAreaView>
            <TouchableOpacity
              style={{
                padding: 5,
              }}
              onPress={() => changeGenresVisbility(!isVisibleGenres)}
              activeOpacity={0.5}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: Fonts.REGULAR,
                    marginRight: 5,
                  }}
                >
                  {chooseGenre}
                </Text>
                <Ionicons
                  name={isVisibleGenres ? 'caret-up' : 'caret-down'}
                  size={16}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType="fade"
              visible={isVisibleGenres}
              onRequestClose={() => changeGenresVisbility(false)}
            >
              <TouchableOpacity
                onPress={() => changeGenresVisbility(false)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: width / 1.1,
                    height: height / 1.7,
                    borderRadius: 10,
                    backgroundColor: Colors.BLACK,
                    paddingHorizontal: 20,
                    top: -50,
                    alignSelf: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      paddingVertical: 10,
                      textAlign: 'center',
                    }}
                  >
                    Genres
                  </Text>
                  <ScrollView>
                    {dataGenres.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          //   handleRefresh(item?.name);
                          setChooseGenre(item?.name);
                          setActiveGenre(item?.name);
                          changeGenresVisbility(false);
                        }}
                        activeOpacity={0.5}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: Fonts.REGULAR,
                            paddingVertical: 15,
                            borderTopColor: Colors.LIGHT_GRAY,
                            borderWidth: 0.2,
                            color:
                              activeGenre === item.name
                                ? Colors.ACTIVE
                                : Colors.WHITE,
                          }}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </TouchableOpacity>
            </Modal>
          </SafeAreaView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({});
