export const texAreaInputCounter = () => {
    // set controler
    function checkTextAreaInput(event) {
        let textAreaElement = event.target;
        let spanElement =
            textAreaElement.parentElement.getElementsByTagName('span')[0];
        let currentLength = textAreaElement.value.length;
        if (currentLength > 0) {
            spanElement.innerHTML = `${currentLength} / ${textAreaElement.maxLength}`;
        } else {
            spanElement.innerHTML = `máximo ${textAreaElement.maxLength} caracteres`;
        }
    }

    // select all textArea domElements

    const textAreaElements = [...document.getElementsByTagName('textarea')];

    // set controler to textAreaElement
    textAreaElements.forEach(element => {
        element.addEventListener('input', checkTextAreaInput);
    });
};
