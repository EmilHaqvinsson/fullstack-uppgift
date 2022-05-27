// import Logger from "../utils/Logger";
// import StatusCode from "../utils/StatusCode";
// import { Request, Response } from "express";
// import { CreateU } from "../interface/InterFace";
// import UModel from "../models/UModel";
// import bcrypt from 'bcrypt';
// import AuthModel from "../models/AuthModel";
// import { encryptedPassword } from "./UController";
// import jwt from 'jsonwebtoken'

// async function registerUser(req: Request, res: Response): Promise<void> {
//     try {
//         Logger.info('createUser()');
//         Logger.http(req.body);
//         let { fullName, eMail, pass } = req.body;
//         pass = await encryptedPassword(pass);
//         if (fullName && eMail && pass) {
//             const newobject: CreateU = {
//                 fullName: fullName,
//                 eMail: eMail,
//                 pass: pass
//             };
//             Logger.http(newobject);
//
//             const user = new UModel(newobject);
//             const dbResponse = await user.save();
//             Logger.http(dbResponse);
//             res.status(StatusCode.CREATED).send('Användare skapad!');
//         } else {
//             Logger.error('name, fullName or eMail failed');
//             res.status(StatusCode.BAD_REQUEST).send({
//                 message: 'Faulty body'
//             });
//         }
//     } catch (error) {
//         Logger.error(error);
//         res.status(StatusCode.BAD_REQUEST).send({
//             error: 'Det gick inte att skapa användare'
//         }
//         );
//     }
// }
//
// async function checkLogin(req: Request, res: Response) {
//     const isUserLoggedIn = await AuthModel.find({userId: AuthModel})
//     const allLoggedIn = await AuthModel.find({})
//     console.log(isUserLoggedIn)
//     return {isUserLoggedIn, allLoggedIn}
// }
//
// async function login(req: Request, res: Response) {
//     let message: any;
//     let resultOfLogin: object;
//     let email = req.body.email;
//     let pass = req.body.pass;
//     Logger.info('ENDPOINT REACHED; TRYING LOGIN..');
//     console.log(checkLogin(email, pass))
//     try {
//         if (pass && email) {
//             Logger.http('"' + email + '" and "' + pass + '" are users email and pass.');
//             const foundUser = await UModel.findOne({ email });
//             const hashIt = bcrypt.hashSync(JSON.stringify(foundUser), 10);
//             let isAuth: boolean | string;
//             let authToken: string = hashIt;
//             foundUser ? isAuth = bcrypt.compareSync(pass, foundUser.pass) : isAuth = false;
//             isAuth ? isAuth = authToken : isAuth = 'Could not log in user ' + foundUser?.eMail + ' with that pass. Please try again.';
//             const whoIsUser = await UModel.findOne({ email });
//
//             const token = jwt.sign(
//                 { email: whoIsUser?.eMail, userId: whoIsUser?._id },
//                 "secret_this_should_be_longer",
//                 { expiresIn: "1h" }
//               )
//
//             //   res.status(200).json({
//             //     token: token,
//             //     expiresIn: 3600,
//             //     userId: whoIsUser?._id
//             //   });
//
//             resultOfLogin = {
//                 userId: whoIsUser?.id,
//                 token: isAuth,
//             };
//
//             const saveLogin = new AuthModel(resultOfLogin);
//
//             const welcomeObj = {
//                 welcomeString: `Welcome back ${whoIsUser?.fullName}`,
//                 // resultOfLogin: resultOfLogin,
//                 saveLogin: saveLogin
//             }
//
//             Logger.info(resultOfLogin);
//             res.send(String(welcomeObj.welcomeString))
//
//         } else if (!email) {
//             res.status(StatusCode.BAD_REQUEST);
//             resultOfLogin = { authenticated: false, message: `You need to provide an email.` };
//             res.send(message);
//         } else if (!pass) {
//             res.status(StatusCode.BAD_REQUEST);
//             message = `You need to provide a password.`;
//             res.send(message);
//         } else {
//             message += '\n';
//             res.status(StatusCode.BAD_REQUEST);
//             res.send(res.status + message);
//         }
//     } catch (error) {
//         Logger.error(error);
//         // res.status(StatusCode.BAD_REQUEST)
//         message += ({
//             error: 'Det gick inte att hämta användaren efter namn och eMail'
//         });
//         // res.send([res.status, message])
//     }
//
// }

export default {
    // registerUser,
    // login,
    // checkLogin
}