import {Express} from "express";
import AuthController from "../controllers/AuthController";
import UController from "../controllers/UController";

const URoutes = (server: Express) => {
    server.post('/user/', UController.registerUser)
    // server.post('/login/', AuthController.login)
    // server.get('/login/', AuthController.checkLogin)

    server.get('/user/all', UController.getAllUsers)
    server.get('/user/:id', UController.getUserById)
    server.get('/user/name/:name/:eMail', UController.getUserByNameAndEmail)

    server.put('/user/:id', UController.updateUserById)

    server.delete('/user/:id', UController.deleteUserById)

}

export default URoutes