import dotenv from 'dotenv'
import {model, Schema} from 'mongoose'
import {CreateU} from "../utils/InterFace";

dotenv.config()
const dbCollection = process.env.MONGODB_COLLECTION_USERS

const USchema = new Schema<CreateU>({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    eMail: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const UModel = model<CreateU>(dbCollection, USchema)

export default UModel