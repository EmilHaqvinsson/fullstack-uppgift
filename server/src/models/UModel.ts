import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import {model, Schema} from 'mongoose'
import {CreateU} from "../utils/InterFace";

dotenv.config()
const dbCollection = process.env.MONGODB_COLLECTION_USERS || ''

const USchema = new Schema<CreateU>({
    fullName: {
        type: String,
        required: true
    },
    eMail: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    }
    // hash: String,
    // salt: String
},{
    timestamps: true,
})

const UModel = model<CreateU>(dbCollection, USchema)


export default UModel