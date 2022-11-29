//crea un servidor web con express

const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Servidor funcionando en %s', PORT);
});
