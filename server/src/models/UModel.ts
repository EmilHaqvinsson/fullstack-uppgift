import dotenv from 'dotenv'
import crypto from 'crypto'
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
    },
    hash: String,
    salt: String
}, {
    timestamps: true
})

USchema.methods.setPassword = function(pass: crypto.BinaryLike) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(pass, this.salt,
        1000, 64, `sha512`).toString('hex')
}

USchema.methods.validPassword = function(pass: crypto.BinaryLike) {
    const hash = crypto.pbkdf2Sync(pass, this.salt,
        1000, 64, `sha512`).toString('hex')
        return this.hash === hash
}

const UModel = model<CreateU>(dbCollection, USchema)



export default UModel