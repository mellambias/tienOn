import Connection from './Connection.js';
import DataTypes from './dataTypes.js';
import validate from './modelValidate.js';

const defaultConnection = new Connection();

class Model {
    constructor(connection = defaultConnection) {
        this.modelDtd = this.defineModel();
        this._model = {};
        this.connection = defaultConnection;
    }

    set model(values = {}) {
        const errors = this.validateModel(values);
        if (errors == false) {
            Object.assign(this._model, values);
        }
    }

    get model() {
        return this._model;
    }

    defineModel() {
        return {};
    }
    save() {
        console.log('Su modelo ha sido guardado %o', this.model);
        this.connection.save(this.model);
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
                    console.error(
                        `La clave ${modelKey} no pertenece al modelo`
                    );
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

    modelParse(modelToParse = { enpty: true }) {
        if (modelToParse?.enpty) {
            modelToParse = {};
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
}

export default Model;
export { DataTypes };
