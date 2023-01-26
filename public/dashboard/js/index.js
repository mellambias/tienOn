import contactForm from '../../js/contact-form.js';
import notification from '../../js/notification.js';
import { tabs } from '../../js/tabs.js';
import { texAreaInputCounter } from '../../js/textAreaInputCounter.js';
import Product from '../models/Product.js';
import empresaForm from './empresaForm.js';
import ivaform from './ivaForm.js';
import { renderLogin } from './login.js';
// import { collapseToggler, menuTree } from './menu.js';
import newUser from './newUser.js';
import login from './sigin.js';
import './webComponents/Menu.js';
import './webComponents/PageTitle.js';

let myModel = new Product();
myModel.model = {
    categoryId: 4,
    taxeId: 16,
    name: 'camiseta',
    price: 150.3,
    outstanding: false,
};
console.log(myModel.model);
// myModel.validateModel({
//     categoryId: 4,
//     taxeId: 16,
//     name: 'camiseta',
//     price: -150.3,
//     outstanding: false,
// });
const formValues = {
    catId: 20,
    taxId: 80,
    produntoNombre: 'Producto de lana',
    precio: 500,
    existe: false,
    iva: 0.21,
};
const modelForm = {
    catId: 'categoryId',
    taxId: 'taxeId',
    produntoNombre: 'name',
    precio: 'price',
    existe: 'outstanding',
    iva: 'iva',
};
const dataForm2 = {
    categoryId: 4,
    taxeId: 16,
    name: 'americana',
    price: 25,
    outstanding: true,
};
// const apiModel = myModel.modelSync(formValues, modelForm);
// const apiModel = myModel.modelSync(dataForm2);
// console.log('apiModel %o', apiModel);

// const parse = myModel.modelParse(modelForm);
// console.log(parse);
console.log(myModel.save());

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
