/* Plataforma - Netflix, HBO, Prime Video, etcétera.
{
    id <UID>, // ID de la plataforma.
  icon <url>, // Icono de la plataforma. Ejemplo: netflix-icon.jpg
  title <String>, // Nombre de la plataforma. Ejemplo: Netflix
    createdAt <Datetime>, // Fecha de creación de la plataforma.
  updatedAt <Datetime>, // Fecha de última actualización de la plataforma.
}*/
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