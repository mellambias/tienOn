const contactForm = () => {
    const formulario = document.getElementById('contactForm');
    formulario.addEventListener('submit', checkForm);
};

function checkForm(event) {
    event.preventDefault();
    let formulario = event.target;
    formulario = [...formulario];
    let errores = [...document.querySelectorAll('.error')];
    formulario.forEach(data => {
        console.log(`${data.name} =  ${data.value}`);
        switch (data.name) {
            case 'nombre':
                check(
                    errores,
                    data.name,
                    () => data.value.length == 0,
                    'No puede estar vacio'
                );
                break;
            case 'apellidos':
                check(
                    errores,
                    data.name,
                    () => data.value.length == 0,
                    'No puede estar vacio'
                );
                break;
            case 'telefono':
                check(
                    errores,
                    data.name,
                    () => data.value.length < 9,
                    'mínimo 9 digitos'
                );
                break;
            case 'email':
                check(
                    errores,
                    data.name,
                    () => data.value.length == 0,
                    'No puede estar vacio'
                );
                break;
            case 'mensaje':
                check(
                    errores,
                    data.name,
                    () => data.value.length < 20,
                    'mínimo 20 caracteres'
                );
                break;

            default:
                break;
        }
    });
}

function check(errores, name, condicion, error) {
    const trobat = errores.find(error => error.dataset.name == name);
    if (condicion()) {
        trobat.innerHTML = error;
        return false;
    } else {
        trobat.innerHTML = '';
    }
    return true;
}

export default contactForm;
