import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import ItemList from './ItemList';
import { getList } from '../../services/MovieService';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const List = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isfocus, setIsFocus] = useState(true);

  useEffect(() => {
    focusListener = navigation.addListener('focus', () => {
      getData();
      setLoading(false);
    });

    focusListener = navigation.addListener('blur', () => {
      setData([]);
      setLoading(false);
    });
  }, []);

  const getData = async () => {
    await getList(page).then((movieRespone) => {
      setData(data.concat(movieRespone.data.items));
      setLoading(false);
    });
  };

  const handleEndReached = () => {
    setPage(page + 1);
    setLoading(true);
    getData();
  };

  const renderFooter = () => {
    return (
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <ActivityIndicator size="small" />
        <Text>Loading...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>List</Text>
      </View>
      <FlatList
        spacing={10}
        data={data}
        extraData={data}
        numColumns={3}
        // onEndReached={handleEndReached}
        // onEndReachedThreshold={0.5}
        // ListFooterComponent={loading ? renderFooter : null}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ItemList
            id={item.id}
            title={item.title}
            poster={item.poster_path}
            handleOnPress={() =>
              navigation.navigate('movie', {
                movieId: item.id,
                item: item,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  titleContainer: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.EXTRA_BOLD,
  },
});
