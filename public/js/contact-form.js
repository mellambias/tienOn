import { checkForm, validate } from './checkData.js';

const contactForm = () => {
    const formulario = document.getElementById('contactForm');
    if (!formulario) return;
    const campos = {
        nombre: [
            {
                validate: nombre => nombre.length == 0,
                errorText: 'No puede estar vacio',
            },
        ],
        apellidos: [
            {
                validate: apellidos => apellidos.length == 0,
                errorText: 'No puede estar vacio',
            },
        ],
        telefono: [
            {
                validate: telefono => telefono.length == 0,
                errorText: 'No puede estar vacio',
            },
            {
                validate: telefono => {
                    let regex = /^\d{9}$/g;
                    return telefono.match(regex) == null;
                },
                errorText: 'El numero debe tener 9 digitos',
            },
        ],
        email: [
            {
                validate: email => email.length == 0,
                errorText: 'No puede estar vacio',
            },
            {
                validate: email => {
                    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                    return email.match(regex) == null;
                },
                errorText: 'El email no es valido',
            },
        ],
        mensaje: [
            {
                validate: mensaje => mensaje.length == 0,
                errorText: 'No puede estar vacio',
            },
            {
                validate: mensaje => mensaje.length < 20,
                errorText: 'El mensaje debe tener al menos 20 caracteres',
            },
        ],
        ciudad: [
            {
                validate: ciudad => ciudad.length == 0,
                errorText: 'No puede estar vacio',
            },
            {
                validate: ciudad => ciudad === '00000',
                errorText: 'Seleccione una ciudad',
            },
        ],
        codigoPostal: [
            {
                validate: codigoPostal => codigoPostal.length == 0,
                errorText: 'No puede estar vacio',
            },
            {
                validate: codigoPostal => codigoPostal < 5 || codigoPostal > 5,
                errorText: 'El codigo postal debe tener 5 caracteres',
            },
        ],

        direccion: [
            {
                validate: direccion => direccion.length == 0,
                errorText: 'No puede estar vacio',
            },
            {
                validate: direccion => direccion.length < 20,
                errorText: 'debe tener como mínimo 20 caracteres',
            },
        ],
    };

    const imputElements = [...formulario.getElementsByTagName('input')];
    const selectElements = [...formulario.getElementsByTagName('select')];
    const textAreaElements = [...formulario.getElementsByTagName('textarea')];

    async function submitForm(ev) {
        ev.preventDefault();

        if (!checkForm(this, campos)) {
            this.dispatchEvent(
                new CustomEvent('alert', {
                    bubbles: true,
                    detail: {
                        className: 'error',
                        message: 'Error en el formulario',
                        icon: 'alert-icon',
                    },
                })
            );
        } else {
            /*
             * TODO enviar el formulario al servidor
             */
            const formData = new FormData(this);
            let formDataJson = Object.fromEntries(formData.entries());
            try {
                const res = await fetch('http://localhost:8080/front/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formDataJson),
                });
                const data = await res.json();
                if (res.status == 400) throw new Error(data.message.email);
                this.dispatchEvent(
                    new CustomEvent('alert', {
                        bubbles: true,
                        detail: {
                            className: 'success',
                            message: 'Formulario correcto',
                            icon: 'checked-icon',
                        },
                    })
                );
            } catch (error) {
                console.error(error);
                this.dispatchEvent(
                    new CustomEvent('alert', {
                        bubbles: true,
                        detail: {
                            className: 'error',
                            message: 'Error en el formulario',
                            icon: 'alert-icon',
                        },
                    })
                );
            }
        }
    }

    formulario.addEventListener('submit', submitForm);

    imputElements.forEach(element => {
        element.addEventListener('change', event =>
            validate(event.target, campos)
        );
    });
    selectElements.forEach(element => {
        element.addEventListener('change', event =>
            validate(event.target, campos)
        );
    });
    textAreaElements.forEach(element => {
        element.addEventListener('input', event =>
            validate(event.target, campos)
        );
    });
};
export default contactForm;
