import validate from './libs/validate.js';
import Validator from './libs/validator.js';
const validator = Validator();
/**
 * validador adaptador para secuelize
 * @param {any} value - valor del campo
 * @param {any} options - valor de la clave
 * @param {any} key   - clave de la validacion
 * @param {any} attributes - atributos del campo
 * @returns {null} - retorna null si es valido
 * @returns {array} - array de errores
 */
validate.validators.validate = function (value, options, key, attributes) {
    let error = [];
    if (
        options?.notEmpty &&
        validator.isEmpty(value + '', { ignore_whitespace: false })
    ) {
        error.push('no puede estar vacio');
    }
    if (
        options?.isDecimal &&
        !validator.isDecimal(value + '', { decimal_separator: '.' })
    ) {
        error.push('tiene que ser decimal');
    }
    if (options.hasOwnProperty('min') && value < options.min) {
        error.push(`tiene que ser mayor que ${options.min}`);
    }
    if (options?.isIn && validator.isIn(value + '', options.isIn)) {
        error.push('no esta dentro de los valores permitidos');
    }

    if (error.length) {
        return error;
    }

    return;
};

validate.validators.autoIncrement = () => null;
validate.validators.primaryKey = () => null;
validate.validators.allowNull = () => null;

export default validate;
