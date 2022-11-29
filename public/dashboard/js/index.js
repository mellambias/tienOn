import contactForm from '../../js/contact-form.js';
import { tabs } from '../../js/tabs.js';
import { texAreaInputCounter } from '../../js/textAreaInputCounter.js';

const currentDocumentTitle = document
    .getElementsByTagName('title')
    .item(0).outerText;

switch (currentDocumentTitle) {
    case 'Dashboard':
        contactForm();
        texAreaInputCounter();
        tabs();
        break;
    default:
        break;
}
console.log(`Se encuentra en ${currentDocumentTitle}`);