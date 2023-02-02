class TablaComponent extends HTMLElement {
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
        this.shadow.innerHTML = `
        <style>
            .fichas {
                width: 90%;
                padding-top: 5%;
            }
            .fichas > li {
                border-top: 2px solid black;
                border-bottom: 1px solid black;
            }
            .fichas .ficha {
                height: 10vh;
                min-height: 100px;
                min-width: 400px;
                padding: 2% 5%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }
            .fichas .ficha ul {
                overflow: auto;
            }
            .fichas .crud {
                width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-end;
            }
            .fichas .crud button {
                position: relative;
                width: 80px;
                margin: 5px;
                padding: 5px;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                border-radius: 5px;
                box-shadow: 2px 1px black;
                cursor: pointer;
            }
            .fichas .crud button i {
                width: 1rem;
                min-width: 1rem;
            }
            .fichas .crud button:hover {
                top: -1px;
                left: -2px;
                box-shadow: 2px 2px black;
            }
            .edit-icon {
                display: inline-block;
                width: 1rem;
                background: url(/assets/svg/edit.svg) 0 0 / contain no-repeat;
            }
            .edit-icon::before {
                content: '';
                display: block;
                padding-top: 100%;
            }
            .delete-icon {
                display: inline-block;
                width: 1rem;
                background: url(/assets/svg/delete.svg) 0 0 / contain no-repeat;
            }
            .delete-icon::before {
                content: '';
                display: block;
                padding-top: 100%;
            }
        </style>
        
        <ul class="fichas">
            <li>
                <div class="ficha">
                    <ul>
                        <li>Nombre:</li>
                        <li>Nombre:</li>
                        <li>Nombre:</li>
                    </ul>

                    <div class="crud">
                        <button>
                            <i class="edit-icon"></i>
                            Edit
                        </button>
                        <button>
                            <i class="delete-icon"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </li>
            <li>
                <div class="ficha">ficha 2</div>
            </li>
            <li>
                <div class="ficha">ficha 3</div>
            </li>
        </ul>`;
    }
}
customElements.define('wc-tabla', TablaComponent);
