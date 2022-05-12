import { Document } from 'mongoose'

export interface IUser extends Document {
    fullName: string
    eMail: string
    pass: string
}