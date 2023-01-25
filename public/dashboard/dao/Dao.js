import validate from './validate/validate.js';
import { isDecimal, isEmpty } from './validator/validator.js';

validate.validators.validate = function (value, options, key, attributes) {
    let error = [];
    if (
        options?.notEmpty &&
        isEmpty(value + '', { ignore_whitespace: false })
    ) {
        error.push('no puede estar vacio');
    }
    if (options?.isDecimal && !isDecimal(value + '')) {
        error.push('tiene que ser decimal');
    }
    if (options?.min) {
        console.log('%o < %o', value, options.min);
        error.push('tiene que ser mayor que ');
    } else {
        console.log('no tiene min %o', key);
    }

    if (error.length) {
        console.log('(%s) %o', error.length, error);
        return error;
    }

    return;
};
class Dao {
    constructor() {
        this.model = this.defineModel();
    }

    defineModel() {
        const model = {
            id: {
                type: 'integer',
            },
            categoryId: {
                type: 'integer',
                presence: true,
                validate: {
                    notEmpty: true,
                },
            },
            taxeId: {
                type: 'integer',
            },
            name: {
                type: 'string',
                presence: true,
                validate: {
                    notEmpty: true,
                },
            },
            price: {
                type: 'number',
                validate: {
                    notEmpty: true,
                    isDecimal: true,
                    min: 0,
                },
            },

            outstanding: {
                type: 'boolean',
                validate: {
                    isIn: [[true, false]],
                },
            },
        };
        return model;
    }

    validateObject(obj) {
        console.log('validar');
        console.log(validate(obj, this.model));
    }
}

export default Dao;
