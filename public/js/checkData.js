const check = (elementForm, validaciones, errorElement) => {
    let isNotValid;
    if (!errorElement) {
        return (isNotValid = 0);
    }
    const relacionados = [...errorElement.parentElement.children];
    validaciones.forEach(validacion => {
        if (validacion.validate(elementForm.value)) {
            errorElement.parentElement.classList.add('error');
            if (!errorElement.innerHTML.length) {
                errorElement.innerHTML = validacion.errorText;
                relacionados.forEach(element => {
                    element.classList.add('error');
                });
            }
            isNotValid = -1;
        } else {
            errorElement.innerHTML = '';
            errorElement.parentElement.classList.remove('error');
            relacionados.forEach(element => {
                element.classList.remove('error');
            });
            isNotValid = 0;
        }
    });
    return isNotValid;
};

export function checkForm(event, campos) {
    let formulario = event.target;
    formulario = [...formulario];
    let IsValido = 1;
    formulario.forEach(data => {
        IsValido += validate(data, campos);
    });
    return IsValido == true;
}

export function validate(inputHtml, campos) {
    const errores = [...document.querySelectorAll('p')];
    const labelError = errores.find(
        error => error.dataset.name == inputHtml.name
    );
    let isValido = check(inputHtml, campos[inputHtml.name], labelError);
    return isValido;
}
