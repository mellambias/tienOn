import Connection from '../dao/Connection.js';
import Contact from '../models/Contact.js';
import ContactView from '../views/ContactView.js';
import Controller from './Controller.js';

class ContactController extends Controller {
    constructor(model, connection, vista) {
        super(model, connection, vista);
    }

    vistaToModel() {
        return {
            id: 'id',
            fingerprintId: 'fingerprintId',
            nombre: 'name',
            apellidos: 'surnames',
            telefono: 'phone',
            email: 'email',
            mensaje: 'message',
        };
    }

    async loadData() {
        const records = await this.modelInstance.findAll();
        console.log(records);
    }

    async loadOne(id) {
        const record = await this.modelInstance.findOne(id);
        console.log(record);
    }

    loadDataTable = async () => {
        console.log('loadDataTable');
        const results = await this.modelInstance.findAll();
        if (results.count) {
            results.records.forEach(record => {
                const newModel = new this.modelClass(this.connection);
                newModel._vistaToModel = this.vistaToModel;
                newModel._model = record;
                newModel.previus = newModel._model;
                this.records.set(record.id, newModel);
            });
            document.dispatchEvent(
                new CustomEvent('tablaData', {
                    detail: this.records,
                })
            );
        }
    };
    processContact = async event => {
        console.log('processContact ->', event.detail);
        let newContact;

        // function getFormData(formElement, controler) {
        //     const data = {};
        //     const formData = new FormData(formElement);
        //     for (const key of formData.keys()) {
        //         let value = formData.get(key);
        //         let keyInModel = controler.vistaToModel[key];
        //         switch (controler.modelInstance.modelDtd[keyInModel].type) {
        //             case 'integer':
        //                 value = parseInt(value);
        //                 break;
        //             case 'boolean':
        //                 value = value === 'true';
        //                 break;
        //             case 'number':
        //                 value = parseFloat(value);
        //         }
        //         data[key] = value;
        //     }
        //     return data;
        // }
        const data = this.getFormData(event.detail, this);
        console.log(data);

        if (data?.id) {
            // Ya exite el contacto
            newContact = this.records.get(data.id);
        } else {
            newContact = new this.modelClass(this.connection);
            newContact._vistaToModel = this.vistaToModel;
        }
        newContact.model = data;
        if (Object.keys(newContact.errors).length != 0) {
            const errors = newContact.modelParse(
                newContact.errors,
                this.vistaToModel
            );
            document.dispatchEvent(
                new CustomEvent('FormError', { detail: errors })
            );
        } else {
            const response = await newContact.save();
            console.log('Contacto guardado', response);
            this.records.set(response.model.id, response);
            document.dispatchEvent(
                new CustomEvent('tablaData', {
                    detail: this.records,
                })
            );
        }
    };
    useCases() {
        console.log('activando useCases for Contact');
        const instance = this;
        document.addEventListener('tablaReady', () => {
            instance.loadDataTable();
        });
        document.addEventListener('contactForm', event => {
            instance.processContact(event);
        });
    }
}

ContactController.create = () => {
    const contactConnection = new Connection(
        'http://127.0.0.1:8080/api/admin/contact'
    );
    const vista = new ContactView();
    return [Contact, contactConnection, vista];
};
export default ContactController;
