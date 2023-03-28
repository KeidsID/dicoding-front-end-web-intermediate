/**
 * `<app-bar>` element.
 */
class AppBar extends HTMLElement {
  static name = 'app-bar';

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

      h2 {
        margin: auto;
      }
        
      #container {
        display: grid;
        
        padding: 16px;
        width: 100%;
        background-color: #2e4f4f;
        color: #cbe4de;
        box-shadow: 0 4px 8px 0 #cbe4de33;
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
    this.title = this.getAttribute('title');

    this.render();
  }

  /**
   */
  render() {
    this.container.innerHTML = `<h2>${this.title}</h2>`;
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
    return ['title'];
  }
}

export default AppBar;
