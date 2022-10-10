import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  TouchableNativeFeedback,
  Keyboard,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { getPoster } from '../../services/MovieService';

const { height, width } = Dimensions.get('window');

const ItemSearch = ({ item, handleOnPress }) => {
  return (
    <TouchableOpacity
      style={styles.ItemSearch}
      activeOpacity={0.5}
      onPress={handleOnPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            marginRight: 10,
          }}
          source={{ uri: getPoster(item?.poster_path) }}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.ItemSearchText} numberOfLines={1}>
            {item?.title ? item?.title : item?.name}
          </Text>
          <Text style={styles.ItemSearchTextBottom} numberOfLines={1}>
            {item?.original_title ? item?.original_title : item?.original_name}
          </Text>
        </View>
      </View>
      <Feather name="chevron-right" size={20} color={Colors.GRAY} />
    </TouchableOpacity>
  );
};

export default ItemSearch;

const styles = StyleSheet.create({
  ItemSearch: {
    marginHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.LIGHT_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ItemSearchText: {
    fontSize: 16,
    fontFamily: Fonts.REGULAR,
    width: width / 1.5,
  },
  ItemSearchTextBottom: {
    fontSize: 14,
    fontFamily: Fonts.REGULAR,
    color: Colors.LIGHT_GRAY,
    width: width / 1.5,
  },
});
