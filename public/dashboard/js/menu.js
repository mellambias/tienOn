import route from './route.js';

export const menuTree = async () => {
    // crear un arbol de menu
    async function crearMenu(root, menu) {
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
                crearMenu(ul, menuItem.content);
            } else {
                const a = document.createElement('a');
                li.appendChild(a);
                a.innerHTML = menuItem.item;
                a.href = menuItem.path;
                a.dataset.href = menuItem.path;
                a.addEventListener('click', route);
                return;
            }
        });
    }

    // leer datos de menuData.json usando async await
    async function leeData() {
        const menuData = await fetch('./layout/menuData.json');
        const menu = await menuData.json();
        return menu;
    }

    const root = document.getElementById('main-menu');
    const menu = await leeData();
    console.log(menu);
    await crearMenu(root, menu);
};

// cierra o abre el menu lateral
export const collapseToggler = () => {
    const menus = [...document.getElementsByClassName('collapseToggler')];

    menus.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const idCollapsible = this.dataset.id;
            document.getElementById(idCollapsible).classList.toggle('collapse');
        });
    });
};
