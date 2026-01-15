import express from 'express';
import { FileVikendiceController } from '../controllers/fileVikendiceController';
const fileVikendicaRouter = express.Router();

fileVikendicaRouter.route('/uploadMultiple').post(
    (req, res) => new FileVikendiceController().upload(req, res)
)


export default fileVikendicaRouter;