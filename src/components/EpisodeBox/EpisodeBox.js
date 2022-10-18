import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { getPoster, getPosterCast } from '../../services/MovieService';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const width = Dimensions.get('window').width;
const EpisodeBox = ({ item }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
        width: width,
        paddingHorizontal: 10,
      }}
      activeOpacity={0.5}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image
          style={{
            height: 80,
            width: width / 3,
          }}
          source={{ uri: getPosterCast(item?.still_path) }}
          resizeMode="contain"
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontFamily: Fonts.REGULAR,

              width: width * 0.6,
            }}
            numberOfLines={2}
          >
            {item?.episode_number + '. ' + item?.name}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.REGULAR,
              color: Colors.LIGHT_GRAY,
            }}
          >
            {item?.air_date}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontFamily: Fonts.REGULAR,
          color: Colors.LIGHT_GRAY,
        }}
      >
        {item?.overview}
      </Text>
    </TouchableOpacity>
  );
};

export default EpisodeBox;

const styles = StyleSheet.create({});
