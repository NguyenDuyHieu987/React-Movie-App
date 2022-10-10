import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import { getPoster } from '../../services/MovieService';
import Colors from '../../constants/Colors';

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
          source={{ uri: getPoster(item?.still_path) }}
          resizeMode="contain"
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              width: width * 0.6,
            }}
            numberOfLines={2}
          >
            {item?.episode_number + '. ' + item?.name}
          </Text>
          <Text>{item?.air_date}</Text>
        </View>
      </View>
      <Text style={{ color: Colors.LIGHT_GRAY }}>{item?.overview}</Text>
    </TouchableOpacity>
  );
};

export default EpisodeBox;

const styles = StyleSheet.create({});
