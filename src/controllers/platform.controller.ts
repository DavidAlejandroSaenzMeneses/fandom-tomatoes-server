import { Request, Response } from 'express';
import PlatformModel, { IPlatform } from '../models/platform.model';

class PlatformController {
    public async create(req: Request, res: Response) {
        const { icon, title } = req.body;
        try {
            const newPlatform: IPlatform = new PlatformModel({ icon:null, title: title });
            await newPlatform.save();
            return res.status(201).send({
                status: 'success',
                newPlatform
            });
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
    public async read(req: Request, res: Response) {
        const{id} = req.params;
        //consulta especifica por id
        if(id!=='' && id!==undefined){
            try {
                const platformData = await PlatformModel.findOne({_id:id});
                return res.status(200).send({status:'success', platformData});
            } catch (error) {
                return res.status(500).send({ error });
            }
        }
        //consultar todos
        try {
            const platformData = await PlatformModel.find({});
            return res.status(200).send({status:'success', platformData}); 
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