import contactForm from './contact-form.js';
import notification from './notification.js';
import { footer, header } from './partials.js';
import { plusMinusButton } from './plus-minus-button.js';
import { tabs } from './tabs.js';
import { texAreaInputCounter } from './textareaInputCounter.js';

const currentDocumentTitle = document
    .getElementsByTagName('title')
    .item(0).outerText;

switch (currentDocumentTitle.toLowerCase()) {
    case 'contacto':
        contactForm();
        texAreaInputCounter();
        break;
    case 'checkout':
        contactForm();
        break;
    case 'producto':
        tabs();
    case 'carrito':
        plusMinusButton();
        break;
    default:
        break;
}
notification();
console.log(`Se encuentra en ${currentDocumentTitle}`);
const headerElement = document.querySelector('header');
const footerElement = document.querySelector('footer');
if (headerElement) headerElement.innerHTML = header();
if (footerElement) footerElement.innerHTML = footer();
