import { Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import ReviewModel, { IListReview } from '../models/review.model';

class ReviewController {
    public async create(req: Request, res: Response) {
        const { movie, platform, author, body, score } = req.body;
        if (movie == '' || platform == '' || author == '' || body == '' || !(score >= 0)) {
            return res.status(400).send({ status: 'success', message: 'incomplete data' });
        }

        try {
            const newReview = new ReviewModel({ movie, platform, author, body, score });
            newReview.save(err => { if (err) return false; });
            return res.status(201).send({ status: 'success', newReview });
        } catch (error) {
            return res.status(500).send({ error });
        }
    }

    public async getAllByMovie(movie: string): Promise<IListReview[]> {
        //Descripcion: getAllByMovie recibe un id de pelicula, consulta sus reviews y genera un arreglo de objetos con una plataforma y un arreglo de sus correspondientes reviews
        const reviews = await ReviewModel.find({ movie });
        if (!reviews) { return []; }
        //arreglo donde se cargaran los objetos ordenados para posteriormente ser retornados
        const reviewsOrderByPlatform: IListReview[] = [];
        reviews.map((review) => {
            //valida si la plataforma ya fue cargada al arreglo de reviews ordenado
            const platformAlreadyOrdered = reviewsOrderByPlatform.filter(data => data.platform == review.platform);
            if (!(platformAlreadyOrdered.length > 0)) {
                //filtra las reseñas por plataforma
                const dataFilterByPlatform = reviews.filter(data => data.platform == review.platform);
                //carga al arreglo un objeto con la plataforma y el array de reseñas filtradas
                reviewsOrderByPlatform.push({
                    platform: review.platform,
                    reviews: dataFilterByPlatform
                });
            }
        });
        return reviewsOrderByPlatform;
    }

    public async getOverallScoreMovie(movie: ObjectId | string): Promise<number> {
        const reviews = await ReviewModel.find({ movie });
        if (!(reviews.length > 0)) { return 0; }
        try {
            return reviews.map(review => review.score).reduce((overwallScore, score) => overwallScore += score) / reviews.length;
        } catch {
            return 0;
        }
    }

}
export const review = new ReviewController();