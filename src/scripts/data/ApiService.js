/**
 * @typedef {object} UnmappedMovie
 * @prop {string} poster_path
 * @prop {string} release_date
 * @prop {string} title
 *
 * @typedef {object} MovieListResponse
 * @prop {number} page
 * @prop {UnmappedMovie[]} results
 * @prop {object} dates
 * @prop {number} total_pages
 * @prop {number} total_results
 *
 * @typedef {object} Movie
 * @prop {string} posterPath
 * @prop {string} releaseDate
 * @prop {string} title
 */

/**
 * Services to access TMDb API.
 *
 * @abstract
 */
class ApiService {
  /**
   */
  constructor() {
    if (new.target === ApiService) {
      throw new TypeError('Cannot construct abstract class directly');
    }
  }

  static #baseUrl = 'https://api.themoviedb.org/3';
  static #apiKey = `api_key=3ca1197f928011a97a8c43a04bac8379`;

  /**
   * Get a list of movies in theatres.
   *
   * @return {Promise<Movie[]>}
   */
  static async getNowPlayingMovies() {
    const response = await fetch(
        `${this.#baseUrl}/movie/now_playing?${this.#apiKey}`);

    /**
     * @type {MovieListResponse}
     */
    const resJson = await response.json();

    if (resJson.error) {
      throw new Error(resJson.error);
    }

    const movies = resJson.results;

    if (!movies.length) {
      throw new Error('Not Found');
    }

    return movies.map((e) => {
      return {
        posterPath: e.poster_path,
        releaseDate: e.release_date,
        title: e.title,
      };
    });
  }

  /**
   * Search for movies.
   *
   * @param {string} query
   *
   * @return {Promise<Movie[]>}
   */
  static async searchMovies(query) {
    const parsedQuery = encodeURI(query);
    const response = await fetch(
        `${this.#baseUrl}/search/movie?${this.#apiKey}&query=${parsedQuery}`);

    /**
     * @type {MovieListResponse}
     */
    const resJson = await response.json();

    if (resJson.error) {
      throw new Error(resJson.error);
    }

    const movies = resJson.results;

    if (!movies.length) {
      throw new Error('Not Found');
    }

    return movies.map((e) => {
      return {
        posterPath: e.poster_path,
        releaseDate: e.release_date,
        title: e.title,
      };
    });
  }
}

export default ApiService;
