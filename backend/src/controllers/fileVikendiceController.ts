import * as express from 'express';
import path from 'path';

export class FileVikendiceController {
    upload = async (req: express.Request, res: express.Response) => {
        let sampleFile;
        let uploadPath;
        const files = (req as any).files;
        const imagesArray = Array.isArray(files.images) ? files.images : [files.images];
        if (!files || Object.keys(files).length === 0) {
            return res.status(400).send({message: 'No files were uploaded.'});
        }
        for(let i = 0; i < imagesArray.length; i++){
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            sampleFile = imagesArray[i];
            const dir = path.join(__dirname, '..', '..', 'src' , 'images', 'vikendice');
            /*if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }*/
            uploadPath = path.join(dir ,sampleFile.name)
            // Use the mv() method to place the file somewhere on your server
            sampleFile.mv(uploadPath);
        }
        res.json({message : "Uspesno uplodavano!"})
    }
}
