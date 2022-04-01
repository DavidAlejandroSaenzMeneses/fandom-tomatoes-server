import mongoose,{ObjectId} from 'mongoose';

export interface IPlatform extends mongoose.Document {
    _id?: ObjectId;
    icon?: string;
    title?: string;
    createAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IPlatform>(
    {
        icon: {
            type: String,
            require: false
        },
        title: {
            type: String,
            required: true,
            unique: true,
        }
    },
    { timestamps: true }
);

export default mongoose.model<IPlatform>('Platform', UserSchema);