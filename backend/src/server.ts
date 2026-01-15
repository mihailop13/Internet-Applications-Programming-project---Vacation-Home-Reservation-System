import express, { Router } from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routers/userRouter';
import fileRouter from './routers/fileRouter';
import path from 'path';
import vikendicaRouter from './routers/vikendicaRouter';
import fileVikendicaRouter from './routers/fileVikendicaRouter';
import rezervacijeRouter from './routers/rezervacijeRouter';

const app = express();
const fileUpload = require('express-fileupload');
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/profilne', express.static(path.join(__dirname,'..','src' , 'images', 'profilne')));
app.use('/vikendice', express.static(path.join(__dirname,'..','src' , 'images', 'vikendice')));

mongoose.connect("mongodb://127.0.0.1:27017/planinskaVikendica")
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("db connection ok")
})

const router = Router()
router.use('/user', userRouter)
router.use('/file', fileRouter)
router.use('/vikendica', vikendicaRouter)
router.use('/fileVikendica', fileVikendicaRouter)
router.use('/rezervacije', rezervacijeRouter)
app.use('/', router)

app.listen(4000, () => console.log(`Express server running on port 4000`));