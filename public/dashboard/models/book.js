import Model, { DataTypes } from '../dao/Model.js';

// propiedades obligatorias
// presence: true equivale a allowNull:false

export default class Book extends Model {
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
            title: {
                type: DataTypes.STRING,
                presence: true,
                validate: {
                    notEmpty: true,
                },
            },
            author: {
                type: DataTypes.STRING,
                presence: true,
                validate: {
                    notEmpty: true,
                },
            },
            description: {
                type: DataTypes.TEXT,
                presence: true,
                validate: {
                    notEmpty: true,
                },
            },
            isbn: {
                type: DataTypes.STRING,
                presence: true,
                validate: {
                    notEmpty: true,
                    isbn: true,
                },
            },
            pageCount: {
                type: DataTypes.INTEGER,
                presence: true,
                validate: {
                    isInt: true,
                },
            },
            publishedDate: {
                type: DataTypes.DATE,
                presence: true,
            },
        };
    }
}
