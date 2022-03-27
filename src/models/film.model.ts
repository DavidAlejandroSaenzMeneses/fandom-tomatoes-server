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
import mongoose from 'mongoose';
import { Platform } from './platform.model';
interface Film extends mongoose.Document {
    id: string;
    title: string;
    slug: string;
    image?: string;//url
    director: string;
    platforms: Platform[];
    score: number;
    createAt: Date;
    updateAt: Date;
    reviews: string[];
}

const UserSchema = new mongoose.Schema<Film>(
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
        platforms:{
            type: [String],
            required: true
        },
        score:{
            type:Number,
            default:0
        },
        createAt: {
            type: Date, 
            default: Date.now
        },
        updateAt: {
            type: Date, 
            default: Date.now
        },
        reviews:{
            type: [[String]]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model<Film>('User', UserSchema);