import { Request, Response } from 'express';
import { Types } from 'mongoose';
import MovieModel, { IMovie } from '../models/movie.model';
import { resizeImage } from '../helpers/resizeImage';
import { formatToObjectId } from '../helpers/formatToObjectId';
import { review } from '../controllers/review.controller';

class MovieController {
    public async create(req: Request, res: Response) {
        const { title, slug, director, synopsis, platforms } = req.body;
        if (title == '' || slug == '' || director == '' || synopsis == '') {
            return res.status(400).send({ status: 'success', message: 'incomplete data' });
        }

        try {

            const resizedImage = await resizeImage(req.file?.path, req.file?.filename, 240, 360);
            const platformsVerified: Types.ObjectId[] | null = typeof platforms == 'string'
                ? formatToObjectId.fromString(platforms)
                : formatToObjectId.fromArray(platforms);
            if (!platformsVerified) { return res.status(400).send({ status: 'success', message: 'incomplete data' }); }
            const newMovie: IMovie = new MovieModel({ title, slug, image: resizedImage ?? null, director, synopsis, platforms: platformsVerified });
            newMovie.save();
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
            const movieData: IMovie | null = await MovieModel.findOne({ _id: id }).populate('platforms');
            if (!movieData) {
                return res.status(404).send({ status: 'error', message: 'resource not found' });
            }
            const reviewsData = await review.getAllByMovie(id);
            return res.status(200).send({ status: 'success', movieData, reviewsData });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'sorry something went wrong please try again later', error });
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
            if (!movieData || movieData == undefined) {
                return res.status(404).send({ status: 'error', message: 'resource not found' });
            }
            const moviesWithScore = await Promise.all(
                movieData.map(async (movie) => {
                    if (movie._id) {
                        const total = await review.getOverallScoreMovie(movie._id);
                        movie.score = total;
                    }
                    return movie;
                })
            );
            return res.status(200).send({ status: 'success', moviesWithScore });
        } catch (error) {
            return res.status(500).send({ status: 'error', message: 'sorry something went wrong please try again later', error });
        }
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { title, slug, director, synopsis, platforms } = req.body;
        if (title == '' || slug == '' || director == '' || synopsis == '') {
            return res.status(400).send({ status: 'error', message: 'incomplete data' });
        }
        try {
            const resizedImage = await resizeImage(req.file?.path, req.file?.filename, 240, 360);
            const platformsVerified: Types.ObjectId[] | null = typeof platforms == 'string'
                ? formatToObjectId.fromString(platforms)
                : formatToObjectId.fromArray(platforms);
            if (!platformsVerified) { return res.status(400).send({ status: 'error', message: 'incomplete data' }); }
            const movieUpdated = await MovieModel.findOneAndUpdate({ _id: id }, { title, slug, image: resizedImage ?? null, director, synopsis, platforms: platformsVerified }, { new: true });
            if (!movieUpdated) {
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