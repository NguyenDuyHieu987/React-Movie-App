import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, { useState, memo, useEffect } from 'react';
import Colors from '../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import {
  getPoster,
  getLanguage,
  getMovieById,
} from '../../services/MovieService';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

const MovieCard = ({
  item,
  id,
  title,
  poster,
  language,
  voteAverage,
  voteCount,
  size,
  heartLess,
  handleOnPress,
}) => {
  const [liked, setLiked] = useState(false);
  const [voteCountValue, setVoteCountValue] = useState(voteCount);

  const [releaseDate, setReleaseDate] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=fe1b70d9265fdb22caa86dca918116eb`
      )
      .then((movieRespone) => {
        setReleaseDate(
          movieRespone.data?.results[0].release_dates[0].release_date.slice(
            0,
            4
          )
        );
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  }, []);
  return (
    <TouchableOpacity
      style={
        size === 0.5
          ? {
              marginHorizontal: 5,
              marginTop: 3,
            }
          : null
      }
      activeOpacity={0.5}
      onPress={handleOnPress}
    >
      <ImageBackground
        style={
          size === 0.5
            ? {
                ...styles.container,
                width: (width - 25) / 3.1,
                height: 340 * size,
              }
            : { ...styles.container, width: 230 * size, height: 340 * size }
        }
        imageStyle={{ borderRadius: 10 }}
        source={{ uri: getPoster(poster) }}
      >
        <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size }}>
          {/* <Image
            source={Images.IMDB}
            resizeMode="cover"
            style={styles.imdbImage}
          /> */}
          <Text style={styles.imdbImage}>IMDb</Text>
          <Text
            style={{
              ...styles.imdbRating,
              marginRight: 5 * size,
              fontSize: 14 * size,
            }}
          >
            {voteAverage}
          </Text>
        </View>
        {heartLess != false ? (
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
              size={25 * size}
              color={liked ? Colors.HEART : Colors.YELLOW}
              style={{
                position: 'absolute',
                bottom: 10,
                left: 12,
              }}
            />
          </TouchableNativeFeedback>
        ) : null}
      </ImageBackground>
      <View style={styles.movieContainer}>
        <Text
          style={
            size === 0.5
              ? { ...styles.movieTitle, width: (width - 25) / 3.1 }
              : { ...styles.movieTitle, width: 225 * size }
          }
          numberOfLines={size === 0.5 ? 1 : 3}
        >
          {item?.name ? item.name : item?.title}
        </Text>
        <View
          style={
            size === 0.5
              ? { ...styles.movieSubTitleContainer, width: (width - 25) / 3.1 }
              : { ...styles.movieSubTitleContainer, width: 225 * size }
          }
        >
          <Text style={styles.movieSubTitle}>
            {/* {getLanguage(language)?.english_name} */}
            {releaseDate}
          </Text>
          <View style={styles.rowAndCenter}>
            <Ionicons
              name="heart"
              size={20 * size}
              color={Colors.HEART}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.movieSubTitle}>{voteCountValue}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

MovieCard.defaultProps = {
  size: 1,
  heartLess: false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.LIGHT_GRAY,
    height: 340,
    width: 230,
    borderRadius: 12,
    elevation: 7,
    marginVertical: 2,
  },
  movieTitle: {
    fontFamily: Fonts.EXTRA_BOLD,
    color: Colors.GRAY,
    paddingVertical: 2,
    marginTop: 5,
    paddingHorizontal: 5,
    maxWidth: 230,
  },
  movieSubTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  movieSubTitle: {
    fontSize: 13,
    fontFamily: Fonts.REGULAR,
    marginLeft: 5,
  },
  rowAndCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    backgroundColor: Colors.YELLOW,
    borderTopRightRadius: 10,
    paddingVertical: 3,
    borderBottomLeftRadius: 6,
  },
  imdbImage: {
    // height: 20,
    fontFamily: Fonts.EXTRA_BOLD,
    color: Colors.BLACK,
    borderBottomLeftRadius: 6,
    marginHorizontal: 5,
  },
  imdbRating: {
    marginRight: 5,
    color: Colors.HEART,
    fontFamily: Fonts.EXTRA_BOLD,
  },
});

export default MovieCard;
