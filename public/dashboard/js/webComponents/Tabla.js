class TablaComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        document.addEventListener('tablaData', event => {
            // console.log('datos recibidos', event.detail);
            this.data = event.detail;
            this.shadow.innerHTML = '';
            this.render();
        });
        document.addEventListener('TablaError', event => {
            console.log('Errores', event.detail);
            //TODO gestionar los errores
        });
    }

    static get observedAttributes() {
        return ['data'];
    }

    connectedCallback() {
        // console.log('connected');
        document.dispatchEvent(
            new CustomEvent('tablaReady', {
                bubbles: true,
                composed: true,
                detail: 'componente conectado',
            })
        );
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
        const template = document.getElementById('template-tabla').content;
        this.shadow.appendChild(template.cloneNode(true));
        const rows = this.shadow.getElementById('fichas');
        // console.log('data', this.data, this.data.size);
        if (this.data.size == 0) {
            return;
        }
        this.data.forEach(element => {
            let row = document.createElement('li');
            row.id = element?.id;
            let tablaItem = document.createElement('wc-tabla-item');
            tablaItem.elementData = element;
            row.appendChild(tablaItem);
            let span = document.createElement('span');
            span.setAttribute('slot', 'crud-buttons');
            ['edit', 'delete'].forEach(action => {
                let buttonEdit = document
                    .getElementById(`button-${action}-template`)
                    .content.cloneNode(true);
                let button = buttonEdit.querySelector('button');
                button.setAttribute('data-id', element.id);
                button.setAttribute('data-action', action);
                button.addEventListener('click', e => {
                    console.log('evento en tabla', e.target);
                    console.log(e.target.id, e.target.dataset.action);
                    const id = parseInt(e.target.dataset.id);
                    switch (e.target.dataset.action) {
                        case 'delete':
                            this.data.get(id).delete();
                            this.data.delete(id);
                            this.shadow.getElementById(id).remove();
                            break;
                        case 'edit':
                            console.log('editar:', this.data.get(id));
                            document.dispatchEvent(
                                new CustomEvent('editForm', {
                                    bubbles: true,
                                    composed: true,
                                    detail: this.data.get(id),
                                })
                            );
                            break;
                    }
                });
                span.appendChild(buttonEdit);
            });
            tablaItem.appendChild(span);
            rows.appendChild(row);
        });
    }
}
customElements.define('wc-tabla', TablaComponent);
