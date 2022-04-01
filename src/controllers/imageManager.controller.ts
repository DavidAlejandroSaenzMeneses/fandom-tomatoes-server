import fileSystem from 'fs';
import path from 'path';
import {Request, Response} from 'express';

class ImageManager{
    public get(req: Request, res: Response) {
        const { image } = req.params;
        const pathFile = `./src/assets/image/optimize/${image}`;
        fileSystem.exists(pathFile, (exist) => {
            if (exist) {
                return res.sendFile(path.resolve(pathFile));
            } else {
                return res.status(404).send({
                    status: 'success',
                    message: 'image not found'
                });
            }
        });
    }
}

export const imageManager = new ImageManager();
    
    