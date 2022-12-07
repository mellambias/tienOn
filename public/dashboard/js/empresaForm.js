import { checkForm, validate } from '../../js/checkData.js';

const empresaForm = () => {
    const formulario = document.getElementById('contactForm');
    if (!formulario) return;
    const campos = {
        opcionCastellano: [
            {
                validate: opcion => opcion.length == 0,
                errorText: 'No puede estar vacio',
            },
        ],
        valorCastellano: [
            {
                validate: valor => valor.length == 0,
                errorText: 'No puede estar vacio',
            },
        ],
    };

    const imputElements = [...formulario.getElementsByTagName('input')];
    const selectElements = [...formulario.getElementsByTagName('select')];
    const textAreaElements = [...formulario.getElementsByTagName('textarea')];

    function submitForm(ev) {
        ev.preventDefault();
        if (!checkForm(this, campos)) {
            this.target.dispatchEvent(
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
            evento.target.dispatchEvent(
                new CustomEvent('alert', {
                    bubbles: true,
                    detail: {
                        className: 'success',
                        message: 'Formulario correcto',
                        icon: 'checked-icon',
                    },
                })
            );
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
export default empresaForm;
