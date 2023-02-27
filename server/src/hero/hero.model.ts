import {model, Schema, Document} from 'mongoose';

export interface Hero extends Document {
    name: string;
    gender: boolean;
    mail: string;
    age: number;
    address: string;
}


const HeroSchema = new Schema(
    {
        name: {type: String, required: true},
        gender: Boolean,
        mail: String,
        age: Number,
        address: String
    }
)

export default model<Hero>('Hero', HeroSchema)