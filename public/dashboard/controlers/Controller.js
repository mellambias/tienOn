class Controller {
    constructor(model, connection, vista) {
        this.modelClass = model;
        this.vista = vista;
        this.connection = connection;
        this.modelInstance = new this.modelClass(this.connection);
        this.records = new Map();
        this.vistaToModel = this.vistaToModel();
        this._useCases = this.useCases();
        this.modelInstance._vistaToModel = this.vistaToModel;
        this.autoBeans = this.modelClass.getterAndSetter(this.vistaToModel);
    }
    static create() {
        this._create();
    }
    static set create(value) {
        if (typeof value === 'function') {
            this._create = () => {
                const [model, connection, vista] = value();
                const controller = new this(model, connection, vista);
                return controller;
            };
        } else {
            console.error('El valor debe ser una funcion');
            throw new Error('El valor debe ser una funcion');
        }
    }

    static get create() {
        return this._create;
    }

    useCases() {
        //implementa los casos de uso
        console.log('casos de uso por defecto');
    }
    async loadData() {
        const model = new this.modelClass(this.connection);
        const data = await model.findAll();
        console.log('Send event -> %o', data);
        document.dispatchEvent(
            new CustomEvent(`loadContactData`, {
                detail: { data },
            })
        );
    }
    getFormData(formElement, controler) {
        const data = {};
        const formData = new FormData(formElement);
        for (const key of formData.keys()) {
            let value = formData.get(key);
            let keyInModel = controler.vistaToModel[key];
            switch (controler.modelInstance.modelDtd[keyInModel].type) {
                case 'integer':
                    value = parseInt(value) || undefined;
                    break;
                case 'boolean':
                    value = value === 'true';
                    break;
                case 'number':
                    value = parseFloat(value);
                    break;
            }
            if (value !== undefined) {
                data[key] = value;
            }
        }
        return data;
    }
}

export default Controller;
