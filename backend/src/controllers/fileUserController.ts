import * as express from 'express';
import * as fs from 'fs';
import path from 'path';

export class FileUserController {

    upload = async (req: express.Request, res: express.Response) => {
        let sampleFile;
        let uploadPath;
        const files = (req as any).files;
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).send({message: 'No files were uploaded.'});
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = files.image;
        const dir = path.join(__dirname, '..', '..', 'src' , 'images', 'profilne');
       
        uploadPath = path.join(dir ,sampleFile.name)
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath);
    }

    update = async (req: express.Request, res: express.Response) =>{
        if(req.body.oldImage !== "man.png" && req.body.oldImage !== "woman.png"){
            const oldFilePath = path.join(__dirname, '..', '..', 'src' , 'images', 'profilne', req.body.oldImage);
            fs.unlink(oldFilePath, (err) => {})
        }
        const file = (req as any).files?.image;
        const uploadPath = path.join(__dirname, '..', '..', 'src' , 'images', 'profilne', file.name);
        file.mv(uploadPath);
    }
}