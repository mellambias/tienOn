import Contact from '../models/Contact.js';

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
function test() {
    const myContact = new Contact();
    myContact.model = {
        name: 'juan',
        surnames: 'perez dez',
        phone: '999999999',
        email: 'admin@admin.es',
        message: 'hola',
    };
}

export default test;
