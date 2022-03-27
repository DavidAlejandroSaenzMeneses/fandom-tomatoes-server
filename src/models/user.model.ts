import mongoose from 'mongoose';
export interface User extends mongoose.Document {
    username: string;
    password: string;
    profilePicture?: string;
    fullName: string;
}
const UserSchema = new mongoose.Schema<User>(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        profilePicture: {
            type: String,
            default: '',
        },
        fullName: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model<User>('User', UserSchema);