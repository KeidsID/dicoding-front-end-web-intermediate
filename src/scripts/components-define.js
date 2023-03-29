import AppBar from './components/app-bar.js';
import MovieItem from './components/movie-item.js';
import MovieList from './components/movie-list.js';
import SearchBar from './components/search-bar.js';

customElements.define(AppBar.name, AppBar);
customElements.define(SearchBar.name, SearchBar);
customElements.define(MovieList.name, MovieList);
customElements.define(MovieItem.name, MovieItem);
