import Connection from '../dao/Connection.js';
import Contact from '../models/Contact.js';
import Controller from './Controller.js';

const contactConnection = new Connection('/api/admin/contact');
const model = new Contact(contactConnection);
const vista = null;

class ContactController extends Controller {
    constructor(model = model, vista = vista) {
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

export default ContactController;
