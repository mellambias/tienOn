// import Contact from '../models/Contact.js';
import MenuController from '../controlers/MenuController.js';
import Connection from '../dao/Connection.js';
import Menu from '../models/Menu.js';

// let myModel = new Product();
// myModel.model = {
//     categoryId: 1,
//     taxeId: 16,
//     name: 'camiseta',
//     price: 150.3,
//     outstanding: false,
// };
// console.log(myModel.model);
// // myModel.validateModel({
// //     categoryId: 4,
// //     taxeId: 16,
// //     name: 'camiseta',
// //     price: -150.3,
// //     outstanding: false,
// // });
// const formValues = {
//     catId: 1,
//     taxId: 80,
//     produntoNombre: 'Producto de lana',
//     precio: 500,
//     existe: false,
//     iva: 0.21,
// };
// const modelForm = {
//     catId: 'categoryId',
//     taxId: 'taxeId',
//     produntoNombre: 'name',
//     precio: 'price',
//     existe: 'outstanding',
//     iva: 'iva',
// };
// const dataForm2 = {
//     categoryId: 1,
//     taxeId: 16,
//     name: 'americana',
//     price: 25,
//     outstanding: true,
// };
// // const apiModel = myModel.modelSync(formValues, modelForm);
// // const apiModel = myModel.modelSync(dataForm2);
// // console.log('apiModel %o', apiModel);

// // const parse = myModel.modelParse(modelForm);
// // console.log(parse);
// // console.log(myModel.save());
async function test() {
    console.log('******** Iniciando test **************');
    // const myContact = new Contact();
    // myContact.model = {
    //     name: 'juan',
    //     surnames: 'perez dez',
    //     phone: '999999999',
    //     email: 'adminadmin.es',
    //     message: 'hola mi hermano se fue a londres de viaje',
    // };
    // // console.log(myContact);
    // const myContact2 = await myContact.save();
    // console.log(myContact2);
    // // const records = await myContact.findAll();
    // const records = await myContact.findOne(55);
    // console.log(records);
    // // console.log(
    // //     records.modelParse({
    // //         email: 'email',
    // //         message: 'message',
    // //     })
    // // );
    // console.log(await records.save());
    console.log('Test Menu Controller');
    const menuConnection = new Connection(
        'http://127.0.0.1:8080/api/admin/menu'
    );
    const model = new Menu(menuConnection);
    const vista = null;
    const myMenuCtr = new MenuController(model, vista);
    console.log('buscar datos');
    const dataMenu = await myMenuCtr.loadData('admin-header');
    console.log('Send event ->');
    document.dispatchEvent(
        new CustomEvent('loadMenuData', {
            detail: { dataMenu },
        })
    );
}

export default test;

/*
document.addEventListener('evento,callback)
document.dispatchEvent(new CustomEvent('evento',{data}))
*/
