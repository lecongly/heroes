import {model, Schema, Document} from 'mongoose';

export interface Hero extends Document {
    name: string;
}


const HeroSchema = new Schema(
    {
        name: {type: String, required: true},
    }
)

export default model<Hero>('Hero', HeroSchema)