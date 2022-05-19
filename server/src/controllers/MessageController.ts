import { Request, Response } from 'express'
import { CreateMessage, ReadMessage } from '../interface/IMessage'
import Logger from '../utils/Logger'
import StatusCode from '../utils/StatusCode'
import MessageModel from '../models/MessageModel'

const registerMessage = async (req: Request, res: Response) => {
    try {
        Logger.info('createMessage')
        Logger.http('req.body' + req.body.message)
        Logger.info(req.body.author)
        const { message, author } = req.body
        if (message) {
            const newObject: CreateMessage = {
                message: message,
                author: author
            }
            Logger.http('newObject' + newObject)
            const newMessage = new MessageModel(newObject)
            const dbResponse = await newMessage.save()
            Logger.http('dbResponse' + dbResponse)
            res.status(StatusCode.CREATED).send(dbResponse)
        } else {
            Logger.error('Message failed')
            res.status(StatusCode.BAD_REQUEST).send({
                message: 'Message failed'
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
        MessageModel.find({}).sort([['date', -1]]), (error: ErrorCallback, messages: Array<ReadMessage>) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Error to get message'
                })
            } else {
                Logger.http(messages)
                res.status(StatusCode.OK).send(messages)
            }
        }
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error to get message'
        })
    }
}

const getMessageById = (req: Request, res: Response) => {
    try {
        // @ts-ignore
        MessageModel.findById(req.params.id, '', (error: ErrorCallback, message: ReadMessage) => {
            if (error) {
                Logger.error('error' + error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Error get message by id'
                })
            } else {
                Logger.http('message' + message)
                res.status(StatusCode.OK).send(message ? message : {
                    message: `Error getting message with id ${req.params.id}`
                })
            }
        })
    } catch (error) {
        Logger.error('error' + error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error get message by id'
        })
    }
}

const deleteMessageById = (req: Request, res: Response) => {
    try {
        // @ts-ignore
        MessageModel.findByIdAndRemove(req.params.id, (error: ErrorCallback, message: ReadMessage) => {
            if (error) {
                Logger.error('error' + error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Error to delete message'
                })
            } else {
                Logger.http('message' + message)
                res.status(StatusCode.OK).json(message ? {
                    message: `Message with id ${req.params.id} was deleted`
                } : {
                    message: `Message with id not found ${req.params.id}`
                })
            }
        })
    } catch (error) {
        Logger.error('error' + error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error to delete message'
        })
    }
}
const updateMessageById = (req: Request, res: Response) => {
    try {
        const thisId = req.params.id
        Logger.debug(req.params.id)
        Logger.debug(req.body)
        const updatedMessage: CreateMessage = {
            message: req.body.message,
            author: req.body.author
        }
        Logger.debug(updatedMessage)
        MessageModel.findByIdAndUpdate(thisId, updatedMessage, (error: ErrorCallback, message: ReadMessage) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Fel vid uppdatering av meddelande'
                })
            } else {
                Logger.http(message)
                res.status(StatusCode.BAD_REQUEST).send(message ? message : {
                    message: `Meddelande med id '${req.params.id}' hittades inte`
                })
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Fel vid uppdatering av meddelande'
        })
    }
}

export default {
    registerMessage,
    getAllMessages,
    getMessageById,
    deleteMessageById,
    updateMessageById
}