const express = require('express');

const path= require('path');

require('dotenv').config();

const app = express();

const server = require('http').createServer(app);
//vamos a exportar la variable io que es donde va estar la comunicacion
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');

//ahora lo que vamos a hacer es sacar el origen de nuestra pagina 

const dirPath = path.resolve( __dirname, 'public');

//vamos a meter dentro de la app nuestra extension .html

app.use(express.static(dirPath));

server.listen(process.env.PORT, (err) =>{
    //vamos a ver si sale un error
    if(err) throw new Error(err);

    console.log('Servidor levantado en el puerto', process.env.PORT);
})

