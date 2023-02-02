import Connection from '../dao/Connection.js';
import Menu from '../models/Menu.js';
import Controller from './Controller.js';

const menuConnection = new Connection('/api/admin/menu');
const model = new Menu(menuConnection);
const vista = null;

class MenuController extends Controller {
    constructor(model = model, vista = vista) {
        super(model, vista);
        this._vistaToModel = this.vistaToModel();
    }

    vistaToModel() {
        return {
            id: 'id',
            item: 'name',
            path: 'customUrl',
            content: 'children',
        };
    }

    async loadData(name) {
        let records = await this.model.findMenu(name);
        console.log(records);
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
            root.children.forEach(element => {
                format.content.push(transform(element, vistaToModel));
            });
            return format;
        }
        newMenu = transform(records, this._vistaToModel);
        return newMenu.content;
    }

    async loadOne(id) {
        const record = await this.model.findOne(id);
        console.log(record);
    }
}

export default MenuController;
