import { texAreaInputCounter } from '../../../js/textAreaInputCounter.js';
class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.id = this.getAttribute('id');
        this.register = null;
        document.addEventListener('FormError', event => {
            console.log('Errores', event.detail);
            //TODO gestionar los errores
        });
        document.addEventListener('editForm', event => {
            this.register = event.detail;
            console.log('Recibidos', this.register);
            const form = this.shadow.querySelector(`form`);
            let formData = new FormData(form);
            formData.forEach((value, key) => {
                form.querySelector(`[name=${key}]`).value = this.register[key];
                document.querySelector(`[name=${key}]`).value =
                    this.register[key];
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
                            element.addEventListener('change', validate);
                            break;
                        default:
                            element.addEventListener('change', validate);
                            break;
                    }
                    const clonElement = element.cloneNode(true);
                    clonElement.setAttribute('hidden', 'hidden');
                    form.appendChild(clonElement);
                });
        });
        document.querySelectorAll('button[type=submit]').forEach(button => {
            button.addEventListener('click', event => {
                console.log('register', this.register);
                const form = this.shadow.querySelector('form');
                let eventName = form.getAttribute('id');
                let formData = new FormData(form);
                if (this.register) {
                    formData.forEach((value, key) => {
                        if (this.register) {
                            this.register[key] = value;
                            console.log(this.register.error);
                        }
                    });
                } else {
                    document.dispatchEvent(
                        new CustomEvent(eventName, {
                            bubbles: true,
                            composed: true,
                            detail: event.target,
                        })
                    );
                }
                // reset form
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
