import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    korisnickoIme: String,
    lozinka: String,
    profilnaSlika: String,
    ime: String,
    prezime: String ,
    tip: String,
    pol: String,
    adresa: String,
    kontaktTelefon: String,
    email: String,
    brojKreditneKartice: String,
    odobreno: String
},{
      versionKey:false  
})

export default mongoose.model('UserModel', User, 'users');