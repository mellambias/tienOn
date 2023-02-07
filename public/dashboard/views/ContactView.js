// import { tabs } from '../../js/tabs.js';
// import { texAreaInputCounter } from '../../js/textAreaInputCounter.js';
// import Tabla from '../js/webComponents/Tabla.js'

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
            const form = document.querySelector('form');

            form.addEventListener('submit', event => {
                console.log('evento', event);
                event.preventDefault();
                this.sendForm(event);
            });
        } catch (error) {
            console.log(error);
        }
    }

    async sendForm(event) {
        console.log('evento recibido', event);
        event.preventDefault();
        const form = e.target;
        const data = new FormData(form);
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
