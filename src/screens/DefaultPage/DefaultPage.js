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
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useCallback, Component } from 'react';
import MovieCard from '../../components/MovieCard';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Colors from '../../constants/Colors';
import {
  getDaTaMovie,
  getDaTaSearchMovie,
  getDaTaSearchTV,
  getDaTaTV,
  getMovieByCountry,
  getMoviesByGenres,
  getMoviesByYear,
  getTVByCountry,
  getTVByGenres,
  getTVByYear,
} from '../../services/MovieService';
import Fonts from '../../constants/Fonts';

const DefaultPage = ({ route, navigation }) => {
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
  const [data, setData] = useState([]);
  const [dataTV, setDataTV] = useState([]);
  const [loading, setLoading] = useState(false);
  var [page, setPage] = useState(1);
  const [isTVSelected, setIsTVSelected] = useState(false);

  useEffect(() => {
    getData();
  }, [isTVSelected]);

  const getData = async () => {
    switch (route.params.currentMovies) {
      case 'nowplaying':
      case 'upcoming':
      case 'popular':
      case 'toprated':
        getDaTaMovie(route.params.currentMovies, page)
          .then((movieRespone) => {
            setData(data.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        break;
      case 'genres':
        getMoviesByGenres(route.params.title, page)
          .then((movieRespone) => {
            setData(data.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        getTVByGenres(route.params.title, page)
          .then((movieRespone) => {
            setDataTV(dataTV.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      case 'year':
        getMoviesByYear(route.params.title, page)
          .then((movieRespone) => {
            setData(data.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        getTVByYear(route.params.title, page)
          .then((movieRespone) => {
            setDataTV(dataTV.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      case 'country':
        getMovieByCountry(route.params.title, page)
          .then((movieRespone) => {
            setData(data.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        getTVByCountry(route.params.title, page)
          .then((movieRespone) => {
            setDataTV(dataTV.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      case 'search':
        getDaTaSearchMovie(route.params.title, page)
          .then((movieRespone) => {
            setData(data.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });

        getDaTaSearchTV(route.params.title, page)
          .then((movieRespone) => {
            setDataTV(dataTV.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
      default:
        break;
    }
    switch (route.params.currentTV) {
      case 'airingtoday':
      case 'ontheair':
      case 'popular':
      case 'toprated':
        getDaTaTV(route.params.currentTV, page)
          .then((movieRespone) => {
            setDataTV(dataTV.concat(movieRespone.data.results));
            setLoading(false);
          })
          .catch((e) => {
            if (axios.isCancel(e)) return;
          });
        break;
      default:
        break;
    }
  };

  const handleEndReached = () => {
    setPage(++page);
    if (!loading) {
      setLoading(true);
    }
    getData();
  };
  const renderFooter = () => {
    return (
      <View
        style={{ alignItems: 'center', marginVertical: 10, marginBottom: 60 }}
      >
        <ActivityIndicator size="small" />
        <Text>Loading...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TVSubMenuContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setIsTVSelected(false);
          }}
        >
          <Text
            style={{
              ...styles.TVSubMenuText,
              color: isTVSelected ? Colors.LIGHT_GRAY : Colors.BLACK,
            }}
          >
            Movie
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setIsTVSelected(true);
          }}
        >
          <Text
            style={{
              ...styles.TVSubMenuText,
              color: isTVSelected ? Colors.BLACK : Colors.LIGHT_GRAY,
              marginLeft: 5,
            }}
          >
            TV Show
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listMovie}>
        <FlatList
          spacing={10}
          data={!isTVSelected ? data : dataTV}
          numColumns={3}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? renderFooter : null}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              id={item.id}
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={true}
              size={0.5}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  listMovie: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TVSubMenuText: {
    marginRight: 10,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  TVSubMenuContainer: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'flex-start',
  },
});

export default DefaultPage;
