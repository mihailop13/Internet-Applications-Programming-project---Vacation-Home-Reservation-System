import * as express from 'express';
import User from '../models/user';
import Admin from '../models/admin';

export class UserController {

    login = async (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let user = await User.findOne({ 'korisnickoIme': username});
        if(user && user.lozinka){        
            if(await this.decryptPass(password, user.lozinka)){
                res.json(user);
            } else{
            res.json(null);
            }
        } else{
            res.json(null);
        }
    }

    loginAdmin = async (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        let admin = await Admin.findOne({ 'korisnickoIme': username});
        if(admin && admin.lozinka === password){
            res.json(admin);
        } else{
            res.json(null)
        }
    }

    getUser = (req: express.Request, res: express.Response) => {
        let username = req.query.korisnickoIme;

        User.findOne({'korisnickoIme': username}).then(data =>{
            if(data){
                res.json(data);
            }
        })
    }

    addUser = async (req: express.Request, res: express.Response) => {
        let user = req.body;
        user.odobreno = "cekanje"
        try {
            const dataUsername = await User.findOne({ 'korisnickoIme': user.korisnickoIme });
            const dataEmail = await User.findOne({ 'email': user.email });
            if (dataUsername) {
                return res.json({ message: "Korisničko ime već postoji!" });
            }
            if(dataEmail){
                return res.json({ message: "Email ime već postoji u bazi!" });
            }

            if (!this.checkPassword(user.lozinka)) {
                return res.json({ message: "Pogrešan format lozinke!" });
            }

            user.lozinka = await this.encryptPass(user.lozinka);

            if(user.profilnaSlika === ""){
                if(user.pol === "M")
                    user.profilnaSlika = "man.png"
                else
                    user.profilnaSlika = "woman.png"
            }
            await new User(user).save();

            return res.json({ message: "Uspešna registracija!" });

        } catch (err) {
            console.error(err);
            return res.json({ message: "Greška na serveru!" });
        }
    }

    azurirajPodatke = async (req: express.Request, res: express.Response) => {
        let user = req.body.user;
        let korIme = req.body.korIme
        try {
            const dataEmail = await User.findOne({ 'email': user.email });
            
            if(dataEmail){
                if(dataEmail.email != user.email)
                    return res.json({ message: "Email ime već postoji u bazi!" });
            }

            
            await User.findOneAndUpdate(
                { korisnickoIme: korIme },
                {
                    $set: {
                        korisnickoIme : user.korisnickoIme,
                        ime: user.ime,
                        adresa: user.adresa,
                        prezime: user.prezime,
                        email: user.email,
                        kontaktTelefon: user.kontaktTelefon,
                        brojKreditneKartice: user.brojKreditneKartice,
                        profilnaSlika: user.profilnaSlika
                    }
                }
            );
            return res.json({ message: "Uspešno azuriranje!" });

        } catch (err) {
            console.error(err);
            return res.json({ message: "Greška na serveru!" });
        }
    }

    getAllUsers = (req: express.Request, res: express.Response) =>{
        User.find().then(data =>{
            if(data)
                res.json(data)
        }).catch(err =>{
            if(err) res.json(null)
        });
    }

    odobriRegistraciju = async(req: express.Request, res: express.Response) =>{
        try{
            const user = req.body
            await User.updateOne({ 'korisnickoIme': user.korisnickoIme },
                {$set:{'odobreno' : "da"}});
            return res.json({ message: "Uspesno odobrena registracija"})
        } catch(err){
            return res.json({ message : "Niste uspeli da odobrite registraciju"})
        }
    }

    odbijRegistraciju = async(req: express.Request, res: express.Response) =>{
        try{
            const user = req.body
            await User.updateOne({ 'korisnickoIme': user.korisnickoIme },
                {$set:{'odobreno' : "ne"}});
            return res.json({ message: "Uspesno odbijena registracija"})
        } catch(err){
            return res.json({ message : "Niste uspeli da odobrite registraciju"})
        }
    }

    promeniLozinku = async(req: express.Request, res: express.Response) =>{
        const korisnickoIme = req.body.korisnickoIme
        let lozinka = req.body.novaLozinka
        if (!this.checkPassword(lozinka)) {
            return res.json({ message: "Pogrešan format lozinke!" });
        }

        lozinka = await this.encryptPass(lozinka);
        await User.updateOne({'korisnickoIme' : korisnickoIme},
            {$set:{'lozinka' : lozinka}});
        return res.json({ message : "Uspesno promenjena lozinka!"}) 
    }

    private checkPassword(password: string) : boolean{
        const pattern = /^(?=[A-Za-z])(?=.*[A-Z])(?=(?:.*[A-Za-z]){3,})(?=.*\d)(?=.*[^A-Za-z0-9]).{6,10}$/
        return pattern.test(password)
    }

    private async encryptPass(password: string): Promise<string> {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    private async decryptPass(password: string, hashedPass: string):Promise<boolean> {

        const bcrypt = require('bcrypt');

        const result = await bcrypt.compare(password, hashedPass)

        return result;
    }

}
