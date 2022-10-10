import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useCallback, Component } from 'react';
import MovieCard from '..//MovieCard';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Colors from '../../constants/Colors';

class DefaultPage extends Component {
  // const [shouldHide, setShouldHide] = useState(false);

  // const { currentMovies } = route.params;
  // const [data, setData] = useState(currentMovies);

  // useFocusEffect(
  //   useCallback(() => {
  //     // Do something when the screen is focused
  //     setShouldHide(false);
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //       setShouldHide(true);
  //     };
  //   }, [])
  // );

  // return shouldHide ? null : (
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      page: 1,
    };
  }

  componentDidMount() {
    this.setState(this.getData);
  }

  getData = async () => {
    var URL = `https://api.themoviedb.org/3/movie/${this.props.route.params.currentMovies}?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${this.state.page}`;
    switch (this.props.route.params.currentMovies) {
      case 'year':
        URL = `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&primary_release_date.lte=${this.props.route.params.title}-12-30&primary_release_date.gte=${this.props.route.params.title}-01-01&page=${this.state.page}`;
      default:
        break;
    }

    await axios.get(URL).then((resJson) => {
      this.setState({
        data: this.state.data.concat(resJson.data.results),
        loading: false,
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
  renderFooter = () => {
    return (
      <View style={{ alignItems: 'center', marginVertical: 10 }}>
        <ActivityIndicator size="small" />
        <Text>Loading...</Text>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={{ paddingTop: 10 }}
          spacing={10}
          data={this.state.data}
          numColumns={2}
          onEndReached={this.handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={this.state.loading ? this.renderFooter : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={true}
              size={0.8}
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
    );
  }
}

export default DefaultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
  },
});
