import {model, Schema, Document, Types} from 'mongoose';
import {User} from '../user/user.model';

export interface Hero extends Document {
    name: string;
    gender: boolean;
    mail: string;
    age: number;
    address: string;
    user: User;
}


const HeroSchema = new Schema(
    {
        name: {type: String, required: true},
        gender: Boolean,
        mail: String,
        age: Number,
        address: String,
        user: {
            type: Types.ObjectId,
            ref: "User",
        },
    }
)

export default model<Hero>('Hero', HeroSchema)