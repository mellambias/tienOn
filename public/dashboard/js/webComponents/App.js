import createContactControler from '../../controlers/ContactController.js';
import Controller from '../../controlers/Controller.js';
import MenuController from '../../controlers/MenuController.js';
import Connection from '../../dao/Connection.js';
import Contact from '../../models/Contact.js';
import Menu from '../../models/Menu.js';

class App extends HTMLElement {
    constructor() {
        super();
        console.log('App current location %o', window.location.href);
        console.log(window.history.state);
        if (window.history.state != null) {
            this.loadControler(window.history.state);
            window.document.title = location.href.split('/').slice(-1)[0];
            document.dispatchEvent(
                new CustomEvent('clickLink', {
                    detail: { menuItem: window.history.state },
                })
            );
        }
    }

    connectedCallback() {
        window.addEventListener('popstate', this.readFromHistory);
        document.addEventListener('clickLink', this.changePage);
        document.addEventListener('menuConnected', this.loadMenu);
    }

    readFromHistory = event => {
        event.preventDefault();
        console.log('From History', event?.state);
        if (window.history.state != null) {
            this.loadControler(window.history.state);
            window.document.title = location.href.split('/').slice(-1)[0];
            document.dispatchEvent(
                new CustomEvent('clickLink', {
                    detail: { menuItem: window.history.state },
                })
            );
        }
    };

    changePage = event => {
        event.preventDefault();
        const controler = event.detail?.menuItem;
        console.log('La app a recibido %o', event.detail?.menuItem);
        if (!controler) return;
        if (event.detail?.menuItem) {
            window.document.title = event.detail.menuItem.item;
            window.history.pushState(
                event.detail.menuItem,
                window.title,
                event.detail.menuItem.item
            );
        }
        window.document.title = location.href.split('/').slice(-1)[0];
        this.loadControler(controler);
    };

    loadControler = async controler => {
        console.log('Cargar el controler %o', controler);
        switch (controler.item) {
            case 'Usuarios':
                break;
            case 'Contactos':
                createContactControler();
                break;
            case 'admin-header':
            default:
                break;
        }
    };

    async loadMenu() {
        try {
            const menuConnection = new Connection(
                `http://127.0.0.1:8080/api/admin/menu`
            );
            const model = new Menu(menuConnection);
            const vista = null;
            const myMenuCtr = new MenuController(model, vista);
            console.log('buscar datos ->');
            const data = await myMenuCtr.loadData('admin-header');
            document.dispatchEvent(
                new CustomEvent('loadMenuData', {
                    detail: { dataMenu: data },
                })
            );
        } catch (error) {
            console.log(error);
        }
    }

    async loadData(controler) {
        const menuConnection = new Connection(
            `http://127.0.0.1:8080${controler.path}`
        );
        console.log('Conexion con %o', menuConnection);
        const model = new Contact(menuConnection);
        const vista = null;
        const controller = new Controller(model, vista);
        console.log('buscar datos para %o', controler.item);
        const data = await controller.loadData();
    }
}

customElements.define('wc-app', App);
