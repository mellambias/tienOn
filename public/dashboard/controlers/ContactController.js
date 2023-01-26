import Contact from '../models/Contact';
import Controller from './Controller';

const model = new Contact();
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
