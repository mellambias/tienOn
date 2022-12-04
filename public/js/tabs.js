export const tabs = () => {
    const tabsElements = [...document.getElementsByClassName('tab')];

    //controlador del evento click
    function changeTab(evento) {
        let activeNameId;
        let currentElement;
        /*
         * comprueba que el elemento tenga el atributo. Si lo tiene es un div
         * de lo contrario es un hijo y hay que buscar en el padre.
         */
        if (evento.target.hasAttribute('data-tabid')) {
            activeNameId = evento.target.dataset.tabid;
            currentElement = evento.target;
        } else {
            activeNameId = evento.target.parentElement.dataset.tabid;
            currentElement = evento.target.parentElement;
        }

        //Si la pestaña ya esta activa => salir
        if (currentElement.classList.contains('active')) {
            return;
        }

        //habilitar el elemento actual
        let currentSibling = currentElement.nextElementSibling;
        while (currentSibling != null) {
            currentSibling.classList.remove('active');
            document
                .getElementById(currentSibling.dataset.tabid)
                .classList.remove('active');
            currentSibling = currentSibling.nextElementSibling;
        }
        currentSibling = currentElement.previousElementSibling;
        while (currentSibling != null) {
            currentSibling.classList.remove('active');
            document
                .getElementById(currentSibling.dataset.tabid)
                .classList.remove('active');
            currentSibling = currentSibling.previousElementSibling;
        }
        // activa la pestaña y contenido actuales
        currentElement.classList.add('active');
        document.getElementById(activeNameId).classList.add('active');
    }

    // establece los controladores para los tabs
    tabsElements.forEach(element => {
        element.addEventListener('click', changeTab);
    });
};
