import express from 'express';
import { UserController } from '../controllers/userContorller';
const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res)
)

userRouter.route('/loginAdmin').post(
    (req, res) => new UserController().loginAdmin(req, res)
)

userRouter.route('/getAllUsers').get(
    (req, res) => new UserController().getAllUsers(req, res)
)

userRouter.route('/getUser').get(
    (req, res) => new UserController().getUser(req, res)
)

userRouter.route('/register').post(
    (req, res) => new UserController().addUser(req, res)
)

userRouter.route('/odobriRegistraciju').post(
    (req,res) => new UserController().odobriRegistraciju(req,res)
)

userRouter.route('/odbijRegistraciju').post(
    (req,res) => new UserController().odbijRegistraciju(req,res)
)

userRouter.route('/promeniLozinku').post(
    (req,res) => new UserController().promeniLozinku(req,res)
)

userRouter.route('/azurirajPodatke').post(
    (req,res) => new UserController().azurirajPodatke(req,res)
)

export default userRouter;