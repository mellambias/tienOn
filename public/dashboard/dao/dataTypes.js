/**
 * Adaptador de dataTypes sequelize para validator
 */
const DataTypes = {
    STRING: 'string',
    TEXT: 'string',
    UUID: 'string',
    UUIDV4: 'string',
    ENUM: 'string',
    BOOLEAN: 'boolean',
    INTEGER: 'integer',
    BIGINT: 'integer',
    FLOAT: 'number',
    REAL: 'number',
    DOUBLE: 'number',
    DECIMAL: 'number',
    DATE: 'date',
    ARRAY: 'array',
    JSON: 'json',
};
/**
 * Conversiones de tipos
 */
export const getTypeConversion = {
    string: value => value,
    boolean: value => value == true,
    integer: value => parseInt(value) || undefined,
    number: value => parseFloat(value) || undefined,
    date: value => {
        let fecha, any, mes, dia;
        let mesToString, diaToString;
        fecha = new Date(value);
        any = fecha.getFullYear();
        mes = fecha.getMonth() + 1;
        dia = fecha.getDate();

        mesToString = mes < 9 ? '0' + mes : mes;
        diaToString = dia < 9 ? '0' + dia : dia;

        return `${any}-${mesToString}-${diaToString}`;
    },
    array: value => value,
    json: value => JSON.stringify(value),
};
export const setTypeConversion = {
    string: value => value,
    boolean: value => value == true,
    integer: value => parseInt(value) || undefined,
    number: value => parseFloat(value) || undefined,
    date: value => new Date(value),
    array: value => value,
    json: value => JSON.stringify(value),
};

export default DataTypes;
