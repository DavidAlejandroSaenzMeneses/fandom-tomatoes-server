import mongoose, { ObjectId } from 'mongoose';
import { IPlatform } from './platform.model';

export interface IReview extends mongoose.Document {
    id?: ObjectId;
    movie: string;
    platform: IPlatform;
    author: string;
    body: string;
    score: number;
}

export interface listReview {
    platform: IPlatform;
    reviews: IReview[];
}

const ReviewSchema = new mongoose.Schema<IReview>(
    {
        movie: {
            type: String,
            required: true
        },
        platform: {
            type: String,
            required: true
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