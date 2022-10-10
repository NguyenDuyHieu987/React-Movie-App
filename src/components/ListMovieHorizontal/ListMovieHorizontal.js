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

const ListMovieHorizontal = ({
  data,
  sizeActivityIndicator,
  size,
  handleEndReached,
  loading,
  isMovieScreen,
  navigation,
  handleEndReachedTopRated,
}) => {
  const renderFooter = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 210 * sizeActivityIndicator,
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
  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? renderFooter() : null}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={10} />}
          ListHeaderComponent={() => <ItemSeparator width={10} />}
          renderItem={({ item }) => (
            <MovieCard
              item={item}
              id={item.id}
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={size}
              handleOnPress={() => {
                !isMovieScreen
                  ? navigation.navigate('movie', {
                      movieId: item.id,
                      item: item,
                    })
                  : navigation.push('movie', {
                      movieId: item.id,
                      item: item,
                    });
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(ListMovieHorizontal);

const styles = StyleSheet.create({});
