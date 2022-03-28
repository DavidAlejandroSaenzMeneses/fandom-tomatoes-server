/*{
    id <UID>, // ID de la película.
    title <String>, // Nombre de la película. Ejemplo: Spiderman 2: El Retorno
    slug <String>, // URL de la película basado en el título. Ejemplo: spiderman-2-el-retorno
    image <url>, // Logo o imagen principal de la película. Ejemplo: spiderman-2.jpg
  director <String>, // Nombre del director.
    platforms <Platform[]>, // Array con las plataformas en las que se encuentra la película.
    score <Number>, // Promedio de las reseñas. Media calculada en base a las calificaciones de cada una de las reseñas de la película.
  createdAt <Datetime>, // Fecha de creación de la película.
  updatedAt <Datetime>, // Fecha de última actualización de la película.
    reviews <Review[]> // Array que contiene todas las reseñas de la película separadas por plataforma..
}*/
import mongoose, { ObjectId } from 'mongoose';
export interface IMovie extends mongoose.Document {
    _id?: ObjectId;
    title: string;
    slug: string;
    image?: string;//url
    director: string;
    synopsis: string;
    platforms: ObjectId;
    score: number;
    createAt: Date;
    updateAt: Date;
    reviews?: string[];
}

const MovieSchema = new mongoose.Schema<IMovie>(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
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
        platforms: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Platforms'
        },
        score: {
            type: Number,
            default: 0
        },
        createAt: {
            type: Date,
            default: Date.now
        },
        updateAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export default mongoose.model<IMovie>('Movie', MovieSchema);