import Logger from "../utils/Logger";
import StatusCode from "../utils/StatusCode";
import {Request, Response} from "express";
import {CreateU, ReadU} from "../interface/InterFace";
import UModel from "../models/UModel";
import bcrypt from 'bcrypt'

const saltRounds: number = 10
const encryptedPassword = async (pass: string) => {
    let newPass: string = ''
    await bcrypt.hash(pass,saltRounds).then(function (hash: any){
        newPass = hash;
    })
    return newPass
}

const registerUser = async (req: Request, res: Response) => {
    try {
        Logger.info('createUser()')
        Logger.http(req.body)
        let {fullName, eMail, pass} = req.body
        pass = await encryptedPassword(pass)
        if (fullName && eMail && pass) {
            const newobject: CreateU = {
                fullName: fullName,
                eMail: eMail,
                pass: pass
            }
            Logger.http(newobject)

            const user = new UModel(newobject)
            const dbResponse = await user.save()
            Logger.http(dbResponse)
            res.status(StatusCode.CREATED).send('Användare skapad!')
        } else {
            Logger.error('name, fullName or eMail failed')
            res.status(StatusCode.BAD_REQUEST).send({
                message: 'Faulty body'
            })
        }
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
                error: 'Det gick inte att skapa användare'
            }
        )
    }
}

async function login(req: Request, res: Response) {
    let message: any
    let resultOfLogin: object
    let eMail = req.body.eMail
    let pass = req.body.pass
    Logger.info('ENDPOINT REACHED; TRYING LOGIN..')
    try {
        if (pass && eMail) {
            Logger.http('"' + eMail + '" and "' + pass + '" are users email and pass.')
            const foundUser = await UModel.findOne({eMail})
            const hashIt = bcrypt.hashSync(JSON.stringify(Date.now()), 10)
            let isAuth: boolean | string 
            let authToken: string = hashIt
            foundUser ? isAuth = bcrypt.compareSync(pass, foundUser.pass) : isAuth = false
            isAuth ? isAuth = authToken : isAuth = 'Could not log in user ' + foundUser?.eMail + ' with that pass . Please try again.'
            const whoIsUser = await UModel.findOne({eMail})

            resultOfLogin = {
                authenticated: isAuth,
                fullName: whoIsUser?.fullName,
                email: whoIsUser?.eMail
            }
            // const tryLogin = foundUser ? resultOfLogin = {authenticated: isAuth, message: 'User was authenticated! Welcome.'}
            //                             : resultOfLogin = {authenticated: isAuth, message: 'No user could be found with that email.'}

            // tryLogin.authenticated ? resultOfLogin = {authenticated: tryLogin.authenticated, message: resultOfLogin}
            //                         : resultOfLogin = {authenticated: false, message: 'Login didnt work.'}

            Logger.info(resultOfLogin)
            res.send(resultOfLogin)
        } else if (!eMail) {
            res.status(StatusCode.BAD_REQUEST)
            resultOfLogin = {authenticated: false, message:`You need to provide an email.`}
            res.send(message)
        } else if (!pass) {
            res.status(StatusCode.BAD_REQUEST)
            message = `You need to provide a password.`
            res.send(message)
        } else {
            message += '\n'
            res.status(StatusCode.BAD_REQUEST)
            res.send(res.status + message)
        }
    } catch (error) {
        Logger.error(error)
        res.status(StatusCode.BAD_REQUEST).send({
            error: 'Det gick inte att hämta användaren efter namn och eMail'
        })
    }
}

function getAllUsers(req: Request, res: Response) {
    try {
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
        UModel.findById(req.params.id, (error: ErrorCallback, users: Array<ReadU>) => {
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
        UModel.findByIdAndUpdate(req.params.id, updatedUser, (error: ErrorCallback, user: ReadU) => {
            if (error) {
                Logger.error(error)
                res.status(StatusCode.BAD_REQUEST).send({
                    error: 'Fel vid uppdateriing av användare'
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
                    user ? { message: `Användare med id '${req.params.id}' har tagits bort från databasen!` }
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
    registerUser,
    login,
    getAllUsers,
    getUserById,
    getUserByNameAndEmail,
    updateUserById,
    deleteUserById
}