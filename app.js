//crea un servidor web con express

const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const path = require(`path`);

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
app.all('/dashboard/*', (req, res) => {
    const options = {
        root: path.join(__dirname, 'public', 'dashboard'),
    };
    res.status(200).sendFile(`index.html`, options);
});

app.listen(PORT, () => {
    const ahora = new Date();
    console.log(
        '(%o) Servidor funcionando en http://localhost:%s',
        ahora,
        PORT
    );
    console.log(
        '(%o) Admin funcionando en http://localhost:%s/dashboard',
        ahora,
        PORT
    );
});
module.exports = app;
