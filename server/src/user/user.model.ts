import {Document, model, Schema} from 'mongoose';

export interface User extends Document {
    email: string;
    name: string;
    password: string;
}

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);

export default model<User>('User', UserSchema);