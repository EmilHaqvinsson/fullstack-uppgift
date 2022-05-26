import Logger from "../utils/Logger";
import StatusCode from "../utils/StatusCode";
import {Request, Response} from "express";
import {CreateU, ReadU} from "../interface/InterFace";
import UModel from "../models/UModel";
import bcrypt from 'bcrypt'
// import { ReadMessage } from "../interface/IMessage";

const saltRounds: number = 10
export const encryptedPassword = async (pass: string) => {
    let newPass: string = ''
    await bcrypt.hash(pass,saltRounds).then(function (hash: any){
        newPass = hash;
    })
    return newPass
}

function getAllUsers(req: Request, res: Response) {
    try {
        // @ts-ignore
        UModel.find({}, '', (error: ErrorCallback, users: Array<ReadU>) => {
            if (error) {
                Logger.error(error);
                res.status(StatusCode.BAD_REQUEST).send({
                    error: '\n' +
                        'Det gick inte att hämta användare'
                });
            } else {
                Logger.http(users);
                res.status(StatusCode.OK).send(users);
            }
        });
    } catch (error) {
        Logger.error(error);
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Det gick inte att hämta användaren'
        });
    }
}

const getUserById = (req: Request, res: Response) => {
    try {
        // @ts-ignore
        UModel.findById(req.params.id, (error: ErrorCallback, users: ReadU) => {
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
        // @ts-ignore
        UModel.find({ fullName: req.params.name, eMail: req.params.eMail }, '', (error: ErrorCallback, user: Array<ReadU>) => {
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
            fullName: req.body.fullName,
            eMail: req.body.eMail,
            pass: req.body.pass
        }
        Logger.debug(updatedUser)
        UModel.findByIdAndUpdate(req.params.id, updatedUser, {new : true }, (error: any , user: any) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Fel vid uppdatering av användare'
                })
            } else {
                Logger.debug(user)
                res.status(StatusCode.NOT_FOUND).send(user ? user : {
                    message: `Användare med id '${req.params.id}' hittades inte`
                })
            }
        })
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.).send({
            error: 'Fel vid uppdatering av användare'
        })
    }
}

const deleteUserById = (req: Request, res: Response) => {
    try {
        // @ts-ignore
        UModel.findByIdAndRemove(req.params.id, (error: ErrorCallback, user: ReadU) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Fel vid borttagning av användare'
                })
            } else {
                Logger.http(user)
                res.status(StatusCode.OK).json(
                    user ? { message: `Användare med id ${req.params.id} har tagits bort från databasen!` }
                        : { message: `Användare med id '${req.params.id}'hittades inte!` })
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
    getAllUsers,
    getUserById,
    getUserByNameAndEmail,
    updateUserById,
    deleteUserById
}