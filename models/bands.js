const band = require('./band');

class Bands{

    //bien vamos a declarar el contructor

    constructor(){
        this.bandas = []; //declaramos una variable de tipo lista para almacenar las bandas
    }

    getBands(){
       return this.bandas;            
    }

    addBand( banda = new band()){
        this.bandas.push(banda);
    }

    voteBand( id = ' ') {
        //vamos con el metodo de votar por una banda
        this.bandas = this.bandas.map((banda) => {
            if(banda.id === id){
                banda.votes++;
                return banda;
            }else{
                return banda;
            }
        });
    }

    deleteBand( id = '' ){
        //bien este es el metodo para eliminar una banda
        this.bandas= this.bandas.filter((banda) => banda.id !== id);
        return this.bandas;
    }
}
module.exports = Bands;