class Menu extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    // static get observedAttributes() {
    //     return [''];
    // }

    connectedCallback() {
        this.render();
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
                // a.addEventListener('click', route);
                return;
            }
        });
    }

    // leer datos de menuData.json usando async await
    async leeData() {
        const menuData = await fetch('./layout/menuData.json');
        const menu = await menuData.json();
        return menu;
    }

    async render() {
        this.shadow.innerHTML = `
        <style>
        a {
            margin: 0;
            background-color: transparent;
            -webkit-transition: 300ms;
            -moz-transition: 300ms;
            -o-transition: 300ms;
            font-weight: 600;
            text-decoration: none;
            transition: 300ms;
        }
        a:hover,
        a:focus {
            outline: none;
            text-decoration: none;
            outline-offset: 0;
        }
        ol,
        ul {
            list-style: none;
            padding-left: 0;
            margin: 0;
        }
        .col-menu-main {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
}
.col-menu-main > .col-menu {
    width: 10%;
    flex-grow: 1;
}
.col-menu-main > .col-main {
    width: 85%;
    margin-top: 2rem;
    margin-left: 1rem;
    flex-grow: 1;
    display: flex;
}
        .col-menu {
            background-color: hsl(218deg, 44%, 45%);
            height: 90vh;
            position: static;
            visibility: visible;
            opacity: 1;
            left: 0vw;
            transition: all 5s linear;
        }
        .col-menu nav {
            display: flex;
        flex-direction: column;
        }
        .col-menu.collapse {
            position: absolute;
            visibility: collapse;
            opacity: 0;
            left: -100vw;
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
        <div id="menubar" class="col-menu">
            <nav>
                <ul id="main-menu" class="treeMenu"></ul>
            </nav>
        </div>`;
        const root = this.shadow.getElementById('main-menu');
        const menu = await this.leeData();
        console.log('(%o) menu: %o', new Date(), menu);
        await this.crearMenu(root, menu);
    }
}

customElements.define('menu-component', Menu);
