import contactForm from './contact-form.js';
import { footer, header } from './partials.js';

const currentDocumentTitle = document
    .getElementsByTagName('title')
    .item(0).outerText;

switch (currentDocumentTitle) {
    case 'Contacto':
        contactForm();
        break;
    case 'checkout':
        contactForm();
        break;

    default:
        break;
}
console.log(`Se encuentra en ${currentDocumentTitle}`);
document.querySelector('header').innerHTML = header(currentDocumentTitle);
document.querySelector('footer').innerHTML = footer();
