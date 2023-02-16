class TabsComponent extends HTMLElement {
    static formAssociated = true;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.internals = this.attachInternals();
        this.setValue(''); // set form value to empty string or FormData object
        this.borderColor = this.getAttribute('bordercolor') || 'black';
        this.backGroundColor = this.getAttribute('bgColor') || 'white';
        this.textColor = this.getAttribute('textColor') || undefined;
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
    getComplementaryColor = (color = '') => {
        const colorPart = color.slice(1);
        const ind = parseInt(colorPart, 16);
        let iter = ((1 << (4 * colorPart.length)) - 1 - ind).toString(16);
        while (iter.length < colorPart.length) {
            iter = '0' + iter;
        }
        console.log('Complementario de %s es #%s', color, iter);
        return '#' + iter;
    };

    getStyle() {
        return `
        .tabs {
            padding-top: 2vh;
            height: 100vh;
            width: 100%;
            overflow-y: scroll;
        }
        nav {
            width: 90%;
        }
        ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            width: 100%;
        }
        .tab {

            background-color: #d3d3d3;
            border: 3px solid black;
            border-color: ${this.borderColor};
            border-radius: 10px;
            border-bottom: 0px solid;
            border-bottom-left-radius: 0px;
            border-bottom-right-radius: 0px;
            width: 33%;
            height: 3rem;
            min-height: 2rem;
            margin-right: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
            user-select: none;
        }
        .tab.noActive {
            position: relative;
            top: 1rem;
            z-index: 100;
            align-items: end;
            pointer-events: all;
        }
        .tab.active {
            position: relative;
            top: 3px;
            z-index: 200;
            background-color: ${this.backGroundColor};
            border-width: 3px;
            border-bottom: 0px solid hsl(0deg, 0%, 100%);
            margin-bottom: -2px;
        }
        .tab.active > p {
            color: ${
                this.textColor
                    ? this.textColor
                    : this.getComplementaryColor(this.backGroundColor)
            };
            font-weight: bold;
            font-size: 1.5rem;
        }
        .tab.noActive > p {
            color: #696969;
            font-weight: bold;
            font-size: 1.5rem;
            position: relative;
            top: 0.2rem;
        }
    `;
    }

    render() {
        const template = document.getElementById('template-tabs').content;
        const style = document.createElement('style');
        style.innerHTML = this.getStyle();
        this.shadow.appendChild(style);
        this.shadow.appendChild(template.cloneNode(true));
        this.shadow.addEventListener('slotchange', event => {
            const slot = this.shadow.querySelector('slot').assignedElements();
            for (let element in slot) {
                slot[element].setAttribute('borderColor', this.borderColor);
                slot[element].setAttribute('bgColor', this.backGroundColor);
            }
        });
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
