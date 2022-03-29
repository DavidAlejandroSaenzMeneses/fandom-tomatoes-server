import { Request, Response } from 'express';
import MovieModel, { IMovie } from '../models/movie.model';
import { resizeImage } from '../helpers/resizeImage';
import { stringToArray } from '../helpers/formatStringToArray';

class MovieController {
    public async create(req: Request, res: Response) {
        const { title, slug, director, synopsis, platforms } = req.body;
        if (typeof title !== 'string' || typeof slug !== 'string' || typeof director !== 'string' || typeof synopsis !== 'string' || (platforms && !(platforms.length > 0))) {
            return res.status(201).send({ status: 'success', message: 'incomplete data' });
        }

        try {
            const resizedImage = await resizeImage(req.file?.path, req.file?.filename, 240, 360);
            const platformsVerified = typeof platforms === 'string' ? stringToArray(platforms) : platforms;
            const newMovie: IMovie = new MovieModel({ title, slug, image: resizedImage ?? null, director, synopsis, platforms: platformsVerified });
            newMovie.save(error => { if (error) throw error; });
            return res.status(201).send({ status: 'success', newMovie });
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
            const movieData: IMovie | null = await MovieModel.findOne({ _id: id });
            if (!movieData) {
                return res.status(404).send({ status: 'error', message: 'resource not found' });
            }
            return res.status(200).send({ status: 'success', movieData });
        } catch (error) {
            return res.status(500).send({ error });
        }
    }

    public async readAll(req: Request, res: Response) {
        const page = parseInt(req.query.page as string) > 0 ? parseInt(req.query.page as string) : 1;
        const limit = parseInt(req.query.limit as string) > 0 ? parseInt(req.query.limit as string) : 10;
        try {
            const movieData: IMovie[] | null = await MovieModel.find()
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec();
            if (!movieData) {
                return res.status(404).send({ status: 'error', message: 'resource not found' });
            }
            return res.status(200).send({ status: 'success', movieData });
        } catch (error) {
            return res.status(500).send({ error });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { title, slug, director, synopsis, platforms } = req.body;
        if (id == undefined || typeof title !== 'string' || typeof slug !== 'string' || typeof director !== 'string' || typeof synopsis !== 'string') {
            return res.status(201).send({ status: 'success', message: 'incomplete data' });
        }
        try {
            const resizedImage = await resizeImage(req.file?.path, req.file?.filename, 240, 360);
            const platformsVerified = typeof platforms === 'string' ? stringToArray(platforms) : platforms;
            const dataFromUpdate = { title, slug, image: resizedImage ?? null, director, synopsis, platforms: platformsVerified };
            const movieUpdated = await MovieModel.findOneAndUpdate({ _id: id }, dataFromUpdate, { new: true});
            if(!movieUpdated){
                return res.status(404).send({ status: 'error', message: 'resource not found' }); 
            }
            return res.status(201).send({ status: 'success', movieUpdated });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'sorry something went wrong please try again later', error });
        }
    }

    public async delete(req: Request, res: Response) {
        const { id } = req.params;
        if (id == '' || id == undefined || id == null) {
            console.log('::' + req.params);
            return res.status(400).send({ status: 'error', message: 'incomplete data' });
        }
        try {
            const deletedElements = await MovieModel.findOneAndDelete({ _id: id });
            if (!deletedElements) {
                return res.status(404).send({ status: 'error', message: 'resource not found' });
            }
            return res.status(200).send({ status: 'success', message: 'successfully deleted items' });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'sorry something went wrong please try again later', error });
        }
    }
}

export const movie = new MovieController();