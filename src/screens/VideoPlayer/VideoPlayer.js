import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { useEffect, useState, memo } from 'react';
import { StatusBar } from 'expo-status-bar';
import YoutubePlayer from 'react-native-youtube-iframe';
import { getMovieById, getMovieSeriesById } from '../../services/MovieService';
import AppLoading from 'expo-app-loading';
import * as ScreenOrientation from 'expo-screen-orientation';
import Colors from '../../constants/Colors';
import Lottie from 'lottie-react-native';

const VideoPlayer = ({ route, navigation }) => {
  const [data, setData] = useState({});
  const [orientationIsLandscape, setOrientation] = useState(false);
  const [isEpisodes, setIsEpisodes] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.movieId) {
      getMovieSeriesById(route.params.movieId)
        .then((tvResponed) => {
          if (tvResponed?.data === null)
            getMovieById(route.params.movieId)
              .then((movieResponed) => {
                setIsEpisodes(false);
                setData(movieResponed?.data);
                setLoading(true);
              })
              .catch((e) => {
                if (axios.isCancel(e)) return;
              });
          else {
            setIsEpisodes(true);
            setData(tvResponed?.data);
            setLoading(true);
          }
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
        });
    } else {
      setData(route.params.dataMovie);
      setIsEpisodes(route.params.isEpisodes);
      setLoading(true);
    }
  }, []);

  const changeScreenOrientation = async () => {
    if (orientationIsLandscape == false) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else if (orientationIsLandscape == true) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  const toogleOrientation = () => {
    setOrientation(!orientationIsLandscape);
    changeScreenOrientation();
  };

  return loading ? (
    <SafeAreaView
      style={{
        backgroundColor: Colors.BLACK,
        flex: 1,
      }}
    >
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
          !data.videos?.results[0]?.key
            ? // 'eEKfWVvADiQ'
              'PKEc-PcNZSk&lis'
            : data.videos.results[0].key
        }
        // onChangeState={onStateChange}
        onFullScreenChange={toogleOrientation}
      />
    </SafeAreaView>
  ) : (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: Colors.BLACK,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.BLACK,
          height: 230,
        }}
      >
        {/* <ActivityIndicator
          size="large"
          color={Colors.RED}
          style={{ transform: [{ scale: 1.5 }] }}
        /> */}
        <Lottie
          source={require('../../../assets/animations/38763-youtube-logo-effect.json')}
          autoPlay
          loop
          style={{
            // height: 100,
            // width: 100,
            transform: [{ scale: 0.6 }],
          }}
        />
      </View>
    </View>
  );
};

export default memo(VideoPlayer);

const styles = StyleSheet.create({});
