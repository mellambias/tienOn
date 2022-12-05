export const tabs = () => {
    const tabsElements = [...document.getElementsByClassName('tab')];
    const className = 'active';

    //controlador del evento click
    function changeTab() {
        function removeActiveContent(elementId) {
            let trobat = elementId.classList.contains(className);
            elementId.classList.remove(className);
            document
                .getElementById(elementId.dataset.tabid)
                .classList.remove(className);
            return trobat;
        }

        (function desactiva(node) {
            let currentSibling = node.previousElementSibling;

            while (currentSibling != null) {
                if (removeActiveContent(currentSibling)) {
                    return;
                }
                currentSibling = currentSibling.previousElementSibling;
            }
            currentSibling = node.nextElementSibling;
            while (currentSibling != null) {
                if (removeActiveContent(currentSibling)) {
                    return;
                }
                currentSibling = currentSibling.nextElementSibling;
            }
        })(this);

        // activa la pestaña y contenido actuales
        this.classList.add(className);
        document.getElementById(this.dataset.tabid).classList.add(className);
    }

    // establece los controladores para los tabs
    tabsElements.forEach(tab => {
        tab.addEventListener('click', changeTab);
    });
};
