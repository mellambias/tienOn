// import { tabs } from '../../js/tabs.js';
// import { texAreaInputCounter } from '../../js/textAreaInputCounter.js';
// import Tabla from '../js/webComponents/Tabla.js'
import '../js/webComponents/Tab.js';
import '../js/webComponents/Tabla-item.js';
import '../js/webComponents/Tabla.js';
import '../js/webComponents/Tabs.js';

export default class ContactView {
    constructor() {
        // console.log('Creado ContactView');
        this.init();
    }

    async init() {
        try {
            document.addEventListener('contactForm', event => {
                // console.log('evento form', event.composedPath());
                // console.log('evento detail', event.detail);
                this.sendForm(event.detail);
            });
            // console.log('esperando a la tabla');
            const main = document.getElementById('main-content');
            const response = await fetch('./pages/contacto.html');
            main.innerHTML = await response.text();
        } catch (error) {
            console.log(error);
        }
    }

    async sendForm(form) {
        const formData = new FormData(form);
        // console.log('formData', formData);
        document.dispatchEvent(
            new CustomEvent('createElement', { detail: formData })
        );
        // const response = await fetch('http://localhost:3000/contacto', {
        //     method: 'POST',
        //     body: data,
        // });
        // const result = await response.json();
        // console.log(result);
        // form.reset();
    }
}
