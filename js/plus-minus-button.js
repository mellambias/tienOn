export const plusMinusButton = () => {
    const minusButtons = document.querySelectorAll('.boton-menos');
    const plusButtons = document.querySelectorAll('.boton-mas');

    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const inputElement =
                button.parentElement.querySelector('.cantidad > input');
            if (inputElement.value > inputElement.dataset.min) {
                inputElement.value = parseInt(inputElement.value) - 1;
            }
        });
        button.parentElement
            .querySelector('.cantidad > input')
            .addEventListener('change', evento => {
                let inputElement = evento.target;
                console.log(inputElement.value);
                if (isNaN(parseInt(inputElement.value))) {
                    inputElement.value = parseInt(inputElement.dataset.min);
                }
                inputElement.value =
                    inputElement.value > parseInt(inputElement.dataset.max)
                        ? inputElement.dataset.max
                        : inputElement.value;
                inputElement.value =
                    inputElement.value < parseInt(inputElement.dataset.min)
                        ? inputElement.dataset.min
                        : inputElement.value;
            });
    });

    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const inputElement =
                button.parentElement.querySelector('.cantidad > input');
            if (inputElement.value < parseInt(inputElement.dataset.max)) {
                inputElement.value = parseInt(inputElement.value) + 1;
            }
        });
    });
};
