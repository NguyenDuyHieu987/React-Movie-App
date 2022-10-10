import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ItemSeparator = ({ height, width }) => {
  return <View style={{ height: height, width: width }} />;
};

ItemSeparator.defaultProps = {
  height: 0,
  width: 0,
};

export default ItemSeparator;

const styles = StyleSheet.create({});
