import { Request, Response } from 'express';
import MovieModel, { IMovie } from '../models/movie.model';
import { resizeImage } from '../helpers/resizeImage';

class MovieController {
    public async create(req: Request, res: Response) {
        const { title, slug, director, synopsis, platforms } = req.body;
        if (typeof title !== 'string' || typeof slug !== 'string' || typeof director !== 'string' || typeof synopsis !== 'string' ||(platforms && !(platforms.length > 0))) {
            return res.status(201).send({ status: 'success', message: 'incomplete data' });
        }
        try {
            const resizedImage = await resizeImage(req.file?.path, req.file?.filename, 240, 360);
            const newMovie: IMovie = new MovieModel({ title, slug, image: resizedImage ?? null, director, synopsis, platforms });
            await newMovie.save(/*error=>{if (error) return false;}*/);
            return res.status(201).send({ status: 'success', newMovie });
        } catch (error) {
            return res.status(500).send({ error });
        }
    }
    public async read() {
        throw new Error('Method not implemented');
    }
    public async update() {
        throw new Error('Method not implemented');
    }
    public async delete() {
        throw new Error('Method not implemented');
    }
}

export const movie = new MovieController();