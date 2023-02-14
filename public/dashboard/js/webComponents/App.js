import BookController from '../../controlers/BookController.js';
import ContactController from '../../controlers/ContactController.js';
import MenuController from '../../controlers/MenuController.js';

const controladores = {
    book: BookController,
    contact: ContactController,
    menu: MenuController,
};
class App extends HTMLElement {
    constructor() {
        super();
        // console.log('App current location %o', window.location.href);
        // console.log(window.history.state);
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
        // console.log('La app a recibido %o', event.detail?.menuItem);
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
        // console.log('Cargar el controler %o', controler);
        const contact = controladores[controler.controlerName]?.create();
        console.log('Contacto %o', contact);
    };

    async loadMenu() {
        try {
            const menuController = MenuController.create();
            // console.log('buscar datos menu->');
            const data = await menuController.loadData('admin-header');
            console.log('lanza evento -> loadMenuData');
            document.dispatchEvent(
                new CustomEvent('loadMenuData', {
                    detail: { dataMenu: data },
                })
            );
        } catch (error) {
            console.log(error);
        }
    }
}

customElements.define('wc-app', App);
