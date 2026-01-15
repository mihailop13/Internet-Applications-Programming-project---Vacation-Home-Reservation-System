import * as express from 'express';
import Vikendica from '../models/vikendica';
import Rezervacija from '../models/rezervacija';
import path from 'path';
import * as fs from 'fs';

export class VikendiceController {

    dodajVikendicu = (req: express.Request, res: express.Response) => {
        let vikendica = req.body;
        Vikendica.findOne().sort({ id: -1 }).exec().then(data =>{
            if(data)
                vikendica.id = data.id + 1
            else
                vikendica.id = 0
            new Vikendica(vikendica).save().then(data =>{
                if(data)
                    res.json({message : "Dodata vikendica!"})
            })
            
        }).catch(err =>{
            if(err)
                res.json({message : "Greska!"})
        });
    }

    getVikendice = (req: express.Request, res: express.Response) => {
        Vikendica.find().then(data =>{
            if(data)
                res.json(data)
        }).catch(err => {
            res.json(err)
        });
    }

    azuriraj = (req: express.Request, res: express.Response) => {
        const vikendica = req.body
        Vikendica.findOneAndUpdate({ "id" : vikendica.id },
                        { $set: vikendica }).then(data =>{
                            
                            if(data)
                                res.json({message : "Uspesno azurirano!"});
                        })
    }

    getVikendica = (req: express.Request, res: express.Response) =>{
        let id = req.query.id
        Vikendica.find({"id" : id}).then(data => {if(data) res.json(data)})
    }

    getVikendicaForvlasnik = (req: express.Request, res: express.Response) =>{
        let vlasnik = req.query.korIme
        Vikendica.find({"vlasnik" : vlasnik}).then(data => { if(data) res.json(data)})
    }

    obrisi = (req: express.Request, res: express.Response) =>{
        let id = req.body.id
        Vikendica.findOne({ id: id }).then(vikendica => {
            if(vikendica){
                let sampleFile;
                // folder gde se čuvaju slike
                for(let i = 0; i < vikendica.slike.length; i++){
                    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                    sampleFile = vikendica.slike[i];
                    const filePath = path.join(__dirname, '..', '..', 'src' , 'images', 'vikendice', sampleFile);
                    fs.unlink(filePath, err =>{});
                }
            }
        })
        Vikendica.deleteOne({"id" : id}).then(data => {
            Rezervacija.updateMany({"vikendica" : id}, {$set : {"odobreno" : "ne", "komentar" : "Uklonjena vikendica!"}}).then(data1 =>{
                res.json({message : "Obrisana vikendica!"})})
        })
    }
}