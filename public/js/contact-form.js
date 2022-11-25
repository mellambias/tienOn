const contactForm = () => {
    const formulario = document.getElementById('contactForm');
    formulario.addEventListener('submit', checkForm);
    const imputElements = [...formulario.getElementsByTagName('input')];
    const selectElements = [...formulario.getElementsByTagName('select')];

    imputElements.forEach(element => {
        element.addEventListener('change', event => validate(event.target));
    });
    selectElements.forEach(element => {
        element.addEventListener('change', event => validate(event.target));
    });
};

function checkForm(event) {
    event.preventDefault();
    let formulario = event.target;
    formulario = [...formulario];
    formulario.forEach(data => {
        validate(data);
    });
}

function validate(inputHtml) {
    let errores = [...document.querySelectorAll('.error')];
    switch (inputHtml.name) {
        case 'nombre':
            check(
                errores,
                inputHtml,
                nombre => nombre.length == 0,
                'No puede estar vacio'
            );
            break;
        case 'apellidos':
            check(
                errores,
                inputHtml,
                apellidos => apellidos.length == 0,
                'No puede estar vacio'
            );
            break;
        case 'telefono':
            check(
                errores,
                inputHtml,
                telefono => {
                    let regex = /^\d{9}$/g;
                    return telefono.match(regex) == null;
                },
                'Formato teléfono incorrecto'
            );
            break;
        case 'email':
            check(
                errores,
                inputHtml,
                email => {
                    const regex = /\w+@\w+\.\w+/g;
                    return email.match(regex) == null;
                },
                'No puede estar vacio'
            );
            break;
        case 'mensaje':
            check(
                errores,
                inputHtml,
                mensaje => mensaje.length < 20,
                'mínimo 20 caracteres'
            );
            break;
        case 'ciudad':
            check(
                errores,
                inputHtml,
                ciudad => ciudad === '00000',
                'Seleccione una ciudad'
            );
            break;
        case 'codigoPostal':
            check(
                errores,
                inputHtml,
                codigoPostal => codigoPostal.length < 5,
                'mínimo 5 caracteres'
            );
            break;
        case 'direccion':
            check(
                errores,
                inputHtml,
                direccion => direccion.length < 20,
                'mínimo 20 caracteres'
            );
            break;

        default:
            break;
    }
}

function check(errores, elementForm, condicion, error) {
    const trobat = errores.find(
        error => error.dataset.name == elementForm.name
    );
    if (condicion(elementForm.value)) {
        elementForm.parentElement
            .getElementsByTagName('label')[0]
            .classList.add('error');
        elementForm.classList.add('error');
        trobat.innerHTML = error;
        return false;
    } else {
        elementForm.parentElement
            .getElementsByTagName('label')[0]
            .classList.remove('error');
        elementForm.classList.remove('error');
        trobat.innerHTML = '';
    }
    return true;
}

export default contactForm;
