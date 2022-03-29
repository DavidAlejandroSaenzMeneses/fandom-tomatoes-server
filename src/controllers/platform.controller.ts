import { Request, Response } from 'express';
import PlatformModel, { IPlatform } from '../models/platform.model';
import { resizeImage } from '../helpers/resizeImage';

class PlatformController {
    public async create(req: Request, res: Response) {
        const title: string = req.body.title;
        if (!(title.length > 0)) { return res.status(400).send({ status: 'error', message: 'incomplete data' }); }
        try {
            const resizedImage = await resizeImage(req.file?.path, req.file?.filename, 48);
            const newPlatform: IPlatform = new PlatformModel({ icon: resizedImage ?? null, title: title });
            await newPlatform.save();
            return res.status(201).send({ status: 'success', newPlatform });
        } catch (error) {
            return res.status(500).send({ error });
        }
    }

    public async readOne(req: Request, res: Response) {
        const { id } = req.params;
        if (id == '' || id == undefined || id == null) {
            return res.status(400).send({ status: 'error', message: 'incomplete data' });
        }
        try {
            const platformData: IPlatform | null = await PlatformModel.findOne({ _id: id });
            if (!platformData) {
                return res.status(404).send({ status: 'error', message: 'resource not found' });
            }
            return res.status(200).send({ status: 'success', platformData });
        } catch (error) {
            return res.status(500).send({ error });
        }

    }

    public async readAll(req: Request, res: Response) {
        try {
            const platformData = await PlatformModel.find({});
            if (!platformData) {
                return res.status(404).send({ status: 'error', message: 'resource not found' });
            }
            return res.status(200).send({ status: 'success', platformData });
        } catch (error) {
            return res.status(500).send({ error });
        }
    }

    update() {
        throw new Error('metodo no asignado');
    }

    delete() {
        throw new Error('metodo no asignado');
    }
}

export const platform = new PlatformController();