import * as express from 'express';
import Rezervacija from '../models/rezervacija';
import Vikendica from '../models/vikendica';

export class RezervacijeController{

    dodajRezervaciju = async (req: express.Request, res: express.Response) =>{
        let rezervacija = req.body;
        rezervacija.ocena = 0;

        const poslednjaRezervacija = await Rezervacija.findOne().sort({ id: -1 });
        rezervacija.id = poslednjaRezervacija ? poslednjaRezervacija.id + 1 : 0;

        const dostupno = await this.tryToReserve(
            rezervacija.vikendica, 
            rezervacija.datumDolaska, 
            rezervacija.datumOdlaska
        );

        if(dostupno){
            await new Rezervacija(rezervacija).save();
            res.json({ message: "Uspesno rezervisano!" });
        } else {
            res.json({ message: "Vikendica nije dostupna u izabranom periodu!" });
        }
    }

    dohvatiSveRezervacije = (req: express.Request, res: express.Response) =>{
        Rezervacija.find().then(data => res.json(data))
    }

    private async tryToReserve(vikendicaID: number, datumDolaska: string, datumOdlaska: string): Promise<boolean> {
        const dolazak = new Date(datumDolaska).getTime();
        const odlazak = new Date(datumOdlaska).getTime();

        const data = await Rezervacija.find({ "vikendica": vikendicaID });

        for(const r of data){
            const rDolazak = new Date(r.datumDolaska ?? 0).getTime();
            const rOdlazak = new Date(r.datumOdlaska ?? 0).getTime();
            if (!(odlazak < rDolazak || dolazak > rOdlazak)) {
                return false;
            }
        }

        return true;
    }

    dohvatiRezervacijuTurista = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.query.korisnickoIme
        Rezervacija.find({"turista" : korisnickoIme}).then(data => {
            if(data)
                res.json(data)
        })
    }

    oceni = (req: express.Request, res: express.Response) => {
        let rezervacija = req.body
        Rezervacija.findOneAndUpdate({"id" : rezervacija.id}, {$set: {"ocena" : rezervacija.ocena, "komentar" : rezervacija.komentar}}).then(data =>{
            if(data){
                Vikendica.findOneAndUpdate({"id" : data.vikendica}, {$push: {
                    ocena: rezervacija.ocena,
                    komentari: rezervacija.komentar
                }}).then(data => { if(data) res.json({message : "Uspesno ocenjeno!"})})
            }
        })
    }

    otkazi = (req: express.Request, res: express.Response) =>{
        let rezervacija = req.body
        Rezervacija.deleteOne({"id" : rezervacija.id}).then(data =>{
            if(data)
                res.json({message : "Uspesno obrisano!"})
        })
    }

    dovhatiRezervacijeVlasnik = (req: express.Request, res: express.Response) =>{
        let vlasnik = req.body
        Rezervacija.find({"vlasnik": vlasnik}).then(data =>{ if(data) res.json(data)}) 
    }

    getRezervacija = (req: express.Request, res: express.Response) =>{
        let id = req.query.id
        Rezervacija.find({"id" : id}).then(data => {if(data) res.json(data)})
    }

    potvrdi = (req: express.Request, res: express.Response) =>{
        let id = req.body.id
        Rezervacija.findOneAndUpdate({"id" : id}, {$set : {"odobreno" : "da"}}).then(data => res.json({message : "Odobreno!"})) 
    }

    odbij = (req: express.Request, res: express.Response) =>{
        let rezervacija = req.body
        Rezervacija.findOneAndUpdate({"id" : rezervacija.id}, {$set : { "komentar" : rezervacija.komentar, "odobreno" : rezervacija.odobreno}}).then(data =>{
            if(data)
                res.json({message : "Otkazano!"})
        })
    }
}