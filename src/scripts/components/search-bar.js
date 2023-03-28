/**
 * `<search-bar>` element.
 */
class SearchBar extends HTMLElement {
  static name = 'search-bar';

  #buttonClickListener;
  #shadowDOM;

  /**
   */
  constructor() {
    super();

    this.#shadowDOM = this.attachShadow({mode: 'open'});
    this.#shadowDOM.innerHTML = `<style>
      #container {
        max-width: 800px;
        box-shadow: 0 4px 8px 0 #cbe4de33;
        padding: 16px;
        border-radius: 5px;
        display: flex;
        position: sticky;
        top: 10px;
        background-color: #364141;
      }
      
      #container > input {
        width: 75%;
        padding: 16px;
        border: 0;
        border-bottom: 1px solid #0e8388;

        background-color: #cbe4de;
        font-weight: bold;
      }
      
      #container > input:focus {
        outline: 0;
        border-bottom: 2px solid #0e8388;
      }
      
      #container > input:focus::placeholder {
        font-weight: bold;
      }
      
      #container > input::placeholder {
        color: #0e8388;
        font-weight: normal;
      }
      
      #container > button {
        width: 23%;
        cursor: pointer;
        margin-left: auto;
        padding: 16px;
        background-color: #0e8388;
        color: #cbe4de;
        border: 0;
        text-transform: uppercase;
      }
      
      @media screen and (max-width: 550px) {
        #container {
          flex-direction: column;
          position: static;
        }
      
        #container > input {
          width: 100%;
          margin-bottom: 12px;
        }
      
        #container > button {
          width: 100%;
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
    this.inputHint = this.getAttribute('input-hint');

    this.render();
  }

  /**
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  /**
   */
  static get observedAttributes() {
    return ['input-hint'];
  }

  /**
   */
  render() {
    this.container.innerHTML = `
      <input placeholder="${this.inputHint}" id="${this.id}Input" type="search">
      <button id="${this.id}Button" type="submit">Search</button>
    `;

    this.container.querySelector(`#${this.id}Button`).addEventListener(
        'click',
        this.#buttonClickListener,
    );
  }

  /**
   * Set callback on search button.
   *
   * @param {function(): void} event
   */
  set buttonClickListener(event) {
    this.#buttonClickListener = event;

    this.render();
  }

  /**
   * Get input value
   */
  get value() {
    return this.container.querySelector(`#${this.id}Input`).value;
  }
}

export default SearchBar;
