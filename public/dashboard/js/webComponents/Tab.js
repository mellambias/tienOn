class TabComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.state = this.getAttribute('state') || 'noActive';
        this.backGroundColor = this.getAttribute('bgColor') || 'white';
        this.borderColor = this.getAttribute('bordercolor') || 'black';
        this.bg = this.getAttribute('bg') || 'auto';
    }

    static get observedAttributes() {
        return ['state', 'bordercolor', 'bgcolor'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const changeValue = {
            state: (oldValue, newValue) => {
                if (oldValue) this.classList.remove(oldValue);
                if (newValue) this.classList.add(newValue);
            },
            bordercolor: (oldValue, newValue) => {
                this.borderColor = newValue;
                this.render();
            },
            bgcolor: (oldValue, newValue) => {
                this.backGroundColor = newValue;
                this.render();
            },
        };
        changeValue[name](oldValue, newValue);
    }

    render() {
        this.shadow.innerHTML = `
        <style>
            :host(.active) {
                position:relative;
                border-width: 3px;
                margin-bottom: -3px;
                display:block;
                
            }
            :host(.noActive){
                display: none;
            }
            :host{
                
                display: none;
                border:3px solid ${this.borderColor};
                border-radius: 0px 6px 6px 6px;
                overflow-y: auto;
                height:70vh;
                max-height: 70vh;
                padding: 2rem 1rem;
                background-color: ${this.backGroundColor};
                background:${this.bg};
                z-index: 100;
            }

        </style>
        <slot></slot>`;
    }
}

customElements.define('wc-tab', TabComponent);
