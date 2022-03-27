/* Reseña
{
    id <UID>, // ID de la reseña.
    movie <Movie>, // ID de la película sobre la que se va a reseñar.
  platform <Platform>, // ID de la plataforma sobre la que se va a reseñar.
  author <String>, // Nombre del autor o usuario que está creando la reseña.
    body <String>, // Texto de la reseña.
    score <Number>, // Calificación 0 a 5 de la reseña.
    createdAt <Datetime>, // Fecha de creación de la reseña.
  updatedAt <Datetime>, // Fecha de actualización de la reseña.
}*/
import mongoose from 'mongoose';
import { Platform } from './platform.model';

export interface Review extends mongoose.Document {
    id: string;
    movie: string; //movie
    platform: Platform;
    author: string;
    body: string;
    score: number;
    createdAt: Date;
    updatedAt: Date;
}