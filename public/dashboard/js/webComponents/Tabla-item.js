class TablaItemComponent extends HTMLElement {
    constructor(props) {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.elementData;
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
        const slots = this.shadow.querySelectorAll('slot');
        slots.forEach(slot => {
            const value = this.elementData[slot.name];
            if (value) {
                let item = document.createElement('span');
                item.setAttribute('slot', slot.name);
                item.innerHTML = value;
                this.appendChild(item);
            }
        });
    }
}
customElements.define('wc-tabla-item', TablaItemComponent);
