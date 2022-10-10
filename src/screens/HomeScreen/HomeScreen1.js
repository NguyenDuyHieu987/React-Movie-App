import { StatusBar } from 'expo-status-bar';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Button,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  TouchableNativeFeedback,
} from 'react-native';
import React, { useState, useEffect, Component, createContext } from 'react';
import Colors from '../../constants/Colors';
import GenreCard from '../../components/GenreCard';
import ItemSeparator from '../../components/ItemSeparator';
import Fonts from '../../constants/Fonts';
import MovieCard from '../../components/MovieCard';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getAllGenres,
  getTrending,
  getPoster,
  getMovieById,
  getList,
  getMoviesByGenresNowPlaying,
  getMoviesByGenresUpComing,
  getMoviesByGenresPopular,
  getMoviesByGenresTopRated,
  getMoviesByYear,
} from '../../services/MovieService';
import {
  nowPlayingRespone,
  upComingRespone,
  popularRespone,
  topRatedRespone,
  genreResponse,
} from '../../JsonServer';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import Slideshow from 'react-native-image-slider-show';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import axios from 'axios';
import Images from '../../constants/Images';
import Constants from 'expo-constants';
export const addContext = createContext();
import DropDownPicker from 'react-native-dropdown-picker';

const { height, width } = Dimensions.get('window');
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataList: [],
      dataNowPlayingMovies: [],
      dataUpcomingMovies: [],
      dataPopularMovies: [],
      dataTopRatedMovies: [],
      dataTrendingMoives: {},
      activeGenre: 'All',
      refreshing: false,
      randomPoster: Math.floor(Math.random() * 20),
      images: [],
      position: 1,
      pageNowPlaying: 1,
      pageUpComing: 1,
      pagePopular: 1,
      pageTopRated: 1,
      loadingNowPlaying: false,
      loadingUpComing: false,
      loadingPopular: false,
      loadingTopRated: false,
      checkisInList: 'add',
      open: false,
      value: null,
      dataGenres: [],
      chooseGenre: 'All',
      isVisibleGenres: false,
      years: [
        '2022',
        '2021',
        '2020',
        '2019',
        '2018',
        '2017',
        '2016',
        '2015',
        '2014',
        '2013',
        '2012',
        '2011',
        '2010',
        '2009',
        '2008',
        '2007',
        '2006',
        '2005',
        '2004',
        '2003',
        '2002',
        '2001',
        '2000',
      ],
      isVisibleYears: false,
    };
  }

  componentDidMount = () => {
    this.setState({ dataGenres: genreResponse.genres });
    this.setState(this.getData);
    this.setState(this.getDataTrending);

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.intervalId = setInterval(
        this.getDataTrending.bind(this.state.dataTrendingMoives),
        15000
      );
    });

    this.state.dataList.map((item) => {
      if (item.id === this.state.dataTrendingMoives.id) {
        this.setState({
          checkisInList: 'checkmark',
        });
      }
    });

    this.focusListener = this.props.navigation.addListener('blur', () => {
      clearInterval(this.intervalId);
    });
  };

  getDataTrending = async () => {
    await getTrending().then((movieRespone) => {
      this.setState({
        dataTrendingMoives:
          movieRespone?.data?.results[this.state.randomPoster],
        checkisInList: 'add',
      });
    });
  };

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getData = async () => {
    await getList().then((movieRespone) => {
      this.setState({
        dataList: movieRespone?.data?.items,
      });
    });

    await getNowPlayingMovies(this.state.pageNowPlaying).then(
      (movieRespone) => {
        this.setState({
          dataNowPlayingMovies: this.state.dataNowPlayingMovies.concat(
            movieRespone.data.results
          ),
          loadingNowPlaying: false,
        });
      }
    );

    await getUpcomingMovies(this.state.pageUpComing).then((movieRespone) => {
      this.setState({
        dataUpcomingMovies: this.state.dataUpcomingMovies.concat(
          movieRespone.data.results
        ),
        loadingUpComing: false,
      });
    });

    await getPopularMovies(this.state.pagePopular).then((movieRespone) => {
      this.setState({
        dataPopularMovies: this.state.dataPopularMovies.concat(
          movieRespone.data.results
        ),
        loadingPopular: false,
      });
    });

    await getTopRatedMovies(this.state.pageTopRated).then((movieRespone) => {
      this.setState({
        dataTopRatedMovies: this.state.dataTopRatedMovies.concat(
          movieRespone.data.results
        ),
        loadingTopRated: false,
      });
    });
  };

  handleEndReachedNowPlaying = async () => {
    this.setState(
      {
        pageNowPlaying: this.state.pageNowPlaying + 1,
        loadingNowPlaying: true,
      },
      await getNowPlayingMovies(this.state.pageNowPlaying).then(
        (movieRespone) => {
          this.setState({
            dataNowPlayingMovies: this.state.dataNowPlayingMovies.concat(
              movieRespone.data.results
            ),
            loadingNowPlaying: false,
          });
        }
      )
    );
  };

  handleEndReachedUpComing = async () => {
    this.setState(
      {
        pageUpComing: this.state.pageUpComing + 1,
        loadingUpComing: true,
      },
      await getUpcomingMovies(this.state.pageUpComing).then((movieRespone) => {
        this.setState({
          dataUpcomingMovies: this.state.dataUpcomingMovies.concat(
            movieRespone.data.results
          ),
          loadingUpComing: false,
        });
      })
    );
  };

  handleEndReachedPopular = async () => {
    this.setState(
      {
        pagePopular: this.state.pagePopular + 1,
        loadingPopular: true,
      },
      await getPopularMovies(this.state.pagePopular).then((movieRespone) => {
        this.setState({
          dataPopularMovies: this.state.dataPopularMovies.concat(
            movieRespone.data.results
          ),
          loadingPopular: false,
        });
      })
    );
  };

  handleEndReachedTopRated = async () => {
    this.setState(
      {
        pageTopRated: this.state.pageTopRated + 1,
        loadingTopRated: true,
      },
      await getTopRatedMovies(this.state.pageTopRated).then((movieRespone) => {
        this.setState({
          dataTopRatedMovies: this.state.dataTopRatedMovies.concat(
            movieRespone.data.results
          ),
          loadingTopRated: false,
        });
      })
    );
  };

  renderFooter = (size) => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 210 * size,
          marginHorizontal: 5,
        }}
      >
        <View>
          <ActivityIndicator size="small" />
          <Text>Loading...</Text>
        </View>
      </View>
    );
  };

  getDataByGenres = async (genreName) => {
    await getMoviesByGenresNowPlaying(
      this.state.pageNowPlaying,
      genreName
    ).then((movieRespone) => {
      this.setState({
        dataNowPlayingMovies: movieRespone?.data.results,
      });
    });

    await getMoviesByGenresUpComing(this.state.pageUpComing, genreName).then(
      (movieRespone) => {
        this.setState({
          dataUpcomingMovies: movieRespone?.data.results,
        });
      }
    );

    await getMoviesByGenresPopular(this.state.pagePopular, genreName).then(
      (movieRespone) => {
        this.setState({
          dataPopularMovies: movieRespone?.data.results,
        });
      }
    );

    await getMoviesByGenresTopRated(this.state.pageTopRated, genreName).then(
      (movieRespone) => {
        this.setState({
          dataTopRatedMovies: movieRespone?.data.results,
        });
      }
    );
  };

  handleRefresh = (genreName) => {
    this.setState({
      activeGenre: genreName,
    });
    if (genreName === 'All') {
      this.setState(this.getData);
    } else {
      this.setState(this.getDataByGenres(genreName));
    }
  };

  setOpen(open) {
    this.setState({
      open,
    });
  }

  setValue(callback) {
    this.setState((state) => ({
      value: callback(state.value),
    }));
  }

  setItems(callback) {
    this.setState((state) => ({
      dataGenres: callback(state.items),
    }));
  }

  // getPosterPath = () => {
  //   this.state.dataTrendingMoives.map((item) => {
  //     var a = { url: getPoster(item?.backdrop_path) };
  //     this.state.images = [...this.state.images, a];
  //   });
  //   return this.state.images;
  // };

  changeGenresVisbility = (bool) => {
    this.setState({
      isVisibleGenres: bool,
    });
  };

  changeYearsVisbility = (bool) => {
    this.setState({
      isVisibleYears: bool,
    });
  };
  componentDidUpdate() {}

  render() {
    const {
      loading,
      dataList,
      dataNowPlayingMovies,
      dataUpcomingMovies,
      dataPopularMovies,
      dataTopRatedMovies,
      dataTrendingMoives,
      activeGenre,
      refreshing,
      randomPoster,
      images,
      position,
      pageNowPlaying,
      pageUpComing,
      pagePopular,
      pageTopRated,
      loadingNowPlaying,
      loadingUpComing,
      loadingPopular,
      loadingTopRated,
      checkisInList,
      open,
      value,
      dataGenres,
      chooseGenre,
      isVisibleGenres,
      years,
      isVisibleYears,
    } = this.state;

    return dataNowPlayingMovies != [] &&
      dataUpcomingMovies != [] &&
      dataPopularMovies != [] &&
      dataTopRatedMovies != [] ? (
      <SafeAreaView style={styles.container}>
        <StatusBar
          style="auto"
          translucent={true}
          backgroundColor="transparent"
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            position: 'absolute',
            left: 0,
            right: 0,
            paddingTop: Constants.statusBarHeight + 5,
            zIndex: 2,
          }}
        >
          <LinearGradient
            colors={['rgba(217, 217, 217, 1)', 'rgba(0, 0, 0, 0)']}
            start={[1, 0]}
            end={[1, 1]}
            style={{
              width: width,
              height: 90,
              position: 'absolute',
              top: 0,
              backgroundColor: Colors.BLACK,
              opacity: 0.2,
            }}
          />
          <Image
            source={Images.NETFLIX}
            style={{
              transform: [{ scale: 1.1 }],
            }}
          />
          {/* <DropDownPicker
            open={open}
            value={null}
            items={dataGenres}
            multiple={true}
            setOpen={this.setOpen}
            setValue={this.setValue}
            setItems={this.setItems}
            key={(item, index) => index.toString()}
          /> */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SafeAreaView>
              <TouchableOpacity
                style={{ marginRight: 5, padding: 5 }}
                onPress={() => {
                  this.changeYearsVisbility(!isVisibleYears);
                }}
              >
                <Ionicons name="filter" size={20} />
              </TouchableOpacity>

              <Modal
                transparent={true}
                animationType="fade"
                visible={isVisibleYears}
                onRequestClose={() => this.changeYearsVisbility(false)}
              >
                <TouchableOpacity
                  onPress={() => this.changeYearsVisbility(false)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      width: width - 20,
                      height: height / 1.7,
                      borderRadius: 10,
                      backgroundColor: Colors.BLACK,
                      paddingHorizontal: 20,
                      top: -50,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        paddingVertical: 10,
                        textAlign: 'center',
                      }}
                    >
                      Years
                    </Text>
                    <ScrollView>
                      {years.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            this.props.navigation.navigate('movieShow', {
                              currentMovies: 'year',
                              title: item,
                            });
                            this.changeYearsVisbility(false);
                          }}
                          activeOpacity={0.5}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontFamily: Fonts.REGULAR,
                              paddingVertical: 15,
                              borderTopColor: Colors.LIGHT_GRAY,
                              borderWidth: 0.2,
                            }}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              </Modal>
            </SafeAreaView>
            <SafeAreaView>
              <TouchableOpacity
                style={{
                  padding: 5,
                }}
                onPress={() => this.changeGenresVisbility(!isVisibleGenres)}
                activeOpacity={0.5}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Fonts.REGULAR,
                      marginRight: 5,
                    }}
                  >
                    {chooseGenre}
                  </Text>
                  <Ionicons
                    name={isVisibleGenres ? 'caret-up' : 'caret-down'}
                    size={16}
                    color="black"
                  />
                </View>
              </TouchableOpacity>
              <Modal
                transparent={true}
                animationType="fade"
                visible={isVisibleGenres}
                onRequestClose={() => this.changeGenresVisbility(false)}
              >
                <TouchableOpacity
                  onPress={() => this.changeGenresVisbility(false)}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{
                      width: width - 20,
                      height: height / 1.7,
                      borderRadius: 10,
                      backgroundColor: Colors.BLACK,
                      paddingHorizontal: 20,
                      top: -50,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        paddingVertical: 10,
                        textAlign: 'center',
                      }}
                    >
                      Genres
                    </Text>
                    <ScrollView>
                      {dataGenres.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            this.setState({
                              chooseGenre: item.name,
                            });
                            this.handleRefresh(item.name);
                            this.changeGenresVisbility(false);
                          }}
                          activeOpacity={0.5}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              fontFamily: Fonts.REGULAR,
                              paddingVertical: 15,
                              borderTopColor: Colors.LIGHT_GRAY,
                              borderWidth: 0.2,
                              color:
                                activeGenre == item.name
                                  ? Colors.ACTIVE
                                  : Colors.WHITE,
                            }}
                          >
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </TouchableOpacity>
              </Modal>
            </SafeAreaView>
          </View>

          {/* <Image
            source={Images.ACCOUNT}
            style={{ width: 48, height: 32, borderRadius: 10 }}
            resizeMode="cover"
          /> */}
        </View>

        <ScrollView>
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                this.props.navigation.navigate('movie', {
                  movieId: dataTrendingMoives.id,
                  item: dataTrendingMoives,
                })
              }
            >
              <ImageBackground
                source={{
                  uri: getPoster(dataTrendingMoives?.poster_path),
                }}
                resizeMode="cover"
                style={{
                  height: height / 1.45,
                  width: width,
                }}
              />

              <LinearGradient
                colors={['rgba(217, 217, 217, 0)', 'rgba(0, 0, 0, 1)']}
                start={[1, 0]}
                end={[1, 1]}
                style={{
                  width: width,
                  height: 150,
                  position: 'absolute',
                  bottom: 0,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: width,
                position: 'absolute',
                alignSelf: 'center',
                alignItems: 'center',
                bottom: 0,
                zIndex: 10,
              }}
            >
              <Text
                numberOfLines={2}
                style={{
                  color: Colors.BLACK,
                  fontFamily: Fonts.EXTRA_BOLD,
                  fontSize: 22,
                  textAlign: 'center',
                  width: width / 1.3,
                  marginBottom: 5,
                  opacity: 0.85,
                }}
              >
                {!dataTrendingMoives?.name
                  ? dataTrendingMoives?.title
                  : dataTrendingMoives?.name}
              </Text>

              <View
                style={{
                  width: width,
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() =>
                    this.props.navigation.navigate('video', {
                      movieId: dataTrendingMoives.id,
                      item: dataTrendingMoives,
                    })
                  }
                >
                  <Ionicons name="play" size={45} color={Colors.BLACK} />
                  <Text
                    style={{
                      fontFamily: Fonts.REGULAR,
                      fontSize: 20,
                      color: Colors.BLACK,
                      opacity: 0.7,
                    }}
                  >
                    Play
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    if (checkisInList === 'add') {
                      axios.post(
                        'https://api.themoviedb.org/3/list/8215569/add_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
                        {
                          media_id: dataTrendingMoives?.id,
                        }
                      );
                      this.setState({
                        checkisInList: 'checkmark',
                      });
                    } else if (checkisInList === 'checkmark') {
                      axios.post(
                        'https://api.themoviedb.org/3/list/8215569/remove_item?api_key=fe1b70d9265fdb22caa86dca918116eb&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d',
                        {
                          media_id: dataTrendingMoives?.id,
                        }
                      );
                      this.setState({
                        checkisInList: 'add',
                      });
                    }
                  }}
                >
                  <Ionicons
                    name={checkisInList}
                    size={45}
                    color={Colors.BLACK}
                  />
                  <Text
                    style={{
                      fontFamily: Fonts.REGULAR,
                      fontSize: 20,
                      color: Colors.BLACK,
                      opacity: 0.7,
                    }}
                  >
                    List
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <Slideshow
            dataSource={this.getPosterPath()}
            position={position}
            onPositionChanged={(position) => this.setState({ position })}
            containerStyle={{
              height: height / 1.45,
              width: width,
            }}
          /> */}

          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
              marginTop: 10,
            }}
          >
            <Text style={styles.headerTitle}>Genres</Text>
          </View>
          <View style={styles.genreListContainer}>
            <FlatList
              data={dataGenres}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <ItemSeparator width={15} />}
              ListHeaderComponent={() => <ItemSeparator width={10} />}
              ListFooterComponent={() => <ItemSeparator width={10} />}
              renderItem={({ item }) => (
                <GenreCard
                  genreName={item.name}
                  active={item.name === activeGenre ? true : false}
                  onPress={(genreName) => {
                    this.handleRefresh(genreName);
                  }}
                />
              )}
            />
          </View> */}

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Now Playing</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('movieShow', {
                  currentMovies: 'now_playing',
                  title: 'Now Playing',
                })
              }
            >
              <Text style={styles.headerSubTile}>View All</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={dataNowPlayingMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              onEndReached={this.handleEndReachedNowPlaying}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loadingNowPlaying ? this.renderFooter(1.62) : null
              }
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <ItemSeparator width={15} />}
              ListHeaderComponent={() => <ItemSeparator width={10} />}
              renderItem={({ item }) => (
                <MovieCard
                  title={item.title}
                  language={item.original_language}
                  voteAverage={item.vote_average}
                  voteCount={item.vote_count}
                  poster={item.poster_path}
                  heartLess={true}
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

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Coming Soon</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('movieShow', {
                  currentMovies: 'upcoming',
                  title: 'Coming Soon',
                })
              }
            >
              <Text style={styles.headerSubTile}>View All</Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={dataUpcomingMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              onEndReached={this.handleEndReachedUpComing}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loadingUpComing ? this.renderFooter(1) : null
              }
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <ItemSeparator width={10} />}
              ListHeaderComponent={() => <ItemSeparator width={10} />}
              renderItem={({ item }) => (
                <MovieCard
                  title={item.title}
                  language={item.original_language}
                  voteAverage={item.vote_average}
                  voteCount={item.vote_count}
                  poster={item.poster_path}
                  size={0.62}
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

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Popular</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('movieShow', {
                  currentMovies: 'popular',
                  title: 'Popular',
                })
              }
            >
              <Text style={styles.headerSubTile}>View All</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={dataPopularMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              onEndReached={this.handleEndReachedPopular}
              onEndReachedThreshold={0.5}
              ListFooterComponent={loadingPopular ? this.renderFooter(1) : null}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <ItemSeparator width={10} />}
              ListHeaderComponent={() => <ItemSeparator width={10} />}
              renderItem={({ item }) => (
                <MovieCard
                  title={item.title}
                  language={item.original_language}
                  voteAverage={item.vote_average}
                  voteCount={item.vote_count}
                  poster={item.poster_path}
                  size={0.62}
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

          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>Top Rated</Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('movieShow', {
                  currentMovies: 'top_rated',
                  title: 'Top Rated',
                })
              }
            >
              <Text style={styles.headerSubTile}>View All</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={dataTopRatedMovies}
              horizontal
              showsHorizontalScrollIndicator={false}
              onEndReached={this.handleEndReachedTopRated}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                this.state.loadingTopRated ? this.renderFooter(1) : null
              }
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => <ItemSeparator width={10} />}
              ListHeaderComponent={() => <ItemSeparator width={10} />}
              renderItem={({ item }) => (
                <MovieCard
                  title={item.title}
                  language={item.original_language}
                  voteAverage={item.vote_average}
                  voteCount={item.vote_count}
                  poster={item.poster_path}
                  size={0.62}
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
        </ScrollView>
      </SafeAreaView>
    ) : (
      <AppLoading />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Fonts.REGULAR,
  },
  headerSubTile: {
    fontSize: 16,
    color: Colors.ACTIVE,
    fontFamily: Fonts.BOLD,
    bordervaColor: Colors.LIGHT_GRAY,
    padding: 3,
    paddingHorizontal: 7,
  },
  genreListContainer: {
    marginTop: 20,
  },
});

export default HomeScreen;
