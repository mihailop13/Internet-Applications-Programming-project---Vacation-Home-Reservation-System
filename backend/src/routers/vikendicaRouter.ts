import express from 'express';
import { VikendiceController } from '../controllers/vikendicaController';

const vikendicaRouter = express.Router();

vikendicaRouter.route('/dodajVikendicu').post(
    (req, res) => new VikendiceController().dodajVikendicu(req, res)
)

vikendicaRouter.route('/getVikendice').get(
    (req, res) => new VikendiceController().getVikendice(req, res)
)

vikendicaRouter.route('/getVikendica').get(
    (req, res) => new VikendiceController().getVikendica(req, res)
)

vikendicaRouter.route('/getVikendicaForVlasnik').get(
    (req, res) => new VikendiceController().getVikendicaForvlasnik(req, res)
)

vikendicaRouter.route('/azuriraj').post(
    (req, res) => new VikendiceController().azuriraj(req, res)
)

vikendicaRouter.route('/obrisi').post(
    (req, res) => new VikendiceController().obrisi(req, res)
)

export default vikendicaRouter;