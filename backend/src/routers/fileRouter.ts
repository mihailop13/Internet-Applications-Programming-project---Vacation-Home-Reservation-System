import express from 'express';
import { FileUserController } from '../controllers/fileUserController';
const fileRouter = express.Router();

fileRouter.route('/upload').post(
    (req, res) => new FileUserController().upload(req, res)
)

fileRouter.route('/updateImage').post(
    (req, res) => new FileUserController().update(req, res)
)


export default fileRouter;