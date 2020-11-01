const band = require('../models/band');

const bands = require('../models/bands');

const bandas = new bands();

//vamos a meter bandas en la lista de bandas

bandas.addBand(new band('Pink Floyd'));
bandas.addBand(new band('Queen'));
bandas.addBand(new band('Tame Impala'));
bandas.addBand(new band('The Strokes'));

const { io } = require('../index.js');

io.on('connection', client => {
    //se conecto un cliente entonces vamos a poner eso
    console.log('cliente conectado al servidor');

    client.emit('mandando-bandas', bandas.getBands());

    client.on('disconnect', () =>{
        console.log('cliente desconectado');
    });

    //vamos a mandarnos unos mensajitos con nuestro cliente

    client.emit('saludando-cliente', { servidor: 'hola yo soy tu servidor'});

    client.on('saludando-servidor', (payload) => {
        //vamos a recibir el saludo
        console.log(payload);
    });
    
    client.on('banda-nueva', (payload) => {
        //recibimos el nombre de la nueva banda

        const banda = new band(payload.name);
        console.log(banda);
        bandas.addBand(banda);       //hemos creado la banda
        //vamos a mandar las nuevas banda
        io.emit('mandando-bandas', bandas.getBands());
    });

    client.on('votar-banda', (payload) => {
        //recibimos el nombre de la nueva banda

        bandas.voteBand(payload.id);
        //vamos a devolver las bandas modificadas
        io.emit('mandando-bandas', bandas.getBands());
    });

    client.on('eliminando-banda', (payload) => {
        //recibimos el nombre de la nueva banda

        bandas.deleteBand(payload.id);
        //vamos a devolver las bandas modificadas
        io.emit('mandando-bandas', bandas.getBands());
    });

});