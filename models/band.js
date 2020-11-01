const { v4: uuidV4} = require('uuid');

class Band{
    //vamos a crear el contructor que igual es el que nos va a servir para crear una banda
    constructor(name= 'no-name'){
        this.id= uuidV4();
        this.name= name;
        this.votes= 0;
    }
}

//bine ahora solo vamos a hacer visible nuestra clase banda en otro lado

module.exports = Band;