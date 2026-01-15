import mongoose from 'mongoose'
import User from './user';
import Vikendica from './vikendica';

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
    id: Number,
    datumDolaska: String,
    datumRezervacije: String,
    datumOdlaska: String,
    brojDece: Number,
    brojOdraslih: Number,
    turista: String,
    napomena: String,
    cena: Number,
    vikendica : Number,
    komentar: String,
    ocena: Number,
    odobreno: String
},{
      versionKey:false  
})

export default mongoose.model('RezervacijaModel', Rezervacija, 'rezervacije');