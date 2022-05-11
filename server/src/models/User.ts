import { IUser } from './../types/User';
import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true
    },

    eMail: {
        type: String,
        required: true
    },

    pass: {
        type: String,
        required: true
    }

}, { timestamps: true })


export default model<IUser>('User', userSchema)