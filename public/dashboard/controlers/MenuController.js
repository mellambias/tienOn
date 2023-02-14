import Connection from '../dao/Connection.js';
import Menu from '../models/Menu.js';
import Controller from './Controller.js';

class MenuController extends Controller {
    constructor(model = model, connection, vista = vista) {
        super(model, connection, vista);
    }
    /**
     * Define la relación entre la vista y el modelo
     * @returns {object} relacion
     */
    vistaToModel() {
        return {
            id: 'id',
            item: 'name',
            path: 'customUrl',
            content: 'children',
        };
    }

    async loadData(name) {
        try {
            let records = await this.modelInstance.findMenu(name);
            let newMenu = {};
            /**
             * Transforma los datos del modelo al de la vista
             * @param {object} root
             * @param {object} vistaToModel
             * @returns el menu con la nueva estructura
             */
            function transform(root, vistaToModel) {
                let format = {
                    id: root.id,
                    item: root.name || '',
                    path: root.customUrl || '',
                    content: [],
                };
                if (Array.isArray(root.children))
                    root.children.forEach(element => {
                        format.content.push(transform(element, vistaToModel));
                    });
                return format;
            }
            newMenu = transform(records, this.vistaToModel);
            return newMenu.content;
        } catch {
            console.error('Problema al cargar');
        }
    }

    async loadOne(id) {
        const model = new this.modelClass(this.conection, this.modelClass);
        const record = await model.findOne(id);
        console.log(record);
    }
    useCases() {
        // console.log('casos de uso Menu');
    }
}

MenuController.create = () => {
    const menuConnection = new Connection(
        'http://127.0.0.1:8080/api/admin/menu'
    );
    const vista = null;
    return [Menu, menuConnection, vista];
};

export default MenuController;
