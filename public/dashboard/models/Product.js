import Model, { DataTypes } from '../dao/Model.js';

// propiedades obligatorias
// presence: true;

export default class Product extends Model {
    constructor() {
        super();
        this.connection.endPoint = '/api/admin/product/';
    }
    defineModel() {
        return {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            taxeId: {
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    notEmpty: true,
                },
            },
            price: {
                type: DataTypes.DECIMAL,
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                    min: 0,
                },
            },
            outstanding: {
                type: DataTypes.BOOLEAN,
                validate: {
                    isIn: [[true, false]],
                },
            },
        };
    }
}
