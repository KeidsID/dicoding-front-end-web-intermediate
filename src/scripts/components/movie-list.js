/* eslint-disable no-unused-vars */
import MovieItem from './movie-item';

/**
 * `<movie-list>` element.
 */
class MovieList extends HTMLElement {
  static name = 'movie-list';

  #movies;
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
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
        justify-content: center;
        align-items: center;

        margin-top: 32px;
        width: 100%;
        padding: 16px;
      }

      .placeholder {
        font-weight: lighter;
        color: #cbe4de80;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      @media screen and (max-width: 800px) {
        #container {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media screen and (max-width: 550px) {
        #container {
          grid-template-columns: repeat(1, 1fr);
        }
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
    this.#movies = [];

    this.renderItems();
  }

  /**
   */
  renderItems() {
    this.container.innerHTML = '';

    this.#movies.forEach((movie) => {
      /**
       * @type {MovieItem}
       */
      const movieElement = document.createElement('movie-item');
      movieElement.movie = movie;

      this.container.appendChild(movieElement);
    });
  }

  /**
   * @param {string} msg
   */
  renderError(msg) {
    this.container.innerHTML = '';

    this.container.innerHTML += `<h2 class="placeholder">${msg}</h2>`;
  }

  /**
   * @param {object[]} movies
   */
  set movies(movies) {
    this.#movies = movies;

    this.renderItems();
  }
}

export default MovieList;
