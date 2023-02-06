class TabComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.render();
        this.shadow.querySelector('button').addEventListener('click', () => {
            console.log(this);
            this.classList.toggle('active');
        });
    }

    change(ev) {
        console.log(ev.target);
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

            :host {
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
