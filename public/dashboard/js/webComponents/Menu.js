class Menu extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        document.addEventListener('loadMenuData', this.leeData);
    }

    // static get observedAttributes() {
    //     return [''];
    // }

    connectedCallback() {
        console.log('menu connected');
        // lanza el evento menuConnected
        document.dispatchEvent(
            new CustomEvent('menuConnected', {
                detail: { data: this },
            })
        );
    }
    disconnectedCallback() {}
    attributeChangedCallback(name, oldValue, newValue) {}

    // crear un arbol de menu
    async crearMenu(root, menu) {
        menu.forEach(async menuItem => {
            const li = document.createElement('li');
            root.appendChild(li);
            if (menuItem.content.length > 0) {
                const span = document.createElement('span');
                li.appendChild(span);
                span.innerHTML = menuItem.item;
                span.classList.add('cursor');
                const ul = document.createElement('ul');
                ul.classList.add('close');
                li.appendChild(ul);
                span.addEventListener('click', function () {
                    this.parentElement
                        .querySelector('.close')
                        .classList.toggle('open');
                    this.classList.toggle('cursor-down');
                });
                this.crearMenu(ul, menuItem.content);
            } else {
                const a = document.createElement('a');
                li.appendChild(a);
                a.innerHTML = menuItem.item;
                a.href = menuItem.path;
                a.dataset.href = menuItem.path;
                a.addEventListener('click', event => {
                    event.preventDefault();
                    document.dispatchEvent(
                        new CustomEvent('clickLink', {
                            detail: { menuItem },
                        })
                    );
                });
                return;
            }
        });
    }

    /**
     * Lee los datos y crea el menu
     * @param {*} event
     */
    leeData = async event => {
        console.log('Evento recibido %o', event.detail);
        this.render();
        const root = this.shadow.getElementById('main-menu');
        // const menu = await this.leeData();
        const menu = event.detail.dataMenu;
        console.log('(%o) menu: %o', new Date(), menu);
        await this.crearMenu(root, menu);
    };

    async render() {
        this.shadow.innerHTML = `
        <style>
            a {
                margin: 0;
                background-color: transparent;
                transition: 300ms;
                font-weight: 600;
                text-decoration: none;
            }
            a:hover,
            a:focus {
                outline: none;
                text-decoration: none;
                outline-offset: 0;
            }
            nav {
                display: flex;
                flex-direction: column;
                width:50vh;
            }
            ul {
                list-style: none;
                padding-left: 0;
                margin: 0;
            }
            .treeMenu {
                margin: 1px;
                padding: 1px;
                color: white;
            }
            .treeMenu li {
                margin-top: 0.5rem;
                margin-left: 1rem;
            }
            
            .cursor {
                cursor: pointer;
                user-select: none;
            }

            .cursor::before {
                content: "▶";
                color: white;
                display: inline-block;
                margin-right: 6px;
            }

            .cursor-down::before {
                -ms-transform: rotate(90deg); /* IE 9 */
                -webkit-transform: rotate(90deg); /* Safari */
                transform: rotate(90deg);
            }

            .close {
                position: absolute;
                visibility: collapse;
                opacity: 0;
            }

            .open {
                position: static;
                visibility: visible;
                opacity: 1;
                transition: opacity 1s linear;
            }

        </style>
        <nav>
            <ul id="main-menu" class="treeMenu"></ul>
        </nav>`;
        // const root = this.shadow.getElementById('main-menu');
        // const menu = await this.leeData();
        // console.log('(%o) menu: %o', new Date(), menu);
        // await this.crearMenu(root, menu);
    }
}

/**
 * Cierra el menu
 * @class
 * @extends HTMLElement
 */
class CollapseToggler extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        this.shadow.innerHTML = `
        <style>
            .hambutton-icon {
                display: inline-block;
                width: 1rem;
                background: url(/assets/svg/hamburger-button.svg) 0 0 / contain no-repeat;
            }
            .hambutton-icon::before {
                content: '';
                display: block;
                padding-top: 100%;
            }
        </style>
        <button class="collapseToggler" data-id="menubar">
            <i class="hambutton-icon"></i>
        </button>`;
        const menus = [...this.shadow.querySelectorAll('.collapseToggler')];
        menus.forEach(toggle => {
            toggle.addEventListener('click', function () {
                const idCollapsible = this.dataset.id;
                document
                    .getElementById(idCollapsible)
                    .classList.toggle('collapse');
            });
        });
    }
}

customElements.define('wc-menu', Menu);
customElements.define('wc-collapse-toggler', CollapseToggler);

/*
document.addEventListener('evento,callback)
document.dispatchEvent(
                        new CustomEvent('clickLink', {
                            detail: { data },
                        })
                    );
*/
