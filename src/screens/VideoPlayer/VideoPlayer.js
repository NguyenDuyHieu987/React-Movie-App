import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getMovieById } from '../../services/MovieService';
import AppLoading from 'expo-app-loading';

const VideoPlayer = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovieById(movieId, `videos`).then((movieRespone) =>
      setMovie(movieRespone.data)
    );
  }, []);
  return movie?.videos ? (
    <SafeAreaView>
      {/* <VideoPlayer
        video={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
      /> */}
      <YoutubePlayer
        height={300}
        play={true}
        videoId={
          movie.videos.results ? 'eEKfWVvADiQ' : movie.videos.results[0].key
        }
        // onChangeState={onStateChange}
      />
    </SafeAreaView>
  ) : (
    AppLoading
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({});
