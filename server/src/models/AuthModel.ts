import dotenv from 'dotenv'
import { model, Schema } from 'mongoose'
import { CheckLogin, LoginU } from "../interface/InterFace";

dotenv.config()
const authCollection = process.env.MONGODB_COLLECTION_AUTH || ''

const AuthSchema = new Schema<CheckLogin>({
    userId: {
        type: String,
    },
    token: {
        type: String || Object,
        
    }
}, {
    timestamps: true
})

const AuthModel = model<CheckLogin>(authCollection, AuthSchema)

export default AuthModel