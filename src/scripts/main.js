/* eslint-disable no-unused-vars */
// VsCode-JsDoc purpose
import MovieList from './components/movie-list';
import SearchBar from './components/search-bar';

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

  // Now playing movies
  try {
    movieListElement.renderLoading();

    const nowPlayingMovies = await ApiService.getNowPlayingMovies();

    renderResult(nowPlayingMovies);
  } catch (e) {
    renderError(e);
  }

  // Search for movies
  /**
   * @type {SearchBar}
   */
  const searchBarElement = document.querySelector('#searchMovie');

  const onTapSearchButton = async () => {
    try {
      movieListElement.renderLoading();

      const searchResults = await ApiService
          .searchMovies(searchBarElement.value);

      renderResult(searchResults);
    } catch (e) {
      renderError(e);
    }
  };

  searchBarElement.onTap = onTapSearchButton;
};

export default main;
