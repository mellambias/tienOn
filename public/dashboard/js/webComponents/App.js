class App extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        document.addEventListener('clickLink', this.changePage);
    }

    changePage(event) {
        console.log('La app a recibido %o', event);
        window.history.pushState({}, window.title, hrefUrl); // Update URL as well as browser history.
    }
}

customElements.define('wc-app', App);
