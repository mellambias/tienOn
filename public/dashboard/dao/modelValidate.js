import validate from './libs/validate.js';
import Validator from './libs/validator.js';
const validator = Validator();
/**
 * validador adaptador para secuelize
 * @param {any} value - valor del campo
 * @param {any} options condiciones ha cumplir el campo
 * @param {any} key   nombre del campo
 * @param {any} attributes - todos los campos ha comprobar
 * @returns {null} - retorna null si es valido
 * @returns {array} - array de errores
 */
validate.validators.validate = function (value, options, key, attributes) {
    console.log(value, options, key, attributes);
    let error = [];
    let validates = {
        notEmpty: {
            check: value =>
                validator.isEmpty(value + '', { ignore_whitespace: false }),
            message: 'No puede estar vacio',
        },
        isMobilePhone: {
            check: value => !validator.isMobilePhone(value + '', 'es-ES'),
            message: 'Debe ser un teléfono valido',
        },
        isDecimal: {
            check: value => !validator.isDecimal(value + ''),
            message: 'Debe ser un número decimal',
        },
        isIn: {
            check: value => !validator.isIn(value + '', options.isIn),
            message: 'Debe estar dentro de los valores permitidos',
        },
        isEmail: {
            check: value => !validator.isEmail(value + ''),
            message: 'Debe ser un un email valido',
        },
    };
    try {
        for (let option in options) {
            if (validates[option]?.check) {
                const isError = validates[option].check(value);
                if (isError) {
                    error.push(validates[option].message);
                }
            } else {
                error.push(`no existe el validador  ${option}`);
            }
        }
    } catch (e) {
        console.log(e);
        error.push(e.message);
        throw e;
    }

    if (error.length) {
        console.log(error);
        return error;
    }

    return;
};

validate.validators.autoIncrement = () => null;
validate.validators.primaryKey = () => null;
validate.validators.allowNull = () => null;

export default validate;
