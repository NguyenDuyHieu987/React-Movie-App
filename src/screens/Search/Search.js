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
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useCallback, Component, useEffect } from 'react';
import ItemSeparator from '../../components/ItemSeparator';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { getPoster } from '../../services/MovieService';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import {
  useFocusEffect,
  useIsFocused,
  StackActions,
} from '@react-navigation/native';
import ItemSearch from './ItemSearch';
import axios from 'axios';
import ItemTopSearch from './ItemTopSearch';

const Search = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [dataTopSearch, setDataTopSearch] = useState([]);
  const [isFocused, setIsFocused] = useState(true);
  const [input, setInput] = useState('');
  const [isMount, setIsMount] = useState(false);
  var [page, setPage] = useState(1);
  var [pageTopSearch, setPageTopSearch] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingTopSearch, setLoadingTopSearch] = useState(false);

  useEffect(() => {
    getDataTopSearch();
    focusListener = navigation.addListener('focus', () => {});

    focusListener = navigation.addListener('blur', () => {});
  }, []);

  const onChangeText = async (text) => {
    setInput(text);

    if (text.length == 0) {
      setData([]), setIsFocused(true);
      return;
    }

    if (text.length >= 1) {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=fe1b70d9265fdb22caa86dca918116eb&query=${text}`
        )
        .then((searchMovieResponse) => {
          setData(searchMovieResponse.data.results),
            setLoading(false),
            setIsFocused(false);
        });
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused/mount

      setIsFocused(true);
      getDataTopSearch();
      return () => {
        // Do something when the screen is unfocused/unmount
        // Useful for cleanup functions

        setData([]);
        setInput('');
      };
    }, [])
  );

  const getData = async () => {
    const URL = `https://api.themoviedb.org/3/search/multi?api_key=fe1b70d9265fdb22caa86dca918116eb&query=${input}&page=${page}`;

    await axios
      .get(URL)
      .then((movieRespone) => {
        setData(data.concat(movieRespone.data.results));
        // setData(movieRespone.data.results);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  };

  const getDataTopSearch = async () => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_watch_monetization_types=flatrate&page=${pageTopSearch}`;

    await axios
      .get(URL)
      .then((movieRespone) => {
        setDataTopSearch(dataTopSearch.concat(movieRespone.data.results));
        // setDataTopSearch(dataTopSearch.concat(movieRespone.data.results));
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  };

  const handleEndReached = () => {
    setPage(++page);
    setLoading(true);
    getData();
  };

  const handleEndReachedTopSearch = () => {
    setPageTopSearch(++pageTopSearch);
    setLoadingTopSearch(true);
    getDataTopSearch();
  };

  const handleKeyDown = (e) => {
    navigation.navigate('movieShow', {
      currentMovies: 'search',
      title: input,
    });
    // if (e.nativeEvent.key === 'Enter') {
    //   console.log('Enter');
    //   // dismissKeyboard();
    // }
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 5,
          marginBottom: 20,
        }}
      >
        <ActivityIndicator size="small" />
        <Text>Loading...</Text>
      </View>
    );
  };

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Search</Text>
        <View style={styles.textInputContainer}>
          <Searchbar
            style={styles.textInput}
            placeholder="Type here..."
            onChangeText={onChangeText}
            onIconPress={handleKeyDown}
            // onKeyPress={handleKeyDown}
            value={input}
            autoFocus={false}
            elevation={2}
            iconColor={Colors.ACTIVE}
            loading={true}
            onClear={() => {
              setData([]);
              setLoading(true);
              setIsFocused(true);
            }}
          />
        </View>

        {isFocused ? (
          <View style={{ paddingBottom: 150 }}>
            <Text style={styles.headerTopSearch}>The most popular search</Text>
            <FlatList
              style={{ marginBottom: 55 }}
              data={dataTopSearch}
              showsHorizontalScrollIndicator={false}
              onEndReached={handleEndReachedTopSearch}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loadingTopSearch ? renderFooter : null}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <ItemSeparator width={15} />}
              ListHeaderComponent={() => <ItemSeparator width={10} />}
              renderItem={({ item }) => (
                <ItemTopSearch
                  item={item}
                  handleOnPress={() =>
                    navigation.navigate('movie', {
                      movieId: item.id,
                      item: item,
                    })
                  }
                />
              )}
            />
          </View>
        ) : null}
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? renderFooter : null}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={15} />}
          ListHeaderComponent={() => <ItemSeparator width={10} />}
          renderItem={({ item }) => (
            <ItemSearch
              item={item}
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
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  headerText: {
    fontSize: 30,
    fontFamily: Fonts.BOLD,
    color: Colors.ACTIVE,
    alignSelf: 'center',
    marginTop: 30,
  },

  textInputContainer: {
    marginTop: 10,
    backgroundColor: Colors.LIGHT_BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  textInput: {
    backgroundColor: Colors.EXTRA_LIGHT_GRAY,
    fontSize: 16,
    borderWidth: 0.5,
    marginHorizontal: 10,
    borderRadius: 30,
  },

  headerTopSearch: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    marginLeft: 25,
    paddingVertical: 10,
  },
});
export default Search;
