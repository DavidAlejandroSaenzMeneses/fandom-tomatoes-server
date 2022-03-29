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
        if (id == '' && id == undefined) {
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

    public async update() {
        throw new Error('Method not implemented');
    }

    public async delete() {
        throw new Error('Method not implemented');
    }
}

export const movie = new MovieController();