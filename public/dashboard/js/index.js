import contactForm from '../../js/contact-form.js';
import notification from '../../js/notification.js';
import { tabs } from '../../js/tabs.js';
import { texAreaInputCounter } from '../../js/textAreaInputCounter.js';
import { collapseToggler, menuTree } from './menu.js';

const changePage = () => {
    const currentDocumentTitle =
        document.getElementById('breadcrumb').outerText;

    switch (currentDocumentTitle.toLowerCase()) {
        case 'panel de control':
        case 'contacto':
            contactForm();
            texAreaInputCounter();
            tabs();
            break;
        default:
            break;
    }
    console.log(`Se encuentra en ${currentDocumentTitle}`);
};
// componentes comunes
menuTree();
collapseToggler();
notification();
changePage();
export default changePage;
