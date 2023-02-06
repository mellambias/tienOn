class TablaItemComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }
    /**
     * Cuando cambia alguno de los atributos observados
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     */
    attributeChangedCallback(name, oldValue, newValue) {}

    /**
     * Renderiza el componente
     */
    render() {
        const template = document.getElementById('template-tabla-item').content;
        this.shadow.appendChild(template.cloneNode(true));
    }
}
customElements.define('wc-tabla-item', TablaItemComponent);
