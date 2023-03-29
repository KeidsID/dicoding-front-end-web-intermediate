/**
 * @typedef {object} Movie
 * @prop {string} posterPath
 * @prop {string} releaseDate
 * @prop {string} title
 */

/**
 * `<movie-item>` element.
 */
class MovieItem extends HTMLElement {
  static name = 'movie-item';

  /**
   * @type {Movie}
   */
  #movie;
  #shadowDOM;

  /**
   */
  constructor() {
    super();

    this.#shadowDOM = this.attachShadow({mode: 'open'});
    this.#shadowDOM.innerHTML = `<style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      #container {
        max-width: 300px;
        min-height: 600px;

        margin: auto auto 18px;
        box-shadow: 0 4px 8px 0 #cbe4de20;
        border-radius: 10px;
        overflow: hidden;
      }
      
      .movie-img {
        width: 100%;
        max-width: 300px;
        max-height: 600px;
        object-fit: cover;
        object-position: center;
      }
      
      .movie-info {
        padding: 24px;
      }
      
      .movie-info > h2 {
        font-weight: bold;
      }
      
      .movie-info > p {
        color: #cbe4de80;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* number of lines to show */
      }
    </style>`;

    const divContainer = document.createElement('div');
    divContainer.setAttribute('id', 'container');

    this.#shadowDOM.appendChild(divContainer);
    this.container = this.#shadowDOM.querySelector('#container');
  }

  /**
   */
  connectedCallback() {
    this.render();
  }

  /**
   */
  render() {
    this.container.innerHTML = `
      <img 
        class="movie-img" 
        src="https://image.tmdb.org/t/p/w500${this.#movie.posterPath}" 
        alt="Movie Poster"
      >
      <div class="movie-info">
        <h2>${this.#movie.title}</h2>
        <p>${this.#movie.releaseDate}</p>
      </div>
    `;
  }

  /**
   * @param {Movie} movie
   */
  set movie(movie) {
    this.#movie = movie;

    this.render();
  }
}

export default MovieItem;
