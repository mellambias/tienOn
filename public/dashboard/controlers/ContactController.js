import Connection from '../dao/Connection.js';
import Contact from '../models/Contact.js';
import ContactView from '../views/contactView.js';
import Controller from './Controller.js';

const createContactControler = () => {
    const contactConnection = new Connection('/api/admin/contact');
    const model = new Contact(contactConnection);
    const vista = new ContactView();
    const controller = new ContactController(model, vista);
    return controller;
};

class ContactController extends Controller {
    constructor(model, vista) {
        super(model, vista);
        this.vistaToModel = this.vistaToModel();
    }

    vistaToModel() {
        return {
            name: 'name',
            surnames: 'surnames',
            phone: 'phone',
            email: 'email',
            message: 'message',
        };
    }

    async loadData() {
        const records = await model.findAll();
        console.log(records);
    }

    async loadOne(id) {
        const record = await model.findOne(id);
        console.log(record);
    }
}

export default createContactControler;
