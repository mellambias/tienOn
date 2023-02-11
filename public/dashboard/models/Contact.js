import Model, { DataTypes } from '../dao/Model.js';

// propiedades obligatorias
// presence: true;

export default class Contact extends Model {
    constructor(connection) {
        super(connection);
    }
    defineModel() {
        return {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            fingerprintId: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                presence: true,
                validate: {
                    notEmpty: true,
                },
            },
            surnames: {
                type: DataTypes.STRING,
                presence: true,
                validate: {
                    notEmpty: true,
                },
            },
            phone: {
                type: DataTypes.STRING,
                presence: true,
                validate: {
                    notEmpty: true,
                    isMobilePhone: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                presence: true,
                validate: {
                    isEmail: true,
                },
            },
            message: {
                type: DataTypes.TEXT,
                presence: true,
                length: { minimum: 20, maximum: 100 },
                validate: {
                    notEmpty: true,
                },
            },
        };
    }
}
