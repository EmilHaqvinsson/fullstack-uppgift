import Logger from "../utils/Logger";
import StatusCode from "../utils/StatusCode";
import {Request, Response} from "express";
import {CreateU, ReadU} from "../interface/InterFace";
import UModel from "../models/UModel";
import bcrypt from 'bcrypt'
import { ObjectId } from "mongoose";
// import { ReadMessage } from "../interface/IMessage";

const saltRounds: number = 10
export const encryptedPassword = async (password: string) => {
    let newPass: string = ''
    await bcrypt.hash(password, saltRounds).then(function (hash: any) {
        newPass = hash;
    })
    return newPass
}

const registerUser = async (req: Request, res: Response) => {
    try {
        Logger.http(req.body)
        let {firstName, lastName, password, username}: CreateU = req.body
        password = await encryptedPassword(password)
        if (firstName && lastName && password && username) {
            const newObject: CreateU = {
                firstName,
                lastName,
                password,
                username
            }
            Logger.http(newObject)
            const user = new UModel(newObject)
            const dbResponse = await user.save()
            Logger.http(dbResponse)
            res.status(StatusCode.CREATED).send(dbResponse)
        } else {
            Logger.error('First or last name, password or username failed')
            res.status(StatusCode.BAD_REQUEST).send({
                message: 'Incorect body'
            })
        }
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Error creating user'
        })
    }
}

interface SearchForUser {
    username: string
}

interface VerifyUser {
    message: boolean
	userId: string
}

const verifyUser = async (req: Request, res: Response) => {
	try {
		const {username, password} = req.body
		Logger.http('the req.body is: ' + req.body.valueOf())
		
		// Query
		const query: SearchForUser = {username: String(username)}
        Logger.debug('the query is: ' + query)
		const dbQuery = await UModel.find(query)
		Logger.debug('the answer from the db is: ' + dbQuery)
		
		// Verify password in bcrypt
		let response: VerifyUser | undefined
		await bcrypt.compare(String(password), dbQuery[0].password)
			.then(function (result) {
				response = {
                    message: result,
					userId: String(dbQuery[0].id )                   
				}
                Logger.debug('bcrypt resulted in: ' + response.message + ', '+ response.userId + ', which hopefully is the users ID')
			})
		res.status(StatusCode.OK).send(response)
		
	} catch (error) {
		res.status(StatusCode.INTERNAL_SERVER_ERROR)
			.send({
				message: `Error occurred while trying to retrieve user with username: ${ req.query.username }`
			})
	}
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
        UModel.find({
            firstName: req.params.name,
            username: req.params.username
        }, '', (error: any, user: Array<ReadU>) => {
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
            error: 'Det gick inte att hämta användaren efter namn och username'
        })
    }
}

const updateUserById = (req: Request, res: Response) => {
    try {
        Logger.debug(req.params.id + '= req.params.id')
        Logger.debug(req.body + '= req.body')
        const updatedUser: CreateU = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            username: req.body.username,
            password: req.body.password
        }
        Logger.debug(updatedUser + '= updatedUser')

        UModel.findByIdAndUpdate(req.params.id, updatedUser, {new: true}, (error: any, user: any) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Fel vid uppdatering av användare'
                })
            } else {
                Logger.debug(user)
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
                    user ? {message: `Användare med id ${req.params.id} har tagits bort från databasen!`}
                        : {message: `Användare med id '${req.params.id}' hittades inte!`})
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
    registerUser,
    verifyUser,
    getAllUsers,
    getUserById,
    getUserByNameAndEmail,
    updateUserById,
    deleteUserById
}