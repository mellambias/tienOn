import Model from '../dao/Model.js';

// propiedades obligatorias
// Cambiar allowNull: false => presence: true

export default class Contact extends Model {
    constructor(connection) {
        super(connection);
    }
    defineModel() {
        return;
    }
}
