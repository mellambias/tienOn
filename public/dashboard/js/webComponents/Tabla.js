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

    fake() {
        return [
            {
                id: 1,
                name: 'Miguel',
                surnames: 'Llambias',
                phone: 'telefono',
                email: 'me@gmail.com',
                message:
                    'dfasdkfkkdsf dfdsfdskfdsfsdkks dsfkkasdfs af kasdfdks',
            },
            {
                id: 2,
                name: 'Miguel',
                surnames: 'Llambias',
                phone: 'telefono',
                email: 'me@gmail.com',
                message:
                    'dfasdkfkkdsf dfdsfdskfdsfsdkks dsfkkasdfs af kasdfdks',
            },
            {
                id: 3,
                name: 'Miguel',
                surnames: 'Llambias',
                phone: 'telefono',
                email: 'me@gmail.com',
                message:
                    'dfasdkfkkdsf dfdsfdskfdsfsdkks dsfkkasdfs af kasdfdks',
            },
        ];
    }

    /**
     * Renderiza el componente
     */
    render() {
        const template = document.getElementById('template-tabla').content;
        this.shadow.appendChild(template.cloneNode(true));
        const rows = this.shadow.getElementById('fichas');
        const data = this.fake();
        data.forEach(element => {
            let row = document.createElement('li');
            let tablaItem = document.createElement('wc-tabla-item');
            for (const key in element) {
                let item = document.createElement('span');
                item.setAttribute('slot', key);
                item.innerHTML = element[key];
                tablaItem.appendChild(item);
            }
            row.appendChild(tablaItem);
            let span = document.createElement('span');
            span.setAttribute('slot', 'crud-buttons');
            ['edit', 'delete'].forEach(action => {
                let buttonEdit = document
                    .getElementById(`button-${action}-template`)
                    .content.cloneNode(true);
                let button = buttonEdit.querySelector('button');
                button.setAttribute('id', element.id);
                button.setAttribute('data-action', action);
                button.addEventListener('click', e => {
                    console.log(e.target);
                });
                span.appendChild(buttonEdit);
            });
            tablaItem.appendChild(span);
            rows.appendChild(row);
        });
    }
}
customElements.define('wc-tabla', TablaComponent);
