import Connection from '../dao/Connection.js';
import Book from '../models/Book.js';
import BookView from '../views/BookView.js';
import Controller from './Controller.js';

class BookController extends Controller {
    constructor(model, connection, vista) {
        super(model, connection, vista);
    }

    vistaToModel() {
        return {
            id: 'id',
            title: 'title',
            author: 'author',
            description: 'description',
            isbn: 'isbn',
            pageCount: 'pageCount',
            published: 'published',
        };
    }

    async loadData() {
        const records = await this.modelInstance.findAll();
        console.log(records);
    }

    async loadOne(id) {
        const record = await this.modelInstance.findOne(id);
        console.log(record);
    }

    fakeData() {
        const book_1 = {
            id: 1,
            title: 'Titulo del libro',
            author: 'El que lo escribio',
            description: 'En un lugar de Palma',
            isbn: '9788408268307',
            pageCount: '1024',
            published: '2023-01-01',
        };
        const book_2 = {
            id: 2,
            title: 'CASTILLOS DE FUEGO',
            author: 'Ignacio Martinez de Pison',
            description:
                'Madrid, 1939-1945. Muchos luchan por salir adelante en una ciudad marcada por el hambre, la penuria y el estraperlo. Como Eloy, un joven tullido que trata de salvar de la pena de muerte a su hermano encarcelado; Alicia, taquillera en un cine que pierde su empleo por seguir su corazón; Basilio, profesor de universidad que afronta un proceso de depuración; el falangista Matías, que trafica con objetos requisados, o Valentín, capaz de cualquier vileza con tal de purgar su anterior militancia. Costureras, estudiantes,',
            isbn: '9788432241680',
            pageCount: '704',
            published: '2023-02-15',
        };
        return { count: 2, records: [book_1, book_2] };
    }
    loadDataTable = async () => {
        //
        // console.log('loadDataTable');
        // const results = await this.modelInstance.findAll();
        const results = this.fakeData();
        if (results.count) {
            results.records.forEach(record => {
                const newModel = new this.modelClass(this.connection);
                // newModel._vistaToModel = this.vistaToModel;
                newModel._model = record;
                newModel.previus = newModel._model;
                this.records.set(record.id, newModel);
            });
            document.dispatchEvent(
                new CustomEvent('tabla-book', {
                    detail: this.records,
                })
            );
        }
    };
    processBook = async event => {
        // console.log('processBook ->', event.detail);
        let newBook;
        const data = this.getFormData(event.detail, this);
        // console.log(data);

        if (data?.id) {
            // Ya exite el Booko
            newBook = this.records.get(data.id);
        } else {
            newBook = new this.modelClass(this.connection);
            newBook._vistaToModel = this.vistaToModel;
        }
        newBook.model = data;
        if (Object.keys(newBook.errors).length != 0) {
            const errors = newBook.modelParse(
                newBook.errors,
                this.vistaToModel
            );
            document.dispatchEvent(
                new CustomEvent('FormError', { detail: errors })
            );
        } else {
            const response = await newBook.save();
            // console.log('Booko guardado', response);
            this.records.set(response.model.id, response);
            document.dispatchEvent(
                new CustomEvent('tablaData', {
                    detail: this.records,
                })
            );
        }
    };
    useCases() {
        // console.log('activando useCases for Book');
        const instance = this;
        document.addEventListener('tablaReady', () => {
            console.log('instance %o this:%o', instance, this);
            instance.loadDataTable();
        });
        document.addEventListener('BookForm', event => {
            instance.processBook(event);
        });
    }
}

BookController.create = () => {
    const BookConnection = new Connection(
        'http://127.0.0.1:8080/api/admin/Book'
    );
    const vista = new BookView();
    return [Book, BookConnection, vista];
};
export default BookController;
