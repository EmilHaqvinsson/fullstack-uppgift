import dotenv from 'dotenv'
import {model, Schema} from 'mongoose'
import {CreateMessage} from '../interface/IMessage'

dotenv.config()
const dbCollection = process.env.MONGODB_COLLECTION_MESSAGE || ''

const MessageSchema = new Schema<CreateMessage>({
    message: String
},{
    timestamps: true
})

const MessageModel = model<CreateMessage>(dbCollection, MessageSchema)

export default MessageModel