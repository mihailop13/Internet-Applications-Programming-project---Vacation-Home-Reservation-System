import express from 'express';
import { RezervacijeController } from '../controllers/rezervacijeController';

const rezervacijeRouter = express.Router();

rezervacijeRouter.route('/dodajRezervaciju').post(
    (req, res) => new RezervacijeController().dodajRezervaciju(req, res)
)

rezervacijeRouter.route('/dohvatiRezervacijuTurista').get(
    (req, res) => new RezervacijeController().dohvatiRezervacijuTurista(req, res)
)

rezervacijeRouter.route('/getRezervacija').get(
    (req, res) => new RezervacijeController().getRezervacija(req, res)
)

rezervacijeRouter.route('/dohvatiRezervacijuVlasnik').get(
    (req, res) => new RezervacijeController().dovhatiRezervacijeVlasnik(req,res)
)

rezervacijeRouter.route('/dohvatiSveRezervacije').get(
    (req, res) => new RezervacijeController().dohvatiSveRezervacije(req, res)
)

rezervacijeRouter.route('/oceniVikendicu').post(
    (req, res) => new RezervacijeController().oceni(req, res)
)

rezervacijeRouter.route('/otkaziRezervaciju').post(
    (req, res) => new RezervacijeController().otkazi(req, res)
)

rezervacijeRouter.route('/odbijRezervaciju').post(
    (req, res) => new RezervacijeController().odbij(req, res)
)

rezervacijeRouter.route('/potvrdiRezervaciju').post(
    (req, res) => new RezervacijeController().potvrdi(req, res)
)


export default rezervacijeRouter;