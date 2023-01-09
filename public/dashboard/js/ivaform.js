import { checkForm, validate } from '../../js/checkData.js';

const ivaForm = (domain, port, endpoint, protocol = 'http') => {
    const formulario = document.getElementById('ivaForm');

    if (!formulario) return;
    const campos = {};

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
            const formData = new FormData(this);
            let formDataJson = Object.fromEntries(formData.entries());
            fetch(`${protocol}://${domain}:${port}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem('accessToken'),
                },
                body: JSON.stringify(formDataJson),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
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
                })
                .catch(error => {
                    console.log(error);
                });
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
export default ivaForm;
