import mongoose, { ObjectId } from 'mongoose';
import { IPlatform } from './platform.model';

export interface IReview extends mongoose.Document {
    id?: ObjectId;
    movie: ObjectId;
    platform: IPlatform;
    author: string;
    body: string;
    score: number;
}

export interface IListReview {
    platform: IPlatform['title'];
    reviews: IReview[];
}

const ReviewSchema = new mongoose.Schema<IReview>(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        platform: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Platform'
        },
        author: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        }

    },
    { timestamps: true }
);

export default mongoose.model<IReview>('Review',ReviewSchema);