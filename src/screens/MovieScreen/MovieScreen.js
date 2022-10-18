import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
  FlatList,
  TouchableNativeFeedback,
  Button,
  SafeAreaView,
} from 'react-native';
import React, { Component, useCallback, useEffect, useState } from 'react';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import Fonts from '../../constants/Fonts';
import { Feather, Ionicons } from '@expo/vector-icons';
import ItemSeparator from '../../components/ItemSeparator';
import CastCard from '../../components/CastCard';
import MovieCard from '../../components/MovieCard';
import AppLoading from 'expo-app-loading';
import Constants from 'expo-constants';
import {
  getMovieById,
  getPoster,
  getVideo,
  getLanguage,
  getMovieBySimilar,
  getMovieByRecommend,
  getMovieByCredit,
  getList,
  getMovieSeriesById,
  removeItemList,
  addItemList,
} from '../../services/MovieService';
import { APPEND_TO_RESPONSE } from '../../constants/Urls';
import axios from 'axios';
import Images from '../../constants/Images';
import DetailMovie from './DetailMovie';
import ContentLoader from 'react-content-loader/native';

const { height, width } = Dimensions.get('window');

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const MovieScreen = ({ movieId, route, navigation, item }) => {
  const [dataMovies, setDataMovies] = useState({});
  const [dataMoviesTV, setDataMoviesTV] = useState([]);
  const [dataCredits, setDataCredits] = useState([]);
  const [dataSimiLar, setDataSimiLar] = useState([]);
  const [dataRecommend, setDataRecommend] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [voteCountValue, setVoteCountValue] = useState(
    route.params.item.vote_count
  );
  const [checkisInList, setCheckisInList] = useState('add');
  const [liked, setLiked] = useState(false);
  const [isCastSelected, setIsCastSelected] = useState(true);
  const [pageRecommended, setPageRecommended] = useState(1);
  const [pageSimiLar, setPageSimiLar] = useState(1);
  const [loadingRecommended, setLoadingRecommended] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [isEpisodes, setIsEpisodes] = useState(false);

  useEffect(() => {
    getData();
  }, [route.params.movieId]);

  const getData = () => {
    getMovieSeriesById(route.params.movieId)
      .then((tvResponed) => {
        if (tvResponed?.data === null)
          getMovieById(route.params.movieId)
            .then((movieResponed) => {
              setIsEpisodes(false);
              setDataMovies(movieResponed?.data);
            })
            .catch((e) => {
              if (axios.isCancel(e)) return;
            });
        else {
          setIsEpisodes(true);
          setDataMovies(tvResponed?.data);
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    getList()
      .then((movieRespone) => {
        setDataList(movieRespone?.data.items);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    getMovieByCredit(isEpisodes ? 'tv' : 'movie', route.params.movieId)
      .then((movieRespone) => {
        setDataCredits(movieRespone?.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });

    // getMovieByRecommend(
    //   isEpisodes ? 'tv' : 'movie',
    //   route.params.movieId,
    //   `recommendations`,
    //   pageRecommended
    // )
    //   .then((movieRespone) => {
    //     setDataRecommend(movieRespone.data.recommendations.results);
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });

    getMovieByRecommend(pageRecommended)
      .then((movieRespone) => {
        setDataRecommend(movieRespone.data.results);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  };

  useEffect(() => {
    dataList.map((item) => {
      if (item?.id === route.params.movieId) {
        setCheckisInList('checkmark');
      }
    });
  }, [dataList || dataMovies]);

  useEffect(() => {
    //  getMovieBySimilar(
    //   isEpisodes ? 'tv' : 'movie',
    //   route.params.movieId,
    //   `similar`,
    //   pageSimiLar
    // )
    //   .then((movieRespone) => {
    //     setDataSimiLar(movieRespone.data.similar.results);
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return;
    //   });
    if (dataMovies?.genres !== undefined) {
      getMovieBySimilar(
        isEpisodes ? 'tv' : 'movie',
        dataMovies.genres[0],
        pageSimiLar
      )
        .then((movieResponed) => {
          setDataSimiLar(movieResponed?.data.results);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }
  }, [dataMovies.genres]);

  const handleEndReachedRecommendations = useCallback(() => {
    setPageRecommended(pageRecommended + 1);
    setLoadingRecommended(true);
    getMovieByRecommend(pageRecommended)
      .then((movieRespone) => {
        setDataRecommend(dataRecommend.concat(movieRespone.data.results));
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }, [dataRecommend]);

  const handleEndReachedSimiLar = useCallback(() => {
    setPageSimiLar(pageSimiLar + 1);
    setLoadingSimilar(true);
    if (dataMovies?.genres !== undefined) {
      getMovieBySimilar(
        isEpisodes ? 'tv' : 'movie',
        dataMovies.genres[0],
        pageSimiLar
      )
        .then((movieRespone) => {
          setDataSimiLar(dataSimiLar.concat(movieRespone.data.results));
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    }
  }, [dataSimiLar]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="auto"
        translucent={true}
        backgroundColor="transparent"
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather
            name="chevron-left"
            size={35}
            color={Colors.YELLOW}
            style={{ left: -7, fontFamily: Fonts.EXTRA_BOLD }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            Share.share({
              message: `${dataMovies?.title}\n\n${dataMovies?.homepage}`,
            })
          }
        >
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* <LinearGradient
            colors={['rgba(0, 0, 0, 0.5)', 'rgba(217, 217, 217, 0)']}
            start={[0, 0.3]}
            style={styles.linearGradient}
          /> */}
        <View style={styles.moviePosterImageContainer}>
          <Image
            style={styles.moviePosterImage}
            resizeMode="contain"
            source={
              dataMovies?.backdrop_path
                ? { uri: getPoster(dataMovies?.backdrop_path) }
                : Images?.NO_IMAGE
            }
          />
        </View>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() =>
            // Linking.openURL(getVideo(dataMovies.videos.results[0].key))
            navigation.navigate('video', {
              dataMovie: dataMovies,
              isEpisodes: isEpisodes,
            })
          }
        >
          <Ionicons
            name="play-circle-outline"
            size={70}
            color={Colors.YELLOW}
          />
        </TouchableOpacity>
        <ItemSeparator height={setHeight(42)} />
        <View style={styles.addListContainer}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableNativeFeedback
              onPress={() => {
                setLiked(!liked);
                setVoteCountValue(
                  liked ? voteCountValue - 1 : voteCountValue + 1
                );
              }}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={30}
                color={liked ? Colors.HEART : Colors.BLACK}
              />
            </TouchableNativeFeedback>
            <Text>{voteCountValue}</Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: Colors.EXTRA_LIGHT_GRAY,
              paddingHorizontal: 20,
              height: 45,
            }}
            onPress={() =>
              // Linking.openURL(getVideo(dataMovies.videos.results[0].key))
              navigation.navigate('video', {
                dataMovie: dataMovies,
                isEpisodes: isEpisodes,
              })
            }
            activeOpacity={0.5}
          >
            <Ionicons
              name="play"
              size={27}
              color={Colors.BLACK}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontFamily: Fonts.REGULAR }}>Play</Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                if (checkisInList == 'add') {
                  // axios.post(
                  //   'https://api.themoviedb.org/3/list/8215569/add_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
                  //   {
                  //     media_id: route.params.movieId,
                  //   }
                  // );
                  addItemList({
                    media_type: isEpisodes ? 'tv' : 'movie',
                    media_id: +route.params.movieId,
                  });
                  setCheckisInList('checkmark');
                } else if (checkisInList == 'checkmark') {
                  // axios.post(
                  //   'https://api.themoviedb.org/3/list/8215569/remove_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
                  //   {
                  //     media_id: route.params.movieId,
                  //   }
                  // );
                  removeItemList({
                    media_id: +route.params.movieId,
                  });
                  setCheckisInList('add');
                }
              }}
            >
              <Ionicons name={checkisInList} size={39} color={Colors.BLACK} />
            </TouchableOpacity>
            <Text style={{ fontFamily: Fonts.REGULAR }}>List</Text>
          </View>
        </View>
        <DetailMovie
          navigation={navigation}
          dataMovies={dataMovies}
          dataCredits={dataCredits}
          dataRecommend={dataRecommend}
          dataSimiLar={dataSimiLar}
          isCastSelected={isCastSelected}
          setIsCastSelected={setIsCastSelected}
          handleEndReachedRecommendations={handleEndReachedRecommendations}
          handleEndReachedSimiLar={handleEndReachedSimiLar}
          loadingRecommended={loadingRecommended}
          loadingSimilar={loadingSimilar}
          isEpisodes={isEpisodes}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: 'center',
    position: 'absolute',
    left: setWidth(-46 / 2),
    top: 40,
    borderBottomRightRadius: 260,
    borderBottomLeftRadius: 260,
    elevation: 15,
  },
  moviePosterImage: {
    borderBottomRightRadius: 260,
    borderBottomLeftRadius: 260,
    width: setWidth(145),
    height: setHeight(35),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(10),
    position: 'absolute',
    top: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
    left: 0,
    top: Constants.statusBarHeight - 5,
    elevation: 20,
    zIndex: 2,
  },
  headerText: {
    color: Colors.YELLOW,
    padding: 5,
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 20,
  },
  playButton: {
    position: 'absolute',
    top: 130,
    left: setWidth(50) - 70 / 2,
  },
  addListContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  movieTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  movieTitle: {
    color: Colors.BLACK,
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(60),
  },
  movieOriginalTitle: {
    marginTop: 5,
    fontFamily: Fonts.REGULAR,
    width: setWidth(60),
  },
  raitingText: {
    marginLeft: 5,
    color: Colors.BLACK,
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genreText: {
    color: Colors.LIGHT_GRAY,
    paddingHorizontal: 20,
    marginTop: 5,
    fontFamily: Fonts.BOLD,
    fontSize: 13,
  },
  overViewContainer: {
    backgroundColor: Colors.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overViewTitle: {
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  overViewText: {
    color: Colors.LIGHT_GRAY,
    paddingVertical: 5,
    fontFamily: Fonts.BOLD,
    fontSize: 13,
    textAlign: 'justify',
  },
  castTitle: {
    marginLeft: 20,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  extraListTitle: {
    marginLeft: 20,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
    marginVertical: 8,
  },
});

export default MovieScreen;
