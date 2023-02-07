class TabsComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
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
        const tabsElements = [...this.shadow.querySelectorAll('li.tab')];
        const className = 'active';
        const shadow = this.shadow; // closure del this.
        //controlador del evento click
        function changeTab() {
            function removeActiveContent(elementId) {
                let trobat = elementId.classList.contains(className);
                elementId.classList.remove(className);
                console.log(shadow.getElementById(elementId.dataset.tabid));
                shadow
                    .getElementById(elementId.dataset.tabid)
                    .classList.remove(className);
                return trobat;
            }

            (function desactiva(node) {
                let currentSibling = node.previousElementSibling;
                console.log('hermano del nodo  ', node, currentSibling);
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
            shadow.getElementById(this.dataset.tabid).classList.add(className);
        }

        // establece los controladores para los tabs
        tabsElements.forEach(tab => {
            console.log('addEventListener', tab);
            tab.addEventListener('click', this.changeTab2);
        });
    };
    changeTab2(ev) {
        console.log('previousElementSibling', this.previousElementSibling);
        const content = document.getElementById(this.dataset.tabid);
        console.log(content);
        content.setAttribute('state', 'active');
    }
}

customElements.define('wc-tabs', TabsComponent);
