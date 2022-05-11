import {Express} from "express";
import UController from "../controllers/UController";

const URoutes = (server: Express) => {
    server.post('/user/', UController.registerUser)

    server.get('/user/all', UController.getAllUs)
    server.get('/user/name/:name', UController.getUByName)
    server.get('/user/name/:email', UController.getUserByNameAndEmail)

    server.put('/user/:id', UController.updateUserById)

    server.delete('/user/:id', UController.deleteUserById)
}

export default URoutes