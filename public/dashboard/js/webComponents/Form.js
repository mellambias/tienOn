import { texAreaInputCounter } from '../../../js/textAreaInputCounter.js';
class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.id = this.getAttribute('id');
        this.register = null;
        this.counter = 0;

        document.addEventListener(`receivesgetNew${this.id}`, event => {
            console.log('Recibiendo nuevo registro', event.detail);
            this.register = event.detail;
        });
        this.counter++;
        console.log(
            `solicitando nuevo registro "getNew${this.id}" (${this.counter})`
        );
        document.dispatchEvent(
            new CustomEvent(`getNew${this.id}`, {
                detail: 'Send me a new register',
            })
        );

        document.addEventListener('FormError', event => {
            console.log('Errores', event.detail);
            //TODO gestionar los errores
            const errores = event.detail.errors;
            this.register = event.detail.model;
            console.log(this.register);
            for (let campo in errores) {
                document.querySelector(`p[data-name="${campo}"]`).innerHTML =
                    errores[campo][0];
            }
        });
        document.addEventListener('editForm', event => {
            this.register = event.detail;
            console.log('Recibidos', this.register);
            const form = this.shadow.querySelector(`form`);
            let formData = new FormData(form);
            formData.forEach((value, key) => {
                let dataValue = this.register[key];
                form.querySelector(`[name=${key}]`).value = dataValue;
                document.querySelector(`[name=${key}]`).value = dataValue;
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
                    const validate = event => {
                        console.log('validar', event.target.value);
                        const message = document.querySelector(
                            `p[data-name="${event.target.name}"]`
                        );
                        if (message) {
                            message.textContent = null;
                        }
                        const form = this.shadow.querySelector(`form`);
                        form.querySelector(
                            `[name="${event.target.name}"]`
                        ).value = event.target.value;
                        if (this.register) {
                            this.register[event.target.name] =
                                event.target.value;
                            if (this.register.errors) {
                                for (let error in this.register.errors) {
                                    const message = document.querySelector(
                                        `p[data-name="${error}"]`
                                    );
                                    if (message) {
                                        message.innerHTML =
                                            this.register.errors[error][0];
                                    }
                                }
                            }
                        }
                    };

                    switch (element.type) {
                        case 'textarea':
                            texAreaInputCounter(
                                element.getAttribute('minlength')
                            );
                            element.addEventListener('blur', validate);
                            break;
                        default:
                            element.addEventListener('blur', validate);
                            break;
                    }
                    const clonElement = element.cloneNode(true);
                    clonElement.setAttribute('hidden', 'hidden');
                    form.appendChild(clonElement);
                });
        });
        document.querySelectorAll('button[type=submit]').forEach(button => {
            button.addEventListener('click', async event => {
                console.log('register', this.register);
                const form = this.shadow.querySelector('form');
                let eventName = form.getAttribute('id');
                console.log('Enviando formulario:', eventName);
                document.dispatchEvent(
                    new CustomEvent(eventName, {
                        bubbles: true,
                        composed: true,
                        detail: form,
                    })
                );

                // reset form
                let formData = new FormData(form);
                formData.forEach((value, key) => {
                    document.querySelector(`[name=${key}]`).value = null;
                });
                form.reset();
            });
        });
    }

    render() {
        this.shadow.innerHTML = `
            <form id="${this.id}">
            <slot></slot>
            </form>
        `;
    }
}

customElements.define('wc-form', FormComponent);
