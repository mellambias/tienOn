// import { tabs } from '../../js/tabs.js';
import { texAreaInputCounter } from '../../js/textAreaInputCounter.js';
// import Tabla from '../js/webComponents/Tabla.js'

export default class ContactView {
    constructor() {
        console.log('Creado ContactView');
        this.render();
    }

    async render() {
        const main = document.getElementById('main-content');
        const response = await fetch('./pages/contacto.html');
        main.innerHTML = await response.text();
        texAreaInputCounter();
        // tabs();
    }
}
