import Model from '../dao/Model.js';

// propiedades obligatorias
// presence: true;

export default class Contact extends Model {
    constructor() {
        super();
        this.connection.endPoint = '/front/contact';
    }
    defineModel() {
        return;
    }
}
