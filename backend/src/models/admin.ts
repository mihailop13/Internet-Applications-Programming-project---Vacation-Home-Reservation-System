import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Admin = new Schema({
    korisnickoIme: String,
    lozinka: String
},{
      versionKey:false  
})

export default mongoose.model('AdminModel', Admin, 'admin');