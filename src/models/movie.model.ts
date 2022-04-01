import mongoose, { ObjectId } from 'mongoose';
import { IPlatform } from './platform.model';
export interface IMovie extends mongoose.Document {
    _id?: ObjectId;
    title: string;
    slug: string;
    image?: string | null;
    director: string;
    synopsis: string;
    platforms: IPlatform[] | null;
    score?: number;
    reviews?: string[] | null;
}

const MovieSchema = new mongoose.Schema<IMovie>(
    {

        title: {
            type: String,
            require: true
        },
        slug: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: '',
        },
        director: {
            type: String,
            required: true
        },
        synopsis: {
            type: String,
            required: true
        },
        /*platforms: {
            type: Array
        },*/
        platforms: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Platform'
            }
        ],
        score: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model<IMovie>('Movie', MovieSchema);