import Model, { DataTypes } from '../dao/Model.js';

// propiedades obligatorias
// presence: true;

export default class Menu extends Model {
    constructor(connection) {
        super(connection);
    }
    defineModel() {
        return {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                presence: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                presence: true,
                validator: {
                    notNull: {
                        msg: 'Por favor, rellena el campo "Nombre".',
                    },
                },
            },
            customUrl: {
                type: DataTypes.STRING,
            },
            order: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                validator: {
                    notNull: {
                        msg: 'Por favor, rellena el campo "Orden".',
                    },
                },
            },
            parentId: {
                type: DataTypes.INTEGER,
            },
        };
    }

    async findMenu(name) {
        try {
            let temp = this.connection.endPoint;
            this.connection.endPoint += `/display`;
            console.log(
                'findMenu -> buscando todos los registros -> %o',
                this.connection
            );
            const records = await this.connection.findOne(name);
            this.connection.endPoint = temp;
            return records;
        } catch (error) {
            this.errors = {
                message: `Error en el modelo ${error}`,
            };
            console.log('Errores:', this.errors);
            this._model = {};
            this.previus = {};
            this.records = [];
            return this;
        }
    }
}
