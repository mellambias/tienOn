class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.id = this.getAttribute('id');

        document.addEventListener('FormError', event => {
            console.log('Errores', event.detail);
            //TODO gestionar los errores
        });
        document.addEventListener('editForm', event => {
            const datos = event.detail;
            console.log('Recibidos', datos);
            const form = this.shadow.querySelector(`form`);
            let formData = new FormData(form);
            formData.forEach((value, key) => {
                form.querySelector(`[name=${key}]`).value = datos[key];
                document.querySelector(`[name=${key}]`).value = datos[key];
            });
            document.querySelectorAll('button[type=submit]').forEach(button => {
                button.addEventListener('click', event => {
                    console.log('click');
                    this.formData.forEach((value, key) => {
                        console.log(key, value);
                    });
                });
            });
        });
    }

    connectedCallback() {
        this.render();
        this.shadow.addEventListener('slotchange', event => {
            const form = this.shadow.querySelector(`form`);
            document
                .querySelectorAll(
                    'input, textarea,  select,  checkbox,  radio,  file,  color,  date,  datetime-local,  email,  month,  number,  password,  search,  tel,  time,  url,  week'
                )
                .forEach(element => {
                    console.log(element);
                    element.addEventListener('input', event => {
                        console.log('element', event.target.value);
                        const form = this.shadow.querySelector(`form`);
                        form.querySelector(
                            `[name="${event.target.name}"]`
                        ).value = event.target.value;
                    });
                    const clonElement = element.cloneNode(true);
                    clonElement.setAttribute('hidden', 'hidden');
                    form.appendChild(clonElement);
                });
        });
        document.querySelectorAll('button[type=submit]').forEach(button => {
            button.addEventListener('click', event => {
                console.log('click');
                const form = this.shadow.querySelector('form');
                this.formData = new FormData(form);
                this.formData.forEach((value, key) => {
                    console.log(key, value);
                });
            });
        });
    }

    render() {
        this.shadow.innerHTML = `
            <form>
            <slot></slot>
            </form>
        `;
    }
}

customElements.define('wc-form', FormComponent);
