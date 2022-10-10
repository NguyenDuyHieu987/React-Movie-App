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
import React, {
  useState,
  useEffect,
  Component,
  createContext,
  memo,
} from 'react';
import Colors from '../../constants/Colors';
import GenreCard from '../../components/GenreCard';
import Fonts from '../../constants/Fonts';
import ItemSeparator from '../../components/ItemSeparator';
import MovieCard from '../../components/MovieCard';
import ListMovieHorizontal from '../../components/ListMovieHorizontal/ListMovieHorizontal';

const renderFooter = (size) => {
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
const ListsMovies = ({
  dataNowPlayingMovies,
  handleEndReachedNowPlaying,
  dataUpcomingMovies,
  handleEndReachedUpComing,
  dataPopularMovies,
  handleEndReachedPopular,
  dataTopRatedMovies,
  handleEndReachedTopRated,
  navigation,
  loadingNowPlaying,
  loadingUpComing,
  loadingPopular,
  loadingTopRated,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('movieShow', {
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
          onEndReached={handleEndReachedNowPlaying}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingNowPlaying ? renderFooter(1.62) : null}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={15} />}
          ListHeaderComponent={() => <ItemSeparator width={10} />}
          renderItem={({ item }) => (
            <MovieCard
              id={item.id}
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={true}
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

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('movieShow', {
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
          onEndReached={handleEndReachedUpComing}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingUpComing ? renderFooter(1) : null}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={10} />}
          ListHeaderComponent={() => <ItemSeparator width={10} />}
          renderItem={({ item }) => (
            <MovieCard
              id={item.id}
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.62}
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Popular</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('movieShow', {
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
          onEndReached={handleEndReachedPopular}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingPopular ? renderFooter(1) : null}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={10} />}
          ListHeaderComponent={() => <ItemSeparator width={10} />}
          renderItem={({ item }) => (
            <MovieCard
              id={item.id}
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.62}
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Top Rated</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('movieShow', {
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
          onEndReached={handleEndReachedTopRated}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingTopRated ? renderFooter(1) : null}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={10} />}
          ListHeaderComponent={() => <ItemSeparator width={10} />}
          renderItem={({ item }) => (
            <MovieCard
              id={item.id}
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.62}
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
export default memo(ListsMovies);
