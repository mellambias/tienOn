class TabComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.state = this.getAttribute('state') || 'noActive';
    }

    static get observedAttributes() {
        return ['state'];
    }

    connectedCallback() {
        this.render();
        const form = this.shadow.querySelector('form');

        form.addEventListener('submit', event => {
            console.log('evento', event);
            event.preventDefault();
            this.sendForm(event);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('nuevo valor:', newValue);
        if (oldValue) this.classList.remove(oldValue);
        if (newValue) this.classList.add(newValue);
    }

    render() {
        console.log(this);
        this.shadow.innerHTML = `
        <style>

            :host(.active) {
                background-color: hsl(0deg, 0%, 100%);
                border-width: 3px;
                border-bottom: 0px solid hsl(0deg, 0%, 100%);
                margin-bottom: -3px;
                font-weight: bold;
                display:block;
            }
            :host(.noActive){
                display: none;
            }
            :host{
                display: none;
                width: 90%;
                border-top: 3px solid black;
                border-left: 3px solid black;
                border-right: 2px solid black;
                border-bottom: 2px solid black;
                border-radius: 0px 5px 5px 5px;
                box-shadow: 5px 5px black;
                overflow-y: auto;
                height: max-content;
                max-height: 90vh;
                padding: 2rem 1rem;
                background-color: white;
            }

        </style>
        ${this.innerHTML}`;
    }
}

customElements.define('wc-tab', TabComponent);
