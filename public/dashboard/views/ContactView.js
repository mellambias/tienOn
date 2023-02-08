// import { tabs } from '../../js/tabs.js';
// import { texAreaInputCounter } from '../../js/textAreaInputCounter.js';
// import Tabla from '../js/webComponents/Tabla.js'
import '../js/webComponents/Tab.js';
import '../js/webComponents/Tabla-item.js';
import '../js/webComponents/Tabla.js';
import '../js/webComponents/Tabs.js';

export default class ContactView {
    constructor() {
        console.log('Creado ContactView');
        this.render();
    }

    async render() {
        try {
            const main = document.getElementById('main-content');
            const response = await fetch('./pages/contacto.html');
            main.innerHTML = await response.text();
            const form = document.querySelector('#contactForm');
            console.log('formulario', form);
            document.addEventListener('contactForm', event => {
                console.log('evento form', event.composedPath());
                console.log('evento detail', event.detail);
                this.sendForm(event.detail);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async sendForm(form) {
        const formData = new FormData(form);
        console.log(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        console.log(data);
        // const response = await fetch('http://localhost:3000/contacto', {
        //     method: 'POST',
        //     body: data,
        // });
        // const result = await response.json();
        // console.log(result);
        // form.reset();
    }
}
