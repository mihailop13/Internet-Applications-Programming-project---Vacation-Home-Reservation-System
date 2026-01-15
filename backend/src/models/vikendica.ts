import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Vikendica = new Schema({
    id: Number,
    naziv: String,
    mesto: String,
    usluge: String,
    cenaLeto : Number,
    cenaZima : Number,
    gSirina: Number, 
    gDuzina: Number,
    slike: Array,
    vlasnik : String,
    komentari : Array,
    ocena : [Number],
    blokiranoDo : String,
},{
    versionKey:false  
})

export default mongoose.model('VikendicaModel', Vikendica, 'vikendica');