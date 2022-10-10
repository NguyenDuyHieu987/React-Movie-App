import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('screen');

const setWidth = (w) => (width / 100) * w;
const GenreCard = ({ genreName, active, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: active ? Colors.ACTIVE : Colors.WHITE,
      }}
      activeOpacity={0.5}
      onPress={() => onPress(genreName)}
    >
      <Text>{genreName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
    // paddingHorizontal: 10,
    elevation: 2,
    marginVertical: 2,
    width: setWidth(27),
  },
  genreText: {
    fontSize: 14,
    color: Colors.ACTIVE,
  },
});

export default GenreCard;
