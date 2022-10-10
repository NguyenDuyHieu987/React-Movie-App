const axios = require('axios').default;
import {
  TMDB_BASE_URL,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
  ENDPOINTS,
  YOUTUBE_BASE_URL,
} from '../constants/Urls';
import LANGUAGES from '../constants/Languages';
import {
  nowPlayingRespone,
  upComingRespone,
  popularRespone,
  topRatedRespone,
  genreResponse,
} from '../JsonServer';

const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

const getTrending = () =>
  axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${Math.floor(
      Math.random() * 1000
    )}`
  );

const getList = () =>
  axios.get(
    `https://api.themoviedb.org/3/list/8215569?api_key=fe1b70d9265fdb22caa86dca918116eb`
  );

const getWatchList = () =>
  axios.get(
    `https://api.themoviedb.org/3/account/14271386/watchlist/movies?api_key=fe1b70d9265fdb22caa86dca918116eb&language=en-US&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d&sort_by=created_at.asc&`
  );

const getWatchListPage = (page) =>
  axios.get(
    `https://api.themoviedb.org/3/account/14271386/watchlist/movies?api_key=fe1b70d9265fdb22caa86dca918116eb&language=en-US&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d&sort_by=created_at.asc&page=${page}`
  );

const getNowPlayingMovies = (page) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
  );

const getUpcomingMovies = (page) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
  );

const getPopularMovies = (page) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
  );

const getTopRatedMovies = (page) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
  );

const getMoviesByYear = (year, page) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&primary_release_date.lte=${year}-12-30&primary_release_date.gte=${year}-01-01&page=${page}`
  );
const getTVByYear = (year, page) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/tv?api_key=fe1b70d9265fdb22caa86dca918116eb&primary_release_date.lte=${year}-12-30&primary_release_date.gte=${year}-01-01&page=${page}`
  );
// const getMovieById = (movieId, append_to_response = '') =>
//   TMDB_HTTP_REQUEST.get(
//     `${ENDPOINTS.MOVIE}/${movieId}`,
//     append_to_response ? { params: { append_to_response } } : null
//   );

// const getMovieByIdSimilarRecommend = (movieId, append_to_response = '') =>
//   TMDB_HTTP_REQUEST.get(
//     `${ENDPOINTS.MOVIE}/${movieId}`,
//     append_to_response ? { params: { append_to_response } } : null
//   );

// getMovieById(616037, 'credits, videos, recommendations, similar').then((a) =>
//   console.log(a.data.credits.cast)
// );

const getMovieById = (movieId, append_to_response) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=${append_to_response}`
  );

const getMovieSeries = async (page) =>
  axios.get(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
  );

const getMovieSeriesById = async (movieid) =>
  axios.get(
    `https://api.themoviedb.org/3/tv/${movieid}?api_key=fe1b70d9265fdb22caa86dca918116eb`
  );

const getMovieByCredit = (type, movieId, append_to_response) =>
  axios.get(
    `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=${append_to_response}`
  );

const getMovieBySimilar = (type, movieId, append_to_response, page) =>
  axios.get(
    `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=${append_to_response}&page=${page}`
  );

const getMovieByRecommend = (type, movieId, append_to_response, page) =>
  axios.get(
    `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=${append_to_response}&page=${page}`
  );

const getAllGenres = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

const getIdGenresByName = (genres_name) =>
  genreResponse.genres.find((gen) => (gen.name == genres_name ? gen : null));

const getMoviesByGenresNowPlaying = (page, genres_name) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_genres=${
      getIdGenresByName(genres_name).id
    }&page=${page}`
  );

const getMoviesByGenresUpComing = (page, genres_name) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_genres=${
      getIdGenresByName(genres_name).id
    }&page=${page + 1}`
  );

const getMoviesByGenresPopular = (page, genres_name) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_genres=${
      getIdGenresByName(genres_name).id
    }&page=${page + 5}`
  );

const getMoviesByGenresTopRated = (page, genres_name) =>
  axios.get(
    `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&with_genres=${
      getIdGenresByName(genres_name).id
    }&page=${page + 9}`
  );
const getMoviesBySeason = (movieid, season) =>
  axios.get(
    `https://api.themoviedb.org/3/tv/${movieid}/season/${season}}?api_key=fe1b70d9265fdb22caa86dca918116eb`
  );

const getLanguage = (language_iso) =>
  LANGUAGES.find((language) => language.iso_639_1 === language_iso);

export {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
  getMovieById,
  getPoster,
  getLanguage,
  getVideo,
  getPopularMovies,
  getTopRatedMovies,
  getMovieByCredit,
  getMovieBySimilar,
  getMovieByRecommend,
  getTrending,
  getList,
  getWatchList,
  getWatchListPage,
  getIdGenresByName,
  getMoviesByGenresNowPlaying,
  getMoviesByGenresUpComing,
  getMoviesByGenresPopular,
  getMoviesByGenresTopRated,
  getMoviesByYear,
  getTVByYear,
  getMovieSeries,
  getMovieSeriesById,
  getMoviesBySeason,
};
