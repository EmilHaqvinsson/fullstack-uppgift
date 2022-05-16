import {Request, Response} from 'express'
import {CreateMessage, ReadMessage} from '../interface/IMessage'
import Logger from '../utils/Logger'
import StatusCode from '../utils/StatusCode'
import MessageModel from '../models/MessageModel'

const registerMessage = async (req: Request, res: Response) => {
    try {
        Logger.info('createMessage')
        Logger.http('req.body' + req.body)
        const {message} = req.body
        if (message) {
            const newObject: CreateMessage = {
                message: message
            }
            Logger.http('newObject' + newObject)
            const newMessage = new MessageModel(newObject)
            const dbResponse = await newMessage.save()
            Logger.http('dbResponse' + dbResponse)
            res.status(StatusCode.CREATED).send(dbResponse)
        } else {
            Logger.error('Message faild')
            res.status(StatusCode.BAD_REQUEST).send({
                message: 'Message faild'
            })
        }
    } catch (error) {
        Logger.error('error' + error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error to create message'
        })
    }
}

const getAllMessages = (req: Request, res: Response) => {
    try {
        MessageModel.find({}, '', (error: ErrorCallback, messages: Array<ReadMessage>) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Error to get message'
                })
            } else {
                Logger.http(messages)
                res.status(StatusCode.OK).send(messages)
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error to get message'
        })
    }
}


export default {
    registerMessage,
    getAllMessages,
}