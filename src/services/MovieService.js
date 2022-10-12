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

const URL_API = 'http://192.168.249.6:3001';
// const URL_API = 'https://the-movie-node.onrender.com';

// const getTrending = () =>
//   axios.get(
//     `https://api.themoviedb.org/3/trending/all/day?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${Math.floor(
//       Math.random() * 1000
//     )}`
//   );

const getTrending = async (page) =>
  await axios.get(`${URL_API}/trending/all?api=hieu987&page=${page}`);

const getMoviesSearch = async (input, page) =>
  await axios.get(
    `${URL_API}/search/multi?api=hieu987&query=${input}&page=${page}`
  );

const getMoviesTopSearch = async (page) =>
  await axios.get(
    `${URL_API}/discover/all?api=hieu987&sort_by=popularity_desc&page=${page}`
  );

// const getList = () =>
//   axios.get(
//     `https://api.themoviedb.org/3/list/8215569?api_key=fe1b70d9265fdb22caa86dca918116eb`
//   );

const getList = async () =>
  await axios.get(`${URL_API}/list/8215569?api=hieu987`);

const addItemList = async (params) =>
  await axios.post(`${URL_API}/list/8215569/add_item?api=hieu987`, params);

const removeItemList = async (params) =>
  await axios.post(`${URL_API}/list/8215569/remove_item?api=hieu987`, params);

const getWatchList = async () =>
  await axios.get(
    `https://api.themoviedb.org/3/account/14271386/watchlist/movies?api_key=fe1b70d9265fdb22caa86dca918116eb&language=en-US&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d&sort_by=created_at.asc&`
  );

const getWatchListPage = async (page) =>
  await axios.get(
    `https://api.themoviedb.org/3/account/14271386/watchlist/movies?api_key=fe1b70d9265fdb22caa86dca918116eb&language=en-US&session_id=5ae3c9dd2c824276ba202e5f77298064ccc7085d&sort_by=created_at.asc&page=${page}`
  );

// const getNowPlayingMovies = (page) =>
//   axios.get(
//     `https://api.themoviedb.org/3/movie/now_playing?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );

const getNowPlayingMovies = async (page) =>
  await axios.get(`${URL_API}/movie/nowplaying?api=hieu987&page=${page}`);

// const getUpcomingMovies = (page) =>
//   axios.get(
//     `https://api.themoviedb.org/3/movie/upcoming?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );

const getUpcomingMovies = async (page) =>
  await axios.get(`${URL_API}/movie/upcoming?api=hieu987&page=${page}`);

// const getPopularMovies = (page) =>
//   axios.get(
//     `https://api.themoviedb.org/3/movie/popular?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );

const getPopularMovies = async (page) =>
  await axios.get(`${URL_API}/movie/popular?api=hieu987&page=${page}`);

// const getTopRatedMovies = (page) =>
//   axios.get(
//     `https://api.themoviedb.org/3/movie/top_rated?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );

const getTopRatedMovies = async (page) =>
  await axios.get(`${URL_API}/movie/toprated?api=hieu987&page=${page}`);

// const getMoviesByYear = (year, page) =>
//   axios.get(
//     `https://api.themoviedb.org/3/discover/movie?api_key=fe1b70d9265fdb22caa86dca918116eb&primary_release_date.lte=${year}-12-30&primary_release_date.gte=${year}-01-01&page=${page}`
//   );

// const getTVByYear = (year, page) =>
//   axios.get(
//     `https://api.themoviedb.org/3/discover/tv?api_key=fe1b70d9265fdb22caa86dca918116eb&primary_release_date.lte=${year}-12-30&primary_release_date.gte=${year}-01-01&page=${page}`
//   );

const getDaTaSearchMovie = async (text, page) =>
  await axios.get(
    `${URL_API}/search/movie?api=hieu987&query=${text}&page=${page}`
  );

const getDaTaSearchTV = async (text, page) =>
  await axios.get(
    `${URL_API}/search/tv?api=hieu987&query=${text}&page=${page}`
  );

const getDaTaMovie = async (params, page) =>
  await axios.get(`${URL_API}/movie/${params}?api=hieu987&page=${page}`);

const getDaTaTV = async (params, page) =>
  await axios.get(`${URL_API}/tv/${params}?api=hieu987&page=${page}`);

const getMoviesByGenres = async (genres_name, page) => {
  const genresName = await getIdGenresByName(genres_name);

  const genreStr = !genres_name.includes('&')
    ? `${genresName.id},${genresName.name}`
    : `${genresName.id},${genresName.name.replace('&', '%26')}`;

  return await axios.get(
    !genres_name.includes('&')
      ? `${URL_API}/discover/movie?api=hieu987&with_genres=${genreStr}&page=${page}`
      : `${URL_API}/discover/movie?api=hieu987&with_genres=${genreStr}&page=${page}`
  );
};

const getTVByGenres = async (genres_name, page) => {
  const genresName = await getIdGenresByName(genres_name);

  const genreStr = !genres_name.includes('&')
    ? `${genresName.id},${genresName.name}`
    : `${genresName.id},${genresName.name.replace('&', '%26')}`;

  return await axios.get(
    !genres_name.includes('&')
      ? `${URL_API}/discover/tv?api=hieu987&with_genres=${genreStr}&page=${page}`
      : `${URL_API}/discover/tv?api=hieu987&with_genres=${genreStr}&page=${page}`
  );
};

const getMoviesByYear = async (year, page) =>
  year !== 'Trước năm 2000'
    ? await axios.get(
        `${URL_API}/discover/movie?api=hieu987&primary_release_date_gte=${year}-01-01&primary_release_date_lte=${year}-12-30&page=${page}`
      )
    : await axios.get(
        `${URL_API}/discover/movie?api=hieu987&primary_release_date_lte=2000-01-01&page=${page}`
      );

const getTVByYear = async (year, page) =>
  year !== 'Trước năm 2000'
    ? await axios.get(
        `${URL_API}/discover/tv?api=hieu987&primary_release_date_gte=${year}-01-01&primary_release_date_lte=${year}-12-30&page=${page}`
      )
    : await axios.get(
        `${URL_API}/discover/tv?api=hieu987&primary_release_date_lte=2000-01-01&page=${page}`
      );

const getMovieByCountry = async (country_name, page) => {
  const countriName = await getCountry(country_name);
  return await axios.get(
    `${URL_API}/discover/movie?api=hieu987&with_original_language=${countriName.iso_639_1}&page=${page}`
  );
};

const getTVByCountry = async (country_name, page) => {
  const countriName = await getCountry(country_name);
  return await axios.get(
    `${URL_API}/discover/tv?api=hieu987&with_original_language=${countriName.iso_639_1}&page=${page}`
  );
};

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

// const getMovieById = (movieId, append_to_response) =>
//   axios.get(
//     `https://api.themoviedb.org/3/movie/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=${append_to_response}`
//   );

const getMovieById = async (movieId) =>
  await axios.get(`${URL_API}/movie/${movieId}?api=hieu987`);

// const getMovieSeries = async (page) =>
//   axios.get(
//     `https://api.themoviedb.org/3/tv/airing_today?api_key=fe1b70d9265fdb22caa86dca918116eb&page=${page}`
//   );

const getMovieSeries = async (page) =>
  await axios.get(`${URL_API}/tv/phimbo?api=hieu987&page=${page}`);

// const getMovieSeriesById = async (movieid) =>
//   axios.get(
//     `https://api.themoviedb.org/3/tv/${movieid}?api_key=fe1b70d9265fdb22caa86dca918116eb`
//   );

const getMovieSeriesById = async (movieid) =>
  await axios.get(`${URL_API}/tv/${movieid}?api=hieu987`);

// const getMovieByCredit = (type, movieId, append_to_response) =>
//   axios.get(
//     `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=${append_to_response}`
//   );

const getMovieByCredit = async (type, movieId) =>
  await axios.get(
    `${URL_API}/${type}/${movieId}?api=hieu987&append_to_response=credits`
  );

// const getMovieBySimilar = (type, movieId, append_to_response, page) =>
//   axios.get(
//     `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=${append_to_response}&page=${page}`
//   );

const getMovieBySimilar = async (type, genres_name, page) => {
  return await axios.get(
    !genres_name.name.includes('&')
      ? `${URL_API}/discover/${type}?api=hieu987&with_genres=${genres_name.id},${genres_name.name}&page=${page}`
      : `${URL_API}/discover/${type}?api=hieu987&with_genres=${
          genres_name.id
        },${genres_name.name.replace('&', '%26')}&page=${page}`
  );
};

// const getMovieByRecommend = async (type, movieId, append_to_response, page) =>
//   await axios.get(
//     `https://api.themoviedb.org/3/${type}/${movieId}?api_key=fe1b70d9265fdb22caa86dca918116eb&append_to_response=${append_to_response}&page=${page}`
//   );

const getMovieByRecommend = async (page) =>
  await axios.get(
    `${URL_API}/discover/all?api=hieu987&sort_by=popularity_desc&page=${page}`
  );

// const getAllGenres = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

const getAllGenres = async () =>
  await axios.get(`${URL_API}/genre/all?api=hieu987`);

const getAllYear = async () =>
  await axios.get(`${URL_API}/year/all?api=hieu987`);

const getAllNational = async () =>
  await axios.get(`${URL_API}/country/all?api=hieu987`);

// const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getPoster = (path) => {
  return path === null || path === undefined
    ? null
    : `${URL_API}/image${path}?api=hieu987`;
};

const getPosterCast = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

// const getIdGenresByName = (genres_name) =>
//   genreResponse.genres.find((gen) => (gen.name == genres_name ? gen : null));

const getIdGenresByName = async (genres_name) =>
  // genreResponse.genres.find((gen) => (gen.name === genres_name ? gen : null));
  {
    const genres = await getAllGenres().then((res) => {
      return res.data;
    });
    return genres.find((gen) => (gen.name === genres_name ? gen : null));
  };

const getCountry = async (country_name) =>
  // Country.find((country) => country.name2 === country_name);
  {
    const countries = await getAllNational().then((res) => {
      return res.data;
    });
    return countries.find((country) => country.english_name === country_name);
  };

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

// const getMoviesBySeason = (movieid, season) =>
//   axios.get(
//     `https://api.themoviedb.org/3/tv/${movieid}/season/${season}}?api_key=fe1b70d9265fdb22caa86dca918116eb`
//   );

// const getMoviesBySeason = async (movieid, season) =>
//   await axios.get(`${URL_API}/tv/${movieid}/season/${season}?api=hieu987`);

const getMoviesBySeason = async (movieid, season) =>
  await axios.get(`${URL_API}/tv/${movieid}/season/${season}?api=hieu987`);

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
  getAllYear,
  addItemList,
  removeItemList,
  getDaTaSearchMovie,
  getDaTaSearchTV,
  getDaTaTV,
  getDaTaMovie,
  getPosterCast,
  getMoviesTopSearch,
  getMoviesSearch,
  getMoviesByGenres,
  getTVByGenres,
  getAllNational,
  getMovieByCountry,
  getTVByCountry,
};
