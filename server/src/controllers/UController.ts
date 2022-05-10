import Logger from "../utils/Logger";
import StatusCode from "../utils/StatusCode";
import {Request, Response} from "express";
import {CreateU, ReadU} from "../utils/InterFace";
import UModel from "../models/UModel";

const createUser = async (req: Request, res: Response) => {
    try {
        Logger.info('createUser()')
        Logger.http(req.body)
        const {name, userName, eMail} = req.body
        if (name && userName && eMail) {
            const newobject: CreateU = {
                name: name,
                userName: userName,
                eMail: eMail
            }
            Logger.http(newobject)

            const user = new UModel(newobject)
            const dbResponse = await user.save()
            Logger.http(dbResponse)
            res.status(StatusCode.CREATED).send(dbResponse)
        } else {
            Logger.error('name, userName or eMail failed')
            res.status(StatusCode.BAD_REQUEST).send({
                message: 'Faulty body'
            })
        }
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Det gick inte att skapa användare'
        })
    }
}

const getAllUs = (req: Request, res: Response) => {
    try {
        UModel.find({}, '', (error: ErrorCallback, users: Array<ReadU>) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: '\n' +
                        'Det gick inte att hämta användare'
                })
            } else {
                Logger.http(users)
                res.status(StatusCode.OK).send(users)
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Det gick inte att hämta användaren'
        })
    }
}

const getUByName = (req: Request, res: Response) => {
    try {
        UModel.find({name: req.params.name}, '', (error: ErrorCallback, users: Array<ReadU>) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Det gick inte att hämta användaren'
                })
            } else {
                Logger.http(users)
                res.status(StatusCode.OK).send(users)
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Det gick inte att hämta användarens namn'
        })
    }
}

const getUserByNameAndEmail = (req: Request, res: Response) => {
    try {
        UModel.find({name: req.params.name, eMail: req.params.eMail}, '', (error: ErrorCallback, user: ReadU) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Det gick inte att hämta användaren'
                })
            } else {
                Logger.http(user)
                res.status(StatusCode.OK).send(user)
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Det gick inte att hämta användaren efter namn och eMail'
        })
    }
}

const updateUserById = (req: Request, res: Response) => {
    try {
        Logger.debug(req.params.id)
        Logger.debug(req.body)
        const updatedUser: CreateU = {
            name: req.body.name,
            userName: req.body.userName,
            eMail: req.body.eMail
        }
        Logger.debug(updatedUser)

        UModel.findByIdAndUpdate(req.params.id, updatedUser, (error: any, user: ReadU) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Fel vid uppdatering av användare'
                })
            } else {
                Logger.http(user)
                res.status(StatusCode.OK).send(user ? user : {
                    message: `Användare med id '${req.params.id}' hittades inte`
                })
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Fel vid uppdatering av användare'
        })
    }
}

const deleteUserById = (req: Request, res: Response) => {
    try {
        UModel.findByIdAndRemove(req.params.id, (error: ErrorCallback, user: ReadU) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Fel vid borttagning av användare'
                })
            } else {
                Logger.http(user)
                res.status(StatusCode.OK).json(
                    user ? {
                            message: `Användare med id '${req.params.id}' har tagits bort från databasen!`
                        }
                        : {
                            message: `Användare med id '${req.params.id}'hittades inte`
                        })
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: `Fel vid borttagning av användare`
        })
    }
}

export default {
    createUser,
    getAllUs,
    getUByName,
    getUserByNameAndEmail,
    updateUserById,
    deleteUserById
}