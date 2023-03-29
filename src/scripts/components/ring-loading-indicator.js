/**
 * `<ring-loading-indicator>` element.
 */
class RingLoadingIndicator extends HTMLElement {
  static name = 'ring-loading-indicator';

  #shadowDOM;

  /**
   */
  constructor() {
    super();

    this.#shadowDOM = this.attachShadow({mode: 'open'});
    this.#shadowDOM.innerHTML = `<style>
      #container {
        width: 40px;
        height: 40px;

        border-radius: 50%;
        border: 4px solid #cbe4de;
        border-top-color: #0e8388;

        margin: auto;

        animation: spin 1s ease-in-out infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
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
    this.container.innerHTML = ``;
  }
}

export default RingLoadingIndicator;
