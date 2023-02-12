import Connection from './Connection.js';
import DataTypes from './dataTypes.js';
import validate from './modelValidate.js';

const defaultConnection = new Connection();

class Model {
    constructor(connection = defaultConnection) {
        this.modelDtd = this.defineModel();
        this.connection = connection;
        this._model = {};
        this._vistaToModel = {};
        this.previus = {};
        this.validates = {};
        this.errors = {};
        this.recordsCount = 0;
        return this;
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
    set model(values) {
        console.log('asignando valores a model');
        if (Object.keys(values).length == 0) {
            return;
        }
        const transFormValues = this.modelSync(values, this._vistaToModel);
        const errors = this.validateModel(transFormValues);
        Object.assign(this.errors, errors);
        Object.assign(this._model, transFormValues);
    }

    get model() {
        return this.modelParse();
    }

    defineModel() {
        return {};
    }
    async save() {
        if (Object.keys(this._model).length === 0) {
            this.errors = { message: 'el modelo esta vacio' };
            console.log(this.errors);
            return false;
        }
        try {
            let record;
            console.log(this._model);
            const errors = this.validateModel(this._model);
            if (errors == undefined) {
                // si no hay errores entonces miramos si es un registro nuevo
                if (this.previus.id == undefined) {
                    record = await this.connection.create(this._model);
                    console.log('Su modelo ha sido guardado %o', this._model);
                    this._model = record;
                    this.previus = this._model;
                    this.errors = undefined;
                    return this;
                } else {
                    // registro existe comprobar si hay cambios
                    if (this.isEqual().length == 0) {
                        console.log(
                            'Su modelo no ha sido modificado %o',
                            this._model
                        );
                        return this;
                    } else {
                        record = await this.connection.update(this._model);
                        console.log(
                            'Su modelo ha sido actualizado %o',
                            this._model
                        );
                        this._model = record;
                        this.previus = this._model;
                        return this;
                    }
                }
            } else {
                this.errors = { message: `Error en el modelo ${errors}` };
                console.log('Error en el modelo %o', this.errors);
            }
        } catch (error) {
            this.errors = { message: `Error en el modelo ${errors}` };
            console.log(this.errors);
        }
    }
    async findAll() {
        try {
            console.log('Model -> buscando todos los registros -> connection');
            const records = await this.connection.findAll();
            this.recordsCount = records.length;
            return { count: this.recordsCount, records: records };
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

    async findOne(id) {
        try {
            console.log('buscando un registro');
            const record = await this.connection.findOne(id);
            return record;
        } catch (error) {
            this.errors = {
                message: `Error en el modelo ${error}`,
            };
            this._model = {};
            this.previus = {};
            return this;
        }
    }

    delete = async () => {
        console.log('eliminando un registro', this._model);
    };
    /**
     * sincroniza el modelo con los datos del formulario
     */
    modelSync(valores, modelToSync = { enpty: true }) {
        if (modelToSync?.enpty) {
            modelToSync = {};
            Object.keys(this.modelDtd).forEach(key => {
                modelToSync[key] = key;
            });
        }
        const temp = Object.assign({}, this._model);
        Object.keys(valores).forEach(key => {
            const modelKey = modelToSync[key];
            if (temp.hasOwnProperty(modelKey)) {
                temp[modelKey] = valores[key];
            } else {
                if (this.modelDtd.hasOwnProperty(modelKey)) {
                    temp[modelKey] = valores[key];
                }
            }
        });
        this._model = temp;
        return this._model;
    }
    /**
     * Transforma el modelo en un objeto de datos
     * @param {*} modelToParse objeto de datos
     * @returns nuevo objeto de datos
     */
    modelParse(data = this._model, modelToParse = this._vistaToModel) {
        if (Object.keys(modelToParse).length === 0) {
            Object.keys(this.modelDtd).forEach(key => {
                modelToParse[key] = key;
            });
        }
        const temp = Object.assign({}, modelToParse);
        Object.keys(temp).forEach(key => {
            if (data[temp[key]] != undefined) {
                temp[key] = data[temp[key]];
            } else {
                delete temp[key];
            }
        });
        return temp;
    }

    validateModel(obj) {
        console.log('validando modelo');
        let errors;
        obj = Object.keys(obj).length != 0 ? obj : this.model;
        if (Object.keys(this.validates).length === 0) {
            errors = validate(obj, this.modelDtd) || {};
            if (Object.keys(errors).length === 0) {
                Object.assign(this.validates, this._model);
            }
        } else {
            Object.keys(obj)
                .filter(key => obj[key] != this.validates[key])
                .forEach(key => {
                    let campo = {};
                    campo[key] = obj[key];
                    errors = validate(campo, this.modelDtd[key]);
                    if (errors == undefined) {
                        this.validates[key] = obj[key];
                    }
                });
        }
        return errors;
    }

    isEqual() {
        if (Object.keys(this.previus).length === 0) {
            return false;
        }
        const current = this.modelSync(this._model, this._vistaToModel);
        return Object.keys(this.previus).filter(
            key => current[key] != this.previus[key]
        );
    }
}

export default Model;
export { DataTypes };
