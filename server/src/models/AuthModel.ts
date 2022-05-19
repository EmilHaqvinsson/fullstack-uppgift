import dotenv from 'dotenv'
import { model, Schema } from 'mongoose'
import { LoginU } from "../interface/InterFace";

dotenv.config()
const authCollection = process.env.MONGODB_COLLECTION_AUTH || ''

const AuthSchema = new Schema<LoginU>({
    eMail: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true,
    },
    authenticated: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const AuthModel = model<LoginU>(authCollection, AuthSchema)

export default AuthModel