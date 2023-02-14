class TabsComponent extends HTMLElement {
    static formAssociated = true;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.internals = this.attachInternals();
        this.setValue(''); // set form value to empty string or FormData object
    }

    formAssociatedCallback(form) {
        console.log('form associated', form.id);
    }
    // set form value
    setValue(value) {
        this.value = value;
        this.internals.setFormValue(value); //A File, a string, or a FormData as the value to be submitted to the server.
    }

    connectedCallback() {
        this.render();
        this.tabs();
    }

    render() {
        const template = document.getElementById('template-tabs').content;
        this.shadow.appendChild(template.cloneNode(true));
    }

    tabs = () => {
        const tabsElements = this.shadow.querySelectorAll('li.tab');
        const className = 'active';
        const shadow = this.shadow; // closure del this.
        //controlador del evento click
        function changeTab() {
            function removeActiveContent(elementId) {
                let trobat = elementId.classList.contains(className);
                elementId.classList.remove(className);
                elementId.classList.add('noActive');

                document
                    .getElementById(elementId.dataset.tabid)
                    .setAttribute('state', 'noActive');
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
            this.classList.remove('noActive');
            document
                .getElementById(this.dataset.tabid)
                .setAttribute('state', 'active');
        }

        // establece los controladores para los tabs
        tabsElements.forEach(tab => {
            tab.onclick = changeTab;
        });
    };
}

customElements.define('wc-tabs', TabsComponent);
