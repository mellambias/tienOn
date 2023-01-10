//crea un servidor web con express

const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 10);
});

const app = express();
const PORT = 3000;

app.use(connectLiveReload());
app.use(express.static('public'));

app.listen(PORT, () => {
    const ahora = new Date();
    console.log(
        '(%o) Servidor funcionando en http://localhost:%s',
        ahora,
        PORT
    );
});
module.exports = app;
