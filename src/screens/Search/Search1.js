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
import React, { useState, useCallback, Component } from 'react';
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

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataTopSearch: [],
      loading: false,
      loadingTopSearch: false,
      page: 1,
      pageTopSearch: 1,
      isFocused: true,
      input: '',
      isMount: false,
    };
  }

  componentDidMount() {
    this.setState(this.getDataTopSearch);

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.setState(
        {
          isFocused: true,
        },
        this.getDataTopSearch
      );
    });

    this.focusListener = this.props.navigation.addListener('blur', () => {
      this.setState({
        data: [],
        dataTopSearch: [],
        input: '',
      });
    });
  }

  onChangeText = async (text) => {
    this.setState({
      input: text,
    });

    if (text.length == 0) {
      return this.setState({
        data: [],
        isFocused: true,
      });
    }

    if (text.length >= 1) {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&query=${text}`
        )
        .then((searchMovieResponse) =>
          this.setState({
            data: searchMovieResponse.data.results,
            loading: false,
            isFocused: false,
          })
        );
    }
  };

  getData = async () => {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&query=${this.state.input}&page=${this.state.page}`;

    await axios.get(URL).then((movieRespone) => {
      this.setState({
        data: this.state.data.concat(movieRespone.data.results),
        loading: false,
      });
    });
  };

  getDataTopSearch = async () => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_watch_monetization_types=flatrate&page=${this.state.pageTopSearch}`;

    await axios.get(URL).then((movieRespone) => {
      this.setState({
        dataTopSearch: this.state.dataTopSearch.concat(
          movieRespone.data.results
        ),
        loadingTopSearch: false,
      });
    });
  };

  handleEndReached = () => {
    this.setState(
      {
        page: this.state.page + 1,
        loading: true,
      },
      this.getData
    );
  };

  handleEndReachedTopSearch = () => {
    this.setState(
      {
        pageTopSearch: this.state.pageTopSearch + 1,
        loadingTopSearch: true,
      },
      this.getDataTopSearch
    );
  };

  renderFooter = () => {
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

  render() {
    const {
      data,
      dataTopSearch,
      loading,
      loadingTopSearch,
      page,
      pageTopSearch,
      isFocused,
      input,
      isMount,
    } = this.state;
    return (
      <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.headerText}>Search</Text>
          <View style={styles.textInputContainer}>
            <Searchbar
              style={styles.textInput}
              placeholder="Type here..."
              onChangeText={this.onChangeText}
              value={input}
              autoFocus={false}
              elevation={2}
              iconColor={Colors.ACTIVE}
              loading={true}
              onClear={() => {
                this.setState({
                  data: [],
                  loading: true,
                  isFocused: true,
                });
              }}
            />
          </View>

          {isFocused ? (
            <View style={{ paddingBottom: 150 }}>
              <Text style={styles.headerTopSearch}>
                The most popular search
              </Text>
              <FlatList
                style={{ marginBottom: 55 }}
                data={dataTopSearch}
                showsHorizontalScrollIndicator={false}
                onEndReached={this.handleEndReachedTopSearch}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  loadingTopSearch ? this.renderFooter : null
                }
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <ItemSeparator width={15} />}
                ListHeaderComponent={() => <ItemSeparator width={10} />}
                renderItem={({ item }) => (
                  <ItemTopSearch
                    item={item}
                    handleOnPress={() =>
                      this.props.navigation.navigate('movie', {
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
            onEndReached={this.handleEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? this.renderFooter : null}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={15} />}
            ListHeaderComponent={() => <ItemSeparator width={10} />}
            renderItem={({ item }) => (
              <ItemSearch
                item={item}
                handleOnPress={() =>
                  this.props.navigation.navigate('movie', {
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
  }
}

export default Search;

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
