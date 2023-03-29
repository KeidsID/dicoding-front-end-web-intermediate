/* eslint-disable no-unused-vars */
import MovieList from './components/movie-list';
import ApiService from './data/ApiService';

const main = async () => {
  /**
   * @type {MovieList}
  */
  const movieListElement = document.querySelector('movie-list');

  const renderResult = (results) => {
    movieListElement.movies = results;
  };

  const renderError = (message) => {
    movieListElement.renderError(message);
  };

  try {
    const nowPlayingMovies = await ApiService.getNowPlayingMovies();

    renderResult(nowPlayingMovies);
  } catch (e) {
    renderError(e);
  }
};

export default main;
