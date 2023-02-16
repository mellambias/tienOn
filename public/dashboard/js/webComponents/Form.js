import { texAreaInputCounter } from '../../../js/textAreaInputCounter.js';
class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.id = this.getAttribute('id');
        this.register = null;
        this.counter = 0;
        this.placeholder = this.getAttribute('Placeholder') || 'none';
        this.labelColor = this.getAttribute('labelColor') || 'black';
        this.inputColor = this.getAttribute('inputColor') || 'black';
        this.placeholderStyle =
            this.getAttribute('placeholderStyle') || 'color:auto;';
        this.inputStyle =
            this.getAttribute('inputStyle') || 'border:1px solid black;';
        this.textAreaStyle =
            this.getAttribute('textAreaStyle') || 'border:1px solid black;';

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
            const style = document.createElement('style');
            style.innerHTML = this.getStyle();
            let nodeTemp = this.shadow
                .querySelector('slot')
                .assignedElements()[0];
            nodeTemp.appendChild(style);
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
                    if (
                        this.placeholder == 'auto' &&
                        !element.getAttribute('placeholder')
                    ) {
                        const label = element.parentElement.querySelector(
                            `label[for="${element.name}"]`
                        );
                        if (label) {
                            element.setAttribute(
                                'placeholder',
                                label.textContent
                            );
                        }
                    }
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
    getStyle() {
        return `
        input,  select,
        checkbox,  radio,  file,  
        color,  date,  datetime-local,  
        email,  month,  number,  
        password,  search,  tel,  
        time,  url,  week {
            ${this.inputStyle}
            color: ${this.inputColor};
        }
        textarea {
            ${this.textAreaStyle}
            color: ${this.inputColor};
        }
        *::placeholder{
            ${this.placeholderStyle};
        }
            .campo label {
                color: ${this.labelColor};
                font-weight: bold;
            }
            .campo span {
                color: ${this.labelColor};
            }

            input {
                padding-left: 0.5rem;
                padding-right: 0.5rem;  
            }
            
            input[type='number'],
            input[type='date'] {
                text-align: end;
            }
            .error{
                font-weight: bold;
            }
        button {
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

        button:hover {
            top: -1px;
            left: -2px;
            box-shadow: 2px 2px black;
        }
        i {
            pointer-events: none;
        }`;
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
