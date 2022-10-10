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
import React, { Component, useEffect, useState } from 'react';
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
} from '../../services/MovieService';
import { APPEND_TO_RESPONSE } from '../../constants/Urls';
import axios from 'axios';
import Images from '../../constants/Images';

const { height, width } = Dimensions.get('window');

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

class MovieScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMovies: {},
      dataCredits: {},
      dataSimiLar: {},
      dataRecommend: {},
      dataList: [],
      voteCountValue: this.props.route.params.item.vote_count,
      checkisInList: 'add',
      liked: false,
      isCastSelected: true,
    };
  }

  componentDidMount() {
    this.setState(this.getData);
  }

  getData = async () => {
    await getList().then((movieRespone) => {
      this.setState({
        dataList: movieRespone?.data.items,
      });
    });

    getMovieById(this.props.route.params.movieId, `videos`).then(
      (movieRespone) => {
        this.setState({
          dataMovies: movieRespone?.data,
        });
      }
    );

    await getMovieByCredit(this.props.route.params.movieId, `credits`).then(
      (movieRespone) => {
        this.setState({
          dataCredits: movieRespone?.data,
        });
      }
    );

    await getMovieBySimilar(this.props.route.params.movieId, `similar`).then(
      (movieRespone) => {
        this.setState({
          dataSimiLar: movieRespone?.data,
        });
      }
    );

    await getMovieByRecommend(
      this.props.route.params.movieId,
      `recommendations`
    ).then((movieRespone) => {
      this.setState({
        dataRecommend: movieRespone?.data,
      });
    });

    this.state.dataList.map((item) => {
      if (item?.id === this.props.route.params.movieId) {
        this.setState({
          checkisInList: 'checkmark',
        });
      }
    });
  };

  render() {
    const {
      dataMovies,
      dataCredits,
      dataSimiLar,
      dataRecommend,
      dataList,
      voteCountValue,
      checkisInList,
      liked,
      isCastSelected,
    } = this.state;
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
            onPress={() => this.props.navigation.goBack()}
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
              Linking.openURL(getVideo(dataMovies.videos.results[0].key))
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
                  this.setState({
                    liked: !liked,
                  });
                  this.setState(
                    liked
                      ? { voteCountValue: voteCountValue - 1 }
                      : { voteCountValue: voteCountValue + 1 }
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
                Linking.openURL(getVideo(dataMovies.videos.results[0].key))
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
                    axios.post(
                      'https://api.themoviedb.org/3/list/8215569/add_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
                      {
                        media_id: this.props.route.params.movieId,
                      }
                    );
                    this.setState({
                      checkisInList: 'checkmark',
                    });
                  } else if (checkisInList == 'checkmark') {
                    axios.post(
                      'https://api.themoviedb.org/3/list/8215569/remove_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
                      {
                        media_id: this.props.route.params.movieId,
                      }
                    );
                    this.setState({
                      checkisInList: 'add',
                    });
                  }
                }}
              >
                <Ionicons name={checkisInList} size={39} color={Colors.BLACK} />
              </TouchableOpacity>
              <Text style={{ fontFamily: Fonts.REGULAR }}>List</Text>
            </View>
          </View>
          <View style={styles.movieTitleContainer}>
            <View>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {dataMovies?.title}
              </Text>
              <Text style={styles.movieOriginalTitle} numberOfLines={2}>
                {'Original title: ' + dataMovies?.original_title}
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="star" size={22} color={Colors.YELLOW} />
              <Text style={styles.raitingText}>{dataMovies?.vote_average}</Text>
            </View>
          </View>
          <Text style={styles.genreText}>
            {'Genres: ' +
              dataMovies?.genres?.map((genre) => genre?.name)?.join(', ')}
          </Text>
          <Text style={styles.genreText}>
            {getLanguage(dataMovies?.original_language)?.english_name} |{' '}
            {dataMovies?.runtime} Min
          </Text>
          <Text style={styles.genreText}>
            {'Realease date: ' + dataMovies?.release_date}
          </Text>
          <View style={styles.overViewContainer}>
            <Text style={styles.overViewTitle}>Overview</Text>
            <Text style={styles.overViewText}>{dataMovies?.overview}</Text>
          </View>
          <View>
            {/* <Text style={styles.castTitle}>Cast</Text> */}
            <View style={styles.castSubMenuContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({
                    isCastSelected: true,
                  });
                }}
              >
                <Text
                  style={{
                    ...styles.castSubMenuText,
                    color: isCastSelected ? Colors.BLACK : Colors.LIGHT_GRAY,
                  }}
                >
                  Cast
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({
                    isCastSelected: false,
                  });
                }}
              >
                <Text
                  style={{
                    ...styles.castSubMenuText,
                    color: isCastSelected ? Colors.LIGHT_GRAY : Colors.BLACK,
                  }}
                >
                  Crew
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={{ marginVertical: 5 }}
              data={
                isCastSelected
                  ? dataCredits.credits?.cast
                  : dataCredits.credits?.crew
              }
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <ItemSeparator width={15} />}
              ListHeaderComponent={() => <ItemSeparator width={10} />}
              ListFooterComponent={() => <ItemSeparator width={10} />}
              renderItem={({ item }) => (
                <CastCard
                  originalname={item?.name}
                  characterName={isCastSelected ? item?.character : item?.job}
                  image={item?.profile_path}
                />
              )}
            />
          </View>
          <Text style={styles.extraListTitle}>Recommended Movives</Text>
          <FlatList
            data={dataRecommend?.recommendations?.results}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <ItemSeparator width={15} />}
            ListHeaderComponent={() => <ItemSeparator width={10} />}
            ListFooterComponent={() => <ItemSeparator width={10} />}
            renderItem={({ item }) => (
              <MovieCard
                title={item.title}
                language={item.original_language}
                voteAverage={item.vote_average}
                voteCount={item.vote_count}
                poster={item.poster_path}
                size={0.62}
                handleOnPress={() =>
                  this.props.navigation.push('movie', {
                    movieId: item.id,
                    item: item,
                  })
                }
              />
            )}
          />
          <Text style={styles.extraListTitle}>Similar Movives</Text>
          <FlatList
            data={dataSimiLar?.similar?.results}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <ItemSeparator width={15} />}
            ListHeaderComponent={() => <ItemSeparator width={10} />}
            ListFooterComponent={() => <ItemSeparator width={10} />}
            renderItem={({ item }) => (
              <MovieCard
                title={item.title}
                language={item.original_language}
                voteAverage={item.vote_average}
                voteCount={item.vote_count}
                poster={item.poster_path}
                size={0.62}
                handleOnPress={() =>
                  this.props.navigation.push('movie', {
                    movieId: item.id,
                    item: item,
                  })
                }
              />
            )}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
