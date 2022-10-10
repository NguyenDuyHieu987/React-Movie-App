const config = require('../../package.json');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch';

const TMDB_API_KEY = config.projectConfig.apiKey;
// const TMDB_API_KEY = 'fe1b70d9265fdb22caa86dca918116eb';

const ENDPOINTS = {
  NOW_PLAYING_MOVIES: '/movie/now_playing',
  UPCOMING_MOVIES: '/movie/upcoming',
  POPULAR: '/movie/popular',
  TOPRATED: '/movie/top_rated',
  GENRES: '/genre/movie/list',
  MOVIE: '/movie',
};

const APPEND_TO_RESPONSE = {
  VIDEOS: 'videos',
  CREDITS: 'credits',
  RECOMMENDATIONS: 'recommendations',
  SIMILAR: 'similar',
};

export {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
  ENDPOINTS,
  APPEND_TO_RESPONSE,
  YOUTUBE_BASE_URL,
};
