import Model, { DataTypes } from '../dao/Model.js';

// propiedades obligatorias
// presence: true;

export default class Contact extends Model {
    constructor() {
        super();
        this.connection.endPoint = '/api/admin/contact';
    }
    defineModel() {
        return {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            fingerprintId: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            surnames: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    isMobilePhone: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: false,
                length: { minimum: 20, maximum: 500 },
                validate: {
                    notEmpty: true,
                },
            },
        };
    }
}
