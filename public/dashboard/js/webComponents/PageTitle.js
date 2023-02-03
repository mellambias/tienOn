class PageTitle extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.title = this.getAttribute('title');
    }

    /**
     * @method
     * @member
     * @returns {string} valor de los atributos observables
     */
    static get observedAttributes() {
        return ['title'];
    }
    /**
     * Funcion llamada cuando se inserta el componente
     */
    connectedCallback() {
        document.addEventListener('clickLink', event => {
            console.log(event.detail);
            let title = event.detail.menuItem.item;
            this.setAttribute('title', title.replace(/-/g, ' ').toUpperCase());
        });

        this.render();
    }
    /**
     * Se ejecuta cuando cambia un atributo observado
     * @method
     * @member
     * @param {string} name - nombre del atributo
     * @param {string} oldValue - valor anterior
     * @param {string} newValue - valor actual
     */

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue != null) {
            this.shadow.querySelector('h2').innerHTML = newValue;
        }
    }
    /**
     * Crea el componente.
     * @method
     * @memberof
     *
     */
    render() {
        this.shadow.innerHTML = `
        <style>
            h2 {   
                color: hsl(0, 0%, 100%);
                font-family: 'Ubuntu';
                font-size: 2em;
                font-weight: 600;
                margin: 0;
                text-decoration: none;
                text-align:center;
            }
        </style>

        <h2>${this.title}</h2>
        `;
    }
}

customElements.define('wc-pagetitle', PageTitle);
