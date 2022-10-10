import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { Feather, Ionicons } from '@expo/vector-icons';

const ItemSetting = ({ icon, name }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => console.log('g')}
      style={styles.itemSetting}
    >
      <View style={styles.leftItem}>
        {icon == 'help' || icon == 'settings-outline' ? (
          <Ionicons name={icon} size={25} />
        ) : (
          <Feather name={icon} size={25} />
        )}
        <Text style={{ fontSize: 15, fontFamily: Fonts.BOLD, marginLeft: 10 }}>
          {name}
        </Text>
      </View>
      <Feather name="chevron-right" size={20} color={Colors.GRAY} />
    </TouchableOpacity>
  );
};

export default ItemSetting;

const styles = StyleSheet.create({
  itemSetting: {
    flexDirection: 'row',
    backgroundColor: Colors.EXTRA_LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
