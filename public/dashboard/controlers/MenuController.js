import Connection from '../dao/Connection.js';
import Menu from '../models/Menu.js';
import Controller from './Controller.js';

const menuConnection = new Connection('/api/admin/menu');
const model = new Menu(menuConnection);
const vista = null;

class MenuController extends Controller {
    constructor(model = model, vista = vista) {
        super(model, vista);
        this.vistaToModel = this.vistaToModel();
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
        const records = await this.model.findMenu(name);
        return records;
    }

    async loadOne(id) {
        const record = await this.model.findOne(id);
        console.log(record);
    }
}

export default MenuController;
