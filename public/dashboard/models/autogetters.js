const DataTypes = {
    STRING: 'string',
    TEXT: 'string',
    BOOLEAN: 'boolean',
    INTEGER: 'integer',
    BIGINT: 'integer',
    FLOAT: 'number',
    REAL: 'number',
    DOUBLE: 'number',
    DECIMAL: 'number',
    DATE: 'date',
    UUID: 'string',
    UUIDV4: 'string',
    ARRAY: 'array',
    JSON: 'json',
    ENUM: 'string',
};

class Contact {
    constructor() {
        this.model = {
            id: 0,
            fingerprintId: 0,
            name: '',
            surnames: '',
            phone: '',
            email: '',
            message: '',
        };
        this.dtd = this.defineModel();
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
    static getterAndSetter(vistaToModel) {
        const keys = Object.keys(vistaToModel);
        keys.forEach(key => {
            Object.defineProperty(this.prototype, `${key}`, {
                get() {
                    return this.model[vistaToModel[key]];
                },
                set(value) {
                    this.model[vistaToModel[key]] = value;
                },
            });
        });
        return keys;
    }
}

class ContactCtr {
    constructor(model) {
        this.modelClass = model;
        this.vistaToModel = this.modelClass.getterAndSetter(
            this.vistaToModel()
        );
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
}

const contacto = new Contact();
const contacto2 = new Contact();
const contactoCtr = new ContactCtr(Contact);
contacto.nombre = 'Jorge';
contacto.apellidos = 'Garcia Perez';

contacto2.nombre = 'Miguel';
contacto2.apellidos = 'Llambias Juan';
console.log('nombre: ', contacto.nombre);
console.log('apellidos: ', contacto.apellidos);
console.log(contacto.model);
console.log('nombre: ', contacto2.nombre);
console.log('apellidos: ', contacto2.apellidos);
console.log(contacto2.model);
