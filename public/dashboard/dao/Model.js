import Connection from './Connection.js';
import DataTypes from './dataTypes.js';
import validate from './modelValidate.js';

const defaultConnection = new Connection();

class Model {
    constructor(connection = defaultConnection) {
        this.modelDtd = this.defineModel();
        this.connection = connection;
        this._model = {};
        this.previus = {};
        this.errors = {};
        this.records = [];
        return this;
    }

    set model(values) {
        const errors = this.validateModel(values);
        if (errors == false) {
            Object.assign(this._model, values);
        } else {
            Object.assign(this.errors, errors);
        }
    }

    get model() {
        return this._model;
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
            console.log(this._model);
            const errors = this.validateModel(this._model);
            if (errors == false) {
                if (this.isEqual()) {
                    console.log('Su modelo ha sido actualizado %o', this.model);
                    this.records = await this.connection.update(this.model);
                } else {
                    console.log('Su modelo ha sido guardado %o', this.model);
                    this.records = await this.connection.create(this.model);
                }
                return this.records;
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
            console.log('buscando todos los registros');
            const records = await this.connection.findAll();
            records.forEach(record => {
                const newModel = new Model();
                Object.assign(newModel, this);
                Object.assign(newModel.previus, this.model);
                newModel.records = [];
                newModel.model = record;
                this.records.push(newModel);
            });
            return this.records;
        } catch (error) {
            this.errors = {
                message: `Error en el modelo ${error}`,
            };
            console.log(this.errors);
        }
    }

    async findOne(id) {
        try {
            console.log('buscando un registro');
            const record = await this.connection.findOne(id);
            const newModel = new Model();
            Object.assign(newModel, this);
            Object.assign(newModel.previus, this.model);
            newModel.model = record;
            return newModel;
        } catch (error) {
            this.errors = {
                message: `Error en el modelo ${error}`,
            };
            console.log(this.errors);
            Object.assign(this.model, {});
            Object.assign(this.previus, {});
            return this;
        }
    }
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
                } else {
                    this.errors = {
                        message: `La clave ${modelKey} no pertenece al modelo`,
                    };
                    console.log(this.errors);
                }
            }
        });
        const errors = this.validateModel(temp);
        if (errors == false) {
            Object.assign(this._model, temp);
            return this._model;
        }
        return false;
    }

    modelParse(modelToParse = {}) {
        if (Object.keys(modelToParse).length === 0) {
            Object.keys(this.modelDtd).forEach(key => {
                modelToParse[key] = key;
            });
        }
        const temp = Object.assign({}, modelToParse);
        Object.keys(temp).forEach(key => {
            temp[key] = this._model[temp[key]];
        });
        return temp;
    }

    validateModel(obj) {
        const errors = validate(obj, this.modelDtd) || false;
        return errors;
    }

    isEqual() {
        Object.keys(this.previus).forEach(key => {
            if (this.model[key] != this.previus[key]) {
                return false;
            }
        });
        return true;
    }
}

export default Model;
export { DataTypes };
