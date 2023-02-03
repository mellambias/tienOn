import Controller from '../../controlers/Controller.js';
import MenuController from '../../controlers/MenuController.js';
import Connection from '../../dao/Connection.js';
import Contact from '../../models/Contact.js';
import Menu from '../../models/Menu.js';

class App extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        document.addEventListener('clickLink', this.changePage);
        window.addEventListener('popstate', this.changePage);
        this.loadControler('Menu');
    }

    changePage = event => {
        console.log(
            'La app a recibido %o',
            event?.state || event.detail?.menuItem
        );
        event.preventDefault();

        if (event.detail?.menuItem) {
            window.document.title = event.detail.menuItem.item;
            window.history.pushState(
                event.detail.menuItem,
                window.title,
                event.detail.menuItem.item
            );
        } else {
            window.document.title = location.href.split('/').slice(-1)[0];
        }
        this.loadControler(event?.state || event.detail?.menuItem);
    };

    loadControler = async controler => {
        console.log('Cargar el controler %o', controler);
        switch (controler.item) {
            case 'Usuarios':
                break;
            case 'Contactos':
                this.loadData(controler);
                break;
            case 'admin-header':
            default:
                this.loadMenu(controler);
                break;
        }
    };

    async loadMenu(controler) {
        const menuConnection = new Connection(
            `http://127.0.0.1:8080${controler.path}`
        );
        const model = new Menu(menuConnection);
        const vista = null;
        const myMenuCtr = new MenuController(model, vista);
        console.log('buscar datos ->');
        await myMenuCtr.loadData('admin-header');
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
