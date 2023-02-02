import contactForm from '../../js/contact-form.js';
import notification from '../../js/notification.js';
import { tabs } from '../../js/tabs.js';
import { texAreaInputCounter } from '../../js/textAreaInputCounter.js';
import empresaForm from './empresaForm.js';
import ivaform from './ivaForm.js';
import { renderLogin } from './login.js';
// import { collapseToggler, menuTree } from './menu.js';
import test from './daoTest.js';
import newUser from './newUser.js';
import login from './sigin.js';
import './webComponents/App.js';
import './webComponents/ElementDetails.js';
import './webComponents/Menu.js';
import './webComponents/PageTitle.js';
import './webComponents/Tabla.js';

test();
window.userSession = {};

const changePage = () => {
    const currentDocumentTitle =
        document.getElementById('breadcrumb').outerText;
    const pageTitle = (document.getElementById('page-title').title =
        currentDocumentTitle);
    const userDom = document.getElementById('userSession');
    if (userDom && userSession.name) {
        userDom.innerHTML = userSession.name;
    }

    switch (currentDocumentTitle.toLowerCase()) {
        case 'panel de control':
            break;
        case 'ivaform':
            renderLogin();
            ivaform('192.168.1.16', 8080, 'api/admin/taxes');
            break;
        case 'datos-empresa':
            empresaForm();
            texAreaInputCounter();
            tabs();
            break;
        case 'nuevo usuario':
            renderLogin();
            newUser();
            break;
        case 'contacto':
            contactForm();
            texAreaInputCounter();
            tabs();
            break;
        case 'login':
            login();
            break;
        case 'faq-categories':
            break;
        default:
            break;
    }
    console.log(`Se encuentra en ${currentDocumentTitle}`);
};
// componentes comunes
// menuTree();
// collapseToggler();
notification();
changePage();
export default changePage;
